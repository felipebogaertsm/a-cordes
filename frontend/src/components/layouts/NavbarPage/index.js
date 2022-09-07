// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

// Components:
import { Footer } from "components/modules/footer"
import { Navbar } from "components/modules/navbar"

export default function NavbarPage(props) {
    return (
        <div>
            <Navbar />
            <div className="w-full h-full mb-10 px-6 py-2">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}
