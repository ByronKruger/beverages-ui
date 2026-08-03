export interface UserAuthRequest {
    username: string;
    email: string;
    password: string;
}

// export interface UserAuthResponse {
//     token: string;
// }

export interface User {
    id: string;
    email: string;
    username: string;
    token: string;
}