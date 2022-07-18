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

  it("OK, getting suggestions has no suggestions", (done) => {
    supertest(app)
      .get("/v1/suggestions?q=SomeRandomCityInTheMiddleOfNowhere")
      .then((res: Response) => {
        const body = res.body;
        expect(body).to.have.property("suggestions");
        expect(body).to.deep.equal({ suggestions: [] });
        done();
      })
      .catch((err: ErrorRequestHandler) => {
        done(err);
      });
  });

  it("OK, getting suggestions.. with result", (done) => {
    supertest(app)
      .get("/v1/suggestions?q=tor&latitude=43.70011&longitude=-79.4163&radius=5&sort=distance")
      .then((res: Response) => {
        const body = res.body;
        expect(body).to.have.property("suggestions");
        expect(body.suggestions).to.have.lengthOf.above(0);
        const suggestion = body.suggestions[0];
        expect(suggestion).to.have.property("name");
        expect(suggestion).to.have.property("distance");
        expect(suggestion).to.have.property("longitude");
        expect(suggestion).to.have.property("latitude");
        done();
      })
      .catch((err: ErrorRequestHandler) => {
        done(err);
      });
  });
});
