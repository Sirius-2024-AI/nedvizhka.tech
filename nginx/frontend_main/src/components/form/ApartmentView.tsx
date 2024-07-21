import React from "react";

interface ApartmentViewProps {
  type: string;
  onTypeChange: (type: string) => void;
    permissionForNextStep: (isAllow: boolean) => void;
}

const validator = (value: string): boolean => {
    return value === 'yard' ||
        value === 'street' ||
        value === 'mixed';
}

const changeValue = (e: React.ChangeEvent<HTMLSelectElement>, permissionForNextStep: (isAllow: boolean) => void): string => {
    const value = String(e.target.value);
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

const ApartmentView: React.FC<ApartmentViewProps> = ({
  type,
  onTypeChange,
    permissionForNextStep
}) => {
  return (
    <>
      <div className="text-4xl font-bold text-white max-md:max-w-full leading-none">
        <span className="font-mabry leading-none">окна в квартире</span>
      </div>
      <div className="flex gap-5 justify-between items-start px-7 py-5 mt-4 max-w-full text-center whitespace-nowrap rounded-3xl bg-zinc-300 w-[558px] max-md:flex-wrap max-md:px-5">
        <select
          value={type}
          onChange={(e) => onTypeChange(changeValue(e, permissionForNextStep))}
          className="bg-zinc-300 text-black text-opacity-100 outline-none"
        >
          <option value="">Выберите тип</option>
          <option value="yard">Во двор</option>
          <option value="street">На улицу</option>
          <option value="mixed">Во двор и на улицу</option>
        </select>
      </div>
    </>
  );
};

export default ApartmentView;
