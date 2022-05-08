// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

// Actions:
import { addToCart } from "../../redux/actions/cart"

// Components:
import { Button, Heading, Loader, NavbarPage } from "../../components"

// Constants:
import { MEDIA_URL } from "../../constants"
import { PRODUCT_DETAIL_PATH } from "../../constants/apis"
import { MAKER_PAGE_ROUTE } from "../../constants/routes"

// Contexts:
import { AuthContext } from "../../contexts/auth"

// Hooks:
import { useFetch } from "../../hooks"

// Utilities:
import { stringToDate } from "../../utils/datetime"

export default function ProductId() {
    const dispatch = useDispatch()

    const { user } = useContext(AuthContext)

    const router = useRouter()
    const id = router.query.id

    const [product, doFetchProduct] = useFetch({
        method: "get",
        url: PRODUCT_DETAIL_PATH.replace("[id]", id),
    })

    useEffect(() => {
        doFetchProduct()
    }, [])

    const cartSelector = useSelector((state) => state.cart)
    const { cartItems, success: successCart } = cartSelector

    useEffect(() => {
        if (cartItems && successCart) {
            router.push("/cart")
        }
    }, [cartItems])

    const addToCartHandler = () => {
        if (user) {
            dispatch(addToCart(id, 1))
        } else {
            router.push("/auth/login")
        }
    }

    return (
        <NavbarPage>
            <div className="px-6 py-14">
                {product.loading ? (
                    <Loader />
                ) : product.error ? (
                    <div>product.error</div>
                ) : (
                    product.data && (
                        <div className="flex flex-col">
                            <Heading>
                                <h1>{product.data.name}</h1>
                            </Heading>
                            <div
                                className="
                                mt-10 lg:m-0 space-x-10 space-y-10
                                grid grid-cold-1 lg:grid-cols-3
                            "
                            >
                                <div>
                                    <img
                                        className="
                                        aspect-[4/3] mt-10 object-cover
                                        w-full rounded-xl shadow-xl
                                    "
                                        src={`${MEDIA_URL}${product.data.image}`}
                                    ></img>
                                </div>
                                <div className="flex flex-col">
                                    <div className="my-2">
                                        <h5>Description</h5>
                                        <p>{product.data.description}</p>
                                    </div>
                                    <div className="my-2">
                                        <h5>Category</h5>
                                        <p>{product.data.category}</p>
                                    </div>
                                    <div className="my-2">
                                        <h5>Crafted by</h5>
                                        <a
                                            href={MAKER_PAGE_ROUTE.replace(
                                                "[id]",
                                                product.data.seller._id
                                            )}
                                        >
                                            <h6>{product.data.seller.name}</h6>
                                        </a>
                                        <p>
                                            {product.data.seller.city},{" "}
                                            {product.data.seller.country}
                                        </p>
                                    </div>
                                    <div className="my-2">
                                        <h5>Created at</h5>
                                        <p>
                                            {stringToDate(
                                                product.data.created_at
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-8">
                                    <div>
                                        <h5>Price</h5>
                                        <h2>${Number(product.data.price)}</h2>
                                    </div>
                                    <div>
                                        <h5>Availability</h5>
                                        <div className="flex flex-row">
                                            <h3>
                                                {Number(
                                                    product.data.count_in_stock
                                                ) > 0
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </h3>
                                            <div className="grow"></div>
                                            <h3>
                                                {Number(
                                                    product.data.count_in_stock
                                                )}
                                                {Number(
                                                    product.data.count_in_stock
                                                ) === 1
                                                    ? " unit"
                                                    : " units"}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <Button
                                            disabled={
                                                !product.data.count_in_stock
                                            }
                                            onClick={(e) => addToCartHandler(e)}
                                            primary
                                        >
                                            Add to cart
                                        </Button>
                                        <Button
                                            onClick={(e) =>
                                                router.push("/cart")
                                            }
                                            secondary
                                        >
                                            Go to cart
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </NavbarPage>
    )
}
