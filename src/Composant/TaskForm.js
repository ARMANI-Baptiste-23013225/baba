import React, { useState } from 'react';

const TaskForm = ({ addTask, categories = [], addRelation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [urgent, setUrgent] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            dueDate,
            urgent
        };

        addTask(newTask);

        // Create relation between task and category
        if (selectedCategory) {
            addRelation({
                taskId: newTask.id,
                categoryId: selectedCategory
            });
        }

        // Reset form
        setTitle('');
        setDescription('');
        setDueDate('');
        setUrgent(false);
        setSelectedCategory('');
    };

    return (
        <div className="task-form">
            <h2>Ajouter une tâche</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Titre de la tâche"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Description (optionnel)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <div className="checkbox-container">
                    <label>
                        <input
                            type="checkbox"
                            checked={urgent}
                            onChange={(e) => setUrgent(e.target.checked)}
                        />
                        Tâche urgente
                    </label>
                </div>
                <div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">-- Aucune catégorie --</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default TaskForm;