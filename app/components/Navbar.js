import Link from 'next/link';
import Logo from './Logo';

const Navbar = () => {
  return (
    <header className="w-full z-10">
      <div className="container mx-auto px-4">
        <nav className="flex min-h-[64px] items-center justify-between py-1 lg:min-h-[90px] lg:py-4">
          <Logo />

          <ul className="hidden md:flex">
            <li className="mr-4 lg:mr-8">
              <Link href="/">Главная</Link>
            </li>
            <li className="mr-4 lg:mr-8">
              <Link href="/courses">Курсы</Link>
            </li>
            <li className="mr-4 lg:mr-8">
              <Link href="/about">О нас</Link>
            </li>
          </ul>

          <ul className="hidden md:flex">
            <li className="mr-4 lg:mr-8">
              <Link href="/">IG</Link>
            </li>
            <li className="mr-4 lg:mr-8">
              <Link href="/videos">TW</Link>
            </li>
            <li className="mr-4 lg:mr-8">
              <Link href="/news">FB</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
