// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useState, useContext } from "react"
import { useRouter } from "next/router"

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

// Contexts:
import { AuthContext } from "../../contexts/auth"

// Services:
import { publicRoute } from "../../services/auth"

export async function getServerSideProps(ctx) {
    return await publicRoute(ctx)
}

export default function Login() {
    const router = useRouter()

    const { login, loading, error } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <NavbarPage>
            <div className="px-6 py-2">
                <Heading>
                    <h1>Login</h1>
                </Heading>
            </div>

            <FormContainer
                onSubmit={(e) => {
                    e.preventDefault()
                    login(email, password)
                }}
            >
                <div className="p-10 max-w-[500px] mx-auto flex flex-col space-y-4">
                    <div className="space-y-4">
                        <FormInput
                            label="Email"
                            placeholder="email@domain.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormInput
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="pt-2 divide-y-2 w-min whitespace-nowrap mx-auto">
                        <div className="mx-auto">
                            <Button
                                type="button"
                                className="button button-tertiary"
                                onClick={() => router.push("/auth/signup")}
                            >
                                Don't have an account yet? Sign up
                            </Button>
                        </div>
                        <div className="mx-auto">
                            <Button
                                type="button"
                                className={
                                    "button button-tertiary" + disabled
                                        ? " disabled"
                                        : ""
                                }
                            >
                                Forgot your password? (coming soon)
                            </Button>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button className="button button-primary">
                            <div className="flex flex-row space-x-2">
                                <p>Log in</p>
                                {loading && (
                                    <div className="invert">
                                        <Loader />
                                    </div>
                                )}
                            </div>
                        </Button>
                    </div>

                    <div>{error ? <Message>{error}</Message> : ""}</div>
                </div>
            </FormContainer>
        </NavbarPage>
    )
}
