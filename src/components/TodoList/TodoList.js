import { Card, Fab, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, editTodo, fetchTaskList, isTaskListLoading, selectTaskList } from '../../redux/slices/todoSlice';
import styles from './TodoList.module.css';
import { Edit, CheckCircleOutlineSharp, Delete } from '@mui/icons-material';


function TodoList() {

  const taskList = useSelector(selectTaskList);
  const taskListLoading = useSelector(isTaskListLoading);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);
  const [editText, setEditText] = useState('')

  useEffect(() => {
    dispatch(fetchTaskList())
  }, [dispatch]);

  const handleEdit = (param) => {
    let { id } = param;
    setEdit(id);
  }

  const handleEditChange = (event) => {
    let value = event?.target?.value
    setEditText(value);
  }

  const handleSubmit = (param) => {
    let { id, data } = param;
    let { discription } = data;
    setEdit(null)
    let editedTask = {
      id: id,
      data: {
        ...param.data,
        discription: editText || discription
      }
    }
    dispatch(editTodo(editedTask))
  }

  const handleDelete = (param) => {
    let { id } = param;
    dispatch(deleteTodo({ id }));
  }

  return (
    <Card className={styles.todolistcard}>
      {
        taskListLoading ? 'Loading Tasks....' :
          taskList?.length !== 0 ? taskList?.map(obj => {
            return (
              <Grid key={obj.id} container className={styles.taskscontent} >
                {
                  edit === obj.id ?
                    < >

                      <Grid item xs={10} md={10}>
                        <h1
                          className={styles.listText}
                          title={obj?.data.name}
                        >
                          {obj?.data.name}
                        </h1>
                      </Grid>

                      <Grid item xs={10} md={11}>
                        <TextField
                          name={'edit'}
                          onChange={handleEditChange}
                          label={'edit discription'}
                          size={'small'}
                          className={styles.editinput}
                          defaultValue={editText || obj?.data?.discription}
                        />
                      </Grid>

                      <Grid item xs={1} md={1}>
                        <Fab
                          size={"small"}
                          color="primary"
                          aria-label="edit"
                          onClick={() => handleSubmit(obj)}
                        >
                          <CheckCircleOutlineSharp />
                        </Fab>
                      </Grid>

                    </>
                    :
                    <>

                      <Grid item xs={8} md={10}>
                        <h1
                          className={styles.listText}
                          title={obj?.data.name}
                        >
                          {obj?.data.name}
                        </h1>
                        <p
                          className={styles.listText}
                          title={obj?.data.discription}
                        >
                          {obj?.data?.discription}
                        </p>
                      </Grid>
                      <Grid item xs={2} md={1}>
                        <Fab
                          size={"small"}
                          color="secondary"
                          aria-label="edit"
                          title={'edit task'}
                          className={styles.fabiconsbuttons}
                          onClick={() => handleEdit(obj)}
                        >
                          <Edit />
                        </Fab>
                      </Grid>
                      <Grid item xs={1} md={1} >
                        <Fab
                          size={"small"}
                          color="primary"
                          title={'delete task'}
                          aria-label="edit"
                          className={styles.fabiconsbuttons}
                          onClick={() => handleDelete(obj)}
                        >
                          <Delete />
                        </Fab>
                      </Grid>

                    </>
                }
              </Grid>
            )
          })
            : 'No task...'}
    </Card>
  )
}

export default TodoList;