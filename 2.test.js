const unmock = require("unmock");
const getUsersForUI = require("./users");

const {
  u,
  transform: { withCodes, responseBody },
  runner
} = unmock;

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
  })
  .get("/users")
  .reply(404, {
    message: "Service is down."
  });

let example;
beforeAll(() => {
  example = unmock.default.on().services.example;
});

test("usersForUI should always return a users array", runner(async () => {
  const usersForUI = await getUsersForUI();
  expect(usersForUI.users instanceof Array).toBe(true);
}));

test("usersForUI should initialize each user with seen: false", async () => {
  example.state(
    withCodes(200),
    responseBody().minItems(1)
  );
  const usersForUI = await getUsersForUI();
  expect(usersForUI.users.filter(i => i.seen === false).length)
    .toBe(usersForUI.users.length);
});