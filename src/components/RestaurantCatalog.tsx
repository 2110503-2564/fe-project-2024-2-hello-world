import Link from "next/link";
import Card from "./Card";

export default async function RestaurantCatalog({ restaurantJson }: { restaurantJson: Object }) {
    const restaurantJsonReady = await restaurantJson;

    return (
        <>
            <div className="text-black text-xl font-semibold mb-5 py-5">
                Explore {restaurantJsonReady.count} restaurants in our catalog
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6 px-4 py-5">
                {
                    restaurantJsonReady.data.map((restaurantItem: any) => (
                        <Link href={`/restaurant/${restaurantItem.id}`} key={restaurantItem.id}>
                            <div className="w-full">
                                <Card restaurantName={restaurantItem.name} imgSrc={restaurantItem.picture} />
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    );
}