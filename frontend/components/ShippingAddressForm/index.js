// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useContext, useEffect, useState } from "react"
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
    FormCheckbox,
    FormContainer,
    FormInput,
    Loader,
    SubHeading,
} from "../../components"

// Contexts:
import { AuthContext } from "../../contexts/auth"

// Utils:
import { truncateString } from "../../utils/strings"

export default function ShippingAddressForm({ select, onSelect }) {
    const { user } = useContext(AuthContext)

    const dispatch = useDispatch()
    const shippingAddresses = useSelector((state) => state.shippingAddresses)

    const [selectedId, setSelectedId] = useState(select)
    const [firstLoad, setFirstLoad] = useState(true)

    useEffect(() => {
        if (shippingAddresses.data.length > 0 && firstLoad && !selectedId) {
            console.log(shippingAddresses.data)
            setSelectedId(shippingAddresses.data[0]._id)
            setFirstLoad(false)
        }
    }, [shippingAddresses.data])

    useEffect(() => {
        dispatch(listShippingAddresses())
    }, [])

    return (
        <div>
            <SubHeading>Shipping address</SubHeading>
            {shippingAddresses.loading && <Loader />}
            {shippingAddresses.data &&
                shippingAddresses.data.map((sa, item) => (
                    <div key={item}>
                        <div className="pt-3"></div>
                        <Accordion
                            expanded={sa.expanded}
                            title={
                                <div className="py-2 flex flex-row w-full">
                                    <img
                                        src="/icons/close.svg"
                                        onClick={() => {
                                            dispatch(
                                                deleteShippingAddress(sa._id)
                                            )
                                        }}
                                    ></img>
                                    <h6>{truncateString(sa.address, 50)}</h6>
                                    <div className="grow"></div>
                                    <div className="mx-2 pointer-events-auto relative">
                                        <FormCheckbox
                                            value={sa._id}
                                            className="pointer-events-auto"
                                            checked={sa._id === selectedId}
                                            onChange={(e) =>
                                                setSelectedId(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            }
                        >
                            <FormContainer className="flex flex-col space-y-2">
                                <FormInput
                                    label="Address"
                                    defaultValue={sa.address}
                                    onChange={(e) =>
                                        dispatch(
                                            updateShippingAddress(sa._id, {
                                                address: e.target.value,
                                            })
                                        )
                                    }
                                />
                                <FormInput
                                    label="City"
                                    defaultValue={sa.city}
                                    onChange={(e) =>
                                        dispatch(
                                            updateShippingAddress(sa._id, {
                                                city: e.target.value,
                                            })
                                        )
                                    }
                                />
                                <FormInput
                                    label="Postal Code"
                                    defaultValue={sa.postal_code}
                                    onChange={(e) =>
                                        dispatch(
                                            updateShippingAddress(sa._id, {
                                                postal_code: e.target.value,
                                            })
                                        )
                                    }
                                />
                                <FormInput
                                    label="Country"
                                    defaultValue={sa.country}
                                    onChange={(e) =>
                                        dispatch(
                                            updateShippingAddress(sa._id, {
                                                country: e.target.value,
                                            })
                                        )
                                    }
                                />
                            </FormContainer>
                        </Accordion>
                    </div>
                ))}

            <div className="pt-4">
                <Button
                    secondary
                    onClick={(e) => {
                        e.preventDefault()
                        dispatch(createShippingAddress(user._id))
                    }}
                >
                    <div className="flex flex-row">
                        <img src="/icons/close.svg" className="rotate-45"></img>
                        <p className="pl-2">New shipping address</p>
                    </div>
                </Button>
            </div>
        </div>
    )
}
