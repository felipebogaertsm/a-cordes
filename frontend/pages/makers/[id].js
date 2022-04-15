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

export default function MakerId() {
    const router = useRouter()

    const [makerId] = useState(router.query.id)

    const [seller, doFetch] = useFetch({
        method: "get",
        url: ACCOUNTS_SELLER_PATH.replace("[id]", makerId),
    })

    const [products, doFetchProducts] = useFetch({
        method: "get",
        url: PRODUCT_LIST_PATH,
    })

    useEffect(() => {
        doFetch()
    }, [])

    useEffect(() => {
        if (seller.data) {
            doFetchProducts({ params: { seller: seller.data.id } })
        }
    }, [seller.data])

    return (
        <NavbarPage>
            <div className="px-6 py-14">
                {seller.loading && <Loader />}
                {seller.data && (
                    <div>
                        <div className="flex flex-row">
                            <Heading>{seller.data.name}</Heading>
                        </div>

                        <div className="mt-20 px-6 w-full flex flex-col space-y-2">
                            <ListItem number={1}>
                                <MakerItem maker={seller.data} />
                            </ListItem>
                        </div>
                    </div>
                )}

                <h2 className="mt-10 mb-6 ml-6">Products</h2>

                {products.data && (
                    <div>
                        <GriddedProductListing products={products.data} />
                    </div>
                )}
            </div>
        </NavbarPage>
    )
}
