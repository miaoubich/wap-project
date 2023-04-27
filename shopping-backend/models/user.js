let db = [
    ['user1', 'psw1'],
    ['user2', 'psw2'],
    ['user3', 'psw3']
];

class User {
    constructor(userId, username, password) {
        this.userId = userId;
        this.username = username;
        this.password == password;
    }

    static getUserById(userId){
        const index = db.findIndex(u => u.userId == userId);
        if(index > -1){
            return db[index];
        }else{
            return {error: `No such user with ID: ${userId}`}
        }
    }

    static getUsernameByUsernameAndPassword(username, password){
        const index = db.findIndex(u => u.username == username && u.password == password);
        if(index > -1){
            return db[index];
        }else{
            return {error: `username or password are wrong, please try again.`}
        }
    }

    static getAll(){
        return db;
    }
}

module.exports = User;
