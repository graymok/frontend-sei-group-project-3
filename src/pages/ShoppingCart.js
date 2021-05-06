import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

const ShoppingCart = () => {
    // contexts
    const { cartState, getCart, addToCart, removeFromCart } = useContext(CartContext);
    const [ cart ] = cartState;

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
            {cart ? cart.length === 0 ? 'Empty cart' : cart.map((item, i) => {return <div>{item.product.name} - ${item.product.price}</div>}) : 'Getting cart...'}
            {
                checkingOut ?
                    <form className="checkoutForm">
                        <input type="text" value={address} onChange={(e) => {setAddress(e.target.value)}} />
                    </form>
                    :
                    null
            }
        </div>
    )
}


export default ShoppingCart