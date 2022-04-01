// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export function getDetailFromResponseError(err) {
    try {
        return String(
            err.response
                ? err.response.data
                    ? err.response.data.messages
                        ? err.response.data.messages[0].message
                        : err.response.data.detail
                    : err.response.data
                : err.message
        )
    } catch (err) {
        return err.message
    }
}
