import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./List.module.css";
import { Task } from "./Task";
import IconAdicionar from "../assets/iconAdicionar.svg";
import { Empty } from "./Empty";

interface TasksProps {
  data: TaskProps[];
}

export interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
}

export function List({ data }: TasksProps) {
  const [taskData, setTaskData] = useState(data);
  const [newtaskData, setNewTaskData] = useState("");
  const [numCheck, setNumCheck] = useState(0);

  useEffect(() => {
    setTaskData(data);
  }, [data]);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(taskData));
    handleCount();
  }, [taskData]);

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    setTaskData([
      {
        id: uuidv4(),
        title: newtaskData,
        isComplete: false,
      },
      ...taskData,
    ]);
    setNewTaskData("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setNewTaskData(event.target.value);
  }

  function handleDeleteTask(task: TaskProps) {
    let remove = taskData.filter((element) => element.id !== task.id);
    setTaskData(remove);
  }

  function handleCount() {
    let check = taskData.reduce((concluidos, element) => {
      if (element.isComplete) concluidos += 1;
      return concluidos;
    }, 0);
    setNumCheck(check);
  }

  function handleCheckTask(task: TaskProps) {
    let check = taskData.map((elemento) => {
      if (elemento.id === task.id)
        elemento = { ...elemento, isComplete: !elemento.isComplete };
      return elemento;
    });
    check.sort((x, y) =>
      x.isComplete === y.isComplete ? 1 : x.isComplete ? 1 : -1
    );
    setTaskData(check);
  }

  return (
    <div>
      <header>
        <form className={styles.form} onSubmit={handleCreateTask}>
          <input
            value={newtaskData}
            onChange={handleNewTaskChange}
            placeholder="Adicione uma nova tarefa"
            minLength={10}
          />
          <button type="submit" disabled={!newtaskData}>
            Criar <img src={IconAdicionar} />
          </button>
        </form>
      </header>
      <div className={styles.status}>
        <strong className={styles.criadas}>
          Tarefas criadas <span>{taskData.length}</span>
        </strong>
        <strong className={styles.concluidas}>
          Concluídas{" "}
          <span>
            {numCheck} de {taskData.length}
          </span>
        </strong>
      </div>
      <main>
        {taskData.length ? (
          taskData.map((item: TaskProps) => {
            return (
              <Task
                key={item.id}
                task={item}
                checkTask={handleCheckTask}
                deleteTask={handleDeleteTask}
              />
            );
          })
        ) : (
          <Empty />
        )}
      </main>
    </div>
  );
}
