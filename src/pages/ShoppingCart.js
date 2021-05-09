import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const ShoppingCart = () => {
    // contexts
    const { cartState, totalState, orderTotal, getCart, addToCart, removeFromCart } = useContext(CartContext);
    const [ cart, setCart ] = cartState;
    const [ total, setTotal ] = totalState;

    // states
    const [checkingOut, setCheckingOut] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [state, setState] = useState('');
    const [card, setCard] = useState('');
    const [redirect, setRedirect] = useState(false)

    // on component load
    useEffect(getCart, []);

    const handleCheckout = (e) => {
        e.preventDefault()
        createOrder()
        setCart([])
        setCheckingOut(false)
        setRedirect(true)
    }

    const createOrder = async () => {
        const userId = localStorage.getItem('userId')
        let response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}orders`,{
            address: `${address}|${city}|${zip}|${state}`,
            cart: cart,
            total: total,
            card: card
        }, {
            headers: {
                Authorization: userId
            }
        })
    }


    return (
        <div className="cart-container">
            { redirect && <Redirect to='/orders' />}
            { checkingOut &&
                <div className="checkout-container">
                    
                    <form className="checkoutForm" onSubmit={handleCheckout}>
                        <span className="checkout-headline">Mailing and payment information:</span>
                        <label className="checkout-label" htmlFor="address">Shipping Address</label>
                        <input className="checkout-input" type="text" value={address} onChange={(e) => {setAddress(e.target.value)}} />
                        <label className="checkout-label" htmlFor="city">City</label>
                        <input className="checkout-input" type="text" value={city} onChange={(e) => {setCity(e.target.value)}} />
                        <label className="checkout-label" htmlFor="state">State</label>
                        <input className="checkout-input" type="text" value={state} onChange={(e) => {setState(e.target.value)}} />
                        <label className="checkout-label" htmlFor="zip-code">Zip Code</label>
                        <input className="checkout-input" type="text" value={zip} onChange={(e) => {setZip(e.target.value)}} />
                        <label className="checkout-label" htmlFor="credit">Credit Card</label>
                        <input className="checkout-input" type="text" value={card} onChange={(e) => {setCard(e.target.value)}} />
                        <input className="checkout-submit" type="submit" value="Submit Payment" />
                    </form>
                </div>    
            }
            <span className="cart-headline">Your current order</span>
            {/* if cart exists, check if cart is empty, display cart items if cart exists and is not empty, display loading message if cart doesn't exist */}
            <div className="cart-items-container">
            {cart ? cart.length === 0 ? 'Empty cart' : cart.map((item, i) => {return (
                <div className="cart-item" key={i}>
                    <span>{item.product.name} - ${item.product.price}</span>
                    <input type="button" value="Remove" onClick={() => {removeFromCart(item.createdAt)}} />
                </div>
            )
            }) : 'Getting cart...'}
            </div>

            {
                cart ? cart.length === 0 ?
                    <div className="cart-payment-container">
                        <span className="cart-total-price">Total: $0</span>
                    </div>

                    :
                    <div className="cart-payment-container">
                        <span className="cart-total-price">Total: ${total}</span>
                        { checkingOut === false ? 
                        <span className="cart-checkout" onClick={()=>{
                            return setCheckingOut(true)
                        }}>Checkout Cart</span>
                        :
                        null                           
                        }
                     
                    </div>    

                    : 
                    null
            }
        </div>
    )
}


export default ShoppingCart