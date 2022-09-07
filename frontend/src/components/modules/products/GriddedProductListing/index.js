// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useEffect, useState } from "react"

// Components:
import { ProductItem } from "@/components/modules/products"

export default function GriddedProductListing({ products }) {
    const [productList, setProductList] = useState(products)

    useEffect(() => {
        setProductList(products)
    }, [products])

    return (
        <div className="w-full h-full rounded-md py-4 px-0">
            <div
                className="
                    grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3
                    grid-cols-1 place-items-stretch gap-8
                "
            >
                {productList.map((product, index) => (
                    <div key={index}>
                        <ProductItem product={product} />
                    </div>
                ))}
            </div>
        </div>
    )
}
