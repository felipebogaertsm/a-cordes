// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useContext, useEffect } from "react"
import { useDispatch } from "react-redux"

// Actions:
import { listShippingAddresses } from "../../redux/actions/order"

// Components:
import {
    FormContainer,
    FormInput,
    Heading,
    SubHeading,
} from "../../components/elements"
import { NavbarPage } from "../../components/layouts"
import { ShippingAddressForm } from "../../components/modules"

// Constants:
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
    const dispatch = useDispatch()

    const { user, setUser } = useContext(AuthContext)

    const [userInfo, doFetch] = useFetch({
        method: "patch",
        url: ACCOUNTS_MY_USER_PATH,
    })

    useEffect(() => {
        dispatch(listShippingAddresses())
    }, [])

    useEffect(() => {
        if (userInfo.data) {
            setUser(userInfo.data)
        }
    }, [userInfo.data])

    return (
        <NavbarPage>
            <div className="py-4">
                <Heading>
                    <h1>User settings</h1>
                </Heading>
            </div>

            <div className="mt-20 px-6 mx-auto max-w-[600px] flex flex-col space-y-4">
                <div>
                    <SubHeading>Account info</SubHeading>
                    <FormContainer className="flex flex-col space-y-2">
                        <FormInput
                            label="Email"
                            defaultValue={user.email}
                            onChange={(e) => doFetch({ email: e.target.value })}
                        />
                    </FormContainer>
                </div>

                <div className="pt-6">
                    <ShippingAddressForm />
                </div>
            </div>
        </NavbarPage>
    )
}
