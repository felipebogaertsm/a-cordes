// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useEffect, useState } from "react"

// Components:
import { Heading, Loader, Message } from "../components/elements"
import { NavbarPage } from "../components/layouts"
import { GriddedProductListing, SearchInput } from "../components/modules"

// Constants:
import { PRODUCTS_RECENT_PATH } from "../constants/apis"

// Hooks:
import { useFetch } from "../hooks"

// Utils:
import { getClient } from "../utils/axios"

export default function Home() {
    const [keyword, setKeyword] = useState("")

    const [products, doFetch] = useFetch({
        client: getClient(),
        method: "get",
        url: `${PRODUCTS_RECENT_PATH}?keyword=${keyword}`,
    })

    useEffect(() => {
        doFetch({ keyword: keyword })
    }, [keyword])

    return (
        <NavbarPage>
            <div className="px-6 py-14">
                <div className="w-full">
                    <Heading>
                        <h1>Latest products</h1>
                        <div className="grow"></div>
                        <div className="font-sans font-base my-auto">
                            <SearchInput
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                    </Heading>
                </div>

                <div className="mt-20 px-6 w-full">
                    {products.loading ? (
                        <div className="w-full mx-auto">
                            <Loader />
                        </div>
                    ) : products.error ? (
                        <Message>{products.error}</Message>
                    ) : (
                        products.data && (
                            <GriddedProductListing products={products.data} />
                        )
                    )}
                </div>
            </div>
        </NavbarPage>
    )
}
