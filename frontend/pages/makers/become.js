// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useState } from "react"

// Components:
import {
    Button,
    FormContainer,
    FormInput,
    Heading,
    NavbarPage,
} from "../../components"

export default function BecomeSeller() {
    const [sellerName, setSellerName] = useState("")
    const [sellerCity, setSellerCity] = useState("")
    const [sellerCountry, setSellerCountry] = useState("")
    const [sellerDescription, setSellerDescription] = useState("")
    const [sellerTitle, setSellerTitle] = useState("")

    return (
        <NavbarPage>
            <div className="px-6 py-14">
                <Heading>
                    <h1>Become a seller</h1>
                </Heading>

                <div className="mt-40 max-w-[500px] mx-auto">
                    <FormContainer className="flex flex-col space-y-4">
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
                </div>
            </div>
        </NavbarPage>
    )
}
