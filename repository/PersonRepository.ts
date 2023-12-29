import { db } from "../db"
import { PersonUpdate, Person, NewPerson } from "../db/types"

export async function findPersonById(id: number) {
  return await db
    .selectFrom("person")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst()
}

export async function findPeople(criteria: Partial<Person>) {
  let query = db.selectFrom("person")

  if (criteria.id) {
    query = query.where("id", "=", criteria.id)
  }

  if (criteria.first_name) {
    query = query.where("first_name", "=", criteria.first_name)
  }

  if (criteria.last_name !== undefined) {
    query = query.where(
      "last_name",
      criteria.last_name === null ? "is" : "=",
      criteria.last_name
    )
  }

  if (criteria.gender) {
    query = query.where("gender", "=", criteria.gender)
  }

  if (criteria.created_at) {
    query = query.where("created_at", "=", criteria.created_at)
  }

  return await query.selectAll().execute()
}

export async function updatePerson(
  id: number,
  updateWith: PersonUpdate & { updated_at: string }
) {
  await db.updateTable("person").set(updateWith).where("id", "=", id).execute()
}

export async function createPerson(person: NewPerson) {
  return await db
    .insertInto("person")
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function deletePerson(id: number) {
  return await db
    .deleteFrom("person")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst()
}
export async function getAllPerson() {
  return await db.selectFrom("person").selectAll().execute()
}
