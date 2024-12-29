import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <div className="sticky top-0 z-50 p-[10px]">
      <header className="flex w-full items-center rounded-2xl bg-white px-5 py-5">
        <Link passHref href="https://latinad.com/" target="_blank">
          <Image alt="logo" height={35} src="/logo.svg" width={130} />
        </Link>
      </header>
    </div>
  );
}
