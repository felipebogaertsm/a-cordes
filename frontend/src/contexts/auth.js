// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import cookie from "js-cookie"
import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"

// Constants:
import { TOKEN_NAME } from "constants"
import {
    ACCOUNTS_TOKEN_OBTAIN_PAIR_PATH,
    ACCOUNTS_MY_USER_PATH,
} from "constants/apis"
import { LOGIN_PAGE_ROUTE, HOME_PAGE_ROUTE } from "constants/routes"

// Utils:
import { getClient } from "utils/axios"
import { getDetailFromResponseError } from "utils/errors"

export const AuthContext = createContext({})

export function AuthProvider({ children, user: userInfo }) {
    const [user, setUser] = useState(userInfo)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const router = useRouter()

    function setToken(token) {
        cookie.set(TOKEN_NAME, token, {
            expires: 20, // 20 days
        })
    }

    function removeToken() {
        cookie.remove(TOKEN_NAME)
    }

    async function refreshUser(token) {
        if (token) {
            setToken(token)
        } else {
            token = cookie.get(TOKEN_NAME)
        }

        if (token) {
            setLoading(true)

            getClient()
                .get(ACCOUNTS_MY_USER_PATH)
                .then((res) => {
                    setUser(res.data)
                })
                .catch((err) => {
                    removeToken()
                    setError(getDetailFromResponseError(err))
                })
        }

        setLoading(false)
    }

    useEffect(() => {
        refreshUser()
    }, [])

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    async function login(email, password) {
        setLoading(true)

        try {
            const { data: tokens } = await getClient().post(
                ACCOUNTS_TOKEN_OBTAIN_PAIR_PATH,
                {
                    email: email,
                    password: password,
                }
            )

            const token = tokens.access

            setToken(token)

            await refreshUser(token)
            setError(null)

            router.push(HOME_PAGE_ROUTE)
        } catch (err) {
            setError(getDetailFromResponseError(err))
            setUser(null)
            removeToken()
        }

        setLoading(false)
    }

    function logout() {
        setUser(null)
        removeToken()
        router.push(LOGIN_PAGE_ROUTE)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                refreshUser,
                setUser,
                loading,
                error,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
