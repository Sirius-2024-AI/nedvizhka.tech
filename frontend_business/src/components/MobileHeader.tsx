import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import React from "react";


export const routes = [
    {
      title: "Подключить API",
      href: "#connect"
    },
    {
      title: "Документация",
      href: "/docs"
    },
    {
      title: "FAQ",
      href: "/faq"
    },
    {
      title: "Для физических лиц",
      href: "http://nedvizhka.tech/"
    },
  ];

  
export const MobileHeader = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <header className="flex justify-between place-items-center md:hidden w-full max-md:px-5">
        <img 
          loading="lazy" 
          src={"https://cdn.builder.io/api/v1/image/assets/TEMP/52ab6c29806d65a821c364adfb6292dc564876afd6311b6351104558a3043b35?apiKey=5e0d9264fc9a4d708f7164c058795995&"} 
          alt="Company logo" 
          className="flex max-w-full aspect-[7.14] w-[250px]" 
        />
        <div ref={ref} className="flex w-6 aspect-[1.49] mx-3">
          <Hamburger rounded toggled={isOpen} size={30} toggle={setOpen} color="white"/>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0"
              >
                <ul className="grid gap-2">
                  {routes.map((route, idx) => {

                    return (
                      <motion.li
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.1 + idx / 10,
                        }}
                        key={route.title}
                        className="w-full p-[0.08rem] rounded-xl"
                      >
                        <a
                          onClick={() => setOpen((prev) => !prev)}
                          className={
                            "flex items-center justify-between w-full p-5 rounded-xl bg-[#262626] opacity-90"
                          }
                          href={route.href}
                        >
                        <span className="flex gap-1 text-lg text-white opacity-100">{route.title}</span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    </header>
  );
};

export default MobileHeader;