import React from "react";

interface Product {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

const ProductCard: React.FC<Product> = ({ imageSrc, title, description, link }) => {
  return (
    <div className="flex gap-3.5">
      <a href={link}>
        <img
        loading="lazy"
        src={imageSrc}
        alt=""
        className="shrink-0 aspect-square w-[49px]"
        />
      </a>
      <div className="flex flex-col self-start mt-1 text-base">
        <div className="font-extrabold"><a href={link}>{title}</a></div>
        <div className="mt-1.5 font-medium"><a href={link}>{description}</a></div>
      </div>
    </div>
  );
};

const FinalStep: React.FC = () => {
  const products: Product[] = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a0e2e35a64ac5ec424ef1d709d79403a45c609f92139b80e320c3c2995ab0cc2?apiKey=5e0d9264fc9a4d708f7164c058795995&",
      title: "Газпромбанк Привилегии",
      description: "Больше, чем выгодно",
      link: 
        "https://www.gazprombank.ru/personal/privileges/",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e1512f08e56c1b59855f44998d2195e4c9425e647b4d98687d8ab0d33874c5da?apiKey=5e0d9264fc9a4d708f7164c058795995&",
      title: "Газпромбанк Про Финансы",
      description: "Понятно о деньгах",
      link: 
        "https://www.gazprombank.ru/pro-finance/",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4ca622f1f11f57eacf9b63d7ca9167d4b5621411501f88e1dc4aaac9b8bedefd?apiKey=5e0d9264fc9a4d708f7164c058795995&",
      title: "Газпромбанк Мобайл",
      description: "Наш мобильный оператор",
      link: 
        "https://www.gazprombank.ru/mobile/",
    },
  ];

  return (
    <section className="flex flex-col mt-10 w-full text-white max-w-[1026px] max-md:max-w-full px-9 py-9 mt-10 bg-white bg-opacity-10 rounded-[30px] max-md:px-5">
      <h1 className="font-mabry mt-28 text-4xl font-bold text-center max-md:mt-10 max-md:max-w-full">
        спасибо за то, что вы с нами!
      </h1>
      <p className="text-lg mt-4 font-medium text-center max-md:max-w-full">
        Отчет об оценке недвижимости придет на указанную почту в течение 5 минут
      </p>
      <p className="text-lg mt-24 font-medium text-center max-md:mt-10 max-md:max-w-full">
        Попробуйте другие продукты экосистемы Газпромбанк
      </p>
      <div className="flex gap-5 justify-between self-stretch mt-3.5 max-md:flex-wrap">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default FinalStep;
