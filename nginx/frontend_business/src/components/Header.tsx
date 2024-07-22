import React from "react";

interface HeaderProps {
  logo: string;
}

const Header: React.FC<HeaderProps> = ({ logo }) => {
  return (
    <header className="hidden md:flex items-center justify-between px-12 py-6 w-full text-lg text-white bg-white bg-opacity-10 max-w-[1026px] rounded-2xl md:rounded-full max-md:px-5 max-md:max-w-full">
      <div className="flex w-1/4 max-md:w-full">
        <img
          loading="lazy"
          src={logo}
          className="shrink-0 max-w-full aspect-[7.14] w-[207px]"
          alt="Logo"
        />
      </div>
      <nav className="flex w-3/4 justify-around max-md:flex-col max-md:gap-3">
        <a
          href="#connect"
          className="font-inter justify-center px-px py-1"
        >
          Подключить API
        </a>
        <a
          href="/docs"
          className="justify-center px-px py-1"
        >
          Документация
        </a>
        <a
          href="/faq"
          className="justify-center px-px py-1"
        >
          FAQ
        </a>
        <a
          href="http://www.nedvizhka.tech/"
          className="justify-center px-px py-1"
        >
          Для физических лиц
        </a>
      </nav>
    </header>
  );
};

export default Header;