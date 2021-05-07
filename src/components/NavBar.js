import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import Logo from "../images/logo.png";

const NavBar = (props) => {
  const { userState } = useContext(UserContext);
  const [user, setUser] = userState;

  return (
    <>
      {user.name !== null ? (
        <nav className="nav-container">
          <div className="nav-left">
            <NavLink className="nav-logo" to="/products">
              Sahara
            </NavLink>
          </div>
          <div className="nav-right">
            <NavLink
              className="nav-link"
              activeClassName="nav-active"
              to="/products"
            >
              All Products
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="nav-active"
              to="/cart"
            >
              My Cart
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="nav-active"
              to="/orders"
            >
              My Orders
            </NavLink>
            <span
              className="nav-link-logout"
              onClick={() => {
                localStorage.removeItem("userId");
                setUser({
                  ...user,
                  id: "",
                  name: null,
                });
                props.setName("");
                props.setEmail("");
                props.setPassword("");
              }}
            >
              Logout
            </span>
            <span className="nav-side-margin"></span>
          </div>
        </nav>
      ) : (
        <nav className="nav-container">
          <div className="nav-left">
            <NavLink className="nav-logo" exact to="/">
              Sahara
            </NavLink>
          </div>
          <div className="nav-right">
            <NavLink
              className="nav-link"
              activeClassName="nav-active"
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className="nav-link-button"
              activeClassName="nav-active-button"
              to="/register"
            >
              Get Started
            </NavLink>
            <span className="nav-side-margin"></span>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
