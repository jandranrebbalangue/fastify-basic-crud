import { test } from "tap"
import app from "../app"

test("request the '/' route", async (t) => {
  const response = await app.inject({
    method: "GET",
    url: "/"
  })
  t.equal(response.statusCode, 200)
})

test("create new data", async (t) => {
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
  t.equal(response.json, "{id:1}")
})
