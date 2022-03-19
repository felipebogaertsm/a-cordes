// -*- coding: utf-8 -*-
// Licensed as the GNU General Public License as published by the Free Software
// Foundation, version 3.
// Author: Felipe Bogaerts de Mattos
// Contact me at felipe.bogaerts@engenharia.ufjf.br

// Paths:
export const BACKEND_URL =
    process.env.NODE_ENV === "production"
        ? "https://acordes.shop"
        : "http://127.0.0.1:8000"
export const INDEX_PATH = "/"
export const LOGIN_PATH = "/auth/login"

// Misc:
export const TOKEN_NAME = "acordes.token"
