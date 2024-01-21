import { useContext, useEffect, useState } from "react";
import "./index.scss";
import { NavLink, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BasketContext } from "../../context/BasketContext";
import { WishlistContext } from "../../context/WishlistContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation()
  const navScroll = () => {
    const scroll = window.scrollY;
    if (scroll > 70) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", navScroll);

    return () => {
      window.removeEventListener("scroll", navScroll);
    };
  }, []);
  const { basket, addBasket, removeBasket, updateCountBasket, total } =
      useContext(BasketContext);
      const { wishlist, addWishlist } = useContext(WishlistContext);
  return (
    <nav className={`${isScrolled || location.pathname !== '/' ? "active" : ""}`}>
      <div id="desktop-nav">
        <div className="container">
          <div className="logo">
            <NavLink className={"link"} to={"/"}>
              <h3>Tasty</h3>
            </NavLink>
          </div>
          <div className="pages">
            <ul className="page-lists">
              <li className="nav-elem">
                <NavLink to={"/"} className={"link"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-elem">
                <NavLink to={"/Wishlist"} className={"link"}>
                  Wishlist{wishlist.length > 0 ? `(${wishlist.length})` : ""}
                </NavLink>
              </li>
              <li className="nav-elem">
                <NavLink to={"/Basket"} className={"link"}>
                Basket{basket.length > 0 ? `(${basket.length})` : ""}
                </NavLink>
              </li>
              <li className="nav-elem">
                <NavLink to={"/AddPage"} className={"link"}>
                  AddPage
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="mobile-nav" className={`${isNavOpen ? "active" : ""}`}>
        <div className="container">
          <div className="top-nav">
            <div className="logo">
              <NavLink className={"link"} to={"/"}>
                <h3>Tasty</h3>
              </NavLink>
            </div>
            <div className="burger-menu-icon">
              <button onClick={()=>setIsNavOpen(!isNavOpen)} className="nav-button">
                <GiHamburgerMenu />
              </button>
            </div>
          </div>
          <div onClick={()=>setIsNavOpen(!isNavOpen)} className={`pages ${isNavOpen ? "active" : ""}`}>
            <ul className="page-lists">
              <li className="nav-elem">
                <NavLink to={"/"} className={"link"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-elem">
                <NavLink to={"/Wishlist"} className={"link"}>
                Wishlist{wishlist.length > 0 ? `(${wishlist.length})` : ""}
                </NavLink>
              </li>
              <li className="nav-elem">
                <NavLink to={"/Basket"} className={"link"}>
                  Basket{basket.length > 0 ? `(${basket.length})` : ""}
                </NavLink>
              </li>
              <li className="nav-elem">
                <NavLink to={"/AddPage"} className={"link"}>
                  AddPage
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
