// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

// Actions:
import { getCart } from "../../redux/actions/cart"
import { createOrder } from "../../redux/actions/order"

// Components:
import {
    Button,
    Heading,
    NavbarPage,
    ProductListing,
    ShippingAddressForm,
    TotalPriceOrder,
} from "../../components"

// Contexts:
import { AuthContext } from "../../contexts/auth"

export default function OrderPage() {
    const { user } = useContext(AuthContext)

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState("Cash")

    const [itemsPrice, setItemsPrice] = useState(0)
    const [shippingPrice, setShippingPrice] = useState(0)
    const [taxPrice, setTaxPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const [shippingAddress, setShippingAddress] = useState()

    const { loading, error, cartItems } = useSelector((state) => state.cart)

    const router = useRouter()

    useEffect(() => {
        dispatch(getCart())
    }, [])

    useEffect(() => {
        if (cartItems.length === 0) {
            let newItemsPrice = 0

            for (let i = 0; i < cartItems.length; i++) {
                newItemsPrice += cartItems[i].product.price
            }

            setItemsPrice(newItemsPrice)
        }
    }, [cartItems])

    useEffect(() => {
        const itemsPrice = 0

        if (Array.isArray(cartItems)) {
            for (let item of cartItems) {
                itemsPrice += Number(item.product.price)
            }
        }

        setTotalPrice(itemsPrice + shippingPrice + taxPrice)
    }, [itemsPrice, shippingPrice, taxPrice, cartItems])

    function orderItemsHandler(e) {
        e.preventDefault()
        dispatch(
            createOrder({
                orderItems: cartItems,
                shippingAddress: {
                    address: shippingAddress,
                    city: shippingCity,
                    postalCode: shippingPostalCode,
                    country: shippingCountry,
                },
                paymentMethod: paymentMethod,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            })
        )
        router.push("/order")
    }

    return (
        <NavbarPage>
            <div className="px-6 py-14">
                <Heading>
                    <h1>Order</h1>
                    <div className="grow"></div>
                    <div className="w-max my-auto">
                        <Button onClick={(e) => orderItemsHandler(e)}>
                            Confirm order
                        </Button>
                    </div>
                </Heading>

                <div className="mt-10 px-6 w-full">
                    {loading && <p>...</p>}

                    {error && <p>{error}</p>}

                    <div className="w-full flex flex-col lg:flex-row">
                        <div className="w-full lg:mr-10 mb-10 space-y-10">
                            <ShippingAddressForm
                                onCheck={(id) => setShippingAddress(id)}
                            />

                            <div>
                                <h3>Payment method</h3>
                                <div className="my-2 space-y-2">
                                    <h6>{paymentMethod}</h6>
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-16">
                            {Array.isArray(cartItems) &&
                                (cartItems.length === 0 ? (
                                    <div className="mx-auto w-max space-y-4">
                                        <p className="text-xl">
                                            No items in your order.
                                        </p>
                                        <Button
                                            onClick={(e) => router.push("/")}
                                        >
                                            Continue shopping
                                        </Button>
                                    </div>
                                ) : (
                                    <ProductListing items={cartItems} />
                                ))}
                            <div className="mt-10">
                                <TotalPriceOrder
                                    total={totalPrice}
                                ></TotalPriceOrder>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavbarPage>
    )
}
