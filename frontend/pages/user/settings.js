// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useContext, useEffect } from "react"

// Components:
import {
    FormContainer,
    FormInput,
    Heading,
    Loader,
    Message,
    SubHeading,
    NavbarPage,
} from "../../components"
import { ACCOUNTS_MY_USER_PATH } from "../../constants/apis"

// Contexts:
import { AuthContext } from "../../contexts/auth"

// Hooks:
import { useFetch } from "../../hooks"

// Services:
import { privateRoute } from "../../services/auth"

export async function getServerSideProps(ctx) {
    return await privateRoute(ctx)
}

export default function Settings() {
    const { user, setUser } = useContext(AuthContext)

    const [userInfo, doFetch] = useFetch({
        method: "patch",
        url: ACCOUNTS_MY_USER_PATH,
    })

    useEffect(() => {
        if (userInfo.data) {
            setUser(userInfo.data)
        }
    }, [userInfo.data])

    return (
        <NavbarPage>
            <div className="px-6 py-14">
                <div className="flex flex-row">
                    <Heading>User settings</Heading>
                </div>

                <div className="mt-20 px-6 mx-auto max-w-[600px] flex flex-col space-y-4">
                    <div>
                        <SubHeading>Account info</SubHeading>
                        <FormContainer className="flex flex-col space-y-2">
                            <FormInput
                                label="Email"
                                defaultValue={user.email}
                                onChange={(e) =>
                                    doFetch({ email: e.target.value })
                                }
                            />
                        </FormContainer>
                    </div>

                    <div>
                        <SubHeading>Shipping address</SubHeading>
                        <FormContainer className="flex flex-col space-y-2">
                            <FormInput label="Address" />
                            <FormInput label="City" />
                            <FormInput label="Postal Code" />
                            <FormInput label="Country" />
                        </FormContainer>
                    </div>
                </div>
            </div>
        </NavbarPage>
    )
}
