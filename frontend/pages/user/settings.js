// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

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

export default function Settings() {
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
                            <FormInput label="Email" />
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
