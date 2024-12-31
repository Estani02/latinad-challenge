'use client';
import {Drawer} from 'antd';

import {closeCart, removeAllItems} from '@/features/cartSlice';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {Specific} from '@/components';
import {calculateDaysBetweenDates} from '@/utils';

export function Cart() {
  const dispatch = useAppDispatch();
  const {items: cartItems, isOpen} = useAppSelector((state) => state.cart);
  const {startEnd} = useAppSelector((state) => state.campaign);

  const onClose = () => {
    dispatch(closeCart());
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const itemTotal =
          parseFloat((parseFloat(item.price.toString()) * item.quantity).toFixed(2)) *
          calculateDaysBetweenDates(startEnd);

        return total + itemTotal;
      }, 0)
      .toFixed(2);
  };

  return (
    <Drawer
      open={isOpen}
      placement="right"
      title="Carrito de Compras"
      width={500}
      onClose={onClose}
    >
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">No hay elementos en el carrito.</p>
      ) : (
        <div className="flex h-full flex-col lg:items-end">
          <button
            className="text-red-500 hover:underline"
            type="button"
            onClick={() => dispatch(removeAllItems())}
          >
            Borrar toda la campaña
          </button>
          <Specific.List.Cart />
          <div className="mt-12 w-full rounded-2xl border border-solid px-4 py-3">
            <div className="lgw-3/4 flex w-full items-center justify-between">
              <div className="flex flex-col gap-4 text-xl font-bold text-gray-800">
                <p>Fecha:</p>
                <p>Total:</p>
              </div>
              <div className="flex flex-col gap-4 text-end font-semibold text-gray-500">
                <p>
                  {startEnd[0]} - {startEnd[1]} ({calculateDaysBetweenDates(startEnd)} días)
                </p>
                <p>${calculateTotal()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
