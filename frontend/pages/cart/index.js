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

export default function Cart() {
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

                cart

            </div>

        </NavbarPage>
    )
}
