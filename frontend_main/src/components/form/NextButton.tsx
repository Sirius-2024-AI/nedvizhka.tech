import React from "react";

interface NextButtonProps {
  onClick: () => void;
  isLastStep: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick, isLastStep }) => {
  return (
    <div className="flex flex-col justify-center rounded-[300px] h-14 opacity-70% bg-gradient-to-r from-[#0DB6B6] to-50% to-[#5454F1] self-end mt-60 max-w-full font-semibold text-center text-white w-[251px] max-md:mt-10">
      <button
        onClick={onClick}
        className="justify-center px-16 py-4 max-md:px-5 font-semibold"
      >
          {isLastStep ? "Далее" : "Далее"}
      </button>
    </div>
  );
};

export default NextButton;
