// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// Actions:
import { listProductDetails } from '../../redux/actions/product'
import { addToCart } from '../../redux/actions/cart'

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
                                        aspect-[4/3] mt-10
                                        w-full rounded-xl shadow-xl
                                    '
                                    src={product.image}
                                >
                                </img>
                            </div>
                            <div className='flex flex-col'>
                                <div className='my-2'>
                                    <h5>Description</h5>
                                    <p>{product.description}</p>
                                </div>
                                <div className='my-2'>
                                    <h5>Category</h5>
                                    <p>{product.category}</p>
                                </div>
                                <div className='my-2'>
                                    <h5>Crafted by</h5>
                                    <h6>{product.seller.name}</h6>
                                    <p>{product.seller.city}, {product.seller.country}</p>
                                </div>
                                <div className='my-2'>
                                    <h5>Created at</h5>
                                    <p>{stringToDate(product.created_at)}</p>
                                </div>
                            </div>
                            <div className='flex flex-col space-y-8'>
                                <div>
                                    <h5>Price</h5>
                                    <h2>${Number(product.price)}</h2>
                                </div>
                                <div>
                                    <h5>Availability</h5>
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
