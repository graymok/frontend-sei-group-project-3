import { NavLink } from 'react-router-dom'

const ProductList = (props) => {
    return (
        <>
            {props.allProducts.map((item) => (
                <div className="product-listing-container" key={item.id}>
                    <NavLink exact to={`/products/${item.id}`} className="product-listing-details">
                        <div className="product-listing-left">
                            <img className="product-listing-image" src={item.image} alt={item.name} />
                        </div>
                        <div className="product-listing-right">
                            <span className="product-listing-title">{item.name}</span>
                            <span className="product-listing-price">${item.price}</span>
                            <span className="product-listing-description">{item.description}</span>
                        </div>
                    </NavLink>
                    <span className="product-listing-add">Add to Cart</span>          
                </div>
            ))}
        </>
    )
}

export default ProductList