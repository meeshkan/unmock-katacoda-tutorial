const getUsersForUI = require("./getUsersForUI");

test("test get users for UI", () => {
  expect(getUsersForUI()).toBe(0);
});