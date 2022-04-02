// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export function getDetailFromResponseError(err) {
    if (err.response.data) {
        if (
            typeof err.response.data === "string" &&
            err.response.data.length < 1000
        ) {
            return err.response.data
        }

        if (
            Array.isArray(err.response.data.messages) &&
            err.response.data.messages.length > 0
        ) {
            return err.response.data.messages[0].message
        }

        if (err.response.data.detail) {
            return err.response.data.detail
        }
    }

    return err.message
}
