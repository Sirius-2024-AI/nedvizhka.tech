import React, { useState } from "react";
import ThankYouMessage from "./ThankYouMessage.tsx";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    url: "",
    consent: false,
    marketing: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.consent || !formData.marketing) {
      alert("Пожалуйста, дайте разрешение на рассылку сообщений и на обработку данных");
      return;
    }
    console.log(formData);
    fetch('https://api.nedvizhka.tech/api/business/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        phone_number: formData.phone,
        email: formData.email,
        organization: formData.company,
        organization_url: formData.url,
        marketing: formData.marketing
      })
    }).then(response => {
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Ошибка при отправке формы. Пожалуйста, попробуйте еще раз.");
      }
    }).catch(error => {
      alert("Ошибка при отправке формы. Пожалуйста, попробуйте еще раз.");
    });
  };

  return (
    submitted ? (
      <ThankYouMessage
        title="спасибо, ваша форма отправлена!"
        message="Мы уже приняли вашу заявку в обработку и скоро пришлем всю информацию на вашу электронную почту"
      />
    ) : (
      <form
        className="flex flex-col px-9 py-10 mt-9 w-full bg-white bg-opacity-10 max-w-[1026px] rounded-[30px]"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="sr-only">
          Как к вам обращаться?
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Как к вам обращаться?"
          className="justify-center items-start px-6 py-4 text-lg rounded-3xl bg-white bg-opacity-10 text-white text-opacity-20"
        />
        <div className="flex gap-5 mt-6 text-lg max-md:flex-wrap max-md:max-w-full">
          <label htmlFor="phone" className="sr-only">
            Номер телефона
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Номер телефона"
            className="grow justify-center items-start px-6 py-4 rounded-3xl bg-white bg-opacity-10 text-white text-opacity-20 w-fit max-md:px-5 max-md:max-w-full"
          />
          <label htmlFor="email" className="sr-only">
            Электронная почта
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Электронная почта"
            className="grow justify-center items-start px-6 py-4 rounded-3xl bg-white bg-opacity-10 text-white text-opacity-20 w-fit max-md:px-5 max-md:max-w-full"
          />
        </div>
        <div className="flex gap-5 mt-6 text-lg text-white text-opacity-20 max-md:flex-wrap max-md:max-w-full">
          <label htmlFor="company" className="sr-only">
            Какую компанию вы представляете?
          </label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Какую компанию вы представляете?"
            className="grow justify-center items-start px-6 py-4 rounded-3xl bg-white bg-opacity-10 w-fit max-md:px-5 max-md:max-w-full"
          />
          <label htmlFor="url" className="sr-only">
            Укажите URL вашей компании
          </label>
          <input
            id="url"
            type="text"
            value={formData.url}
            onChange={handleChange}
            placeholder="Укажите URL вашей компании"
            className="grow justify-center items-start px-6 py-4 rounded-3xl bg-white bg-opacity-10 w-fit max-md:px-5 max-md:max-w-full"
          />
        </div>
        <div className="flex gap-0 mt-6 text-white max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col grow shrink-0 my-auto text-base basis-1/2 w-full max-md:w-full">
            <div className="flex gap-3 max-md:flex-wrap">
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="shrink-0 self-start aspect-square w-[15px]"
              />
              <label htmlFor="consent" className="flex-auto max-md:max-w-full">
                Даю согласие на обработку персональных данных
              </label>
            </div>
            <div className="flex gap-3 mt-1.5 max-md:flex-wrap">
              <input
                type="checkbox"
                id="marketing"
                checked={formData.marketing}
                onChange={handleChange}
                className="shrink-0 self-start rounded border-2 border-white border-solid h-[15px] w-[15px]"
              />
              <label htmlFor="marketing" className="flex-auto max-md:max-w-full">
                Подтверждаю получение рекламных и иных сообщений
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="grow justify-center items-center px-16 py-4 text-lg text-center rounded-3xl w-fit max-md:w-full basis-1/2 bg-gradient-to-r from-[#0DB6B6] to-50% to-[#5454F1]"
          >
            Получить доступ
          </button>
        </div>
      </form>
    )
  );
};

export default RegistrationForm;