import ajax from "./ajax"

export const register = (userData) => ajax.post("/auth/register", userData)
export const login = (userData) => ajax.post("/auth/login", userData)
