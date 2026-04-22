const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { createApp } = require("../app");

test("GET /version returns v26.422.1", async () => {
  const app = createApp();

  const res = await request(app.callback()).get("/version").expect(200);
  assert.strictEqual(res.text, "v26.422.1");
});
