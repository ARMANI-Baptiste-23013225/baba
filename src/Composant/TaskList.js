import React, { useState } from 'react';

const TaskList = ({ tasks = [], setTasks }) => {
    const [editingTask, setEditingTask] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newUrgent, setNewUrgent] = useState(false);

    const handleEdit = (task) => {
        setEditingTask(task);
        setNewTitle(task.title);
        setNewDescription(task.description || '');
        setNewUrgent(task.urgent || false);
    };

    const handleSave = (task) => {
        const updatedTasks = tasks.map(t =>
            t === task ? { ...t, title: newTitle, description: newDescription, urgent: newUrgent } : t
        );
        setTasks(updatedTasks);
        setEditingTask(null);
    };

    const handleDelete = (task) => {
        const updatedTasks = tasks.filter(t => t !== task);
        setTasks(updatedTasks);
    };

    const renderTasks = tasks?.map((task, index) => (
        <div key={index} className={`task-item ${task.urgent ? 'urgent-task' : ''}`}>
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
                    <label>
                        <input
                            type="checkbox"
                            checked={newUrgent}
                            onChange={(e) => setNewUrgent(e.target.checked)}
                        />
                        Tâche urgente
                    </label>
                    <button onClick={() => handleSave(task)}>Enregistrer</button>
                </>
            ) : (
                <>
                    <h3>
                        {task.title}
                        {task.urgent && <span className="urgent-tag">URGENT</span>}
                    </h3>
                    {task.description && <p><strong>Description :</strong> {task.description}</p>}
                    <p><strong>Echéance :</strong> {task.dueDate ? task.dueDate : 'Pas d\'échéance'}</p>
                    <p><strong>Catégories :</strong> {task.categories?.join(', ') || 'Aucune catégorie'}</p>
                    <button onClick={() => handleEdit(task)}>Modifier</button>
                    <button onClick={() => handleDelete(task)}>Supprimer</button>
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