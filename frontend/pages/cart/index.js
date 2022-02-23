// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// Actions:
import { getCart } from '../../redux/actions/cartActions'

// Components:
import {
    Button,
    Heading,
    NavbarPage,
} from '../../components'

// Utilities:
import { stringToDate } from '../../utils/datetime'

export default function Cart() {
    const dispatch = useDispatch()

    const { loading, error, cartItems } = useSelector(state => state.cart)

    const router = useRouter()

    useEffect(() => {
        dispatch(getCart())
    }, [])

    return (
        <NavbarPage>

            <div className='px-6 py-14'>

                <Heading>Cart</Heading>

                <div className='mt-10 px-6 bg-'>
                    {loading && <p>...</p>}
                    {error && <p>{error}</p>}
                    {Array.isArray(cartItems) && (
                        cartItems.length === 0 ? (
                            <div className='mx-auto w-max space-y-4 mt-20'>
                                <p className='text-xl'>No items in your cart.</p>
                                <Button onClick={(e) => router.push('/')}>Continue shopping</Button>
                            </div>
                        ) : (
                            <div className='flex flex-col space-y-4'>
                                {cartItems.map((item, index) => (
                                    <div className='bg-stone-200 rounded-lg px-6 py-4'>
                                        <div className='flex flex-row space-x-4'>
                                            <img
                                                className='
                                                aspect-[4/3]
                                                h-16 rounded-xl shadow-xl
                                            '
                                                src={item.product.image}
                                            >
                                            </img>
                                            <div className='my-auto'>
                                                <h3 className='my-auto'>{item.product.name}</h3>
                                                <p className='my-auto'>Quantity: <strong>{item.quantity}</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                </div>

            </div>

        </NavbarPage >
    )
}
