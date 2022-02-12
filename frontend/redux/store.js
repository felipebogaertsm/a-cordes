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

const store = () => createStore(reducer, bindMiddlware([...middleware]))

export const storeWrapper = createWrapper(store, { debug: false })
