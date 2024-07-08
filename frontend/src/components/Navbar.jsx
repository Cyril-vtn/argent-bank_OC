import "../styles/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import argentBankLogo from "../images/argentBankLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
export const Navbar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={"/"}>
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user.token ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <FontAwesomeIcon icon={faUserCircle} />
              {user.userInfo ? user.userInfo.firstName : ""}
            </Link>
            <a className="main-nav-item" onClick={signOut}>
              <FontAwesomeIcon icon={faSignOut} />
              Sign Out
            </a>
          </>
        ) : (
          <Link className="main-nav-item" to={"/sign-in"}>
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};
