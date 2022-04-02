// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// Components:
import { Card } from "../"

export default function Message({ children, ...props }) {
    return (
        <div
            className="
                bg-red-200 py-4 px-6 text-red-900 font-bold rounded-lg group
                transition-all duration-100 hover:brightness-[102%]
            "
        >
            <div className="flex flex-row space-x-4" {...props}>
                <div>
                    <img
                        className="
                            h-6 w-6 m-2 object-cover 
                            group-hover:scale-110 transition-all duration-200
                        "
                        src="/icons/error.svg"
                    ></img>
                </div>
                <div className="my-auto">{children}</div>
            </div>
        </div>
    )
}
