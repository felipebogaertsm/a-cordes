// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'

// Components:
import {
    Button,
    Heading,
    NavbarPage,
    FormInput,
} from '../../components'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { error, loading, userInfo } = useSelector(state => state.userLogin)

    return (
        <NavbarPage>
            <div className='px-6 py-14 flex flex-row'>
                <Heading>Login</Heading>
            </div>

            <div className='p-10 max-w-[500px] mx-auto flex flex-col space-y-4'>
                <div className='space-y-4'>
                    <FormInput label='Email' onChange={(e) => setEmail(e.target.value)} />
                    <FormInput label='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className='pt-2 divide-y-2 w-min whitespace-nowrap mx-auto'>
                    <div className='mx-auto text-center py-2'>
                        <Link href='/'>
                            Don't have an account yet? Sign up
                        </Link>
                    </div>
                    <div className='mx-auto text-center py-2'>
                        <Link href='/'>
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div className='pt-2'>
                    <Button>Log in</Button>
                </div>
            </div>
        </NavbarPage>
    )
}
