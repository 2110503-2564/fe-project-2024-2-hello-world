export default async function userRegister(userName: string, userPhone: string, userEmail: string, userPassword: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: userName,
            phone: userPhone,
            email: userEmail,
            password: userPassword
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to register");
    }

    return await response.json();
}
