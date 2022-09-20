import ALBUM from "./ALBUM";

export class User {

    id = '';
    username = '';
    email = '';
    album = ALBUM;
    albumCompleted = false;

    constructor(id, username, email) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.album = ALBUM;
        this.albumCompleted = false;
    }

}