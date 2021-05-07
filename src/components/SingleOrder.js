import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import SingleProduct from "./SingleProduct";

const SingleOrder = (props) => {
  const { userState } = useContext(UserContext);
  const [user] = userState;
  const { cartState, addToCart } = useContext(CartContext);
  const [cart] = cartState;

  const [order, setOrder] = useState({});

  const getSingleOrder = async () => {
    const userId = localStorage.getItem("userId");
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}orders/${props.id}`,
        {
          headers: { Authorization: userId },
        }
      );
      console.log(response);
      setOrder(response.data.order[0]);
    } catch (error) {
      console.log("can not find item");
    }
  };

  useEffect(() => {
    getSingleOrder();
  }, []);

  return (
    <div className="single-container">
      {order !== null ? (
        <div className="order-listing-container">
          <h2>Order: {order.id}</h2>
          <div>Ship to: {order.address}</div>
          <div>Total: ${order.total}</div>
          {order.cart_items
            ? order.cart_items.map((item, i) => {
                return <SingleProduct id={item.id} key={item.id} />;
              })
            : null}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SingleOrder;
