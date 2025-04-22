import React, { useEffect, useState } from 'react'
import './Filter.css'
import CardOne from '../cardone/CardOne'
import axios from 'axios'
import { HiOutlineMenu } from "react-icons/hi";
import { BiSolidExit } from "react-icons/bi";

import { useNavigate } from 'react-router-dom'

const Filter = () => {
    const [product, setProduct] = useState([]);
    const [fillProduct, setFillProduct] = useState([]);
    const [selectfill, setSelectFill] = useState([]);
    const [open, setOpen] = useState(true);

    const openAndClose = (e) => {
        setOpen(!open)
    }

    const navigate = useNavigate();

    const getProductdata = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/allproduct")
            console.log("Received data:", res.data);
            if (res.status === 200 || res.status === 201) {
                const productData = res.data.data || res.data;
                setProduct(productData)
                setFillProduct(productData)
            }
        } catch (error) {
            console.log("Server Side Error While Fetching Data from Backend", error)
        }
    }

    useEffect(() => {
        getProductdata();
    }, [])

    const priceRanges = [
        { id: "high", label: "High ", min: 100, max: Infinity },
        { id: "medium", label: "Medium ", min: 50, max: 100 },
        { id: "low", label: "Low ", min: 0, max: 50 }
    ];


    const handleCheckboxChang = (fillid) => {
        const upadtedFill = selectfill.includes(fillid) ? selectfill.filter(id => id !== fillid) : [...selectfill, fillid]

        setSelectFill(upadtedFill)
    }


    useEffect(() => {
        if (selectfill.length === 0) {
            setFillProduct(product)
        } else {
            const filtered = product.filter(item => selectfill.some(fillid => {
                const range = priceRanges.find(range => range.id === fillid)
                return item.product_price >= range.min && item.product_price < range.max;
            }))

            setFillProduct(filtered)
        }
    }, [selectfill, product])


    return (
        <div className='Filter-container'>
            {
                open ? (<div className='leftSide-Filter'>
                    <h1>Shorting <p onClick={openAndClose}><BiSolidExit /></p></h1>
                    <div className="insideLeft-wrapper">

                        {
                            priceRanges.map((range) => (
                                <div className="select-product" key={range.id}>
                                    <input type="checkbox"
                                        id={`checkbox-${range.id}`}
                                        onChange={() => handleCheckboxChang(range.id)}
                                        checked={selectfill.includes(range.id)}
                                    />
                                    <label htmlFor={`checkbox-${range.id}`}>{range.label}</label>
                                </div>
                            ))
                        }



                    </div>
                </div>) : (<p><HiOutlineMenu className='showFillter-icon' onClick={openAndClose} />
                </p>)
            }


            <div className="rightSide-Filter">
                <div className="inside-rightSide-Filter">
                    {
                        fillProduct.length > 0 ? (
                            fillProduct.map((item) => (
                                <CardOne
                                    key={item._id}
                                    good_id={item._id}
                                    good_name={item.product_name}
                                    good_price={item.product_price}

                                />
                            ))) : (
                            <p>data not found</p>
                        )
                    }
                </div>
            </div>


        </div >
    )
}

export default Filter