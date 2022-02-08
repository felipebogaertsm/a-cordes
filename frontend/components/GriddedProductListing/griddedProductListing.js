// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useState } from "react"

// Components:
import { Card } from '../../components'

export default function GriddedProductListing({ products }) {
    const [productList, setProductList] = useState(products)

    useEffect(() => {
        setProductList(products)
    }, [products])

    console.log(products)

    return (
        <div
            className="
            w-full h-full m-4 border-2 border-stone-200 rounded-xl py-4 
            px-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
            grid-cols-1
            "
        >
            {products.map((product, index) => (
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
                                <h6 className="text-stone-600">{product.name}</h6>
                                <div className="grow"></div>
                                <h3>${Number(product.price)}</h3>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    )
}
