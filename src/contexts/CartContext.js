import { useContext, useState, createContext } from 'react'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import { UserContext } from '../contexts/UserContext'

const CartContext = createContext()

const CartProvider = ({children}) => {
    // contexts
    const {userState} = useContext(UserContext)
    const [user] = userState

    const [cart, setCart] = useState([])

    // functions

    // get cart
    const getCart = async () =>
    {
        // grab cart
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}cart`, {
            headers: { Authorization: user.id }
        })
        console.log(res)
        // set cart to state
        setCart(res.data.cart);
    }

    // add item to cart
    const addToCart = async (productId) =>
    {
        // create item
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}cart`, {
            productId: productId
        }, {
            headers: { Authorization: user.id }
        })
        console.log(res.data.addItem);
        getCart();
    }
    
    // remove item from cart
    const removeFromCart = async (productId) =>
    {
        // delete item
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}cart/${productId}`, {
            headers: { Authorization: user.id }
        })
        console.log(res.data.message);
        getCart();
    }

    const state = {
        cartState: [cart, setCart],
        getCart,
        addToCart,
        removeFromCart
    }

    return (
        <CartContext.Provider value = {state}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }