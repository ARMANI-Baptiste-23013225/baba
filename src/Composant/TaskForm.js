import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            title,
            dueDate,
            categories: categories,
        };
        addTask(newTask);
        setTitle('');
        setDueDate('');
        setCategories([]);
        setCategoryInput('');
    };

    const handleCategoryChange = (e) => {
        setCategoryInput(e.target.value);
    };

    const addCategoryToTask = () => {
        if (categoryInput && !categories.includes(categoryInput)) {
            setCategories([...categories, categoryInput]);
            setCategoryInput('');
        }
    };

    return (
        <div className="task-form">
            <h2>Créer une tâche</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Titre de la tâche"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <div>
                    <input
                        type="text"
                        placeholder="Catégorie"
                        value={categoryInput}
                        onChange={handleCategoryChange}
                    />
                    <button type="button" onClick={addCategoryToTask}>Ajouter la catégorie</button>
                </div>
                <div>
                    <strong>Catégories ajoutées :</strong>
                    {categories.join(', ')}
                </div>
                <button type="submit">Ajouter la tâche</button>
            </form>
        </div>
    );
};

export default TaskForm;
