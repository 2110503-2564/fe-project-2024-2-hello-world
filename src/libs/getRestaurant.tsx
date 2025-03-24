export default async function getRestaurant(id:string) {
    const response = await fetch(`http://localhost:5003/api/restaurants/${id}`);
    if(!response.ok) {
        throw new Error("Failed to fetch restaurants")
    }

    return await response.json()
}