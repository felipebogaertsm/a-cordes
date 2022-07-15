// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import {
    ORDER_SHIPPING_ADDRESSES_REQUEST,
    ORDER_SHIPPING_ADDRESSES_LIST,
    ORDER_SHIPPING_ADDRESSES_CREATE,
    ORDER_SHIPPING_ADDRESSES_UPDATE,
    ORDER_SHIPPING_ADDRESSES_DELETE,
    ORDER_SHIPPING_ADDRESSES_FAIL,
} from "../types/order"

export const shippingAddressesReducer = (state = { data: [] }, action) => {
    switch (action.type) {
        case ORDER_SHIPPING_ADDRESSES_REQUEST:
            return { loading: true, data: [...state.data] }
        case ORDER_SHIPPING_ADDRESSES_LIST:
            return { data: action.payload }
        case ORDER_SHIPPING_ADDRESSES_CREATE:
            return {
                data: [...state.data, action.payload],
            }
        case ORDER_SHIPPING_ADDRESSES_UPDATE:
            let oldIndex
            state.data.forEach((item, index) => {
                if (item._id === action.payload._id) {
                    oldIndex = index
                }
            })

            let newData = [...state.data]
            newData[oldIndex] = action.payload
            return {
                data: [...newData],
            }
        case ORDER_SHIPPING_ADDRESSES_DELETE:
            return {
                data: [
                    ...state.data.filter(
                        (item) => action.payload._id != item._id
                    ),
                ],
            }
        case ORDER_SHIPPING_ADDRESSES_FAIL:
            return { error: action.error }
        default:
            return state
    }
}
