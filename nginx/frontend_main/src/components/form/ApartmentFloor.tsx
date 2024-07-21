import React from "react";

interface ApartmentFloorProps {
  count: number;
  onCountChange: (count: number) => void;
  permissionForNextStep: (isAllow: boolean) => void;
}

const validator = (value: number): boolean => {
    return value >= -1 && value <= 100;
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

const RoomCount: React.FC<ApartmentFloorProps> = ({ count, onCountChange, permissionForNextStep }) => {
  return (
    <>
      <div className="text-4xl font-bold text-white max-md:max-w-full leading-none">
        <span className="font-mabry leading-none">этаж квартиры</span>
      </div>
      <div className="flex gap-5 justify-between items-start px-7 py-5 mt-4 text-center whitespace-nowrap rounded-3xl bg-zinc-300 w-full max-md:flex-wrap max-md:px-5">
        <input
          type="number"
          value={count}
          onChange={(e) => onCountChange(changeValue(e, permissionForNextStep))}
          className="bg-zinc-300 text-black text-opacity-100 outline-none"
        />
      </div>
    </>
  );
};

export default RoomCount;
