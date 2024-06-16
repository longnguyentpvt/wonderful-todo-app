import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import FormSelect from "react-bootstrap/FormSelect";
import Row from "react-bootstrap/Row";

import MainLayout from "@app/components/layout/main.layout";

import { TaskStatus } from "@app/types/model";

import { TaskInfo } from "@app/apis/task-api";

const TaskCard = dynamic(() => import("@app/components/cards/task.card"), { ssr: false });
const DetailModal = dynamic(() => import("@app/components/modals/task-detail.modal"), { ssr: false });
const CreateModal = dynamic(() => import("@app/components/modals/create-task.modal"), { ssr: false });

export default function Home(): React.ReactElement {
  const [tasks, setTasks] = useState<TaskInfo[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskInfo | undefined>();
  const [createModalShow, setCreateModalShow] = useState<boolean>(false);

  const openDetailModal = (openTask: TaskInfo): void => {
    setSelectedTask(openTask);
  };

  const closeDetailModal = (): void => setSelectedTask(undefined);

  const onTaskAction = (id: number, action: "delete" | "complete"): void => {
    console.debug(`Task ID: ${ id } - Action: ${ action }`);
    closeDetailModal();
  };

  const toggleCreateModal = (): void => setCreateModalShow((prev) => !prev);

  const onNewData = (name: string, description: string, dueDate: string): void => {
    console.debug(`New Task: ${ name } - ${ description } - ${ dueDate }`);
  };

  useEffect(() => {
    const now = dayjs();
    const fromDate = dayjs(now).subtract(10, "day").toDate();
    const toDate = dayjs(now).subtract(10, "day").toDate();
    const statuses: TaskStatus[] = ["Pending", "InProgress", "Done"];
    const newTasks: TaskInfo[] = [];
    for (let i = 0; i < 24; i += 1) {
      newTasks.push({
        id: i,
        name: `${ faker.lorem.sentence({ min: 3, max: 10 }) }`,
        description: `${ faker.lorem.paragraph({ min: 1, max: 3 }) }`,
        dueDate: dayjs(faker.date.between({ from: fromDate, to: toDate })).toISOString(),
        status: statuses[faker.number.int({ min: 0, max: 2 })]
      });
    }

    setTasks(newTasks);
  }, []);

  const detailModalShow = !!selectedTask;

  return (
    <>
      <Head>
        <title>Wonderful Todo App</title>
        <meta name="description" content="Todo-List platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/todo-app/favicon.ico" />
      </Head>
      <main>
        <MainLayout>
          <div className="mb-4">
            <Row className="g-3">
              <Col xs="12" desktop="auto">
                <FormLabel>Search</FormLabel>
                <FormControl type="text" placeholder="Enter name" />
              </Col>
              <Col xs="12" desktop="auto">
                <FormLabel>Status</FormLabel>
                <FormSelect>
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </FormSelect>
              </Col>
              <Col>
                <div className="d-flex justify-content-end">
                  <div>
                    <FormLabel>&nbsp;</FormLabel>
                    <div>
                      <Button variant="warning" className="fw-bolder" onClick={ toggleCreateModal }>+ NEW TASK</Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div>
            <div className="text-gray-600">
              Showing 24 of 100
            </div>
            <div className="mt-3">
              <Row className="g-3">
                {
                  tasks.map((task) => (
                    <Col key={ task.id } xs={ 12 } onClick={ () => openDetailModal(task) }>
                      <TaskCard data={ task } />
                    </Col>
                  ))
                }
              </Row>
            </div>
          </div>
        </MainLayout>

        <DetailModal show={ detailModalShow } onHide={ closeDetailModal } data={ selectedTask } onAction={ onTaskAction } />
        <CreateModal show={ createModalShow } onHide={ toggleCreateModal } onCreate={ onNewData } />
      </main>
    </>
  );
}
