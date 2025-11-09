interface User {
    id: number;
    username: string;
    password: string;
    is_admin: boolean;
}

interface UserRequest {
    username: string;
    password: string;
}