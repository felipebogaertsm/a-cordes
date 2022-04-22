// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// Actions:
import {
    createShippingAddress,
    deleteShippingAddress,
    listShippingAddresses,
    updateShippingAddress,
} from "../../redux/actions/order"

// Components:
import {
    Button,
    Accordion,
    FormContainer,
    FormInput,
    Heading,
    ShippingAddressForm,
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
            <div className="px-6 py-14">
                <div className="flex flex-row">
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
                                onChange={(e) =>
                                    doFetch({ email: e.target.value })
                                }
                            />
                        </FormContainer>
                    </div>

                    <div className="pt-6">
                        <ShippingAddressForm />
                    </div>
                </div>
            </div>
        </NavbarPage>
    )
}
