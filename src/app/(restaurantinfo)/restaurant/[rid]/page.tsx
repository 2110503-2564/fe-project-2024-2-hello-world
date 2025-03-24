import Image from "next/image";
import getRestaurant from "@/libs/getRestaurant";
import Link from "next/link";

export default async function RestaurantDetailPage({ params }: { params: { rid: string } }) {
    const restaurantDetail = await getRestaurant(params.rid);

    return (
        <main className="flex flex-col items-center p-8 text-gray-900 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">{restaurantDetail.data.name}</h1>
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-4xl">
                <div className="w-full md:w-1/3">
                    <Image 
                        src={restaurantDetail.data.picture} 
                        alt='Restaurant image' 
                        width={500} 
                        height={500} 
                        className="object-cover w-full h-full" 
                    />
                </div>
                <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                        <p className="text-lg font-medium text-gray-700">{restaurantDetail.data.name}</p>
                        <p className="text-sm text-gray-500">{restaurantDetail.data.address}</p>
                        <p className="text-sm text-gray-500">Phone: {restaurantDetail.data.phone}</p>
                        <p className="text-sm text-gray-500">Open: {restaurantDetail.data.open_time} - {restaurantDetail.data.close_time}</p>
                    </div>
                    <div className="mt-4">
                        <Link href={`/booking?id=${params.rid}&restaurant=${restaurantDetail.data.name}`}>
                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition shadow-md">
                                Make Reservation
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}