const unmock = require("unmock");
const getUsersForUI = require("./getUsersForUI");

const {
  u,
  runner,
  sinon: { assert },
} = unmock;

unmock.default
  .nock("https://api.example.com/v1", "example")
  .get("/users")
  .reply(200, {
    users: u.array(
      u.type(
        {
          id: u.number(),
          name: u.string(),
        },
        {
          zodiac: u.type(
            {
              sign: u.string(),
            },
            {
              ascendant: u.string(),
            }
          ),
        }
      )
    ),
  });

let example;
beforeAll(() => {
  example = unmock.default.on().services.example;
});

test(
  "usersForUI should augment response with custom fields",
  runner(async () => {
    const usersForUI = await getUsersForUI();
    const responseBody = example.spy.getResponseBody();
    expect(usersForUI).toMatchObject(JSON.parse(responseBody));
    assert.calledOnce(example.spy); // Using sinon.assert for more descriptive `expect`s
    example.spy.resetHistory(); // otherwise it will retain history in the runner!
  })
);
