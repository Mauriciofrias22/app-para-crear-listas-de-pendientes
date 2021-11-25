import React, { Fragment, useState, useRef, useEffect} from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";

export function App() {
  const [listas, setListas] = useState([
    { id: 1, task: "Tarea 1", completed: false },
  ]);

  const taskRef = useRef();

  const toggleTask = (id) => {
    //copia de las tareas
    const newTasks = [...listas];
    //encontrar tarea seleccionada, según su id
    const task = newTasks.find((task) => task.id === id);
    task.completed = !task.completed; // si es true se convierte en
    //false, si es false se convierte en true
    setListas(newTasks); //actualizamos el listado de tareas
    };

  //Metodo para añadir tareas    
  const handleTaskAdd = () => {
    const task = taskRef.current.value;
    if (task === "") return;

    setListas((prevTasks) => {
        return [...prevTasks, { id: uuidv4(), task, completed: false }];
    });
  taskRef.current.value = null;
};
  //Metodo para eliminar tareas
  const handleClearAll = () => {
    //copia de las tareas creadas y filtramos por las que han sido seleccionadas 
    const newTasks = listas.filter((task) => !task.completed);
    //setListas para setear los elementos
    setListas(newTasks);
  };

  //Para escuchar y guardar las nuevas tareas creadas
  useEffect(() => {
    localStorage.setItem("listApp.lists", JSON.stringify(listas));
  }, [listas]);

  //Para visuaizar las tareas que estan creadas
  useEffect(() => {
    //obtener tareas guardadas
    const storedTasks = JSON.parse(localStorage.getItem("listApp.lists"));
    //validar que existan
    if (storedTasks) {
      setListas(storedTasks);
    }
  }, []);

  return (
    <Fragment>
      <TodoList listas={listas} toggleTask={toggleTask} />
      <input ref={taskRef} type="text" placeholder="Nueva Tarea" />
      <button onClick={handleTaskAdd}>+</button>
      <button onClick={handleClearAll}>-</button>
    </Fragment>
  );
}
