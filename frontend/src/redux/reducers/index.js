// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at me@felipebm.com

import { combineReducers } from "redux"

// Reducers:
import { cartReducer } from "./cart"
import { shippingAddressesReducer } from "./order"

const reducer = combineReducers({
    cart: cartReducer,

    shippingAddresses: shippingAddressesReducer,
})

export default reducer
