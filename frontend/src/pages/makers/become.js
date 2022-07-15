// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useContext, useState } from "react"
import { useRouter } from "next/router"

// Components:
import {
    Button,
    FormContainer,
    FormInput,
    Heading,
    Message,
} from "../../components/elements"
import { NavbarPage } from "../../components/layouts"

// Constants:
import { ACCOUNTS_SELLERS_PATH } from "../../constants/apis"
import { LOGIN_PAGE_ROUTE } from "../../constants/routes"

// Contexts:
import { AuthContext } from "../../contexts/auth"

// Hooks:
import { useFetch } from "../../hooks"

// Utils:
import { getClient } from "../../utils/axios"

export default function BecomeSeller() {
    const [sellerName, setSellerName] = useState("")
    const [sellerCity, setSellerCity] = useState("")
    const [sellerCountry, setSellerCountry] = useState("")
    const [sellerDescription, setSellerDescription] = useState("")
    const [sellerTitle, setSellerTitle] = useState("")

    const { user } = useContext(AuthContext)

    const router = useRouter()

    const [seller, doFetchSeller] = useFetch({
        client: getClient(),
        method: "post",
        url: ACCOUNTS_SELLERS_PATH,
    })

    return (
        <NavbarPage>
            <div className="px-6 py-2">
                <Heading>
                    <h1>Become a seller</h1>
                </Heading>

                <div className="mt-20 max-w-[500px] mx-auto">
                    {!user ? (
                        <>
                            <Message>
                                You must be logged in to access this page.
                            </Message>
                            <div className="mt-6">
                                <Button
                                    className="button button-primary"
                                    onClick={() =>
                                        router.push(LOGIN_PAGE_ROUTE)
                                    }
                                >
                                    Log in
                                </Button>
                            </div>
                        </>
                    ) : (
                        <FormContainer
                            className="flex flex-col space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault()
                                doFetchSeller({
                                    name: sellerName,
                                    city: sellerCity,
                                    country: sellerCountry,
                                    description: sellerDescription,
                                    title: sellerTitle,
                                    user: user._id,
                                })
                            }}
                        >
                            <FormInput
                                label="Name"
                                onChange={(e) => setSellerName(e.target.value)}
                            />
                            <FormInput
                                label="City"
                                onChange={(e) => setSellerCity(e.target.value)}
                            />
                            <FormInput
                                label="Country"
                                onChange={(e) =>
                                    setSellerCountry(e.target.value)
                                }
                            />
                            <FormInput
                                label="Description"
                                onChange={(e) =>
                                    setSellerDescription(e.target.value)
                                }
                            />
                            <FormInput
                                label="Title"
                                onChange={(e) => setSellerTitle(e.target.value)}
                            />

                            <div className="pt-2">
                                <Button className="button button-primary">
                                    Request approval
                                </Button>
                            </div>
                        </FormContainer>
                    )}

                    <div className="py-8">
                        {seller.error && <Message>{seller.error}</Message>}
                        {seller.data && (
                            <Message>
                                Your request was sent successfully. You will be
                                contacted back soon!
                            </Message>
                        )}
                    </div>
                </div>
            </div>
        </NavbarPage>
    )
}
