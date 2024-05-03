import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

interface Props {
  children: ReactNode;
}
type CartItem = {
  id: number;
  quantity: number;
};
type ShoppingCartContextType = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cardItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [cardItems, setCardsItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const cartQuantity = cardItems.reduce(
    (quanity, item) => item.quantity + quanity,
    0
  );
  const getItemQuantity = (id: number) => {
    return cardItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseCartQuantity = (id: number) => {
    setCardsItems((currItems) => {
      if (!currItems.find((item) => item.id === id)?.quantity) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity + 1 };
          else return item;
        });
      }
    });
  };
  const decreaseCartQuantity = (id: number) => {
    setCardsItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1)
        return currItems.filter((item) => item.id !== id);
      else {
        return currItems.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity - 1 };
          else return item;
        });
      }
    });
  };
  const removeFromCart = (id: number) => {
    setCardsItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cardItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};
