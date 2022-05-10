// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

export function truncateString(string, maxLength) {
    if (string.length > maxLength) {
        return string.slice(0, maxLength - 3) + "..."
    }
    return string
}
