// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import Link from "next/link"

// Components:
import { Heading } from "components/elements/text"
import { NavbarPage } from "components/layouts"

export default function ProductId() {
    return (
        <NavbarPage>
            <div className="py-4">
                <Heading>
                    <h1>
                        <Link href="/">
                            <span className="text-zinc-600 hover:text-primary">
                                Products
                            </span>
                        </Link>{" "}
                        | <span className="font-bold">Accessories</span>
                    </h1>
                </Heading>
            </div>

            <div className="my-20 text-center font-bold text-3xl">
                Coming soon!
            </div>
        </NavbarPage>
    )
}
