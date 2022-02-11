// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

import { useEffect } from 'react'

export function isAuthenticated() {
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')
        console.log(userInfo)

        if (userInfo) {
            return true
        } else {
            return false
        }
    })
}

export function verifyToken() {
    return true
}