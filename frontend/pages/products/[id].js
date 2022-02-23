// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// Actions:
import { listProductDetails } from '../../redux/actions/productActions'
import { addToCart } from '../../redux/actions/cartActions'

// Components:
import {
    Button,
    Heading,
    NavbarPage,
} from '../../components'

// Contexts:
import {
    AuthContext
} from '../../contexts/auth'

// Utilities:
import { stringToDate } from '../../utils/datetime'

export default function ProductId() {
    const dispatch = useDispatch()

    const { authenticated } = useContext(AuthContext)

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const cartSelector = useSelector(state => state.cart)
    const {
        loading: loadingCart,
        error: errorCart,
        cartItems,
        success: successCart
    } = cartSelector

    const router = useRouter()
    const id = router.query.id

    useEffect(() => {
        if (id != undefined) {
            dispatch(listProductDetails(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (cartItems && successCart) {
            console.log(cartItems)
            router.push('/cart')
        }
    }, [cartItems])

    const addToCartHandler = () => {
        if (authenticated) {
            dispatch(addToCart(id, 1))
        } else {
            router.push('/auth/login')
        }
    }

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
                                mt-10 lg:m-0 space-x-10 space-y-10
                                grid grid-cold-1 lg:grid-cols-3
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
                            <div className='flex flex-col'>
                                <div className='my-2'>
                                    <h6>Description</h6>
                                    <p>{product.description}</p>
                                </div>
                                <div className='my-2'>
                                    <h6>Category</h6>
                                    <p>{product.category}</p>
                                </div>
                                <div className='my-2'>
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
                                    <div className='flex flex-row'>
                                        <h3>
                                            {Number(product.count_in_stock) > 0 ? 'In Stock' : 'Out of Stock'}
                                        </h3>
                                        <div className='grow'></div>
                                        <h3>
                                            {Number(product.count_in_stock)}
                                            {Number(product.count_in_stock) === 1 ? ' unit' : ' units'}
                                        </h3>
                                    </div>
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <Button
                                        disabled={!product.count_in_stock}
                                        onClick={(e) => addToCartHandler(e)}
                                        primary
                                    >
                                        Add to cart
                                    </Button>
                                    <Button
                                        onClick={(e) => router.push('/cart')}
                                        secondary
                                    >
                                        Go to cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <div>Product not found</div>}

            </div>

        </NavbarPage>
    )
}
