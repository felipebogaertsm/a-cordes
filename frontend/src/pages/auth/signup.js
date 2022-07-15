// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"

// Components:
import {
    Button,
    FormContainer,
    FormInput,
    Heading,
    Loader,
    Message,
} from "../../components/elements"
import { NavbarPage } from "../../components/layouts"

// Constants:
import { ACCOUNTS_USERS_PATH } from "../../constants/apis"
import { HOME_PAGE_ROUTE } from "../../constants/routes"

// Contexts:
import { AuthContext } from "../../contexts/auth"

// Hooks:
import { useFetch } from "../../hooks"

// Utils:
import { getClient } from "../../utils/axios"

export default function SignUp() {
    const { refreshUser, user } = useContext(AuthContext)

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [registerUser, doFetch] = useFetch({
        client: getClient(),
        method: "post",
        url: ACCOUNTS_USERS_PATH,
    })

    useEffect(() => {
        if (user) {
            router.push(HOME_PAGE_ROUTE)
        }
    }, [user])

    useEffect(() => {
        if (registerUser.data) {
            refreshUser(registerUser.data.token)
        }
    }, [registerUser.data])

    return (
        <NavbarPage>
            <div className="px-6 py-14">
                <Heading>
                    <h1>Sign up</h1>
                </Heading>
            </div>

            <FormContainer
                onSubmit={(e) => {
                    e.preventDefault()
                    doFetch({
                        email,
                        password1: password,
                        password2: confirmPassword,
                    })
                }}
            >
                <div className="p-10 max-w-[500px] mx-auto flex flex-col space-y-4">
                    <div className="space-y-4">
                        <FormInput
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@domain.com"
                        />
                        <FormInput
                            label="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                        <FormInput
                            label="Confirm password"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="pt-2">
                        <Button className="button button-primary">
                            <div className="flex flex-row space-x-2">
                                <p>Sign up</p>
                                {registerUser.loading && (
                                    <div className="invert">
                                        <Loader />
                                    </div>
                                )}
                            </div>
                        </Button>
                    </div>

                    <div>
                        {registerUser.error ? (
                            <Message>{registerUser.error}</Message>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </FormContainer>
        </NavbarPage>
    )
}
