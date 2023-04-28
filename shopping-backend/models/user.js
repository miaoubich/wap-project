class User {
  constructor(userId, username, password) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }

  static getUserById(userId) {
    const index = db.findIndex((u) => u.userId == userId);
    if (index > -1) {
      return db[index];
    } else {
      return { error: `No such user with ID: ${userId}` };
    }
  }

  static getUsernameByUsernameAndPassword(username, password) {
    const index = db.findIndex(
      (u) => u.username == username && u.password == password
    );
    if (index > -1) {
      const user = db[index];
      return {
        error: null,
        data: {
          accessToken: `${user.userId}-${
            user.username
          }-${Date.now().toString()}`,
        },
      };
    } else {
      return {
        error: `username or password are wrong, please try again.`,
        data: null,
      };
    }
  }

  static getAll() {
    return db;
  }
}

let db = [
  new User(1, "user1", "psw1"),
  new User(2, "user2", "psw2"),
  new User(3, "user3", "psw3"),
];

module.exports = User;
