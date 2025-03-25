export default async function getBookings(token:string) {
 
    const response = await fetch("http://localhost:5003/api/reservations", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if(!response.ok) {
        throw new Error("Failed to fetch reservation")
    }

    return await response.json()
}