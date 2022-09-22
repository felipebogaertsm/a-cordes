// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useEffect } from "react"
import Link from "next/link"

// Components:
import { Heading } from "components/elements/text"
import { Loader } from "components/elements/misc"
import { NavbarPage } from "components/layouts"
import { GriddedProductListing } from "components/modules/products"

// Constants:
import { PRODUCT_LIST_PATH } from "constants/apis"

// Hooks:
import { useFetch } from "hooks"

export default function ProductId() {
    const [products, doFetchProducts] = useFetch({
        method: "get",
        url: PRODUCT_LIST_PATH,
        payload: {
            params: {
                category__name__icontains: "bow",
                count_in_stock__gte: 1,
            },
        },
    })

    useEffect(() => {
        doFetchProducts()
    }, [])

    return (
        <NavbarPage>
            <div className="py-4">
                <Heading>
                    <h1>
                        <Link href="/">
                            <span className="text-zinc-600 hover:text-primary">
                                Products
                            </span>
                        </Link>{" "}
                        | <span className="font-bold">Bows</span>
                    </h1>
                </Heading>
            </div>

            {products.loading && <Loader />}
            {products.error && <div>{products.error}</div>}
            {products.data && (
                <GriddedProductListing products={products.data} />
            )}
        </NavbarPage>
    )
}