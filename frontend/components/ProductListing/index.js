// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export default function ProductListing({ items, ...props }) {
    return (
        <div className='flex flex-col space-y-4'>
            {items.map((item, index) => (
                <div
                    className='
                                            bg-stone-200 rounded-lg px-6 py-4
                                            hover:brightness-[102%] transition-all duration-200
                                        '
                >
                    <div className='flex flex-row space-x-4'>
                        <img
                            className='
                                                aspect-[4/3]
                                                h-16 rounded-xl shadow-xl
                                            '
                            src={item.product.image}
                        >
                        </img>
                        <div className='my-auto'>
                            <h3 className='my-auto'>{item.product.name}</h3>
                            <p className='my-auto'>Quantity: <strong>{item.quantity}</strong></p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
