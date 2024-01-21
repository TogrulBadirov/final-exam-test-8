import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState(
    localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const total =  basket.reduce((total,currentElem)=> total+(currentElem.count * currentElem.price) , 0)

  const addBasket = (item) => {
    const index = basket.findIndex((x) => x._id === item._id);
    if (index === -1) {
      setBasket([...basket, { ...item, count: 1 }]);
      toast.success('Successfully Added To Basket!')
    } else {
      basket[index].count++;
      setBasket([...basket]);
      toast('Already In Basket, Count increased!', {
        icon: 'ℹ️',
      });
    }
  };

  const removeBasket = (item) => {
    setBasket(basket.filter((x) => x._id !== item._id));
    toast('Removed From Basket!', {
        icon: 'ℹ️',
      });
  };

  const updateCountBasket = (item,value) => {
    const index = basket.findIndex((x) => x._id === item._id);
    basket[index].count += value
    if (basket[index].count < 1) {
        return removeBasket(item)
    }
    setBasket([...basket])
  }

  const data = {
    basket,
    addBasket,
    removeBasket,
    updateCountBasket,
    total
  };
  return (
    <BasketContext.Provider value={data}>{children}</BasketContext.Provider>
  );
};

export default BasketProvider;
