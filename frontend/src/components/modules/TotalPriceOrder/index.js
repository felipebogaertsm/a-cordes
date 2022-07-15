// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

export default function TotalPriceOrder({ total }) {
    return (
        <div className="flex flex-row border-b-2 px-2 py-3">
            <div>
                <h2 className="text-4xl">Total Price</h2>
            </div>
            <div className="grow"></div>
            <div>
                <h2 className="font-sans">${total}</h2>
            </div>
        </div>
    )
}
