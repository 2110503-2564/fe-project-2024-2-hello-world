import Image from "next/image";
import getRestaurant from "@/libs/getRestaurant";
import Link from "next/link";

export default async function RestaurantDetailPage({ params }: { params: { rid: string } }) {

    const restaurantDetail = await getRestaurant(params.rid);

    return (
        <main className="text-black bg-gray-50 min-h-screen flex flex-col items-center justify-center py-10">
            {/* Restaurant Name */}
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">{restaurantDetail.data.name}</h1>
            
            {/* Restaurant Image */}
            <div className="relative w-[80%] md:w-[50%] mb-6 rounded-lg overflow-hidden">
                <Image
                    src={restaurantDetail.data.picture}
                    alt={`${restaurantDetail.data.name} image`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Restaurant Info */}
            <div className="w-full md:w-[60%] p-4 bg-white rounded-lg shadow-lg space-y-4">
                <div className="text-lg text-gray-600 font-medium">Address: <div>{restaurantDetail.data.address}</div></div>
                
                <div className="text-lg text-gray-600 font-medium">Phone: <div>{restaurantDetail.data.phone}</div></div>

                <div className="text-lg text-gray-600 font-medium">Open Time: <div>{restaurantDetail.data.open_time}</div></div>

                <div className="text-lg text-gray-600 font-medium">Close Time: <div>{restaurantDetail.data.close_time}</div></div>
            </div>
            
            {/* Make Reservation Button */}
            <Link href={`/booking?id=${params.rid}&restaurant=${restaurantDetail.data.name}`}>
                <button className="mt-8 py-3 px-6 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition-all duration-300">
                    Make Reservation
                </button>
            </Link>
        </main>
    );
}