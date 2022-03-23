// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// Constants:
import {
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_ADD_ITEM_FAIL,
    CART_DELETE_ITEM_REQUEST,
    CART_DELETE_ITEM_SUCCESS,
    CART_DELETE_ITEM_FAIL,
    CART_GET_ALL_SUCCESS,
    CART_GET_ALL_REQUEST,
    CART_GET_ALL_FAIL,
    CART_CLEAR_ITEMS,
} from "../types/cart"

// Utils:
import { getClient } from "../../utils/axios"

const client = getClient()

export const addToCart = (id, qty) => async (dispatch) => {
    try {
        dispatch({
            type: CART_ADD_ITEM_REQUEST,
        })

        const { data } = await client.post(
            `/api/cart/item/0/?product_id=${encodeURIComponent(id)}&qty=${qty}`,
            {}
        )

        dispatch({
            type: CART_ADD_ITEM_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CART_ADD_ITEM_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}

export const removeFromCart = (id) => async (dispatch) => {
    try {
        dispatch({
            type: CART_DELETE_ITEM_REQUEST,
        })

        const { data } = await client.delete(
            `/api/cart/item/${encodeURIComponent(id)}/`
        )

        dispatch({
            type: CART_DELETE_ITEM_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CART_DELETE_ITEM_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}

export const getCart = () => async (dispatch) => {
    try {
        dispatch({
            type: CART_GET_ALL_REQUEST,
        })

        const { data } = await client.get(`/api/cart/`)

        dispatch({
            type: CART_GET_ALL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CART_GET_ALL_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}

export const clearCart = () => async (dispatch) => {
    const { data } = await client.delete(`/api/cart/`)

    dispatch({
        type: CART_CLEAR_ITEMS,
        payload: data,
    })
}
