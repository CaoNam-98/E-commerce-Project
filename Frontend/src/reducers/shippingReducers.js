import { 
    CART_SAVE_SHIPPING, 
    CART_SAVE_PAYMENT_METHOD
} from '../constants/shippingConstants'

export const shippingReducer = (state = {shippingAdrress: {}}, action) => {
    switch(action.type) {
        case CART_SAVE_SHIPPING:
            return {
                ...state,
                shippingAddress: action.payload
            }
        
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        default:
            return state
    }
}