'use client';
import {Button, Drawer} from 'antd';
import jsPDF from 'jspdf';

import {closeCart, removeAllItems} from '@/features/cartSlice';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {Specific} from '@/components';
import {calculateDaysBetweenDates} from '@/utils';

export function Cart() {
  const dispatch = useAppDispatch();
  const {items: cartItems, isOpen} = useAppSelector((state) => state.cart);

  const onClose = () => {
    dispatch(closeCart());
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const itemTotal =
          parseFloat((parseFloat(item.price.toString()) * item.quantity).toFixed(2)) *
          calculateDaysBetweenDates(item.campaignDuration);

        return total + itemTotal;
      }, 0)
      .toFixed(2);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Campaña publicitaria', 10, 10);
    doc.text(
      `Fecha: ${new Date().toLocaleDateString()} - Hora: ${new Date().toLocaleTimeString()}`,
      10,
      20,
    );
    doc.text('Pantallas:', 10, 30);

    cartItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} - Cantidad: ${item.quantity} - Precio: $${(item.price * calculateDaysBetweenDates(item.campaignDuration)).toFixed(2)} - Fecha: ${item.campaignDuration?.[0]} - ${item.campaignDuration?.[1]}`,
        10,
        40 + index * 10,
      );
    });

    doc.text(`Total: $${calculateTotal()}`, 10, 40 + cartItems.length * 10 + 10);
    doc.save('presupesto_de_campaña.pdf');
  };

  return (
    <Drawer
      open={isOpen}
      placement="right"
      title="Carrito de Compras"
      width={700}
      onClose={onClose}
    >
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">No hay elementos en el carrito.</p>
      ) : (
        <div className="flex h-full flex-col lg:items-end">
          <div className="mb-4 flex w-full items-center justify-between">
            <Button type="primary" onClick={generatePDF}>
              Descargar PDF
            </Button>
            <Button color="danger" variant="outlined" onClick={() => dispatch(removeAllItems())}>
              Borrar compra
            </Button>
          </div>
          <Specific.List.Cart />
          <div className="mt-12 w-full rounded-2xl border border-solid px-4 py-3">
            <div className="lgw-3/4 flex w-full items-center justify-between">
              <div className="flex flex-col gap-4 text-xl font-bold text-gray-800">
                <p>Total:</p>
              </div>
              <div className="flex flex-col gap-4 text-end font-semibold text-gray-500">
                <p>${calculateTotal()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
