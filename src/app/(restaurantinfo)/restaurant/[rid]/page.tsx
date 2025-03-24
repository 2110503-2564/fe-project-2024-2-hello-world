import Image from "next/image";
import getRestaurant from "@/libs/getRestaurant";
import Link from "next/link";

export default async function RestaurantDetailPage({ params }: { params: { rid: string } }) {

    const restaurantDetail = await getRestaurant(params.rid)

    return (
        <main className="text-center p-5 text-black">
            <h1 className="text-lg font-medium">{restaurantDetail.data.name}</h1>
            <div>
                <Image src={restaurantDetail.data.picture}
                    alt='Restaurant image'
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%]">
                </Image>
                <div className="text-md mx-5 text-left" >{restaurantDetail.data.name}
                    <div className="text-md mx-5 text-left">Address: {restaurantDetail.data.address}</div>
                    <div className="text-md mx-5">Phone: {restaurantDetail.data.phone}</div>
                    <div className="text-md mx-5">Open time: {restaurantDetail.data.open_time}</div>
                    <div className="text-md mx-5">Close time: {restaurantDetail.data.close_time}</div>

                    <Link href={`/booking?id=${params.rid}&restaurant=${restaurantDetail.data.name}`}>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-m">
                        Make Reservation
                    </button>
                    </Link>

                    

                </div>
            </div>
        </main>
    )
}