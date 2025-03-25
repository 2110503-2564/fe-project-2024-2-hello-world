export default async function addBooking(token:string, restaurantId:string, reserveDate:string) {
 
    const response = await fetch(`${process.env.BACKEND_URL}/api/restaurants/${restaurantId}/reservations`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            reserveDate: reserveDate
          }),
    });
    if(!response.ok) {
        throw new Error("Failed to add Booking")
    }

    return await response.json()
}