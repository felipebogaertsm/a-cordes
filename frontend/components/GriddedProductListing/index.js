// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useState } from "react"
import Link from "next/link"

// Components:
import { Card } from ".."

export default function GriddedProductListing({ products }) {
    const [productList, setProductList] = useState(products)

    useEffect(() => {
        setProductList(products)
    }, [products])

    return (
        <div className="w-full h-full rounded-xl py-4 px-8">
            <div
                className="
                    grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5
                    grid-cols-1 md:space-x-4 space-y-4 place-items-stretch md:space-y-0
                "
            >
                {productList.map((product, index) => (
                    <div key={index}>
                        <Link href={`products/${product._id}`}>
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
                                                src={product.image}
                                            ></img>
                                            {product.count_in_stock === 0 && (
                                                <div
                                                    className="
                                                        absolute top-0 left-0 bg-zinc-200 h-full 
                                                        w-full px-auto group-hover:opacity-40 
                                                        opacity-20 p-2 transition-all duration-200
                                                    "
                                                >
                                                    <h4 className="text-center my-auto">
                                                        Product not available
                                                    </h4>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col mt-2">
                                            <div className="flex-row flex">
                                                <h5>{product.name}</h5>
                                                <div className="grow"></div>
                                                <h4 className="text-stone-600">
                                                    ${Number(product.price)}
                                                </h4>
                                            </div>
                                            <div className="flex flex-row">
                                                <h6 className="text-base">
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
