import React from "react";
import FeatureCard from "./FeatureCard.tsx";

const Features: React.FC = () => {
  const features = [
    {
      title: (
        <>
          <span className="text-white">точность </span>95%
        </>
      ),
      description:
        "Оценка базируется на анализе большого объема данных о продажах схожих объектов и других факторов",
    },
    {
      title: (
        <>
          <span className="text-white">работаем </span> в правовом поле
        </>
      ),
      description:
        "Оценка недвижимости — обязательный этап при ипотечном кредитовании. Система выдает электронный отчёт, соответствующий всем требованиям №135-ФЗ",
    },
    {
      title: (
        <>
          всегда <span className="text-white">на связи</span>
        </>
      ),
      description:
        "Специалисты поддержки всегда на связи, чтобы быстро дать ответ на любой ваш вопрос",
    },
  ];

  return (
    <section className="mt-11 w-full max-w-[1025px] max-md:mt-10 max-md:max-w-full max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
          >
            <FeatureCard
              title={feature.title}
              description={feature.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
