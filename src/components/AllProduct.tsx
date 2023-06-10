import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import { RootState } from "../redux";
import { productInfo } from "../redux/productSlice";

interface AllProductsProps {
    heading: string
}

const AllProduct: React.FC<AllProductsProps> = ({ heading }) => {

    //Set show button add card
    const userData = useSelector((state: RootState) => state.user)


    const productData = useSelector((state: RootState) => state.product.productList);
    const categoryList = Array.from(new Set(productData.map((el) => el.category)));


    //filter data display
    const [filterby, setFilterBy] = useState("");
    const [dataFilter, setDataFilter] = useState<productInfo[]>([]);

    useEffect(() => {
        setDataFilter(productData);
    }, [productData]);

    const handleFilterProduct = (category: string) => {
        setFilterBy(category)
        const filter = productData.filter(
            (el) => el.category.toLowerCase() === category.toLowerCase()
        );
        setDataFilter(() => {
            return [...filter];
        });
    };

    const loadingArrayFeature = new Array(10).fill(null);

    //Phần slide catelogy
    const slideCatelogyRef = useRef<HTMLDivElement>(null);
    const [xDown, setXDown] = useState<number>(0)

    const nextCatelogy = () => {
        if (slideCatelogyRef.current)
            slideCatelogyRef.current.scrollLeft += 200;
    };
    const preveCatelogy = () => {
        if (slideCatelogyRef.current)
            slideCatelogyRef.current.scrollLeft -= 200;
    };
    const handleDown = (e: MouseEvent<HTMLDivElement>) => {
        setXDown(e.clientX)
    }
    const handleUp = (e: MouseEvent<HTMLDivElement>) => {
        if (e.clientX < xDown) nextCatelogy()
        else preveCatelogy()
    }

    return (
        <div className="my-5">
            <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

            <div className="flex gap-4 sm:justify-center scroll-smooth transition-all overflow-hidden select-none justify-start" ref={slideCatelogyRef}
                onMouseDown={e => handleDown(e)}
                onMouseUp={e => handleUp(e)}
            >
                {categoryList[0] ? (
                    categoryList.map((el) => {
                        return (
                            <FilterProduct
                                category={el}
                                key={el}
                                isActive={el.toLowerCase() === filterby.toLowerCase()}
                                onClick={() => handleFilterProduct(el)}
                            />
                        );
                    })
                ) : (
                    <div className="min-h-[150px] flex justify-center items-center">
                        <p>Loading...</p>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 my-4">
                {dataFilter[0]
                    ? dataFilter.map((el) => {
                        return (
                            <CardFeature
                                key={el._id}
                                id={el._id}
                                image={el.image}
                                name={el.name}
                                category={el.category}
                                price={el.price}
                                showButton={userData._id !== ''}
                                showButtonClose={userData.email === process.env.REACT_APP_USER_ADMIN}
                                loading=""
                            />
                        );
                    })
                    :
                    loadingArrayFeature.map((el, index) => (
                        <CardFeature loading="Loading..." key={index + "allProduct"}
                            id={""}
                            image={""}
                            name={""}
                            category={""}
                            price={""}
                            showButton={false}
                            showButtonClose={false}
                        />
                    ))}
            </div>
        </div>
    );
};

export default AllProduct;