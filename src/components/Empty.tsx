import styles from "./Empty.module.css";
import IconBloco from "../assets/bloco.svg";

export function Empty() {
  return (
    <div className={styles.empty}>
      <img src={IconBloco} alt="Não contém tarefas cadastradas" />
      <p>
        <strong>Você ainda não tem tarefas cadastradas</strong>
      </p>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}
