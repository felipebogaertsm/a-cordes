// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

export default function ListItem({ number, children, ...props }) {
    return (
        <div {...props}>
            <div
                className="
                bg-stone-100 rounded-md px-6 py-4 hover:brightness-[102%]
                transition-all duration-200 w-full h-full flex flex-row hover:scale-[100.2%]
            "
            >
                {number && <h5 className="my-auto mr-4">{number}</h5>}
                <div className="w-full">{children}</div>
            </div>
        </div>
    )
}
