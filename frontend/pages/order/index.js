// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// Actions:
import { getCart } from '../../redux/actions/cart'

// Components:
import {
    Button,
    Card,
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

    const { loading, error, cartItems } = useSelector(state => state.cart)

    const { authenticated, loading: loadingAuth } = useContext(AuthContext)

    const router = useRouter()

    useEffect(() => {
        dispatch(getCart())
    }, [])

    return (
        <NavbarPage>

            <div className='px-6 py-14'>


                <div className='flex flex-row space-x-2'>
                    <Heading>Order</Heading>
                    <div className='grow'></div>
                    <div className='w-max my-auto'>
                        <Button>Confirm order</Button>
                    </div>
                </div>

                <div className='mt-10 px-6 w-full'>

                    {loading && <p>...</p>}

                    {error && <p>{error}</p>}

                    <div className='w-full flex flex-col lg:flex-row'>

                        <div className='w-full lg:mr-10 mb-10 space-y-20'>
                            <div>
                                <h3>Ship to</h3>
                            </div>

                            <div>
                                <h3>Payment method</h3>
                            </div>
                        </div>

                        <div className='w-full'>
                            {Array.isArray(cartItems) && (
                                cartItems.length === 0 ? (
                                    <div className='mx-auto w-max space-y-4'>
                                        <p className='text-xl'>No items in your cart.</p>
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
