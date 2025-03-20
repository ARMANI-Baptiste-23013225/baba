import React, { useState } from 'react';

const TaskList = ({ tasks = [], setTasks, categories = [], relations = [] }) => {
    const [editingTask, setEditingTask] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const getCategoryColor = (taskId) => {
        const relation = relations.find(rel => rel.tache === taskId);
        if (relation) {
            const category = categories.find(cat => cat.id === relation.categorie);
            return category ? category.color : 'transparent';
        }
        return 'transparent';
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setNewTitle(task.title);
        setNewDescription(task.description);
    };

    const handleSave = (task) => {
        const updatedTasks = tasks.map(t => t === task ? { ...t, title: newTitle, description: newDescription } : t);
        setTasks(updatedTasks);
        setEditingTask(null);
    };

    const handleDelete = (task) => {
        const updatedTasks = tasks.filter(t => t !== task);
        setTasks(updatedTasks);
    };

    const renderTasks = tasks?.map((task, index) => (
        <div key={index} className="task-item" style={{ borderLeft: `5px solid ${getCategoryColor(task.id)}` }}>
            {editingTask === task ? (
                <>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <button onClick={() => handleSave(task)}>Save</button>
                </>
            ) : (
                <>
                    <h3>{task.title}</h3>
                    <p><strong>Description :</strong> {task.description}</p>
                    <p><strong>Echéance :</strong> {task.dueDate ? task.dueDate : 'Pas d’échéance'}</p>
                    <p><strong>Catégories :</strong> {task.categories?.join(', ') || 'Aucune catégorie'}</p>
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    <button onClick={() => handleDelete(task)}>Delete</button>
                </>
            )}
        </div>
    ));

    return (
        <div className="task-list">
            <h2>Tâches en cours</h2>
            {renderTasks}
        </div>
    );
};

export default TaskList;