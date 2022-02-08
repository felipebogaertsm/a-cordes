// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// Actions:
import { listProductDetails } from '../../redux/actions/productActions'

// Components:
import {
    GriddedProductListing,
    Heading,
    SearchInput,
    NavbarPage,
} from '../../components'

export default function ProductId() {
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const router = useRouter()
    const id = router.query.id

    useEffect(() => {
        if (id != undefined) {
            dispatch(listProductDetails(id))
        }
    }, [dispatch, id])

    return (
        <NavbarPage>

            <div className='px-6 py-14'>

                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error</div>
                ) : product ? (
                    <div className='flex flex-col'>
                        <Heading>{product.name}</Heading>
                        <div>
                            <img
                                src={product.image}
                            >
                            </img>
                        </div>
                    </div>
                ) : <div>Product not found</div>}

            </div>

        </NavbarPage>
    )
}
