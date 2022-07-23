// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import Link from "next/link"

export default function NavbarItem(props) {
    return (
        <div className="my-auto" {...props}>
            <Link href={props.to}>
                <div
                    className="
                    bg-opacity-0 cursor-pointer bg-stone-200
                    hover:bg-opacity-10 uppercase tracking-wider
                    font-light px-5 py-3 rounded-none hover:rounded-2xl
                    transition-all duration-100 ease-out
                "
                    onClick={props.onClick}
                >
                    <div className="">{props.children}</div>
                </div>
            </Link>
        </div>
    )
}
