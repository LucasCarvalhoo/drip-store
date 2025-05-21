// src/services/productService.js
import { supabase } from './supabase';

// Get featured products for home page
export const getFeaturedProducts = async (limit = 8) => {
  const { data, error } = await supabase
    .from('produtos')
    .select(`
      id, 
      nome, 
      slug, 
      preco_original, 
      preco_promocional,
      desconto_porcentagem,
      em_promocao,
      categoria_id (nome),
      imagens_produto (url)
    `)
    .eq('destacado', true)
    .eq('ativo', true)
    .order('data_criacao', { ascending: false })
    .limit(limit);

  if (error) throw error;
  
  // Transform the data to match your frontend components
  return data.map(product => ({
    id: product.id,
    nome: product.nome,
    precoOriginal: product.preco_original,
    precoAtual: product.preco_promocional || product.preco_original,
    desconto: product.desconto_porcentagem,
    categoria: product.categoria_id?.nome,
    imagemUrl: product.imagens_produto[0]?.url || '../images/products/produc-image-0.png'
  }));
};

// Get product categories
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categorias')
    .select('id, nome, slug, imagem_url')
    .eq('ativo', true);

  if (error) throw error;
  return data;
};

// Get collections for home page
export const getCollections = async () => {
  const { data, error } = await supabase
    .from('colecoes')
    .select('id, nome, slug, descricao, imagem_url')
    .eq('destaque', true)
    .eq('ativo', true);

  if (error) throw error;
  return data;
};

// Get products by category
export const getProductsByCategory = async (categorySlug) => {
  const { data, error } = await supabase
    .from('produtos')
    .select(`
      id, 
      nome, 
      slug, 
      preco_original, 
      preco_promocional,
      desconto_porcentagem,
      em_promocao,
      categoria_id (id, nome, slug),
      imagens_produto (url)
    `)
    .eq('categoria_id.slug', categorySlug)
    .eq('ativo', true);

  if (error) throw error;
  
  return data.map(product => ({
    id: product.id,
    nome: product.nome,
    precoOriginal: product.preco_original,
    precoAtual: product.preco_promocional || product.preco_original,
    desconto: product.desconto_porcentagem,
    categoria: product.categoria_id?.nome,
    imagemUrl: product.imagens_produto[0]?.url || '../images/products/produc-image-0.png'
  }));
};

// Get product detail by slug
export const getProductBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('produtos')
    .select(`
      id,
      nome,
      slug,
      descricao,
      tipo,
      genero,
      ref,
      preco_original,
      preco_promocional,
      desconto_porcentagem,
      avaliacao_media,
      quantidade_avaliacoes,
      categoria_id (id, nome, slug),
      marca_id (id, nome, slug),
      imagens_produto (id, url, principal, ordem),
      variacoes_produto (
        id,
        cor_id (id, nome, codigo_hex),
        tamanho_id (id, valor)
      )
    `)
    .eq('slug', slug)
    .eq('ativo', true)
    .single();

  if (error) throw error;
  
  // Extract available colors and sizes
  const colors = [];
  const sizes = [];
  
  if (data.variacoes_produto) {
    data.variacoes_produto.forEach(variation => {
      if (variation.cor_id && !colors.some(c => c.id === variation.cor_id.id)) {
        colors.push({
          id: variation.cor_id.id,
          name: variation.cor_id.nome,
          hexCode: variation.cor_id.codigo_hex
        });
      }
      
      if (variation.tamanho_id && !sizes.some(s => s.id === variation.tamanho_id.id)) {
        sizes.push({
          id: variation.tamanho_id.id,
          value: variation.tamanho_id.valor
        });
      }
    });
  }
  
  // Sort images with principal first
  const sortedImages = [...(data.imagens_produto || [])];
  sortedImages.sort((a, b) => {
    if (a.principal) return -1;
    if (b.principal) return 1;
    return a.ordem - b.ordem;
  });
  
  return {
    id: data.id,
    name: data.nome,
    description: data.descricao,
    category: data.categoria_id?.nome,
    brand: data.marca_id?.nome,
    ref: data.ref,
    rating: data.avaliacao_media,
    reviewCount: data.quantidade_avaliacoes,
    originalPrice: data.preco_original,
    currentPrice: data.preco_promocional || data.preco_original,
    colors: colors.map(c => c.hexCode),
    sizes: sizes.map(s => s.value),
    images: sortedImages.map(img => ({
      id: img.id,
      src: img.url,
      alt: `${data.nome} - imagem ${img.ordem || 0}`
    }))
  };
};

// Get related products
export const getRelatedProducts = async (productId, limit = 4) => {
  // Check if there are specific related products
  const { data: relatedData, error: relatedError } = await supabase
    .from('produtos_relacionados')
    .select(`
      produto_relacionado_id (
        id,
        nome,
        slug,
        preco_original,
        preco_promocional,
        desconto_porcentagem,
        categoria_id (nome),
        imagens_produto (url)
      )
    `)
    .eq('produto_id', productId)
    .eq('ativo', true)
    .limit(limit);

  if (relatedError) throw relatedError;
  
  // If we have specific related products, use those
  if (relatedData && relatedData.length > 0) {
    return relatedData.map(item => {
      const product = item.produto_relacionado_id;
      return {
        id: product.id,
        nome: product.nome,
        precoOriginal: product.preco_original,
        precoAtual: product.preco_promocional || product.preco_original,
        desconto: product.desconto_porcentagem,
        categoria: product.categoria_id?.nome,
        imagemUrl: product.imagens_produto[0]?.url || '../images/products/produc-image-0.png'
      };
    });
  }
  
  // Otherwise, get products from the same category
  const { data: product } = await supabase
    .from('produtos')
    .select('categoria_id')
    .eq('id', productId)
    .single();
    
  if (!product) return [];
  
  const { data, error } = await supabase
    .from('produtos')
    .select(`
      id,
      nome,
      slug,
      preco_original,
      preco_promocional,
      desconto_porcentagem,
      categoria_id (nome),
      imagens_produto (url)
    `)
    .eq('categoria_id', product.categoria_id)
    .neq('id', productId)  // Exclude current product
    .eq('ativo', true)
    .limit(limit);
    
  if (error) throw error;
  
  return data.map(product => ({
    id: product.id,
    nome: product.nome,
    precoOriginal: product.preco_original,
    precoAtual: product.preco_promocional || product.preco_original,
    desconto: product.desconto_porcentagem,
    categoria: product.categoria_id?.nome,
    imagemUrl: product.imagens_produto[0]?.url || '../images/products/produc-image-0.png'
  }));
};