import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

const ShoppingCart = () => {
    // contexts
    const { cartState, totalState, orderTotal, getCart, addToCart, removeFromCart } = useContext(CartContext);
    const [ cart ] = cartState;
    const [ total, setTotal ] = totalState;

    // states
    const [checkingOut, setCheckingOut] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [state, setState] = useState('');
    const [card, setCard] = useState('');

    // on component load
    useEffect(getCart, []);

    return (
        <div>
            <h1>Shopping Cart</h1>
            {/* if cart exists, check if cart is empty, display cart items if cart exists and is not empty, display loading message if cart doesn't exist */}
            {cart ? cart.length === 0 ? 'Empty cart' : cart.map((item, i) => {return (
                <div key={i}>
                    <span>
                        {item.product.name} - ${item.product.price}
                        <input type="button" value="Remove" onClick={() => {removeFromCart(item.createdAt)}} />
                    </span>
                </div>
            )
            }) : 'Getting cart...'}
            {
                checkingOut ?
                    <form className="checkoutForm">
                        <input type="text" value={address} onChange={(e) => {setAddress(e.target.value)}} />
                    </form>
                    :
                    null
            }
            {
                cart ? cart.length === 0 ?
                    <h2>Price:</h2>
                    :
                    <h2>Price: {total}</h2>
                    : 
                    null
            }
        </div>
    )
}


export default ShoppingCart