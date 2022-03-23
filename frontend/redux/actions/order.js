// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// Types:
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
} from "../types/order"
import { CART_CLEAR_ITEMS } from "../types/cart"

// Utils:
import { getClient } from "../../utils/axios"

const client = getClient()

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const { data } = await client.post(`/api/orders/item/`, order)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        const { data } = await client.get(`/api/orders/${id}/`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}

export const payOrder = (id, paymentResult) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        const { data } = await client.put(
            `/api/orders/${id}/pay/`,
            paymentResult
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}

export const deliverOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST,
        })

        const { data } = await client.put(
            `/api/orders/${order._id}/deliver/`,
            {}
        )

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}

export const listMyOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST,
        })

        const { data } = await client.get(`/api/orders/my-orders/`)

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}

export const listOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST,
        })

        const { data } = await client.get(`/api/orders/all/`)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
}
