// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useState } from "react"

export default function Accordion({ children, title, expanded, ...props }) {
    const [isExpanded, setIsExpanded] = useState(!!expanded)

    return (
        <div {...props}>
            <div className="bg-zinc-200 bg-opacity-20 rounded-xl overflow-hidden shadow-xl">
                <div
                    className="py-2 px-4 bg-zinc-200"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex flex-row">
                        <div className="my-auto">{title}</div>
                        <div className="grow"></div>
                        <div className="my-auto w-6 h-6">
                            <img
                                className={`${
                                    !isExpanded ? "rotate-0" : "rotate-180"
                                } transition-all duration-300 ease-out`}
                                src={`/icons/pointer_down.svg`}
                            ></img>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden">
                    <div
                        className={`accordion-content ${
                            !isExpanded && "hidden"
                        }`}
                    >
                        <div className="p-2 pt-4">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
