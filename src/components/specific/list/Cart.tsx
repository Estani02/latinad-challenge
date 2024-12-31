'use client';
import {Button, List, Tooltip} from 'antd';
import {Minus, Plus, Trash} from 'lucide-react';

import {removeItem, updateItemQuantity} from '@/features/cartSlice';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {calculateDaysBetweenDates} from '@/utils';

export function Cart() {
  const dispatch = useAppDispatch();
  const {items: cartItems} = useAppSelector((state) => state.cart);
  const {startEnd} = useAppSelector((state) => state.campaign);

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateItemQuantity({id, quantity}));
  };

  const handleIncrement = (id: number, currentQuantity: number) => {
    handleUpdateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      handleUpdateQuantity(id, currentQuantity - 1);
    }
  };

  return (
    <List
      bordered
      className="h-[60%] w-full overflow-hidden overflow-y-auto lg:h-[70%]"
      dataSource={cartItems}
      renderItem={(item) => (
        <List.Item className="!px-4">
          <div className="flex w-full items-center justify-between">
            <Tooltip placement="top" title={item.name}>
              <p className="line-clamp-1 w-[88px]">{item.name}</p>
            </Tooltip>
            <div className="flex items-center justify-end gap-4">
              <p className="text-sm text-primary">
                $
                {parseFloat(parseFloat(item.price.toString()).toFixed(2)) *
                  calculateDaysBetweenDates(startEnd)}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Subtotal:</span> $
                {(
                  parseFloat((parseFloat(item.price.toString()) * item.quantity).toFixed(2)) *
                  calculateDaysBetweenDates(startEnd)
                ).toFixed(2)}
              </p>
            </div>
            <div key={item.id} className="flex items-center justify-center gap-2">
              <Button
                size="small"
                variant="text"
                onClick={() => handleDecrement(item.id, item.quantity)}
              >
                <Minus size={12} />
              </Button>
              <span>{item.quantity}</span>
              <Button
                size="small"
                variant="text"
                onClick={() => handleIncrement(item.id, item.quantity)}
              >
                <Plus size={12} />
              </Button>
              <Button
                key={item.id}
                color="danger"
                size="small"
                variant="solid"
                onClick={() => handleRemove(item.id)}
              >
                <Trash size={12} />
              </Button>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
}
