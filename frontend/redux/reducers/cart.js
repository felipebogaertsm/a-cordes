// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

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
} from '../types/cart';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM_REQUEST:
            return { loading: true, cartItems: [...state.cartItems] }
        case CART_ADD_ITEM_SUCCESS:
            return { cartItems: [...state.cartItems, action.payload], success: true }
        case CART_ADD_ITEM_FAIL:
            return { error: action.payload, cartItems: [...state.cartItems] }
        case CART_DELETE_ITEM_REQUEST:
            return { loading: true, cartItems: [...state.cartItems] }
        case CART_DELETE_ITEM_SUCCESS:
            const newCartItems = [...state.cartItems].filter(item => action.payload._id != item._id)
            return { cartItems: [...newCartItems] }
        case CART_DELETE_ITEM_FAIL:
            return { error: action.payload, cartItems: [...state.cartItems] }
        case CART_GET_ALL_REQUEST:
            return { loading: true, cartItems: [] }
        case CART_GET_ALL_SUCCESS:
            return { cartItems: action.payload }
        case CART_GET_ALL_FAIL:
            return { error: action.payload, cartItems: [] }
        case CART_CLEAR_ITEMS:
            return { cartItems: [] }
        default:
            return state;
    }
}