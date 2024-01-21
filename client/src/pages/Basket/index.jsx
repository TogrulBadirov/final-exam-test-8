import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { PiHeart } from "react-icons/pi";
import { BasketContext } from "../../context/BasketContext";
import "./index.scss";
import { WishlistContext } from "../../context/WishlistContext";
import { PiHeartFill } from "react-icons/pi";
import { Toaster } from "react-hot-toast";


const Basket = () => {
  const { basket, addBasket, removeBasket, updateCountBasket, total } =
    useContext(BasketContext);
    const { wishlist, addWishlist, isInWishlist } = useContext(WishlistContext);
  return (
    <>
    <div><Toaster/></div>
      <Helmet>
        <title>Basket </title>
      </Helmet>
      <section id="Basket">
        <div className="container">
          <div className="header">
            <span>Products</span>
            <h4>Basket</h4>
            {/* <div className="buttons">
            <button>Main</button>
            <button>Desert</button>
            <button>Drinks</button>
          </div> */}
          </div>
          <div className="products">
            <div className="row">
              {basket &&
                basket.map((item) => (
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
                        {/* <PiHeartFill />   */}
                        <button onClick={()=>addWishlist(item)}>
                        {isInWishlist(item) ? <PiHeartFill  className="heart" /> :<PiHeart /> }
                        </button>
                        <button onClick={() => removeBasket(item)}>
                          remove From basket
                        </button>
                      </p>
                      <p>
                        Count:
                        <button onClick={()=>updateCountBasket(item,-1)}>-</button>
                        {item.count}
                        <button onClick={()=>updateCountBasket(item,1)}>+</button>
                      </p>
                      <p> Product Total: ${item.count * item.price}</p>
                    </div>
                    <div className="price">${item.price}</div>
                  </div>
                ))}
            </div>
            Total: ${total}
          </div>
        </div>
      </section>
    </>
  );
};

export default Basket;
