import getRestaurants from "@/libs/getRestaurants";
import RestaurantCatalog from "@/components/RestaurantCatalog";


export default async function Restaurant() {
    const restaurants = await getRestaurants()
    return(
        <main className="text-center p-5">
            <RestaurantCatalog restaurantJson={restaurants}></RestaurantCatalog>
        </main>
    )
}