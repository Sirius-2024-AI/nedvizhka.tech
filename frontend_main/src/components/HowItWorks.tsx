import React from "react";

interface HowItWorksProps {
  apartmentImage: string;
  reportImages: string[];
}

const HowItWorks: React.FC<HowItWorksProps> = ({
  apartmentImage,
  reportImages,
}) => {
  return (
    <section
      id="how-it-works"
      className="px-5 mt-20 w-full max-w-[1025px] max-md:mt-10 max-md:max-w-full"
    >
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
          <h2 className="sticky top-0 text-6xl font-bold text-white max-md:mt-10 max-md:text-4.2xl">
            <span className="font-mabry">как это работает?</span>
          </h2>
        </div>
        <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-between max-md:mt-10 max-md:max-w-full">
            <div className="sticky top-0 flex flex-col px-8 py-10 bg-dark-gray rounded-[30px] max-md:pl-5 max-md:max-w-full">
              <h3 className="text-4xl font-bold text-white max-md:max-w-full">
              <span className="font-mabry bg-gradient-to-r from-[#0DB6B6] to-[#5454F1] inline-block text-transparent bg-clip-text">заполнение заявки</span>
              </h3>
              <p className="mt-4 mr-9 text-lg font-medium text-white max-md:mr-2.5 max-md:max-w-full">
                Прикрепите на сайт информацию о вашей квартире по простым
                критериям
              </p>
              <div className="flex flex-col justify-center self-center mt-5 max-w-full w-[450px]">
                <img
                  loading="lazy"
                  src={apartmentImage}
                  className="w-full aspect-[2.33] max-md:max-w-full"
                  alt="Пример квартиры"
                />
              </div>
              <h4 className="mt-5 text-lg font-bold text-white max-md:max-w-full">
                2-комн. квартира, 83,43 м² в ЖК «Мифы»
              </h4>
              <div className="hidden mt-1.5 max-md:max-w-full lg:block">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow text-lg font-medium text-white max-md:mt-6">
                      <div>Тип жилья</div>
                      <div className="mt-2">Площадь</div>
                      <div className="mt-2">Жил. площадь</div>
                      <div className="mt-2">Площадь кухни</div>
                      <div className="mt-2">Отделка</div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow text-lg text-white max-md:mt-5">
                      <div className="flex gap-5 justify-between w-full">
                        <div className="flex gap-5 justify-between">
                          <div className="flex flex-col font-bold whitespace-nowrap">
                            <div>Новостройка</div>
                            <div className="mt-2">83,43</div>
                            <div className="mt-2">30,6</div>
                          </div>
                          <div className="flex flex-col self-start font-medium">
                            <div>Количество лифтов</div>
                            <div className="mt-2.5">Тип дома</div>
                          </div>
                        </div>
                        <div className="flex flex-col self-start font-bold">
                          <div className="-mb-1">9 грузовых</div>
                          <div className="mt-4">Монолитный</div>
                        </div>
                      </div>
                      <div className="mt-2 font-bold">12,4</div>
                      <div className="mt-2 font-bold">Без отделки</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sticky top-0 flex flex-col px-8 py-10 text-4xl font-bold text-white bg-dark-gray rounded-[30px] max-md:px-5 max-md:max-w-full">
              <h3 className="max-md:max-w-full">
                <span className="font-mabry">
                <span className="font-mabry bg-gradient-to-r from-[#0DB6B6] to-[#5454F1] inline-block text-transparent bg-clip-text">искусственный интеллект</span> обрабатывает данные
                </span>
              </h3>
              <p className="mt-3 text-lg font-medium max-md:max-w-full">
                Система собирает данные о городе, районе, площади, этаже,
                количестве комнат, типе дома, годе постройки дома и о других
                параметрах, и определяет оценочную стоимость квартиры.
              </p>
            </div>
            <div className="sticky top-0 flex flex-col px-8 py-9 bg-dark-gray rounded-[30px] max-md:px-5 max-md:max-w-full">
              <h3 className="flex flex-row gap-2.5 mr-auto text-4xl font-bold text-white">
                <span className="font-mabry">система формирует <span className="font-mabry bg-gradient-to-r from-[#0DB6B6] to-[#5454F1] inline-block text-transparent bg-clip-text">отчёт</span></span>
              </h3>
              <p className="mt-2.5 text-lg font-medium text-white max-md:max-w-full">
                Отчет об оценке недвижимости является документом, представляющим
                собой официальное заключение о стоимости объекта недвижимости на
                определенную дату
              </p>
              <div className="mt-3 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  {reportImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
                    >
                      <img
                        loading="lazy"
                        src={image}
                        className="grow shrink-0 max-w-full aspect-[1.69] w-[170px] max-md:mt-2"
                        alt={`Отчет ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
