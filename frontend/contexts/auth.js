// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import cookie from "js-cookie"
import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"

// Constants:
import { TOKEN_NAME } from "../constants"
import {
    ACCOUNTS_TOKEN_OBTAIN_PAIR_PATH,
    ACCOUNTS_MY_USER_PATH,
} from "../constants/apis"
import { LOGIN_PAGE_ROUTE, HOME_PAGE_ROUTE } from "../constants/routes"
import { privateRoute } from "../services/auth"

// Services:
import { getClient } from "../utils/axios"

const client = getClient()

export const AuthContext = createContext({})

export async function getServerSideProps(ctx) {
    return await privateRoute(ctx)
}

export function AuthProvider({ children, user: userInfo }) {
    const [user, setUser] = useState(userInfo)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const token = cookie.get(TOKEN_NAME)

        if (token) {
            setLoading(true)

            client
                .get(ACCOUNTS_MY_USER_PATH)
                .then((res) => {
                    setUser(res.data)
                    setAuthenticated(true)
                })
                .catch((err) => {
                    setError(
                        err.response && err.response.data.detail
                            ? err.response.data.detail
                            : err.message
                    )
                })

            setLoading(false)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    async function login(email, password) {
        setLoading(true)

        try {
            const { data: tokens } = await client.post(
                ACCOUNTS_TOKEN_OBTAIN_PAIR_PATH,
                {
                    email: email,
                    password: password,
                }
            )

            const token = tokens.access

            cookie.set(TOKEN_NAME, token, {
                expires: 8 / 24, // 8 hours
            })

            setAuthenticated(true)

            router.push(HOME_PAGE_ROUTE)
        } catch (err) {
            setError(
                err.response && err.response.data.detail
                    ? err.response.data.detail
                    : err.message
            )
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

        router.push(LOGIN_PAGE_ROUTE)
    }

    return (
        <AuthContext.Provider
            value={{ authenticated, user, loading, error, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}
