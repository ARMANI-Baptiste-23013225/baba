import React, { useState, useEffect } from 'react';
import TaskForm from './Composant/TaskForm';
import TaskList from './Composant/TaskList';
import CategoryForm from './Composant/CategoryForm';
import CalendarView from './Composant/CalendarView';
import SearchBar from './Composant/SearchBar';
import Backup from './Composant/Backup';
import Datas from './Datas.json';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [relations, setRelations] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('taches')) || [];
        const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
        const savedRelations = JSON.parse(localStorage.getItem('relations')) || [];
        setTasks(savedTasks);
        setCategories(savedCategories);
        setRelations(savedRelations);
    }, []);

    useEffect(() => {
        localStorage.setItem('taches', JSON.stringify(tasks));
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('relations', JSON.stringify(relations));
    }, [tasks, categories, relations]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const addCategory = (category) => {
        setCategories([...categories, category]);
    };

    const addRelation = (relation) => {
        setRelations([...relations, relation]);
    };

    const deleteCategory = (categoryId) => {
        // Remove the category from the categories list
        setCategories(categories.filter(category => category.id !== categoryId));

        // Remove all relations associated with this category
        setRelations(relations.filter(relation => relation.categoryId !== categoryId));
    };

    return (
        <div className="App">
            <h1>Gestion de Tâches</h1>

            <SearchBar tasks={tasks} categories={categories} />

            <button onClick={toggleCalendar}>
                {showCalendar ? 'Voir Liste' : 'Voir Calendrier'}
            </button>

            {showCalendar ? (
                <CalendarView tasks={tasks} />
            ) : (
                <>
                    <TaskList
                        tasks={tasks}
                        setTasks={setTasks}
                        categories={categories}
                        relations={relations}
                        setRelations={setRelations}
                    />
                    <TaskForm
                        addTask={addTask}
                        categories={categories}
                        addRelation={addRelation}
                    />
                    <CategoryForm
                        addCategory={addCategory}
                        categories={categories}
                        deleteCategory={deleteCategory}
                    />
                </>
            )}

            <Backup
                taches={tasks}
                setTasks={setTasks}
                categories={categories}
                setCategories={setCategories}
                relations={relations}
                setRelations={setRelations}
            />
        </div>
    );
};

export default App;