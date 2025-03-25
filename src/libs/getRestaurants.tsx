export default async function getRestaurants() {
    await new Promise ( (resolve)=>setTimeout(resolve, 1000))
    const response = await fetch(`${process.env.BACKEND_URL}/api/restaurants`, { next: {tags:['restaurants']}});
    if(!response.ok) {
        throw new Error("Failed to fetch restaurants")
    }

    return await response.json()
}