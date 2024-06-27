export class User {
    id: number;
    mail: string;
    username: string;
    password: string;
    role: string;

    constructor(id: number, mail: string, username: string, password: string, role: string) {
        this.id = id;
        this.mail = mail;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
