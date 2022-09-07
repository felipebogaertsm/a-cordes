// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { useContext, useState } from "react"
import { useRouter } from "next/router"

// Components:
import { Button } from "@/components/elements/buttons"
import { FormContainer, FormInput } from "@/components/elements/forms"
import { Heading, Message } from "@/components/elements/text"
import { NavbarPage, PrivatePage } from "@/components/layouts"

// Constants:
import { ACCOUNTS_SELLERS_PATH } from "@/constants/apis"

// Contexts:
import { AuthContext } from "@/contexts/auth"

// Hooks:
import { useFetch } from "@/hooks"

// Utils:
import { getClient } from "@/utils/axios"

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
            <PrivatePage>
                <div className="py-4">
                    <Heading>
                        <h1>Become a seller</h1>
                    </Heading>
                </div>

                <div className="mt-8 max-w-[500px] mx-auto">
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
                            onChange={(e) => setSellerCountry(e.target.value)}
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
                            <Button primary>Request approval</Button>
                        </div>
                    </FormContainer>

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
            </PrivatePage>
        </NavbarPage>
    )
}
