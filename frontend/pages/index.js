// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// Components:
import {
    Heading,
    SearchInput,
    NavbarPage,
} from '../components'

export default function Home() {
    return (
        <NavbarPage>
            <div className='px-6 py-14 flex flex-row'>
                <Heading>Latest products</Heading>
                <div className='grow'></div>
                <SearchInput />
            </div>
        </NavbarPage>
    )
}
