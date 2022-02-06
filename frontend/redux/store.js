// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { createStore, applyMiddleware, compose } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import thunk from 'redux-thunk'
import reducer from './reducers'

const middleware = [thunk]

const bindMiddlware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }

    return applyMiddleware(...middleware)
}

// const cartItemsFromStorage = localStorage.getItem('cartItems') ?
//     JSON.parse(localStorage.getItem('cartItems')) : []

// const userInfoFromStorage = localStorage.getItem('userInfo') ?
//     JSON.parse(localStorage.getItem('userInfo')) : null

// const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
//     JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    // cart: {
    //     cartItems: cartItemsFromStorage,
    //     shippingAddress: shippingAddressFromStorage,
    // },
    // userLogin: { userInfo: userInfoFromStorage },
    userLogin: { userInfo: {} },
}

const store = () => createStore(reducer, initialState, bindMiddlware([...middleware]))

export const storeWrapper = createWrapper(store, { debug: false })

// import { createStore, applyMiddleware, compose } from "redux"
// import thunk from "redux-thunk"
// import { createWrapper } from "next-redux-wrapper"
// import rootReducer from "./reducers/rootReducer"

// const makeStore = () => createStore(rootReducer, compose(applyMiddleware(...middleware)))

// export const wrapper = createWrapper(makeStore)
