import React from 'react';

const TaskList = ({ tasks = [] }) => {
    const renderTasks = tasks?.map((taches, index) => (
        <div key={index} className="task-item">
            <h3>{taches.title}</h3>
            <p><strong>Echéance :</strong> {taches.dueDate ? taches.dueDate : 'Pas d’échéance'}</p>
            <p><strong>Catégories :</strong> {taches.categories?.join(', ') || 'Aucune catégorie'}</p>
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