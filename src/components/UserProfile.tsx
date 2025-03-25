'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import getUserProfile from '../libs/getUserProfile'

export default function UserProfile() {
  const { data: session, status } = useSession()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      const token = session.user?.token;
      if (token) {
        const fetchUserProfile = async () => {
          try {
            setLoading(true);
            const profileData = await getUserProfile(token);
            console.log(profileData);
  
            if (profileData && profileData.data) {
              setUserProfile(profileData.data); 
            } else {
              setError("No profile data found.");
            }
          } catch (err: any) {
            setError(`Failed to load user profile: ${err.message || 'Unknown error'}`);
          } finally {
            setLoading(false);
          }
        }
        fetchUserProfile();
      } else {
        setError("Token is missing in session.");
      }
    }
  }, [session, status]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gray-100 px-6 py-8">
      {loading ? (
        <div className="text-gray-700 text-xl font-semibold animate-pulse">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-lg font-medium">{error}</div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">User Profile</h2>
          {userProfile ? (
            <div className="w-full space-y-4">
              <p className="text-lg text-gray-700"><strong>Name:</strong> {userProfile.name || 'No name available'}</p>
              <p className="text-lg text-gray-700"><strong>Email:</strong> {userProfile.email || 'No email available'}</p>
              <p className="text-lg text-gray-700"><strong>Phone:</strong> {userProfile.phone || 'No phone available'}</p>
            </div>
          ) : (
            <p className="text-lg text-gray-500">No profile data available</p>
          )}
          <button
            className="mt-6 px-6 py-2 rounded-lg text-white bg-gray-800 hover:bg-gray-700 text-lg font-semibold transition duration-300 ease-in-out shadow-md transform hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              router.push("/");
            }}
          >
            Home
          </button>
        </div>
      )}
    </div>
  )
}
