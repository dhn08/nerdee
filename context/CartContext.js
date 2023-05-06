import { useSession } from "next-auth/react";
import { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { data } = useSession();
  const [cart, setCart] = useState([]);
  //const {user}=useContext(AuthCo useSessiontext)

  //   const initCart = localStorage.getItem("cart")
  //     ? JSON.parse(localStorage.getItem("cart"))
  //     : [];
  // const [cart,setCart]=useState([...initCart.filter(item=>{

  //     if(user){
  //         return !user.courses.includes(item)
  //     }else{
  //         return true
  //     }
  // })])

  useEffect(() => {
    // Perform localStorage action
    const initCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    setCart([
      ...initCart.filter((item) => {
        if (data?.user) {
          return !data.user.courses.includes(item);
        } else {
          return true;
        }
      }),
    ]);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);
  useEffect(() => {
    // Perform localStorage action
    console.log("Naye use effect se hun", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addCart = (uuid) => {
    if (!cart.includes(uuid)) {
      setCart([...cart, uuid]);
      localStorage.setItem("cart", JSON.stringify([...cart, uuid]));
      toast.info("1 course added to cart");
    }
  };

  const removeCart = (uuid) => {
    const index = cart.findIndex((item) => item === uuid);

    if (index > -1) {
      const currentCart = [...cart];
      currentCart.splice(index, 1);
      setCart(currentCart);
      localStorage.setItem("cart", JSON.stringify(currentCart));
      toast.info("1 course removed from cart");
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
