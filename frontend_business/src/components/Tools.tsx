import React from "react";
import ToolCard from "./ToolCard.tsx";

const Tools: React.FC = () => {
  const tools = [
    {
      title: (
        <>
          <span className="text-white">документация</span> для разработчиков
        </>
      ),
      description:
        "Интегрируете API системы автоматизированной оценки стоимости автомобилей в процесс оценки недвижимости, а мы сделаем его максимально удобным",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d77bfa5cfd86fa53f57bd71ec25494185a84501c7da848e6ed358016d3880add?apiKey=5e0d9264fc9a4d708f7164c058795995&",
      link: "/docs",
    },
    {
      title: "FAQ",
      description:
        "Оперативно находите ответы на ваши вопросы, используя наш обширный ресурс информации и поддерживающую команду специалистов, готовых помочь вам в любое время.",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2c71f8b4d60ca13dcae1bd6d1927541f635c20446066c345052df382ebce5092?apiKey=5e0d9264fc9a4d708f7164c058795995&",
      link: "/faq",
    },
  ];

  return (
    <section className="mt-10 w-full max-w-[1026px] max-md:max-w-full max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full"
          >
            <ToolCard
              title={tool.title}
              description={tool.description}
              iconSrc={tool.iconSrc}
              link={tool.link}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools;
