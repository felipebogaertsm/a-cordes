// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

// Constantd:
import {
    ORDERS_SHIPPING_ADDRESSES_PATH,
    ORDERS_MY_SHIPPING_ADDRESSES_PATH,
    ORDERS_SHIPPING_ADDRESS_PATH,
} from "../../constants/apis"

// Types:
import {
    ORDER_SHIPPING_ADDRESSES_REQUEST,
    ORDER_SHIPPING_ADDRESSES_LIST,
    ORDER_SHIPPING_ADDRESSES_CREATE,
    ORDER_SHIPPING_ADDRESSES_UPDATE,
    ORDER_SHIPPING_ADDRESSES_DELETE,
    ORDER_SHIPPING_ADDRESSES_FAIL,
} from "../types/order"

// Utils:
import { getClient } from "../../utils/axios"
import { getDetailFromResponseError } from "../../utils/errors"

export const listShippingAddresses = () => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_SHIPPING_ADDRESSES_REQUEST,
        })

        const { data } = await getClient().get(
            ORDERS_MY_SHIPPING_ADDRESSES_PATH
        )

        dispatch({ type: ORDER_SHIPPING_ADDRESSES_LIST, payload: data })
    } catch (err) {
        dispatch({
            type: ORDER_SHIPPING_ADDRESSES_FAIL,
            payload: getDetailFromResponseError(err),
        })
    }
}

export const createShippingAddress = (user_id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_SHIPPING_ADDRESSES_REQUEST,
        })

        const { data } = await getClient().post(
            ORDERS_SHIPPING_ADDRESSES_PATH,
            { user: user_id }
        )

        dispatch({ type: ORDER_SHIPPING_ADDRESSES_CREATE, payload: data })
    } catch (err) {
        dispatch({
            type: ORDER_SHIPPING_ADDRESSES_FAIL,
            payload: getDetailFromResponseError(err),
        })
    }
}

export const updateShippingAddress = (id, payload) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_SHIPPING_ADDRESSES_REQUEST,
        })

        const { data } = await getClient().patch(
            ORDERS_SHIPPING_ADDRESS_PATH.replace("[id]", id),
            payload
        )

        dispatch({ type: ORDER_SHIPPING_ADDRESSES_UPDATE, payload: data })
    } catch (err) {
        dispatch({
            type: ORDER_SHIPPING_ADDRESSES_FAIL,
            payload: getDetailFromResponseError(err),
        })
    }
}

export const deleteShippingAddress = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_SHIPPING_ADDRESSES_REQUEST,
        })

        await getClient().delete(
            ORDERS_SHIPPING_ADDRESS_PATH.replace("[id]", id)
        )

        dispatch({
            type: ORDER_SHIPPING_ADDRESSES_DELETE,
            payload: { _id: id },
        })
    } catch (err) {
        dispatch({
            type: ORDER_SHIPPING_ADDRESSES_FAIL,
            payload: getDetailFromResponseError(err),
        })
    }
}
