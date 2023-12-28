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
  t.test("Create", async (t) => {
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

  t.test("Read", async (t) => {
    const { id } = items[0]
    const response = await app.inject({
      method: "GET",
      url: `/persons/${id}`
    })

    t.equal(response.statusCode, 200)
    t.ok(response.json().data, items[0])
  })

  t.test("Update", async (t) => {
    const { id, first_name, last_name, gender, email } = items[0]
    const response = await app.inject({
      method: "PUT",
      url: `/persons/${id}`,
      body: {
        Age: 20,
        FirstName: first_name,
        LastName: last_name,
        Email: email,
        Gender: gender,
        updatedAt: new Date().toISOString()
      }
    })

    const person = await app.inject({
      method: "GET",
      url: `/persons/${id}`
    })
    t.equal(response.statusCode, 204)
    t.ok(person.json().data.age, "20")
  })

  t.test("Delete", async (t) => {
    const { id } = items[1]
    const response = await app.inject({
      method: "DELETE",
      url: `/persons/${id}`
    })

    t.equal(response.statusCode, 204)
  })
})
