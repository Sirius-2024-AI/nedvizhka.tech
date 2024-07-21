import React from "react";

const FAQ: React.FC = () => {
  return (
    <section className="flex flex-col mt-20 w-full max-w-[1025px] max-md:mt-10 max-md:max-w-full">
      <div className="flex justify-center items-center pt-5 text-6xl font-bold text-center text-white max-md:px-5 max-md:max-w-full max-md:text-4.2xl">
        <div className="flex flex-col max-md:max-w-full max-md:text-4.2xl">
          <h1 className="max-md:max-w-full max-md:text-4.2xl">
            <span className="font-mabry leading-none">ответы на часто задаваемые <span className="font-mabry bg-gradient-to-r from-[#0DB6B6] to-[#5454F1] inline-block text-transparent bg-clip-text">вопросы</span></span>
          </h1>
        </div>
      </div>
      <div className="justify-center px-5 mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-center px-8 py-11 w-full text-lg text-white bg-white bg-opacity-10 rounded-[30px] max-md:px-5">
              <div className="font-extrabold">
                Для чего нужна оценка недвижимости?
              </div>
              <div className="mt-3.5 font-medium">
                Если вы хотите взять кредит в банке, вам необходимо оставить в залог квартиру, соответствующую стоимости кредита.
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-center px-8 py-11 w-full text-lg text-white bg-white bg-opacity-10 rounded-[30px] max-md:px-5 max-md:mt-10">
              <div className="font-extrabold">
                Как долго ждать отчёт об оценке недвижимости?
              </div>
              <div className="mt-3.5 font-medium">
                 Отчёт об оценке недвижимости формируется моментально.
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center px-8 py-11 w-full text-lg text-white bg-white bg-opacity-10 rounded-[30px] max-md:px-5 max-md:mt-10">
              <div className="font-extrabold">
                Какую недвижимость мы оцениваем?
              </div>
              <div className="mt-3.5 font-medium">
              Оцениваем только квартиры. Мы пока не оцениваем частные дома, земельные участки, коммерческую недвижимость, гаражи, склады и т.п.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
