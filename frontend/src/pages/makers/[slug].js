// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useEffect, useState } from "react"
import { useRouter } from "next/router"

// Components:
import { Heading } from "@/components/elements/text"
import { Loader } from "@/components/elements/misc"
import { NavbarPage } from "@/components/layouts"
import { GriddedProductListing } from "@/components/modules/products"

// Constants:
import { ACCOUNTS_SELLER_PATH, PRODUCT_LIST_PATH } from "@/constants/apis"

// Hooks:
import { useFetch } from "@/hooks"

// Utils:
import { getClient } from "@/utils/axios"

export default function MakerId() {
    const router = useRouter()

    const [makerSlug] = useState(router.query.slug)

    const [seller, doFetch] = useFetch({
        client: getClient(),
        method: "get",
        url: ACCOUNTS_SELLER_PATH.replace("[slug]", makerSlug),
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
            doFetchProducts({ params: { seller_profile: seller.data._id } })
        }
    }, [seller.data])

    return (
        <NavbarPage>
            <div className="flex flex-col gap-10">
                {seller.loading && <Loader />}
                {seller.data && (
                    <>
                        <div className="py-4">
                            <Heading>{seller.data.name}</Heading>
                        </div>
                        <div className="flex flex-col md:flex-row gap-10 justify-center content-center align-center">
                            {seller.data.picture && (
                                <img
                                    className="aspect-square object-cover rounded-md w-96 mx-auto"
                                    src={seller.data.picture}
                                ></img>
                            )}
                            <div>
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <h6>Description</h6>
                                        <p>{seller.data.description}</p>
                                    </div>
                                    <div>
                                        <h6>Location</h6>
                                        <p>
                                            {seller.data.city},{" "}
                                            {seller.data.country}
                                        </p>
                                    </div>
                                    <div>
                                        <h6>Recent reviews</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div>
                    <h2 className="mb-6">Products</h2>
                    {products.data && (
                        <div>
                            <GriddedProductListing products={products.data} />
                        </div>
                    )}
                </div>
            </div>
        </NavbarPage>
    )
}
