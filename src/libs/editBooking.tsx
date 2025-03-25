export default async function editBooking(token:string, reservationId:string, reserveDate:string, restaurantId:string) {
 
    const response = await fetch(`${process.env.BACKEND_URL}/api/reservations/${reservationId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            reserveDate: reserveDate,
            restaurant: restaurantId
          }),
    });
    if(!response.ok) {
        throw new Error("Failed to update Booking")
    }

    return await response.json()
}