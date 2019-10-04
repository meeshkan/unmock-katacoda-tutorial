const unmock = require("unmock");
const getUsersForUI = require("./users");

const { u } = unmock;

unmock
  .default
  .nock("https://api.example.com/v1", "example")
  .get("/users")
  .reply(200, {
    users: u.array(u.type({
      id: u.number(),
      name: u.string()
    }, {
      zodiac: u.type({
        sign: u.string(),
      }, {
        ascendant: u.string()
      })
    }))
  });

beforeAll(() => {
  unmock.default.on();
});

test("test get users for UI", async () => {
  const usersForUI = await getUsersForUI();
  expect(typeof usersForUI.timestamp).toBe("number");
});