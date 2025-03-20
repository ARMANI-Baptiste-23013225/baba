import React, { useState, useEffect } from 'react';
import TaskForm from './Composant/TaskForm';
import TaskList from './Composant/TaskList';
import CategoryForm from './Composant/CategoryForm';
import CalendarView from './Composant/CalendarView';
import Backup from './Composant/Backup';
import Datas from './Datas.json';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [relations, setRelations] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('taches')) || [];
        const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
        const savedRelations = JSON.parse(localStorage.getItem('relations')) || [];
        setTasks(savedTasks);
        setCategories(savedCategories);
        setRelations(savedRelations);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('relations', JSON.stringify(relations));
    }, [tasks, categories, relations]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const addCategory = (category) => {
        setCategories([...categories, category]);
    };

    const toggleCalendar = () => setShowCalendar(!showCalendar);

    return (
        <div className="App">
            <h1>Gestion de Tâches</h1>

            <button onClick={toggleCalendar}>
                {showCalendar ? 'Voir Liste' : 'Voir Calendrier'}
            </button>

            {showCalendar ? (
                <CalendarView tasks={tasks} />
            ) : (
                <>
                    <TaskList tasks={tasks} setTasks={setTasks} categories={categories} relations={relations} />
                    <TaskForm addTask={addTask} />
                    <CategoryForm addCategory={addCategory} />
                </>
            )}

            <Backup taches={tasks} setTasks={setTasks} categories={categories} setCategories={setCategories} />
        </div>
    );
};

export default App;