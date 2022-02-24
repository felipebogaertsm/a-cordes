// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Actions:
import { allSellerProfiles } from '../../redux/actions/user'

// Components:
import {
    GriddedProductListing,
    Heading,
    Loader,
    Message,
    SearchInput,
    NavbarPage,
} from '../../components'

export default function Makers() {
    const dispatch = useDispatch()

    const { error, loading, makers } = useSelector(state => state.sellerProfiles)

    useEffect(() => {
        dispatch(allSellerProfiles())
    }, [dispatch])

    return (
        <NavbarPage>

            <div className='px-6 py-14'>

                <div className='flex flex-row'>
                    <Heading>Makers</Heading>
                </div>

                <div className='mt-20 px-6 w-full flex flex-col space-y-2'>
                    {loading ? (
                        <div className='w-full mx-auto'>
                            <Loader />
                        </div>
                    ) : error ? (
                        <Message>{error}</Message>
                    ) : (
                        makers && (
                            makers.map((maker, index) => (

                                <div
                                    key={index}
                                    className='
                                        bg-stone-200 rounded-lg px-6 py-4
                                        hover:brightness-[102%] transition-all duration-200
                                    '
                                >
                                    <div className='flex md:flex-row flex-col space-x-4'>
                                        <h5 className='my-auto text-stone-500'>{index + 1}</h5>
                                        <div className='my-auto'>
                                            <h5 className='my-auto'>{maker.name}</h5>
                                            <p className='my-auto text-sm'><strong>{maker.city}, {maker.country}</strong></p>
                                        </div>
                                        <div className="grow"></div>
                                    </div>
                                </div>
                            ))
                        )
                    )}
                </div>

            </div>

        </NavbarPage>
    )
}
