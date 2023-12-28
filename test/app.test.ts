import { test, t } from "tap"
import { Response } from "light-my-request"
import app from "../app"
import { db } from "../db"
import { Person } from "../db/types"
import persons from "./fixtures/fixtures.json"

t.before(async () => {
  await db.deleteFrom("person").returningAll().executeTakeFirst()
})

test("request the '/' route", async (t) => {
  const response = await app.inject({
    method: "GET",
    url: "/"
  })
  t.equal(response.statusCode, 200)
})

test("Person", async (t) => {
  const items: Person[] = []
  t.test("Create Person", async (t) => {
    const promises: Promise<Response>[] = []
    persons.forEach((item) => {
      promises.push(
        app.inject({
          method: "POST",
          url: "/persons",
          body: item
        })
      )
    })

    await Promise.all(promises).then((val) => {
      val.forEach((item) => {
        items.push(item.json())
        t.equal(item.statusCode, 201)
      })
    })
  })

  t.test("Read Person", async (t) => {
    const { id } = items[0]
    const response = await app.inject({
      method: "GET",
      url: `/persons/${id}`
    })

    t.equal(response.statusCode, 200)
    t.ok(response.json().data, items[0])
  })
})
