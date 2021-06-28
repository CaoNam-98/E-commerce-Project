import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    CART_ITEM_RESET,
    CART_SAVE_SHIPPING, 
    CART_SAVE_PAYMENT_METHOD
} from './../constants/cartConstants'

export const cartReducer = (state = {cartItems: [], shippingAdrress: {}}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? item : x
                    )
                }
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item] // Vừa thay đổi giá trị, vừa trả về giá trị này cho store
                }
            }

        case CART_ITEM_RESET:
            return {
                cartItems: []
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload.product)
            }

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