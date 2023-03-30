const app = require("../app");
const assert = require("assert");
const request = require("supertest")(app);

describe("GET /", function () {
  it("should return status code 200", function (done) {
    request
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("should return Welcome to the Scello Assessment homepage", function() {
    request
      .get("/")
      .expect('"<h1>Welcome to the Scello Assessment homepage</h1>"')
      
  });

  it("It should return status code 404 for invalid routes", async () => {
    await request.get("/invalid-route").expect(404);
  });

    it("It should return status code 200 for GET /api/v1/cart", async () => {
      const response = await request
        .get("/api/v1/cart")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      assert.strictEqual(response.status, 200);
    });
    it("It should return status code 200 for GET /api/v1/coupon", async () => {
      const response = await request
        .get("/api/v1/coupon")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      assert.strictEqual(response.status, 200);
    });
});
