export interface UserAuthRequest {
    username: string;
    email: string;
    password: string;
}

// export interface UserAuthResponse {
//     token: string;
// }

export interface User {
    email: string;
    username: string;
    token: string;
}