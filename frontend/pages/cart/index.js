// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

// Actions:
import { clearCart, getCart, removeFromCart } from "../../redux/actions/cart"

// Components:
import {
    Button,
    Heading,
    Loader,
    Message,
    NavbarPage,
    ProductListing,
    PrivatePage,
} from "../../components"

// Contexts:
import { AuthContext } from "../../contexts/auth"

export default function Cart() {
    const dispatch = useDispatch()

    const { user } = useContext(AuthContext)

    const router = useRouter()

    const { loading, error, cartItems } = useSelector((state) => state.cart)

    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])

    function clearCartHandler(e) {
        e.preventDefault()
        dispatch(clearCart())
    }

    function checkoutHandler() {
        router.push("/order")
    }

    function removeFromCartHandler(e, id) {
        e.preventDefault()
        dispatch(removeFromCart(id))
        window.location.reload()
    }

    return (
        <NavbarPage>
            <PrivatePage>
                <div className="px-6 py-14">
                    <div className="flex flex-row space-x-2">
                        <Heading>Cart</Heading>
                        <div className="grow"></div>
                        <div className="w-max my-auto">
                            <Button
                                onClick={(e) => clearCartHandler(e)}
                                secondary
                            >
                                Clear cart
                            </Button>
                        </div>
                        <div className="w-max my-auto">
                            <Button onClick={(e) => checkoutHandler(e)}>
                                Go to Checkout
                            </Button>
                        </div>
                    </div>

                    <div className="mt-10 px-6 w-full space-y-4">
                        {loading && (
                            <div className="mx-auto">
                                <Loader />
                            </div>
                        )}

                        {error && <Message>{error}</Message>}

                        {!user && (
                            <Message>
                                You must be logged in to access this page.
                            </Message>
                        )}

                        {Array.isArray(cartItems) ? (
                            cartItems.length === 0 ? (
                                <div className="mx-auto w-max space-y-4 mt-20">
                                    <p className="text-xl">
                                        No items in your cart.
                                    </p>
                                    <Button onClick={() => router.push("/")}>
                                        Continue shopping
                                    </Button>
                                </div>
                            ) : (
                                <ProductListing
                                    items={cartItems}
                                    removeHandler={(e, id) =>
                                        removeFromCartHandler(e, id)
                                    }
                                />
                            )
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </PrivatePage>
        </NavbarPage>
    )
}
