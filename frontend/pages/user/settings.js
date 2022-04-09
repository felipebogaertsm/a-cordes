// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useContext, useEffect, useState } from "react"

// Components:
import {
    Accordion,
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

// Utils:
import { truncateString } from "../../utils/strings"

export async function getServerSideProps(ctx) {
    return await privateRoute(ctx)
}

export default function Settings() {
    const { user, setUser } = useContext(AuthContext)

    const [shippingAddresses] = useState([]) // only for tests!

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

                    <div className="pt-6">
                        <SubHeading>Shipping address</SubHeading>
                        {shippingAddresses &&
                            shippingAddresses.map((sa, item) => (
                                <div key={item}>
                                    <div className="pt-3"></div>
                                    <Accordion
                                        title={
                                            <div className="py-2">
                                                <h6>
                                                    {truncateString(
                                                        sa.address,
                                                        50
                                                    )}
                                                </h6>
                                            </div>
                                        }
                                    >
                                        <FormContainer className="flex flex-col space-y-2">
                                            <FormInput
                                                label="Address"
                                                defaultValue={sa.address}
                                            />
                                            <FormInput
                                                label="City"
                                                defaultValue={sa.city}
                                            />
                                            <FormInput
                                                label="Postal Code"
                                                defaultValue={sa.postal_code}
                                            />
                                            <FormInput
                                                label="Country"
                                                defaultValue={sa.country}
                                            />
                                        </FormContainer>
                                    </Accordion>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </NavbarPage>
    )
}
