import React, { useState, useEffect } from 'react';
import FormControl from "@mui/material/FormControl";
import styles from './App.module.css';
import { db } from './firebase'
import { List, TextField } from '@mui/material';
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import TaskItem from './TaskItem';
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from './firebase';



const App: React.FC = (props: any) => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push('login');
    });
    return () => unSub();
  })

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
    <div className={styles.app__root}>
      <h1>Todo App by React/Firebase</h1>
      <button className={styles.app__logout} onClick={
        async () => {
          try {
            await auth.signOut();
            props.history.push("/login")
          } catch (error: any) {
            alert(error.message);
          }
        }
      }
      >
        <LogoutIcon/>
      </button>
      <br />
      <FormControl>
        <TextField
          className={styles.field}
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
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosOutlinedIcon />
      </button>
      <List className={styles.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id}  id={task.id} title={task.title}/>
        ))}
      </List>
    </div>
  );
}

export default App;
