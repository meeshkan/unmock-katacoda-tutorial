const unmock = require("unmock");
const getUsersForUI = require("./users");

const {
  u,
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
  });

let example;
beforeAll(() => {
  example = unmock.default.on().services.example;
});

test("usersForUI should augment resposne with custom fields", runner(async () => {
  const usersForUI = await getUsersForUI();
  const responseBody = example.spy.getResponseBody();
  expect(usersForUI).toMatchObject(JSON.parse(responseBody));
  example.spy.resetHistory(); // otherwise it will retain history in the runner!
}));
