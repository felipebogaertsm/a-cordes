// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import Link from "next/link"

// Constants:
import { BECOME_A_SELLER_PAGE_ROUTE } from "../../../constants/routes"

export default function Footer() {
    return (
        <div
            className="
                min-h-fit py-2 bg-stone-200 fixed w-full px-4 text-stone-500
                lg:px-4 bottom-0 text-sm flex flex-col md:flex-row text-center
            "
        >
            <Link href={BECOME_A_SELLER_PAGE_ROUTE}>Become a seller</Link>
            <div className="grow"></div>
            <p>à cordes © 2022</p>
            <div className="grow"></div>
            <p>Made by Felipe Bogaerts de Mattos</p>
        </div>
    )
}
