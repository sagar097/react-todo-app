import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/slices/todoSlice';
import styles from './Todo.module.css';
import { Button, Grid, TextField, Card, Typography } from '@mui/material';
import { Details } from '@mui/icons-material';

function ToDoApp() {
  const dispatch = useDispatch();
  const [taskdetails, settaskdetails] = useState({ name: '', discription: '' });
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    let value = event?.target?.value;
    let field = event?.target?.name;

    if (field === 'name') {
      settaskdetails((prev) => ({ ...prev, name: value }));
    } else if (field === 'discription') {
      settaskdetails((prev) => ({ ...prev, discription: value }));
    }
  }

  const onAddTask = () => {
    let { name, discription } = taskdetails;
    if (name && discription) {
      setError(false);
      dispatch(addTodo(taskdetails));
      settaskdetails({ name: '', discription: '' });
    } else {
      setError(true);
    }
  }

  return (
    <Card elevation={24} className={styles.todocard}>
      <Grid container spacing={5} className={styles.cardcontainer}>
        <Grid item xs={12} md={4} className={styles.carditem}>
          <TextField
            required
            id={styles.name}
            label="Name"
            name={'name'}
            className={styles.alignitems}
            size="small"
            value={taskdetails.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            required
            id={styles.discription}
            className={styles.alignitems}
            label="Discription"
            size="small"
            name={'discription'}
            value={taskdetails.discription}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            className={styles.alignitems}
            onClick={onAddTask}
          >
            Add Todo
          </Button>
          {error ? <Typography variant="caption" display="block" gutterBottom className={styles.errorText}>
            Please fill all details !
          </Typography> : null}
        </Grid>
      </Grid>
    </Card>
  );
}

export default ToDoApp;
