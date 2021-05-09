import { UserContext } from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import SingleOrder from "../components/SingleOrder";
import { NavLink } from "react-router-dom";

const AllOrders = () => {
  const { userState } = useContext(UserContext);
  const [user] = userState;

  const [allOrders, setAllOrders] = useState([]);

  const getAllOrders = async () => {
    const userId = localStorage.getItem('userId')
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}orders`,
      {
        headers: {
          Authorization: userId
        },
      }
    );
    console.log(response.data.orders);
    setAllOrders(response.data.orders);
  };

  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // extra call to get all orders to refresh orders on checkout redirect from shopping cart
  useEffect(getAllOrders, []);

  return (
    <div className="orders-container">
      {allOrders ? (
        allOrders.length === 0 ? (
          <h1>no orders</h1>
        ) : (
          allOrders.map((item) => {
            return (
              <div className="order-listing" key={item.id}>
                <NavLink className="order-navlink" exact to={`/orders/${item.id}`}>
                  <span className="order-number">Order: {item.id}</span>  
                  <span className="order-address">Mail to: {item.address.replaceAll('|',', ')}</span>
                  <span className="order-details">Order Details: </span>
                  <div>
                    {item.cart_items.map((cartItem, i) => {
                      return <div className="order-products" key={i}>{cartItem.product.name}</div>;
                    })}
                  </div>
                </NavLink>
              </div>
            );
          })
        )
      ) : (
        <h1>Getting orders</h1>
      )}
    </div>
  );
};

export default AllOrders;
