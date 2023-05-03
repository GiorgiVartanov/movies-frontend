import ajax from "./ajax"

export const register = (userData) => ajax.post("/auth/register", userData) // registers user with the passed data
export const login = (userData) => ajax.post("/auth/login", userData) // logs in user with the passed data
