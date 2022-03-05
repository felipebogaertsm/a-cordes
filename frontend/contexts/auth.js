// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { createContext, useState } from 'react'

// Constants:
import { TOKEN_NAME, LOGIN_PATH, INDEX_PATH } from '../constants'

// Services:
import { getClient } from '../utils/axios'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)

    const client = getClient()

    const router = useRouter()

    async function login(email, password) {
        setLoading(true)

        try {
            const { data: tokens } = await client.post(
                `/api/accounts/token/obtain-pair/`,
                { 'email': email, 'password': password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                },
            )

            cookie.set(
                TOKEN_NAME,
                tokens.access,
                {
                    expires: 1 / 24, // 1 hour
                }
            )

            const { data: user } = await client.get(
                `/api/accounts/my-user/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokens.access}`
                    }
                },
            )

            setUser(user)
            setAuthenticated(true)

            router.push(INDEX_PATH)
        } catch (error) {
            setError(error.message)
            setAuthenticated(false)
            setUser(null)

            cookie.remove(TOKEN_NAME)
        }

        setLoading(false)
    }

    function logout() {
        setAuthenticated(false)
        setUser(null)

        cookie.remove(TOKEN_NAME)

        router.push(LOGIN_PATH)
    }

    return (
        <AuthContext.Provider value={{ authenticated, user, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
