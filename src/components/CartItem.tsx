import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import StoreItems from "../fakers/items.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";

type Props = {
  id: number;
  quantity: number;
};

export default function CartItem({ id, quantity }: Props) {
  const { removeFromCart } = useShoppingCart();
  const item = StoreItems.find((i) => i.id === id);
  if (item === null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-item-center">
      <img
        src={item?.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item?.name}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              {quantity}x
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {formatCurrency(item?.price as number)}
        </div>
      </div>
      <div>{formatCurrency((item?.price as number) * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        X
      </Button>
    </Stack>
  );
}
