import React from "react";
import StoreItems from "../fakers/items.json";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface Props {
  item: (typeof StoreItems)[number];
}

export default function StoreItem({ item }: Props) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(item.id);
  console.log("quanity is", quantity);
  return (
    <Card>
      <Card.Img
        variant="top"
        src={item.imgUrl}
        height={"200px"}
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between mb-4 align-items-baseline">
          <span className="fs-2">{item.name}</span>
          <span className="ms-2 text-muted">{formatCurrency(item.price)}</span>
        </Card.Title>
        <div className="mt-auto ">
          {quantity === 0 ? (
            <Button
              className="w-100"
              onClick={() => increaseCartQuantity(item.id)}
            >
              + Add to cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: "0.5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center "
                style={{ gap: "0.5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(item.id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(item.id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
