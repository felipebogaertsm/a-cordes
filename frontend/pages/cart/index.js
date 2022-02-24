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
    Heading,
    Loader,
    Message,
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

    const { authenticated, loading: loadingAuth } = useContext(AuthContext)

    const router = useRouter()

    const { loading, error, cartItems } = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCart())
    }, [])

    return (
        <NavbarPage>

            <div className='px-6 py-14'>


                <div className='flex flex-row space-x-2'>
                    <Heading>Cart</Heading>
                    <div className='grow'></div>
                    <div className='w-max my-auto'>
                        <Button onClick={(e) => { }} secondary>Clear cart</Button>
                    </div>
                    <div className='w-max my-auto'>
                        <Button onClick={(e) => router.push('/order')}>Order items</Button>
                    </div>
                </div>

                <div className='mt-10 px-6 w-full space-y-4'>
                    {loading && <div className='mx-auto'><Loader /></div>}

                    {error && <Message>{error}</Message>}

                    {!authenticated && !loadingAuth && <Message>You must be logged in to access this page.</Message>}

                    {!loading && !error && Array.isArray(cartItems) ? (
                        cartItems.length === 0 ? (
                            <div className='mx-auto w-max space-y-4 mt-20'>
                                <p className='text-xl'>No items in your cart.</p>
                                <Button onClick={(e) => router.push('/')}>Continue shopping</Button>
                            </div>
                        ) : (
                            <ProductListing items={cartItems} />
                        )
                    ) : <div></div>}
                </div>

            </div>

        </NavbarPage >
    )
}
