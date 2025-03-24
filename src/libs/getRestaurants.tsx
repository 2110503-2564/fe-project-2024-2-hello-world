export default async function getRestaurants() {
    await new Promise ( (resolve)=>setTimeout(resolve, 1000))
    const response = await fetch("http://localhost:5003/api/restaurants", { next: {tags:['restaurants']}});
    if(!response.ok) {
        throw new Error("Failed to fetch restaurants")
    }

    return await response.json()
}