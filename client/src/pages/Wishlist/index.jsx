import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { PiHeart } from "react-icons/pi";
import { WishlistContext } from "../../context/WishlistContext";
import "./index.scss";
import { BasketContext } from "../../context/BasketContext";
import { PiHeartFill } from "react-icons/pi";
import { Toaster } from "react-hot-toast";

const Wishlist = () => {
    const { wishlist, addWishlist, isInWishlist } = useContext(WishlistContext);
    const { basket, addBasket, removeBasket, updateCountBasket, total } =
    useContext(BasketContext);
  return (
    <>
    <div><Toaster/></div>
      <Helmet>
        <title>Wishlist </title>
      </Helmet>
      <section id="Wishlist">
        <div className="container">
          <div className="header">
            <span>Products</span>
            <h4>Wishlist</h4>
            {/* <div className="buttons">
            <button>Main</button>
            <button>Desert</button>
            <button>Drinks</button>
          </div> */}
          </div>
          <div className="products">
            <div className="row">
              {wishlist &&
                wishlist.map((item) => (
                  <div
                    key={item._id}
                    className="col-lg-6 col-md-6 col-12 product"
                  >
                    <div className="image">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="content">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>

                      <p>
                        {/*    */}
                        <button onClick={()=>addWishlist(item)}>
                            {isInWishlist ? <PiHeartFill  className="heart" /> :<PiHeart /> }
                          
                        </button>
                        <button onClick={() => addBasket(item)}>
                        <MdOutlineAddShoppingCart />
                      </button>
                        <button onClick={() => addWishlist(item)}>
                          remove From wishlist
                        </button>
                      </p>

                    </div>
                    <div className="price">${item.price}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
