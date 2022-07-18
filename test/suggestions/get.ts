process.env.ENVIRON = "test";
import mongoose from "../../src/connection";
import { expect } from "chai";
import supertest, { Response } from "supertest";

import { app } from "../../src/index";
import { after, describe, it } from "mocha";
import { ErrorRequestHandler } from "express";

describe("GET /suggestions", () => {
  after((done) => {
    mongoose.connection
      .close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("OK, getting suggestions has no suggestions", async () => {
    supertest(await app)
      .get("/v1/suggestions?q=SomeRandomCityInTheMiddleOfNowhere")
      .then(async (res: Response) => {
        const body = res.body;
        expect(body).to.equal({ suggestions: [] });
      })
      .catch(async (err: ErrorRequestHandler) => {
        console.log("err is : ", err);
      });
  });
});
