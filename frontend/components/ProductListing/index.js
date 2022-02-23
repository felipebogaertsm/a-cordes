// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useRouter } from 'next/router'

export default function ProductListing({ items, ...props }) {
    const router = useRouter()

    return (
        <div className='flex flex-col space-y-4'>
            {items.map((item, index) => (
                <div
                    key={index}
                    className='
                                            bg-stone-200 rounded-lg px-6 py-4
                                            hover:brightness-[102%] transition-all duration-200
                                        '
                    onClick={(e) => router.push(`/products/${item.product._id}`)}
                >
                    <div className='flex md:flex-row flex-col space-x-4'>
                        <h5 className='my-auto text-stone-500'>{index + 1}</h5>
                        <img
                            className='
                                aspect-[4/3] object-cover md:h-16 md:w-min
                                rounded-xl shadow-xl
                            '
                            src={item.product.image}
                        >
                        </img>
                        <div className='my-auto'>
                            <h3 className='my-auto'>{item.product.name}</h3>
                            <p className='my-auto'>Quantity: <strong>{item.quantity}</strong></p>
                        </div>
                        <div className="grow"></div>
                        <div className='my-auto'>
                            <h4 className='my-auto'>$ <span className='text-3xl'>{item.product.price}</span></h4>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
