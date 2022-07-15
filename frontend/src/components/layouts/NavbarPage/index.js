// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

// Components:
import { Navbar, Footer } from "../../modules"

export default function NavbarPage(props) {
    return (
        <div>
            <Navbar />
            <div className="w-full h-full mb-10">{props.children}</div>
            <Footer />
        </div>
    )
}
