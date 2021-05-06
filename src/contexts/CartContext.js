import { useState, createContext } from 'react'
import axios from 'axios'

const CartContext = createContext()

const CartProvider = ({children}) => {
    const [cart, setCart] = useState({})



    const state = {
        cartState: [cart, setCart]
    }

    return (
        <CartContext.Provider value = {state}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }