import  { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);


  const addWishlist = (item) => {
    const index = wishlist.findIndex((x) => x._id === item._id);
    if (index === -1) {
      setWishlist([...wishlist, item]);
      toast.success('Successfully Added To Basket!')
    } else {
      setWishlist(wishlist.filter((x) => x._id !== item._id));
      toast('Removed From Wishlist!', {
        icon: 'ℹ️',
      });
    }
  };

  const isInWishlist = (item)=>{
    const index = wishlist.findIndex((x) => x._id === item._id);
    if (index === -1) {
      return false
    } else {
      return true
    }
  }


  const data = {
    wishlist,
    addWishlist,
    isInWishlist
  };
  return (
    <WishlistContext.Provider value={data}>{children}</WishlistContext.Provider>
  );
};

export default WishlistProvider;
