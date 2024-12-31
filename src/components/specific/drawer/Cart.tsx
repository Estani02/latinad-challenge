import {Button, Drawer, Space} from 'antd';

import {closeCart, removeItem, updateItemQuantity} from '@/features/cartSlice';
import {useAppDispatch, useAppSelector} from '@/hooks';

export function Cart() {
  const dispatch = useAppDispatch();
  const {items: cartItems, isOpen} = useAppSelector((state) => state.cart);

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateItemQuantity({id, quantity}));
  };

  const onClose = () => {
    dispatch(closeCart());
  };

  return (
    <Drawer
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        </Space>
      }
      open={isOpen}
      placement="bottom"
      title="Drawer with extra actions"
      width={500}
      onClose={onClose}
    >
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.price}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
          />
          <Button onClick={() => handleRemove(item.id)}>Remove</Button>
        </div>
      ))}
    </Drawer>
  );
}
