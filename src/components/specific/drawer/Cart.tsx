import {Drawer} from 'antd';

import {closeCart} from '@/features/cartSlice';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {Specific} from '@/components';

export function Cart() {
  const dispatch = useAppDispatch();
  const {isOpen} = useAppSelector((state) => state.cart);

  const onClose = () => {
    dispatch(closeCart());
  };

  return (
    <Drawer
      open={isOpen}
      placement="right"
      title="Carrito de Compras"
      width={500}
      onClose={onClose}
    >
      <Specific.List.Cart />
    </Drawer>
  );
}
