// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useState } from "react"
import { useRouter } from "next/router"

// Components:
import {
    GriddedProductListing,
    Heading,
    ListItem,
    Loader,
    MakerItem,
    NavbarPage,
} from "../../components"

// Constants:
import { ACCOUNTS_SELLER_PATH, PRODUCT_LIST_PATH } from "../../constants/apis"

// Hooks:
import { useFetch } from "../../hooks"

// Utils:
import { getClient } from "../../utils/axios"

export default function MakerId() {
    const router = useRouter()

    const [makerId] = useState(router.query.id)

    const [seller, doFetch] = useFetch({
        client: getClient(),
        method: "get",
        url: ACCOUNTS_SELLER_PATH.replace("[id]", makerId),
    })

    const [products, doFetchProducts] = useFetch({
        client: getClient(),
        method: "get",
        url: PRODUCT_LIST_PATH,
    })

    useEffect(() => {
        doFetch()
    }, [])

    useEffect(() => {
        if (seller.data) {
            doFetchProducts({ params: { seller_profile: seller.data.id } })
        }
    }, [seller.data])

    return (
        <NavbarPage>
            <div className="px-6 py-14">
                {seller.loading && <Loader />}
                {seller.data && (
                    <div>
                        <Heading>
                            <h1>{seller.data.name}</h1>
                        </Heading>

                        <div className="mt-12 px-6 w-full flex flex-col space-y-2">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3">
                                <div className="mt-8">
                                    <h6>Description</h6>
                                    <p>{seller.data.description}</p>
                                </div>
                                <div className="mt-8">
                                    <h6>Location</h6>
                                    <p>
                                        {seller.data.city},{" "}
                                        {seller.data.country}
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <h6>Recent reviews</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <h2 className="mt-20 mb-6 ml-6">Products</h2>

                {products.data && (
                    <div>
                        <GriddedProductListing products={products.data} />
                    </div>
                )}
            </div>
        </NavbarPage>
    )
}
