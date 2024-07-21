import React from "react";

interface MaterialTypeProps {
  type: string;
  onTypeChange: (type: string) => void;
  permissionForNextStep: (isAllow: boolean) => void;
}

const validator = (value: string): boolean => {
  return value === "monolithic" ||
         value === "block" ||
         value === "monolithic-brick" ||
         value === "panel" ||
         value === "brick" ||
         value === "wood" ||
         value === "old-fund" ||
         value === "stalinist";
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

const MaterialType: React.FC<MaterialTypeProps> = ({
  type,
  onTypeChange,
  permissionForNextStep
}) => {
  return (
    <>
      <div className="text-4xl font-bold text-white max-md:max-w-full leading-none">
        <span className="font-mabry leading-none">тип дома</span>
      </div>
      <div className="flex gap-5 justify-between items-start px-7 py-5 mt-4 max-w-full text-center whitespace-nowrap rounded-3xl bg-zinc-300 w-[558px] max-md:flex-wrap max-md:px-5">
        <select
          value={type}
          onChange={(e) => onTypeChange(changeValue(e, permissionForNextStep))}
          className="bg-zinc-300 text-black text-opacity-100 outline-none"
        >
          <option value="">Выберите тип</option>
          <option value="monolithic">Монолитный</option>
          <option value="block">Блочный</option>
          <option value="monolithic-brick">Монолитно-кирпичный</option>
          <option value="panel">Панельный</option>
          <option value="brick">Кирпичный</option>
          <option value="wood">Деревянный</option>
          <option value="old-fund">Старый фонд</option>
          <option value="stalinist">Сталинский</option>
        </select>
      </div>
    </>
  );
};

// "material_type": ["Монолитный", "Блочный", "Монолитно-кирпичный", "Панельный", "Кирпичный", "Деревянный", "Старый фонд", "Сталинский"],

export default MaterialType;
