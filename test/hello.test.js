const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { createApp } = require("../app");

test("GET /hello returns hello payload", async () => {
  const app = createApp();

  const res = await request(app.callback()).get("/hello").expect(200);
  assert.deepEqual(res.body, { message: "hello" });
});

