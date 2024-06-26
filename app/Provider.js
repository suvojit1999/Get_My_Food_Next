'use client'
import React, { useState } from 'react'
import Header from './components/Header'
import { Toaster } from '@/components/ui/sonner'
import { CartUpdateContext } from './_context/CartUpdateContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const Provider = ({ children }) => {
    const [UpdateCart , setUpdateCart] = useState(false);
    return (
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
        <CartUpdateContext.Provider value={{UpdateCart, setUpdateCart}}>
        <div>
            <Header />
            <Toaster />
            {children}
        </div>
        </CartUpdateContext.Provider>
        </PayPalScriptProvider>
    )
}

export default Provider
