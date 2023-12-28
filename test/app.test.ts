import { test, t } from "tap"
import app from "../app"
import { db } from "../db"

t.beforeEach(async () => {
  await db.deleteFrom("person").returningAll().executeTakeFirst()
})

test("request the '/' route", async (t) => {
  const response = await app.inject({
    method: "GET",
    url: "/"
  })
  t.equal(response.statusCode, 200)
})

test("create Person", async (t) => {
  const response = await app.inject({
    method: "POST",
    url: "/persons",
    body: {
      FirstName: "John",
      LastName: "Doe",
      Age: 18,
      Email: "test@gmail.com",
      Gender: "male"
    }
  })
  t.equal(response.statusCode, 201)
})
