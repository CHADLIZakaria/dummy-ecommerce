export type UserLoginRequest = {
    username: string,
    password: string
}
export type UserToken = {
    token: string,
    expiresAt: number
}