import Link from "next/link";
import Card from "./Card";

export default async function RestaurantCatalog({ restaurantJson }: {restaurantJson:Object}) {
    const restaurantJsonReady = await restaurantJson
    return (
        <>
        <div className="text-black">Explore { restaurantJson.count } restaurants in our catalog</div>
        <div style={{ margin: "20px", display: "flex", flexDirection: "row", justifyContent: "space-around", alignContent: "space-around", flexWrap: "wrap", padding: "10px" }}>
                {
                    restaurantJsonReady.data.map((restaurantItem:object) => (
                        <Link href={`/restaurant/${restaurantItem.id}`} className="w-1/5">
                            <Card restaurantName={restaurantItem.name} imgSrc={restaurantItem.picture}/>
                        </Link>
                    ))
                }

        </div>
        </>
    )
}