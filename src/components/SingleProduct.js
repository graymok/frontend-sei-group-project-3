import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const SingleProduct = (props) => {
  // contexts
  const { userState } = useContext(UserContext);
  const [user] = userState;
  const { cartState, addToCart } = useContext(CartContext);
  const [cart] = cartState;

  const [product, setProduct] = useState({});

  const getSingleProduct = async () => {
    const userId = localStorage.getItem("userId");
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}products/${props.id}`,
      {
        headers: {
          Authorization: userId,
        },
      }
    );
    console.log(response);
    setProduct(response.data.product);
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="single-container">
      {product !== null ? (
        <div className="product-listing-container">
          <div className="product-listing-details">
            <div className="product-listing-left">
              <img
                className="product-listing-image"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="product-listing-right">
              <span className="product-listing-title">{product.name}</span>
              <span className="product-listing-price">${product.price}</span>
              <span className="product-listing-description">
                {product.description}
              </span>
            </div>
          </div>
          {props.button && (
            <span
              className="product-listing-add"
              onClick={() => {
                addToCart(product.id);
              }}
            >
              Add to Cart
            </span>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SingleProduct;
