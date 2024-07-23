import React from "react";

const WhyUs: React.FC = () => {
  return (
    <section className="flex flex-col px-5 mt-20 w-full max-w-[1025px] max-md:mt-10 max-md:max-w-full">
      <h2 className="text-6xl font-bold text-center text-white max-md:max-w-full max-md:text-4.2xl">
        <span className="font-mabry">почему мы?</span>
      </h2>
      <div className="justify-center mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-8 py-10 w-full text-4xl font-bold text-white bg-white bg-opacity-10 rounded-[30px] max-md:px-5">
              <h3>
                <span className="font-mabry leading-none">точность <br></br><span className="font-mabry bg-gradient-to-r from-[#0DB6B6] to-[#5454F1] inline-block text-transparent bg-clip-text">95%</span></span>
              </h3>
              <p className="mt-5 text-lg font-medium">
                Оценка базируется на анализе большого объема данных о продажах
                схожих объектов и других факторов. Наши алгоритмы постоянно
                обучаются и улучшаются, обеспечивая высокую точность оценки.
              </p>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-8 py-9 w-full text-4xl font-bold text-white bg-white bg-opacity-10 rounded-[30px] max-md:px-5 max-md:mt-10">
              <h3>
              <span className="font-mabry bg-gradient-to-r from-[#0DB6B6] to-[#5454F1] inline-block text-transparent bg-clip-text">готовый <span className="text-white">отчёт</span></span>
              </h3>
              <p className="mt-5 text-lg font-medium">
                Получите электронный отчёт, соответствующий всем требованиям
                №135-ФЗ от 29.07.1998. Наш отчет содержит подробный анализ
                рынка, сравнительные данные и обоснование стоимости.
              </p>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-8 py-10 w-full text-4xl font-bold text-white bg-white bg-opacity-10 rounded-[30px] max-md:px-5 max-md:mt-10">
              <h3>
              <span className="font-mabry bg-gradient-to-r from-[#0DB6B6] to-[#5454F1] inline-block text-transparent bg-clip-text">всегда <br></br><span className="font-mabry text-white">на связи</span></span>
              </h3>
              <p className="mt-5 text-lg font-medium">
                Проводите оценку недвижимости в любое время и из любого места,
                где есть доступ в интернет. Наша служба поддержки готова
                ответить на ваши вопросы 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
