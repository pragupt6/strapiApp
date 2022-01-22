
import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API_URL, NEXT_URL } from '@/config/index'
// import { NEXT_URL } from '@/config/index'

const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const router = useRouter()
    useEffect(() => checkUserLoggedIn(), [])


    const [user, setUser] = useState(null)
    let [error22, setError] = useState(null)

    const setLoggedUser = (user) => {
        setUser(user)
    }
    //login
    const login = async ({ username: identifier, password }) => {
        try {
            console.log(`Login called`)
            const res = await fetch(`${NEXT_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier,
                    password,
                }),
            })
            setError(null)

            console.log(res)
            const data = await res.json()
            console.log(data)

            if (res.ok) {
                setUser(data.user)
                setError(null)
                router.push('/')
            } else {
                setError(data.message)
                setError(null)
            }

        } catch (error) {

        }

    }

    // Register user
    const register = async ({ email, password, firstname, lastname, mobile }) => {


        console.log({ Username: email, Email: email, Password: password, Name: `${firstname} ${lastname}`, Mobile: mobile });
        // return false
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, email: email, password: password, Name: `${firstname} ${lastname}`, Mobile: mobile }),
        })

        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
            router.push('/')
        } else {
            setError(data.message)
            setError(null)
        }
    }


    // Logout user
    const logout = async () => {
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: 'POST',
        })

        if (res.ok) {
            setUser(null)
            router.push('/auth/login')
        }
    }


    // Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        try {
            const res = await fetch(`${NEXT_URL}/api/user`)
            const data = await res.json()

            if (res.ok) {
                setUser(data.user)
            } else {
                setUser(null)
            }
        } catch (error) {

        }

    }
    return (
        <AuthContext.Provider value={{ user, error22, login, logout, setLoggedUser, register }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext


