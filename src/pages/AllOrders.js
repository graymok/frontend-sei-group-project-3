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
    let response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}orders`,
      {
        headers: {
          Authorization: user.id,
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
          allOrders.map((item, i) => {
            return (
              <div key={i}>
                <NavLink exact to={`/orders/${item.id}`}>
                  <span>{item.address}</span>
                  <div>
                    {item.cart_items.map((cartItem, i) => {
                      return <div key={i}>{cartItem.product.name}</div>;
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
