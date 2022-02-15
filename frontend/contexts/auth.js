// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import axios from 'axios'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined)

    const authenticated = Boolean(user)

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    useEffect(() => {
        if (user) {
            setCookie(undefined, 'acordes.token', user.token, {
                maxAge: 60 * 60 * 8, // 8 hours
            })
        } else if (user === null) {
            console.log('hello zo')
            setCookie(undefined, 'acordes.token', '', {
                maxAge: 60 * 60 * 8, // 8 hours
            })
        }
    }, [user])

    useEffect(() => {
        const { 'acordes.token': token } = parseCookies()

        if (token) {
            fetchMyUser(token)
        }
    }, [])

    async function fetchMyUser(token) {
        try {
            const { data: user } = await axios.get(
                `${process.env.SERVER_URL}/api/accounts/my-user/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                },
            )
            setUser(user)
        } catch (error) {
            setUser(null)
        }
    }

    async function login(email, password) {
        const { data: user } = await axios.post(
            `${process.env.SERVER_URL}/api/accounts/login/`,
            { 'email': email, 'password': password },
            config,
        )
        setUser(user)
    }

    function logout() {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ authenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
