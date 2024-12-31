'use client';

import {Button} from 'antd';
import {ShoppingCart} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {Specific} from '..';

import {useAppDispatch} from '@/hooks';
import {openCart} from '@/features/cartSlice';

export function Header() {
  const dispatch = useAppDispatch();

  const handleOpenCart = () => {
    dispatch(openCart());
  };

  return (
    <div className="sticky top-0 z-50 p-[10px]">
      <header className="flex w-full items-center rounded-2xl bg-white px-5 py-5">
        <nav className="mx-auto flex w-full items-center justify-between">
          <Link passHref href="/">
            <Image alt="logo" height={35} src="/logo.svg" width={130} />
          </Link>
          <Button onClick={handleOpenCart}>
            <ShoppingCart size={20} />
          </Button>
        </nav>
      </header>
      <Specific.Drawer.Cart />
    </div>
  );
}
