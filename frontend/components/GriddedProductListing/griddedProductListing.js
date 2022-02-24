// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useState } from "react"
import Link from 'next/link'

// Components:
import { Card } from '../../components'

export default function GriddedProductListing({ products }) {
    const [productList, setProductList] = useState(products)

    useEffect(() => {
        setProductList(products)
    }, [products])

    return (
        <div
            className="
                w-full h-full m-4 border-2 border-stone-200 rounded-xl py-4 
                px-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                grid-cols-1 space-x-4 space-y-4 place-items-stretch
            "
        >
            {productList.map((product, index) => (
                <Link href={`products/${product._id}`}>
                    <div className="cursor-pointer">
                        <Card>
                            <div className="flex flex-col space-y-2">
                                <img
                                    className="
                                    rounded-xl w-full object-cover 
                                    aspect-[4/3] border-opacity-10
                                    border-2 border-amber-900
                                "
                                    src={product.image}
                                >
                                </img>
                                <div className="flex flex-row mx-2">
                                    <div className="text-stone-600">
                                        <h6>
                                            {product.name}
                                        </h6>
                                        <h6>{product.seller.name}</h6>
                                    </div>
                                    <div className="grow"></div>
                                    <h3>${Number(product.price)}</h3>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Link>
            ))}
        </div>
    )
}
