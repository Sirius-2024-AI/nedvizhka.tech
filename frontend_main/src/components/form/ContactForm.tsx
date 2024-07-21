import React from 'react';

interface ContactFormProps {
    formData: { surname: string; name: string; phone: string; email: string };
    onFormDataChange: (data: { surname: string; name: string; phone: string; email: string }) => void;
    onSubmit: (data: { surname: string; name: string; phone: string; email: string }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ formData, onFormDataChange, onSubmit }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onFormDataChange({
            ...formData,
            [name]: value,
        });
    };

  return (
    <form>
      <h2 className="font-mabry text-4xl font-bold text-white max-md:max-w-full leading-none">
        оставьте ваши контактные данные
      </h2>
      <div className="flex gap-4 mt-5 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col flex-1 grow shrink-0 justify-center basis-0 w-fit max-md:max-w-full">
          <label htmlFor="firstName" className="sr-only">
            Имя
          </label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            className="justify-center items-start px-7 py-5 rounded-3xl bg-zinc-300 text-black text-opacity-100 max-md:px-5 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col flex-1 grow shrink-0 justify-center basis-0 w-fit max-md:max-w-full">
          <label htmlFor="lastName" className="sr-only">
            Фамилия
          </label>
          <input
            type="surname"
            id="surname"
            name="surname"
            placeholder="Фамилия"
            value={formData.surname}
            onChange={handleChange}
            className="justify-center items-start px-7 py-5 rounded-3xl bg-zinc-300 text-black text-opacity-100 max-md:px-5 max-md:max-w-full"
          />
        </div>
      </div>
      <div className="flex gap-4 mt-4 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col flex-1 grow shrink-0 justify-center basis-0 w-fit max-md:max-w-full">
          <label htmlFor="phoneNumber" className="sr-only">
            Номер телефона
          </label>
          <input
            type="phone"
            id="phone"
            name="phone"
            placeholder="Номер телефона"
            value={formData.phone}
            onChange={handleChange}
            className="justify-center items-start px-7 py-5 rounded-3xl bg-zinc-300 text-black text-opacity-100 max-md:px-5 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col flex-1 grow shrink-0 justify-center basis-0 w-fit max-md:max-w-full">
          <label htmlFor="email" className="sr-only">
            Электронная почта<sup className="text-red-500">*</sup>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Электронная почта*"
            value={formData.email}
            onChange={handleChange}
            className="justify-center items-start px-7 py-5 rounded-3xl bg-zinc-300 text-black text-opacity-100 max-md:px-5 max-md:max-w-full"
          />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
