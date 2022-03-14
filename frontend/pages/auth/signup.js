// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useState } from "react"

// Components:
import {
    Button,
    FormInput,
    Heading,
    Loader,
    NavbarPage,
} from "../../components"

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

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
                    <Button onClick={(e) => loginHandler(e)}>
                        <div className="flex flex-row space-x-2">
                            <p>Sign up</p>
                            {/* {loading && <div className='invert'><Loader /></div>} */}
                        </div>
                    </Button>
                </div>

                {/* <div>{error ? (<Message>{error}</Message>) : ''}</div> */}
            </div>
        </NavbarPage>
    )
}
