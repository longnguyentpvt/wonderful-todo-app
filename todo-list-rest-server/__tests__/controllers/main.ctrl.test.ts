import app from "@app/app";
import request from "supertest";

import { HealthCheckRp } from "@app/types/api-response";

describe("Test Controller Apis", () => {
  test("Test health check api", async () => {
    const rp = await request(app).post("/test/health-check");
    const {
      time
    } = rp.body as HealthCheckRp;

    expect(rp.statusCode).toBe(200);
    expect(time).toBeDefined();
  });
});
