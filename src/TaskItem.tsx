import React, { useState } from 'react';
import styles from "./TaskItem.module.css";
import { Grid, ListItem, TextField } from '@mui/material';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { db } from './firebase';

interface Props {
    id: string;
    title: string;
}

const TaskItem: React.FC<Props> = (props) => {
    const [title, setTitle] = useState(props.title);

    const editTask = () => {
        db.collection("tasks").doc(props.id).set({ title: title }, { merge: true });
    };
    const deleteTask = () => {
        db.collection("tasks").doc(props.id).delete();
    };

    return (
        <>
            <ListItem>
                <h2>{props.title}</h2>
                <Grid container justifyContent="flex-end">
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                         }}
                        label="Edit task"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                </Grid>
                <button className={styles.taskitem__icon} onClick={editTask}><EditOutlinedIcon /></button>
                <button className={styles.taskitem__icon} onClick={deleteTask}><DeleteOutlineOutlinedIcon/></button>
            </ListItem>
        </>
    )
};

export default TaskItem
