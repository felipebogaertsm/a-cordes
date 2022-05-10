// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import Link from "next/link"

export default function NavbarItem(props) {
    return (
        <div className="my-auto" {...props}>
            <Link href={props.to}>
                <div
                    className="
                    bg-opacity-0 cursor-pointer bg-stone-200
                    hover:bg-opacity-10 uppercase tracking-wider
                    font-light px-4 py-2 rounded-md
                    transition-all duration-100
                "
                    onClick={props.onClick}
                >
                    <div className="">{props.children}</div>
                </div>
            </Link>
        </div>
    )
}
