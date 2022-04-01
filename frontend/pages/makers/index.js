// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// Actions:
import { allSellerProfiles } from "../../redux/actions/user"

// Components:
import {
    Heading,
    Loader,
    MakerItem,
    Message,
    NavbarPage,
} from "../../components"

export default function Makers() {
    const dispatch = useDispatch()

    const { error, loading, makers } = useSelector(
        (state) => state.sellerProfiles
    )

    useEffect(() => {
        dispatch(allSellerProfiles())
    }, [dispatch])

    return (
        <NavbarPage>
            <div className="px-6 py-14">
                <div className="flex flex-row">
                    <Heading>Makers</Heading>
                </div>

                <div className="mt-20 px-6 w-full flex flex-col space-y-2">
                    {loading ? (
                        <div className="w-full mx-auto">
                            <Loader />
                        </div>
                    ) : error ? (
                        <Message>{error}</Message>
                    ) : (
                        makers &&
                        makers.map((maker, index) => (
                            <div key={index} className="flex flex-row w-full ">
                                <h5 className="my-auto mr-2">{index}</h5>
                                <MakerItem maker={maker} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </NavbarPage>
    )
}
