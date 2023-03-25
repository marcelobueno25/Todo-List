import { useState } from "react";
import { Header } from "./components/Header";
import { List } from "./components/List";
import styles from "./App.module.css";
import "./global.css";

export function App() {
  const data = JSON.parse(localStorage.getItem("tarefas") as string) || [];

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <List data={data} />
        </main>
      </div>
    </div>
  );
}
