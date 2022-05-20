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
import { Button, Heading, Loader } from "../../components/elements"
import { NavbarPage } from "../../components/layouts"
import { ImageCarroussel } from "../../components/modules"

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
    const slug = router.query.slug

    const [product, doFetchProduct] = useFetch({
        method: "get",
        url: PRODUCT_DETAIL_PATH.replace("[slug]", slug),
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
            dispatch(addToCart(product.data._id, 1))
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
                    <div>{product.error}</div>
                ) : (
                    product.data && (
                        <div className="flex flex-col">
                            <Heading>
                                <h1>{product.data.name}</h1>
                            </Heading>
                            <div
                                className="
                                    grid grid-cold-1 lg:grid-cols-3 mt-10 lg:m-0 gap-10
                                "
                            >
                                <div>
                                    <ImageCarroussel
                                        images={product.data.images}
                                    />
                                </div>
                                <div className="flex flex-col mt-10">
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
                                                "[slug]",
                                                product.data.seller.slug
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
                                <div className="flex flex-col gap-8 mt-10">
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
