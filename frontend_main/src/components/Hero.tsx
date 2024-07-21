import React from "react";

interface HeroProps {
  heroImage: string;
  buttonImage: string;
}

const Hero: React.FC<HeroProps> = ({ heroImage, buttonImage }) => {
  return (
    <section className="justify-center mt-14 w-full max-w-[1026px] max-md:mt-10 max-md:max-w-full max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center text-5xl font-bold text-white max-md:mt-10 max-md:max-w-full max-md:text-4xl">
            <div className="flex flex-col justify-center py-1 pr-5 max-md:max-w-full max-md:text-4xl">
              <h1 className="max-md:max-w-full max-md:text-4.2xl">
                <span className="font-mabry bg-gradient-to-r from-[#0DB6B6] to-[#5454F1] inline-block text-transparent bg-clip-text">быстро и точно</span>
              </h1>
              <h1 className="max-md:max-w-full max-md:text-4.2xl">
                <span className="font-mabry">
                  оценим стоимость вашей недвижимости
                </span>
              </h1>
              <a className="font-normal mt-11 text-lg max-md:mt-10 max-md:max-w-full">
                Благодаря алгоритмам AI точная оценка стоимости вашей
                недвижимости займет не более 5 минут
              </a>
            </div>
            <a href="#evaluation">
              <img
                loading="lazy"
                src={buttonImage}
                className="mt-36 max-w-full aspect-[4.76] w-[306px] max-md:mt-10"
                alt="Начать оценку"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col lg-ml-5 w-[33%] max-md:w-full">
          <img
            loading="lazy"
            src={heroImage}
            className="grow w-full aspect-[0.68] max-md:mt-10"
            alt="Недвижимость"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
