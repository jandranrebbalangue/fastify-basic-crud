import { test } from "tap";
import app from "../app";

test("request the '/' route", async (t) => {
  const response = await app.inject({
    method: "GET",
    url: "/",
  });
  t.equal(response.statusCode, 200);
});
