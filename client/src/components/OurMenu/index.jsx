import "./index.scss";
import { PiHeart } from "react-icons/pi";
import { PiHeartFill } from "react-icons/pi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BasketContext } from "../../context/BasketContext";
import { WishlistContext } from "../../context/WishlistContext";
import { Link } from "react-router-dom";

const OurMenu = () => {
  const [products, setProducts] = useState(null);
  const { basket, addBasket, removeBasket, updateCountBasket, total } =
    useContext(BasketContext);
  const { wishlist, addWishlist, isInWishlist } = useContext(WishlistContext);
  const getAllProducts = async () => {
    const resp = await axios("http://localhost:3000/");
    setProducts(resp.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section id="OurMenu">
      <div className="container">
        <div className="header">
          <span>OUR MENU</span>
          <h4>Discover Our Exclusive Menu</h4>
          {/* <div className="buttons">
            <button>Main</button>
            <button>Desert</button>
            <button>Drinks</button>
          </div> */}
        </div>
        <div className="products">
          <div className="row">
            {products &&
              products.map((item) => (
                <div
                  key={item._id}
                  className="col-lg-6 col-md-6 col-12 product"
                >
                  <div className="image">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="content">
                    <Link to={`/detail/${item._id}`}><h4>{item.title}</h4></Link>
                    <p>{item.desc}</p>

                    <p>
                      {/* <PiHeartFill />   */}
                      <button onClick={()=>addWishlist(item)}>
                        {isInWishlist(item) ? <PiHeartFill className="heart" /> :<PiHeart /> }
                        </button>
                      <button onClick={() => addBasket(item)}>
                        <MdOutlineAddShoppingCart />
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
  );
};

export default OurMenu;
