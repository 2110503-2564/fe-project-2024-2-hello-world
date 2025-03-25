import getUserProfile from "@/libs/getUserProfile"
import { useSession } from "next-auth/react"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"

export default async function getMe() {
    const session = useSession(authOptions)
    const userprofile = await getUserProfile(session.d)
    return (

        const session = use
        const userprofile = await getUserProfile
    )
}