// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect } from "react"

// Components:
import {
    Heading,
    ListItem,
    Loader,
    MakerItem,
    Message,
    NavbarPage,
} from "../../components"

// Constants:
import { ACCOUNTS_SELLERS_PATH } from "../../constants/apis"

// Hooks:
import { useFetch } from "../../hooks"

export default function Makers() {
    const [sellers, doFetch] = useFetch({
        method: "get",
        url: ACCOUNTS_SELLERS_PATH,
    })

    useEffect(() => {
        doFetch()
    }, [])

    return (
        <NavbarPage>
            <div className="px-6 py-14">
                <div className="flex flex-row">
                    <Heading>Makers</Heading>
                </div>

                <div className="mt-20 px-6 w-full flex flex-col space-y-2">
                    {sellers.loading ? (
                        <div className="w-full mx-auto">
                            <Loader />
                        </div>
                    ) : sellers.error ? (
                        <Message>{sellers.error}</Message>
                    ) : (
                        sellers.data &&
                        sellers.data.map((maker, index) => (
                            <ListItem key={index} number={index + 1}>
                                <MakerItem maker={maker} />
                            </ListItem>
                        ))
                    )}
                </div>
            </div>
        </NavbarPage>
    )
}
