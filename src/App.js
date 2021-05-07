import "./App.css";
import Landing from "./pages/Landing";
import Registration from "./pages/Registration";
import AllProducts from "./pages/AllProducts";
import AllOrders from "./pages/AllOrders";
import ShoppingCart from "./pages/ShoppingCart";
import NavBar from "./components/NavBar";
import SingleProduct from "./components/SingleProduct";
import { UserContext } from "./contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import SingleOrder from "./components/SingleOrder";

function App() {
  const { userState, verifyUser } = useContext(UserContext);
  const [user] = userState;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    verifyUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main-container">
      <NavBar setName={setName} setEmail={setEmail} setPassword={setPassword} />
      <div className="body-container">
        <Route
          exact
          path="/"
          render={() => {
            if (user.name !== null) {
              return <Redirect to="/products" />;
            } else {
              return <Landing />;
            }
          }}
        />
        <Route
          path="/login"
          render={() => {
            if (user.name !== null) {
              return <Redirect to="/products" />;
            } else {
              return (
                <Registration
                  email={email}
                  password={password}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  type={"Login"}
                />
              );
            }
          }}
        />
        <Route
          path="/register"
          render={() => {
            if (user.name !== null) {
              return <Redirect to="/products" />;
            } else {
              return (
                <Registration
                  name={name}
                  email={email}
                  password={password}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setName={setName}
                  type={"Register"}
                />
              );
            }
          }}
        />
        <Route
          exact
          path="/products"
          render={() => {
            if (user.name !== null) {
              return <AllProducts />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/products/:id"
          render={(routingProps) => {
            if (user.name !== null) {
              return <SingleProduct id={routingProps.match.params.id} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          exact
          path="/orders"
          render={() => {
            if (user.name !== null) {
              return <AllOrders />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/orders/:id"
          render={(routingProps) => {
            if (user.name !== null) {
              return <SingleOrder id={routingProps.match.params.id} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          path="/cart"
          render={() => {
            if (user.name !== null) {
              return <ShoppingCart />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
