// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// Components:
import {
    Navbar,
    Footer,
} from '../../components'

export default function NavbarPage(props) {
    return (
        <div>
            <Navbar />
            <div className='w-full h-full'>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}