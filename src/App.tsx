import React, { useState, useEffect } from 'react';
import FormControl from "@mui/material/FormControl";
import './App.css';
import { db } from './firebase'
import { List, TextField } from '@mui/material';
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import TaskItem from './TaskItem';

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection("tasks").add({ title: input });
    setInput('');
  }

  return (
    <div className="App">
      <h1>Todo App by React/Firebase</h1>
      <FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="New task ?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        ></TextField>
      </FormControl>
      <button disabled={!input} onClick={newTask}>
        <AddToPhotosOutlinedIcon />
      </button>
      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id}  id={task.id} title={task.title}/>
        ))}
      </List>
    </div>
  );
}

export default App;
