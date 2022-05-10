// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useState } from "react"
import Link from "next/link"

// Components:
import { Card } from ".."

// Constants:
import { MEDIA_URL } from "../../../constants"
import { PRODUCT_DETAIL_PAGE_ROUTE } from "../../../constants/routes"

export default function GriddedProductListing({ products }) {
    const [productList, setProductList] = useState(products)

    useEffect(() => {
        setProductList(products)
    }, [products])

    return (
        <div className="w-full h-full rounded-xl py-4 px-0">
            <div
                className="
                    grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4
                    grid-cols-1 place-items-stretch
                "
            >
                {productList.map((product, index) => (
                    <div key={index} className="mt-6 mr-4">
                        <Link
                            href={PRODUCT_DETAIL_PAGE_ROUTE.replace(
                                "[id]",
                                product._id
                            )}
                        >
                            <div className="cursor-pointer">
                                <Card>
                                    <div className="flex flex-col group">
                                        <div className="relative">
                                            <img
                                                className="
                                                rounded-xl w-full h-full object-cover
                                                aspect-[4/3] border-opacity-10
                                                border-2 border-amber-900
                                            "
                                                src={`${MEDIA_URL}${product.image}`}
                                            ></img>
                                            {product.count_in_stock === 0 && (
                                                <div
                                                    className="
                                                        absolute top-0 left-0 bg-zinc-200 h-full 
                                                        w-full px-auto group-hover:opacity-60 
                                                        opacity-40 p-2 transition-all duration-200
                                                    "
                                                >
                                                    <h4 className="text-center my-auto">
                                                        Product not available
                                                    </h4>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col mt-2">
                                            <div className="flex-row flex mb-4">
                                                <h4 className="font-bold">
                                                    {product.name}
                                                </h4>
                                                <div className="grow"></div>
                                                <h4 className="text-stone-600">
                                                    ${Number(product.price)}
                                                </h4>
                                            </div>
                                            <div className="flex flex-row font-serif">
                                                <h6 className="normal-case text-zinc-500 font-bold">
                                                    {product.seller.name}
                                                </h6>
                                                <div className="grow"></div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
