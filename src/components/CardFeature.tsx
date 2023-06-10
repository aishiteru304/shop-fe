import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { AiFillCloseSquare } from 'react-icons/ai'
import { RootState } from "../redux";

interface CardFeatureProps {
    image: string;
    name: string;
    price: string;
    category: string;
    loading: string;
    id: string;
    showButton: boolean;
    showButtonClose: boolean;
}

const CardFeature: React.FC<CardFeatureProps> = ({ image, name, price, category, loading, id, showButton, showButtonClose }) => {
    const userData = useSelector((state: RootState) => state.user)
    const cartData = useSelector((state: RootState) => state.cart.cartItem)
    const userCart = cartData.filter((el) => el.email === userData.email);

    const handleAddCartProduct = () => {
        const check = (userCart.find(item => item.idProduct === id))
        if (!check) {

            const data = { image, price, category, idProduct: id, email: userData.email, name }
            axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}addToCart`, { data })
                .then(res => {
                    toast(res.data.message)
                    const cartNumberElement = document.getElementById("cartNumber");
                    if (cartNumberElement) {
                        const currentValue = parseInt(cartNumberElement.innerHTML)
                        cartNumberElement.innerHTML = (currentValue + 1).toString()
                    }
                })
                .catch(() => toast("Please try add again"))
        }
        else toast("Already item in Cart")
    }

    const handeRemoveProduct = () => {
        const data = { id }
        axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}removeProduct`, { data })
            .then(res => {
                toast(res.data.message)
                setTimeout(() => {
                    window.location.href = '/'
                }, 1000)
            })
            .catch(() => toast("Please try remove again"))
    }

    return (
        <div className="w-[200px] min-w-[200px] bg-white hover:shadow-lg drop-shadow-lg pt-[48px] pb-[24px] px-[24px] cursor-pointer flex flex-col rounded-md h-max select-none relative">
            {image ? (
                <>
                    <Link
                        to={`/menu/${id}`}
                    >
                        <div className="h-28 flex flex-col justify-center items-center">
                            <img src={image} className="h-full" alt='' />
                        </div>
                        <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
                            {name}
                        </h3>
                        <p className=" text-slate-500  font-medium">{category}</p>
                        <p className=" font-bold">
                            <span>{price}k{' '}</span>
                            <span className="text-red-500">VND</span>
                        </p>
                    </Link>
                    <button
                        className={`bg-yellow-500 py-1 mt-4 rounded hover:bg-yellow-600 w-full ${!showButton && 'hidden'}`}
                        onClick={handleAddCartProduct}
                    >
                        Add Cart
                    </button>
                    <button onClick={handeRemoveProduct} className={`flex items-center justify-center bg-yellow-500 h-8 w-8 text-black text-lg top-0 right-0 absolute hover:bg-yellow-600 ${!showButtonClose && 'hidden'}`}>
                        <AiFillCloseSquare />
                    </button>
                </>
            ) : (
                <div className="min-h-[150px] flex justify-center items-center">
                    <p>{loading}</p>
                </div>
            )}
        </div>
    );
};

export default CardFeature;