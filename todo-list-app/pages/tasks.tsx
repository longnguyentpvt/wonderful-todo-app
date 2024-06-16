import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Head from "next/head";
import {
  useCallback, useEffect, useRef, useState
} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FormLabel from "react-bootstrap/FormLabel";
import FormSelect from "react-bootstrap/FormSelect";
import Row from "react-bootstrap/Row";

import DebounceInput from "@app/components/custom/debounce-input";
import MainLayout from "@app/components/layout/main.layout";
import LoadingSpinner from "@app/components/loading-overlay";

import { TaskStatus } from "@app/types/model";

import {
  TaskInfo, deleteTask, editTask, getTasks, newTask
} from "@app/apis/task-api";

import { pushMsg } from "@app/services/toast";

const TaskCard = dynamic(() => import("@app/components/cards/task.card"), { ssr: false });
const DetailModal = dynamic(() => import("@app/components/modals/task-detail.modal"), { ssr: false });
const CreateModal = dynamic(() => import("@app/components/modals/create-task.modal"), { ssr: false });

export default function Home(): React.ReactElement {
  const [tasks, setTasks] = useState<TaskInfo[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskInfo | undefined>();
  const [createModalShow, setCreateModalShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const statusRef = useRef<HTMLSelectElement>(null);
  const searchRef = useRef<string>();

  const fetchData = useCallback(async (refetch?: boolean): Promise<void> => {
    if (!refetch) { setLoading(true); }

    const filterStatus = statusRef.current?.value as TaskStatus;
    const filterName = searchRef.current ?? undefined;

    const {
      data,
      errorCode
    } = await getTasks({
      page: 1, pageSize: 50, filterStatus, filterName
    });
    if (errorCode) {
      pushMsg({
        status: "danger",
        header: "System Error",
        message: "Failed to fetch data!"
      });

      return;
    }

    if (!data) return;
    const {
      data: newTasks,
      countAll
    } = data;

    setTasks(newTasks);
    setTotal(countAll);
    setLoading(false);
  }, []);

  const openDetailModal = (openTask: TaskInfo): void => {
    setSelectedTask(openTask);
  };

  const closeDetailModal = (): void => setSelectedTask(undefined);

  const closeTask = async (id: number): Promise<void> => {
    setLoading(true);

    const { data, errorCode } = await deleteTask({ id });
    if (errorCode) {
      pushMsg({
        status: "danger",
        header: "System Error",
        message: "Failed to close the task!"
      });

      return;
    }

    if (!data) return;

    fetchData(true);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    pushMsg({
      status: "success",
      header: "Task",
      message: "The task has been deleted successfuly!"
    });

    setLoading(false);
  };

  const completeTask = async (id: number): Promise<void> => {
    setLoading(true);

    const { data, errorCode } = await editTask({ id, status: "Done" });
    if (errorCode) {
      pushMsg({
        status: "danger",
        header: "System Error",
        message: "Failed to complete the task!"
      });

      return;
    }

    if (!data) return;

    fetchData(true);
    setTasks((prevTasks) => prevTasks.map((task) => {
      if (task.id === id) {
        return data;
      }

      return task;
    }));

    pushMsg({
      status: "success",
      header: "Task",
      message: "The task is updated to Done!"
    });

    setLoading(false);
  };

  const onTaskAction = async (id: number, action: "delete" | "complete"): Promise<void> => {
    closeDetailModal();
    if (action === "complete") {
      await completeTask(id);
    } else {
      await closeTask(id);
    }
  };

  const toggleCreateModal = (): void => setCreateModalShow((prev) => !prev);

  const onNewData = async (name: string, description: string, dueDate: string): Promise<void> => {
    setLoading(true);
    toggleCreateModal();

    const { data, errorCode } = await newTask({ name, description, dueDate });
    if (errorCode) {
      pushMsg({
        status: "danger",
        header: "System Error",
        message: "Failed to create new task!"
      });

      return;
    }

    if (!data) return;

    fetchData(true);
    setTasks((prevTasks) => [data, ...prevTasks]);

    pushMsg({
      status: "success",
      header: "Task",
      message: "New task has been created successfully!"
    });

    setLoading(false);
  };

  const onStatusFilteChange = (): void => {
    fetchData();
  };

  const onSearch = useCallback(async (text: string): Promise<void> => {
    console.log("onSearch called");
    searchRef.current = text;
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();

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
  const noTasks = tasks.length;

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
                <DebounceInput type="text" placeholder="Enter name" onCall={ onSearch } />
              </Col>
              <Col xs="12" desktop="auto">
                <FormLabel>Status</FormLabel>
                <FormSelect ref={ statusRef } onChange={ onStatusFilteChange }>
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
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
              Showing { noTasks } of { total }
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

          <LoadingSpinner loading={ loading } />
        </MainLayout>

        <DetailModal show={ detailModalShow } onHide={ closeDetailModal } data={ selectedTask } onAction={ onTaskAction } />
        <CreateModal show={ createModalShow } onHide={ toggleCreateModal } onCreate={ onNewData } />
      </main>
    </>
  );
}
