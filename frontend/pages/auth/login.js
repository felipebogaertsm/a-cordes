// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Components:
import {
    Button,
    Heading,
    NavbarPage,
    FormInput,
} from '../../components'

// Contexts:
import {
    AuthContext
} from '../../contexts/auth'

export default function Login() {
    const router = useRouter()

    const { login, authenticated } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (authenticated) {
            router.push('/')
        }
    }, [authenticated])

    async function loginHandler(e) {
        await login(email, password)
    }

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
                    <Button onClick={(e) => loginHandler(e)}>Log in</Button>
                </div>
            </div>
        </NavbarPage>
    )
}
