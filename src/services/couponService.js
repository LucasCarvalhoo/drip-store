import { supabase } from './supabase';

// Validate and apply coupon
export const validateCoupon = async (couponCode, cartTotal) => {
  try {
    console.log('Validating coupon:', couponCode, 'for cart total:', cartTotal);
    
    const { data: coupon, error } = await supabase
      .from('cupons')
      .select('*')
      .eq('codigo', couponCode.toUpperCase())
      .eq('ativo', true)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Cupom não encontrado ou inválido.');
      }
      throw error;
    }
    
    // Check if coupon is valid
    const now = new Date();
    const startDate = new Date(coupon.data_inicio);
    const endDate = new Date(coupon.data_expiracao);
    
    if (now < startDate) {
      throw new Error('Este cupom ainda não está ativo.');
    }
    
    if (now > endDate) {
      throw new Error('Este cupom expirou.');
    }
    
    // Check minimum value
    if (coupon.valor_minimo && cartTotal < coupon.valor_minimo) {
      throw new Error(`Pedido mínimo de R$ ${coupon.valor_minimo.toFixed(2).replace('.', ',')} para usar este cupom.`);
    }
    
    // Check usage limit
    if (coupon.usos_maximos && coupon.usos_atuais >= coupon.usos_maximos) {
      throw new Error('Este cupom atingiu o limite de uso.');
    }
    
    // Calculate discount
    let discountValue = 0;
    
    switch (coupon.tipo) {
      case 'Percentual':
        discountValue = (cartTotal * coupon.valor) / 100;
        break;
      case 'Valor Fixo':
        discountValue = coupon.valor;
        break;
      case 'Frete Grátis':
        discountValue = 0; // Handled separately in shipping calculation
        break;
      default:
        throw new Error('Tipo de cupom inválido.');
    }
    
    // Ensure discount doesn't exceed cart total
    discountValue = Math.min(discountValue, cartTotal);
    
    return {
      isValid: true,
      coupon: {
        id: coupon.id,
        code: coupon.codigo,
        type: coupon.tipo,
        value: coupon.valor,
        discountValue: discountValue,
        freeShipping: coupon.tipo === 'Frete Grátis'
      },
      message: `Cupom aplicado! Desconto de R$ ${discountValue.toFixed(2).replace('.', ',')}`
    };
    
  } catch (error) {
    console.error('Error validating coupon:', error);
    return {
      isValid: false,
      error: error.message || 'Erro ao validar cupom.'
    };
  }
};

// Apply coupon (increment usage)
export const applyCoupon = async (couponId) => {
  try {
    const { error } = await supabase.rpc('incrementar_uso_cupom', {
      p_coupon_id: couponId
    });
    
    if (error) throw error;
    return true;
    
  } catch (error) {
    console.error('Error applying coupon:', error);
    // Don't throw error here as the order might still be valid
    return false;
  }
};

// Get available coupons (for testing/admin)
export const getAvailableCoupons = async () => {
  try {
    const { data, error } = await supabase
      .from('cupons')
      .select('codigo, tipo, valor, valor_minimo, data_expiracao')
      .eq('ativo', true)
      .gte('data_expiracao', new Date().toISOString())
      .order('data_expiracao', { ascending: true });
    
    if (error) throw error;
    return data || [];
    
  } catch (error) {
    console.error('Error getting available coupons:', error);
    return [];
  }
};