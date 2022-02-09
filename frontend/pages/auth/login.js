// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// Components:
import {
    Heading,
    NavbarPage,
    FormInput,
} from '../../components'

export default function Login() {
    return (
        <NavbarPage>
            <div className='px-6 py-14 flex flex-row'>
                <Heading>Login</Heading>
            </div>

            <div className='p-10 max-w-[500px] mx-auto flex flex-col space-y-4'>
                <FormInput label='Email' />
                <FormInput label='Password' type='password' />
            </div>
        </NavbarPage>
    )
}
