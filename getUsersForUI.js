const axios = require("axios");

const getUsersForUI = async () => {
  try {
    const { data } = await axios("https://api.example.com/v1/users");
    return {
      ...data,
      users: data.users.map(user => ({ ...user, seen: false })),
      newlyFetched: true,
      timestamp: new Date().getTime()
    };
  } catch (e) {
    return {
      users: [],
      error: e
    }
  }
};
module.exports = getUsersForUI;
