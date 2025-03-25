export default async function deleteBooking(token:string, bookingId:string) {
    if (!bookingId || bookingId === "undefined") {
        console.log(bookingId);
        throw new Error("Invalid booking ID ");
    }
 
    const response = await fetch(`http://localhost:5003/api/reservations/${bookingId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    if(!response.ok) {
        throw new Error("Failed to fetch reservation")
    }

    return await response.json()
}