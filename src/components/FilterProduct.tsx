import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

interface FilterProductProps {
    category: string;
    onClick: () => void;
    isActive: boolean;
}

const FilterProduct: React.FC<FilterProductProps> = ({ category, onClick, isActive }) => {
    return (
        <div onClick={onClick}>
            <div className={`text-3xl p-5  rounded-full cursor-pointer md:w-[120px] w-[80px] md:h-[120px] h-[80px] flex items-center justify-center ${isActive ? "bg-red-600 text-white" : "bg-yellow-500"}`}>
                <CiForkAndKnife />
            </div>
            <p className="text-center font-medium my-1 capitalize">{category}</p>
        </div>
    );
};

export default FilterProduct;