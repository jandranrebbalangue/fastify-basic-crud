import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely"

export interface Database {
  person: PersonTable
}

export interface PersonTable {
  id: Generated<number>
  first_name: string
  gender: "male" | "woman" | "other"
  email: string
  age: number
  last_name: string
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}

export type Person = Selectable<PersonTable>
export type NewPerson = Insertable<PersonTable>
export type PersonUpdate = Updateable<PersonTable>
