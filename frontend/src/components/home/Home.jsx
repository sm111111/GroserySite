import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import CardOne from '../cardone/CardOne'
import BigCard from '../bigcard/BigCard'
import SmallCard from '../smallcard/SmallCard'
import pinapple from '../assets/img/pinapple.png'
import salad from '../assets/img/salad.png'

const Home = () => {
    const [homeInfo, setHomeInfo] = useState([]);

    const datafetch = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/allproduct');
            console.log("Received data:", res.data);
            if (res.status === 200 || res.status === 201) {
                setHomeInfo(res.data.data);
            }
        } catch (error) {
            console.error('Internal Server Error', error);
        }
    };

    useEffect(() => {
        datafetch();
    }, []);

    return (
        <div className='Home-container'>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <section><BigCard big_img={pinapple} /></section>


            <section className=''>
                {
                    homeInfo.length > 0 ? (
                        homeInfo.slice(0, 8).map((item) => (  // <-- Use slice instead of splice
                            <CardOne
                                key={item._id}
                                good_id={item._id}
                                good_name={item.product_name}
                                good_price={item.product_price}
                            />
                        ))
                    ) : (
                        <span>Data not found</span>
                    )
                }
            </section>




            <section>
                {
                    homeInfo.length > 0 ? (
                        [...homeInfo]
                            .sort(() => Math.random() - 0.5)
                            .map((items) => (
                                <SmallCard
                                    key={items._id}
                                    smallcard_id={items._id}
                                    smallcard_name={items.product_name}
                                    smallcard_price={items.product_price}
                                />
                            ))

                    ) : (
                        <span>data not found</span>
                    )
                }
            </section>

            <section><BigCard big_img={salad} /></section>
        </div >
    );
}

export default Home;
