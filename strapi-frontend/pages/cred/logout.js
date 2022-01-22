import React, { useContext, useEffect } from 'react'
import AuthContext from '@/context/AuthContext'
import Header from '@/components/Header'

const logout = () => {
    const { logout } = useContext(AuthContext)
    useEffect(() => {
        logout()
    })
    return (
        <>
            <Header />
            <div className="container mx-auto px-20 text-center">
                Please wait while signing out...
            </div>
        </>
    )
}

export default logout
