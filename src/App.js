import React from 'react';
import ToDoApp from './components/TodoCard/ToDoApp';
import TodoList from './components/TodoList/TodoList';
import './App.css';
import { Grid } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span className='header-name'>Todo App</span>
      </header>
      <main className="main-content">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <ToDoApp />
          </Grid>
          <Grid item xs={12}>
            <TodoList />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default App;
