// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Actions:
import { listProducts } from '../redux/actions/product'

// Components:
import {
    GriddedProductListing,
    Heading,
    Loader,
    Message,
    SearchInput,
    NavbarPage,
} from '../components'

export default function Home(history) {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

    let keyword

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <NavbarPage>

            <div className='px-6 py-14'>

                <div className='flex flex-row'>
                    <Heading>Latest products</Heading>
                    <div className='grow'></div>
                    <SearchInput />
                </div>

                <div className='mt-20 px-6 w-full'>
                    {loading ? (
                        <div className='w-full mx-auto'>
                            <Loader />
                        </div>
                    ) : error ? (
                        <Message>{error}</Message>
                    ) : (
                        products && (
                            <GriddedProductListing products={products} />
                        )
                    )}
                </div>

            </div>

        </NavbarPage>
    )
}
