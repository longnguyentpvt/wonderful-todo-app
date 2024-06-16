import app from "@app/app";
import dayjs from "dayjs";
import request from "supertest";

import { config as dbConfig, close as closeDb } from "@app/db";

import { TaskStatus } from "@app/types/models";
import { TaskDto } from "@app/types/services";

describe("Test Tasks CRUD Apis", () => {
  beforeAll(async () => {
    await dbConfig();
  });

  afterAll(async () => {
    await closeDb();
  });

  let creaatedTaskId: number;
  const createdTaskName = "Test case";
  const createdTaskDesc = "Task desciption";
  const dueDate = dayjs().add(10, "day").toISOString();

  test("List tasks api", async () => {
    const rp = await request(app).get("/tasks/list?page=1&pageSize=10&filterName=Wonderful&filterStatus=Done")
      .set("Access-Token", "test-token");
    const {
      data,
      countAll
    } = rp.body as {
      data: TaskDto[],
      countAll: number
    };

    expect(rp.statusCode).toBe(200);

    expect(countAll).toBeGreaterThanOrEqual(0);

    const firstItem = data[0];
    expect(firstItem).toBeDefined();
    expect(firstItem.name).toBeDefined();
    expect(firstItem.description).toBeDefined();
    expect(firstItem.status).toBeDefined();
    expect(firstItem.dueDate).toBeDefined();
  });

  test("Create api", async () => {
    const rp = await request(app).post("/tasks/new")
      .set("Access-Token", "test-token")
      .send({ name: createdTaskName, description: createdTaskDesc, dueDate });
    const rpBody = rp.body as TaskDto;

    expect(rp.statusCode).toBe(200);
    expect(rpBody).toMatchObject({
      name: createdTaskName,
      description: createdTaskDesc,
      dueDate,
      status: TaskStatus.Pending
    });

    creaatedTaskId = rpBody.id;
  });

  test("Update api", async () => {
    const newName = "Test case updated";
    const newDesc = "Test desc updated";
    const rp = await request(app).post("/tasks/update")
      .set("Access-Token", "test-token")
      .send({
        id: creaatedTaskId, name: newName, description: newDesc, status: TaskStatus.Done
      });
    const rpBody = rp.body as TaskDto;

    expect(rp.statusCode).toBe(200);
    expect(rpBody).toMatchObject({
      name: newName,
      description: newDesc,
      status: TaskStatus.Done
    });
    expect(rpBody.completedDate).toBeDefined();

    creaatedTaskId = rpBody.id;
  });

  test("Delete api", async () => {
    const rp = await request(app).delete(`/tasks/delete?id=${ creaatedTaskId }`)
      .set("Access-Token", "test-token");

    expect(rp.statusCode).toBe(200);
  });
});
