import React from "react";

interface FeatureCardProps {
  title: React.ReactNode;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col grow px-8 pt-10 pb-10 w-full text-white bg-white bg-opacity-10 rounded-[30px] max-md:px-5 max-md:mt-10">
      <h3 className="leading-none text-4xl font-mabry">{title}</h3>
      <p className="mt-3 text-lg">{description}</p>
    </div>
  );
};

export default FeatureCard;
