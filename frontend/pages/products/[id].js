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
    Button,
    Heading,
    NavbarPage,
} from '../../components'

// Utilities:
import { stringToDate } from '../../utils/datetime'

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
                        <div
                            className='
                                mt-10 md:m-0 space-x-10 space-y-10
                                grid grid-cold-1 md:grid-cols-3
                            '
                        >
                            <div>
                                <img
                                    className='
                                        aspect-[4/3]
                                        w-full rounded-xl shadow-xl
                                    '
                                    src={product.image}
                                >
                                </img>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <div>
                                    <h6>Description</h6>
                                    <p>{product.description}</p>
                                </div>
                                <div>
                                    <h6>Category</h6>
                                    <p>{product.category}</p>
                                </div>
                                <div>
                                    <h6>Created at</h6>
                                    <p>{stringToDate(product.created_at)}</p>
                                </div>
                            </div>
                            <div className='flex flex-col space-y-8'>
                                <div>
                                    <h6>Price</h6>
                                    <h2>${Number(product.price)}</h2>
                                </div>
                                <div>
                                    <h6>Availability</h6>
                                    <h3>{Number(product.count_in_stock) > 0 ? 'In Stock' : 'Out of Stock'}</h3>
                                </div>
                                <div>
                                    <Button>Add to cart</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <div>Product not found</div>}

            </div>

        </NavbarPage>
    )
}
