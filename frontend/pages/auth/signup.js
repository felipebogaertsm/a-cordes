// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect, useState, useContext } from "react"

// Components:
import {
    Button,
    FormInput,
    Heading,
    Loader,
    Message,
    NavbarPage,
} from "../../components"

// Constants:
import { ACCOUNTS_USER_PATH } from "../../constants/apis"

// Contexts:
import { AuthContext } from "../../contexts/auth"

// Hooks:
import { useFetch } from "../../hooks"

// Utils:
import { getClient } from "../../utils/axios"

const client = getClient()

export default function SignUp() {
    const { refreshUser } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [registerUser, doFetch] = useFetch({
        client,
        method: "post",
        url: ACCOUNTS_USER_PATH.replace("[id]", 0),
        payload: { email, password1: password, password2: confirmPassword },
    })

    useEffect(() => {
        if (registerUser.data) {
            refreshUser(registerUser.data.token)
        }
    }, [registerUser.data])

    return (
        <NavbarPage>
            <div className="px-6 py-14 flex flex-row">
                <Heading>signup</Heading>
            </div>

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
                    <Button onClick={() => doFetch()}>
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
        </NavbarPage>
    )
}
