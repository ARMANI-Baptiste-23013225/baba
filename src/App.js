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
    const [showCalendar, setShowCalendar] = useState(false);

    // Charger les données depuis localStorage au démarrage
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('taches')) || [];
        const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
        setTasks(savedTasks);
        setCategories(savedCategories);

        console.log(Datas);
    }, []);


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [tasks, categories]);

    // Ajouter taches
    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    // Ajouter catégorie
    const addCategory = (category) => {
        setCategories([...categories, category]);
    };

    // Gestion calendrier
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
                    <TaskList tasks={tasks} />
                    <TaskForm addTask={addTask} />
                    <CategoryForm addCategory={addCategory} />
                </>
            )}

            <Backup taches={tasks} setTasks={setTasks} categories={categories} setCategories={setCategories} />
        </div>
    );
};

export default App;