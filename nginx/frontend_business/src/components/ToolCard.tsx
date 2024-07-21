import React from "react";

interface ToolCardProps {
  title: React.ReactNode;
  description: string;
  iconSrc: string;
  link: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, iconSrc, link }) => {
  return (
    <div className="flex gap-2 items-start pt-10 pl-8 pb-10 w-full text-white bg-white bg-opacity-10 rounded-[30px] max-md:flex-wrap max-md:mt-10">
      <div className="flex flex-col grow shrink-0 self-start basis-0 w-fit">
        <h3 className="leading-none text-4xl font-mabry">{title}</h3>
        <p className="mt-2 text-lg">{description}</p>
      </div>
      <a href={link} className="z-10 shrink-0 self-end place-items-end aspect-square w-[54px] max-md:mt-10 -mb-10">
        <img
          loading="lazy"
          src={iconSrc}
          alt=""
        />
      </a>
    </div>
  );
};

export default ToolCard;
