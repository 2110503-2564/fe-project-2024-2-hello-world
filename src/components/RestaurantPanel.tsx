"use client"
import { useReducer, useState } from "react"
import Link from "next/link"
import { useRef, useEffect } from "react"
import getRestaurants from "@/libs/getRestaurants"
import Card from "./Card"

export default function RestaurantPanel() {
    const [restaurantResponse, setRestaurantResponse] = useState(null);
    useEffect(()=>{
        const fetchData = async () => {
            const restaurants = await getRestaurants()
            setRestaurantResponse(restaurants)
        }
        fetchData()
    }, [])

    if(!restaurantResponse) return (<p className="text-black">Car Panel is Loading ... </p>)
        return (
            <div>
                <div style={{ margin: "20px", display: "flex", flexDirection: "row", justifyContent: "space-around", alignContent: "space-around", flexWrap: "wrap", padding: "10px" }}>
                    {
                        restaurantResponse.data.map((restaurantItem:object) => (
                            <Link href={`/venue/${restaurantItem.id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8">
                                <Card venueName={restaurantItem.name} imgSrc={restaurantItem.picture}/>
                            </Link>
                        ))
                    }
    
                </div>
            </div>
        );
}