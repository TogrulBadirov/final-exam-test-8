import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";

import "./index.scss"
import { BasketContext } from "../../context/BasketContext";
import { WishlistContext } from "../../context/WishlistContext";
import { PiHeart } from "react-icons/pi";
import { PiHeartFill } from "react-icons/pi";
import { Toaster } from "react-hot-toast";
const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const getProduct = async () => {
    const resp = await axios(`http://localhost:3000/${id}`);
    setProduct(resp.data);
    setLoading(false);
  };
  useEffect(() => {
    getProduct()
  }, [])
  const { basket, addBasket, removeBasket, updateCountBasket, total } =
  useContext(BasketContext);
const { wishlist, addWishlist, isInWishlist } = useContext(WishlistContext);
  return (
    <>
    <div><Toaster/></div>
      <Helmet>
        <title>Detail </title>
      </Helmet>
      <section id="detail">
        <div className="container">
            {loading
            ?
            <>Loading... </>
            :
            <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                <img src={product.image} alt="" />
                </div>
                <div className="col-lg-6 col-md-6 col-12 right-side">
                <h4>{product.title}</h4>
                <p>Description: {product.desc}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <button onClick={()=>addWishlist(product)}>
                        {isInWishlist(product) ? <PiHeartFill className="heart" /> :<PiHeart /> }
                        </button>
                      <button onClick={() => addBasket(product)}>
                        <MdOutlineAddShoppingCart />
                      </button>
                </div>
            </div>
            }
        </div>
      </section>
    </>
  );
};

export default Detail;
