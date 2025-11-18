interface User {
    id: number;
    nip: string;
    name: string;
    password: string;
    is_admin: boolean;
}

interface UserRequest {
    nip: string;
    password: string;
}