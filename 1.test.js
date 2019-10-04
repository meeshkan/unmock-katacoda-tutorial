const unmock = require("unmock");
const getUsersForUI = require("./users");

const { u } = unmock;

signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

unmock
  .default
  .nock("https://api.example.com/v1", "example")
  .get("/users")
  .reply(200, {
    users: u.array({ // an array of arbitrary length
      id: u.integer(), // an arbitrary integer
      name: u.string("name.firstName"), // an arbitrary first name
      zodiac: u.opt({ // an optional arbitrary zodiac
        sign: u.stringEnum(signs), // an arbitrary zodiac sign
        ascendant: u.opt(u.string()) // an optional arbitrary string
      })
    })
  });

beforeAll(() => {
  unmock.default.on();
});

test("test get users for UI", async () => {
  const usersForUI = await getUsersForUI();
  expect(typeof usersForUI.timestamp).toBe("number");
});