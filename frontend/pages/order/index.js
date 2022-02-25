// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// Actions:
import { getCart } from '../../redux/actions/cart'
import { createOrder } from '../../redux/actions/order'

// Components:
import {
    Button,
    FormInput,
    Heading,
    NavbarPage,
    ProductListing,
} from '../../components'

// Contexts:
import {
    AuthContext
} from '../../contexts/auth'

// Utilities:
import { stringToDate } from '../../utils/datetime'

export default function Cart() {
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('Cash')

    const [itemsPrice, setItemsPrice] = useState(0)
    const [shippingPrice, setShippingPrice] = useState(50)
    const [taxPrice, setTaxPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const [shippingAddress, setShippingAddress] = useState('')
    const [shippingCity, setShippingCity] = useState('')
    const [shippingPostalCode, setShippingPostalCode] = useState('')
    const [shippingCountry, setShippingCountry] = useState('')

    const { loading, error, cartItems } = useSelector(state => state.cart)

    const router = useRouter()

    useEffect(() => {
        dispatch(getCart())
    }, [])

    useEffect(() => {
        if (cartItems.length === 0) {
            let newItemsPrice = 0

            for (let i = 0; i < cartItems.length; i++) {
                newItemsPrice += cartItems[i].product.price
            }

            setItemsPrice(newItemsPrice)
        }
    }, [cartItems])

    useEffect(() => {
        setTotalPrice(itemsPrice + shippingPrice + taxPrice)
    }, [itemsPrice, shippingPrice, taxPrice])

    function orderItemsHandler(e) {
        e.preventDefault()
        dispatch(
            createOrder(
                {
                    orderItems: cartItems,
                    shippingAddress: {
                        address: shippingAddress,
                        city: shippingCity,
                        postalCode: shippingPostalCode,
                        country: shippingCountry
                    },
                    paymentMethod: paymentMethod,
                    itemsPrice: itemsPrice,
                    shippingPrice: shippingPrice,
                    taxPrice: taxPrice,
                    totalPrice: totalPrice,
                }
            )
        )
        router.push('/order')
    }

    return (
        <NavbarPage>

            <div className='px-6 py-14'>


                <div className='flex flex-row space-x-2'>
                    <Heading>Order</Heading>
                    <div className='grow'></div>
                    <div className='w-max my-auto'>
                        <Button onClick={(e) => orderItemsHandler(e)}>Confirm order</Button>
                    </div>
                </div>

                <div className='mt-10 px-6 w-full'>

                    {loading && <p>...</p>}

                    {error && <p>{error}</p>}

                    <div className='w-full flex flex-col lg:flex-row'>

                        <div className='w-full lg:mr-10 mb-10 space-y-10'>
                            <div>
                                <h3>Ship to</h3>
                                <div className='my-2 space-y-2'>
                                    <FormInput onChange={(e) => setShippingAddress(e.target.value)} label='Address' />
                                    <FormInput onChange={(e) => setShippingCity(e.target.value)} label='City' />
                                    <FormInput onChange={(e) => setShippingPostalCode(e.target.value)} label='Postal Code' />
                                    <FormInput onChange={(e) => setShippingCountry(e.target.value)} label='Country' />
                                </div>
                            </div>

                            <div>
                                <h3>Payment method</h3>
                                <div className='my-2 space-y-2'>
                                    <h6>{paymentMethod}</h6>
                                </div>
                            </div>
                        </div>

                        <div className='w-full'>
                            {Array.isArray(cartItems) && (
                                cartItems.length === 0 ? (
                                    <div className='mx-auto w-max space-y-4'>
                                        <p className='text-xl'>No items in your order.</p>
                                        <Button onClick={(e) => router.push('/')}>Continue shopping</Button>
                                    </div>
                                ) : (
                                    <ProductListing items={cartItems} />
                                ))}
                        </div>
                    </div>

                </div>

            </div>

        </NavbarPage >
    )
}
