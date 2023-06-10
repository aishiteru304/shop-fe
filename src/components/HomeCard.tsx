import React from "react";
import { Link } from "react-router-dom";

interface HomeCardProps {
    name: string;
    image: string;
    category: string;
    price: string;
    loading: string;
    id: string;
}

const HomeCard: React.FC<HomeCardProps> = ({ name, image, category, price, loading, id }) => {
    return (
        <div className="bg-white shadow-md p-2 rounded min-w-[160px]">
            {name ? (
                <>
                    <Link to={`/menu/${id}`} >
                        <div className="w-40 h-[160px]">
                            <img src={image} className="h-full w-full" alt="" />
                        </div>
                        <h3 className="font-semibold text-slate-600 text-center capitalize text-lg">
                            {name}
                        </h3>
                        <p className="text-center text-slate-500  font-medium">{category}</p>
                        <p className="text-center font-bold">
                            <span>{price}k{' '}</span>
                            <span className="text-red-500">VND</span>
                        </p>
                    </Link>
                </>
            ) : (
                <div className="flex justify-center items-center h-full min-w-[150px]">
                    <p>{loading}</p>
                </div>
            )}
        </div>
    );
};

export default HomeCard;