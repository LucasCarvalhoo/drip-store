// src/services/cartService.js
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid'; // You may need to install this: npm install uuid

// Get or create a cart session ID
const getCartSessionId = () => {
  let sessionId = localStorage.getItem('cartSessionId');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('cartSessionId', sessionId);
  }
  return sessionId;
};

// Get or create cart for the current user or session
export const getCart = async (userId = null) => {
  try {
    // If user is logged in, get their cart
    if (userId) {
      const { data: userCart } = await supabase
        .from('carrinho')
        .select('id')
        .eq('usuario_id', userId)
        .maybeSingle();
        
      if (userCart) {
        return userCart.id;
      }
      
      // Create a new cart for the user
      const { data: newUserCart, error: createError } = await supabase
        .from('carrinho')
        .insert({ usuario_id: userId })
        .select('id')
        .single();
        
      if (createError) throw createError;
      return newUserCart.id;
    } 
    
    // For guests, use session ID
    const sessionId = getCartSessionId();
    
    const { data: sessionCart } = await supabase
      .from('carrinho')
      .select('id')
      .eq('sessao_id', sessionId)
      .maybeSingle();
      
    if (sessionCart) {
      return sessionCart.id;
    }
    
    // Create a new cart for the session
    const { data: newSessionCart, error: createError } = await supabase
      .from('carrinho')
      .insert({ sessao_id: sessionId })
      .select('id')
      .single();
      
    if (createError) throw createError;
    return newSessionCart.id;
    
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
};

// Get cart items with product details
export const getCartItems = async (cartId) => {
  const { data, error } = await supabase
    .from('itens_carrinho')
    .select(`
      id,
      quantidade,
      preco_unitario,
      produto_id (
        id,
        nome,
        preco_original,
        preco_promocional,
        slug,
        imagens_produto (url)
      )
    `)
    .eq('carrinho_id', cartId);
    
  if (error) throw error;
  
  // Transform data to match your frontend
  return data.map(item => ({
    id: item.id,
    quantidade: item.quantidade,
    precoUnitario: item.preco_unitario,
    produto: {
      id: item.produto_id.id,
      nome: item.produto_id.nome,
      slug: item.produto_id.slug,
      precoOriginal: item.produto_id.preco_original,
      precoAtual: item.produto_id.preco_promocional || item.produto_id.preco_original,
      imagemUrl: item.produto_id.imagens_produto[0]?.url || '../images/products/produc-image-0.png'
    },
    // No size/color data since they're just UI elements
    cor: '',
    tamanho: ''
  }));
};

// Add item to cart
export const addToCart = async (cartId, productId, variationId, quantity = 1) => {
  // Check if the item is already in the cart
  const { data: existingItem } = await supabase
    .from('itens_carrinho')
    .select('id, quantidade')
    .eq('carrinho_id', cartId)
    .eq('variacao_id', variationId)
    .maybeSingle();
    
  // Get current product price
  const { data: product } = await supabase
    .from('produtos')
    .select('preco_promocional, preco_original')
    .eq('id', productId)
    .single();
    
  if (!product) throw new Error('Product not found');
  
  const priceToUse = product.preco_promocional || product.preco_original;
  
  if (existingItem) {
    // Update quantity of existing item
    const { data, error } = await supabase
      .from('itens_carrinho')
      .update({ quantidade: existingItem.quantidade + quantity })
      .eq('id', existingItem.id)
      .select();
      
    if (error) throw error;
    return data;
  }
  
  // Add new item to cart
  const { data, error } = await supabase
    .from('itens_carrinho')
    .insert({
      carrinho_id: cartId,
      produto_id: productId,
      variacao_id: variationId,
      quantidade: quantity,
      preco_unitario: priceToUse
    })
    .select();
    
  if (error) throw error;
  return data;
};

// Update cart item quantity
export const updateCartItemQuantity = async (itemId, quantity) => {
  const { data, error } = await supabase
    .from('itens_carrinho')
    .update({ quantidade: quantity })
    .eq('id', itemId)
    .select();
    
  if (error) throw error;
  return data;
};

// Remove item from cart
export const removeCartItem = async (itemId) => {
  const { error } = await supabase
    .from('itens_carrinho')
    .delete()
    .eq('id', itemId);
    
  if (error) throw error;
  return true;
};

// Get cart summary (subtotal, total items)
export const getCartSummary = async (cartId) => {
  const { data, error } = await supabase
    .from('itens_carrinho')
    .select(`
      id,
      quantidade,
      preco_unitario
    `)
    .eq('carrinho_id', cartId);
    
  if (error) throw error;
  
  const subtotal = data.reduce((sum, item) => {
    return sum + (item.quantidade * item.preco_unitario);
  }, 0);
  
  const totalItems = data.reduce((sum, item) => {
    return sum + item.quantidade;
  }, 0);
  
  return {
    subtotal,
    totalItems
  };
};

// Clear cart
export const clearCart = async (cartId) => {
  const { error } = await supabase
    .from('itens_carrinho')
    .delete()
    .eq('carrinho_id', cartId);
    
  if (error) throw error;
  return true;
};

// Add item to cart without variations (simple version)
export const addToCartSimple = async (cartId, productId, quantity = 1) => {
  try {
    // Get current product price
    const { data: product } = await supabase
      .from('produtos')
      .select('preco_promocional, preco_original, nome')
      .eq('id', productId)
      .single();
      
    if (!product) throw new Error('Product not found');
    
    const priceToUse = product.preco_promocional || product.preco_original;
    
    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('itens_carrinho')
      .select('id, quantidade')
      .eq('carrinho_id', cartId)
      .eq('produto_id', productId)
      .maybeSingle();
    
    if (existingItem) {
      // Update quantity of existing item
      const { data, error } = await supabase
        .from('itens_carrinho')
        .update({ quantidade: existingItem.quantidade + quantity })
        .eq('id', existingItem.id)
        .select();
        
      if (error) throw error;
      return data;
    }
    
    // Add new item to cart (ignore variations completely)
    const { data, error } = await supabase
      .from('itens_carrinho')
      .insert({
        carrinho_id: cartId,
        produto_id: productId,
        quantidade: quantity,
        preco_unitario: priceToUse
        // Don't include variacao_id at all
      })
      .select();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in addToCartSimple:', error);
    throw error;
  }
};