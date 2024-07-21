import React from "react";

interface ApartmentYearProps {
  size: number;
  onSizeChange: (size: number) => void;
  permissionForNextStep: (isAllow: boolean) => void;
}

const validator = (value: number): boolean => {
    return value > 1500 && value <= 2030;
}

const changeValue = (e: React.ChangeEvent<HTMLInputElement>, permissionForNextStep: (isAllow: boolean) => void): number => {
    const value = Number(e.target.value);
    if (validator(value)) {
        e.currentTarget.classList.remove("text-red-500");
        permissionForNextStep(true);
        return value;
    } else {
        e.currentTarget.classList.add("text-red-500");
        permissionForNextStep(false);
        return value;
    }
}

const ApartmentYear: React.FC<ApartmentYearProps> = ({ size, onSizeChange, permissionForNextStep }) => {
  return (
    <>
      <div className="text-4xl font-bold text-white max-md:max-w-full leading-none">
        <span className="font-mabry leading-none">год постройки дома</span>
      </div>
      <div className="flex gap-5 justify-between items-start px-7 py-5 mt-4 max-w-full text-center whitespace-nowrap rounded-3xl bg-zinc-300 w-[558px] max-md:flex-wrap max-md:px-5">
        <input
          type="number"
          value={size}
          onChange={(e) => onSizeChange(changeValue(e, permissionForNextStep))}
          className="bg-zinc-300 text-black text-opacity-100 outline-none"
        />
        <div className="font-inter font-bold text-black">г.</div>
      </div>
    </>
  );
};

export default ApartmentYear;
