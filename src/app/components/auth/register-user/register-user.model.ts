export interface RegisterUserRequest {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
};

export interface RegisterUserResponse {
    token: string
}