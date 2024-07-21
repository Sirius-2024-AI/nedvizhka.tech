import React from "react";

interface ThankYouMessageProps {
  title: string;
  message: string;
}

const ThankYouMessage: React.FC<ThankYouMessageProps> = ({
  title,
  message,
}) => {
  return (
    <main className="flex flex-col mt-9 w-full bg-white bg-opacity-10 max-w-[1026px] rounded-[30px] px-9 py-10 max-md:px-5 max-md:py-10">
      <section className="flex flex-col items-center mt-12 max-w-full w-full mb-12">
        <h1 className="text-4xl font-mabry text-center">
          {title}
        </h1>
        <p className="mt-5 text-lg text-center max-md:mt-4">
          {message}
        </p>
      </section>
    </main>
  );
};

export default ThankYouMessage;
