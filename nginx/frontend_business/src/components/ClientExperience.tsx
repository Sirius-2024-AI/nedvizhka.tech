import React from "react";

const ClientExperience: React.FC = () => {
  return (
    <section className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 mt-12 w-full text-center text-white max-w-[1025px] min-h-[285px] rounded-[30px] max-md:px-5 max-md:mt-10 max-md:max-w-full max-md:px-5">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc2dce61aaf58795fb4418659e42a97913d344b096bad3f0afeb0d9e63903fb9?apiKey=5e0d9264fc9a4d708f7164c058795995&"
        alt=""
        className="object-cover absolute inset-0 size-full rounded-[30px] max-md:px-5"
      />
      <div className="flex relative flex-col mt-3.5 mb-2.5 max-w-full w-[623px]">
        <h2 className="leading-none self-center text-4xl font-mabry max-md:max-w-full">
          улучшайте <span className="leading-none text-white">клиентский опыт</span>
        </h2>
        <p className="mt-3.5 text-lg max-md:max-w-full">
          Перейдите на новый уровень взаимодействия с клиентами с помощью
          функций API автоматизированного сервиса оценки недвижимости:
          моментальный расчет стоимости, анализ рыночных данных и генерация
          отчетов
        </p>
      </div>
    </section>
  );
};

export default ClientExperience;
