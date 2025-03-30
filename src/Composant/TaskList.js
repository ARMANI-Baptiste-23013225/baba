import React, { useState } from 'react';

const TaskList = ({ tasks = [], setTasks, categories = [], relations = [], setRelations }) => {
    const [editingTask, setEditingTask] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newDueDate, setNewDueDate] = useState('');
    const [newUrgent, setNewUrgent] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const handleEdit = (task) => {
        setEditingTask(task);
        setNewTitle(task.title);
        setNewDescription(task.description || '');
        setNewDueDate(task.dueDate || '');
        setNewUrgent(task.urgent || false);

        // Find the current category for this task
        const taskRelation = relations.find(rel => rel.taskId === task.id);
        setNewCategory(taskRelation ? taskRelation.categoryId : '');
    };

    const handleSave = (task) => {
        const updatedTasks = tasks.map(t =>
            t.id === task.id ? {
                ...t,
                title: newTitle,
                description: newDescription,
                dueDate: newDueDate,
                urgent: newUrgent
            } : t
        );
        setTasks(updatedTasks);

        const existingRelation = relations.find(rel => rel.taskId === task.id);

        if (newCategory) {
            if (existingRelation) {
                const updatedRelations = relations.map(rel =>
                    rel.taskId === task.id ? { ...rel, categoryId: newCategory } : rel
                );
                setRelations(updatedRelations);
            } else {
                setRelations([...relations, { taskId: task.id, categoryId: newCategory }]);
            }
        } else if (existingRelation) {
            const updatedRelations = relations.filter(rel => rel.taskId !== task.id);
            setRelations(updatedRelations);
        }

        setEditingTask(null);
    };

    const handleDelete = (taskId) => {
        setTasks(tasks.filter(t => t.id !== taskId));
        setRelations(relations.filter(rel => rel.taskId !== taskId)); // Fixed: was using task.id
    };

    // Get category name for a task
    const getCategoryForTask = (taskId) => {
        const relation = relations.find(rel => rel.taskId === taskId);
        if (!relation) return null;

        const category = categories.find(cat => cat.id === relation.categoryId);
        return category || null;
    };

    const getTasksByCategory = () => {
        const tasksByCategory = {};

        categories.forEach(category => {
            tasksByCategory[category.id] = {
                categoryInfo: category,
                tasks: []
            };
        });

        // Add uncategorized group
        tasksByCategory['uncategorized'] = {
            categoryInfo: { id: 'uncategorized', title: 'Non catégorisé' },
            tasks: []
        };

        tasks.forEach(task => {
            const taskRelations = relations.filter(rel => rel.taskId === task.id);

            if (taskRelations.length === 0) {
                tasksByCategory['uncategorized'].tasks.push(task);
            } else {
                taskRelations.forEach(rel => {
                    if (tasksByCategory[rel.categoryId]) {
                        tasksByCategory[rel.categoryId].tasks.push(task);
                    } else {
                        // If category doesn't exist anymore, put in uncategorized
                        tasksByCategory['uncategorized'].tasks.push(task);
                    }
                });
            }
        });

        return tasksByCategory;
    };

    const tasksByCategory = getTasksByCategory();

    return (
        <div className="task-list">
            <h2>Tâches par catégorie</h2>

            {Object.values(tasksByCategory).map(category => (
                <div key={category.categoryInfo.id} className="category-group">
                    <h3 style={{ color: category.categoryInfo.color }}>
                        {category.categoryInfo.title}
                    </h3>

                    {category.tasks.length === 0 ? (
                        <p className="empty-category">Aucune tâche dans cette catégorie</p>
                    ) : (
                        category.tasks.map(task => {
                            const taskCategory = getCategoryForTask(task.id);

                            return (
                                <div key={task.id} className={`task-item ${task.urgent ? 'urgent-task' : ''}`}>
                                    {editingTask && editingTask.id === task.id ? (
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
                                            <input
                                                type="date"
                                                value={newDueDate}
                                                onChange={(e) => setNewDueDate(e.target.value)}
                                            />
                                            <div className="checkbox-container">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={newUrgent}
                                                        onChange={(e) => setNewUrgent(e.target.checked)}
                                                    />
                                                    Tâche urgente
                                                </label>
                                            </div>
                                            <div>
                                                <select
                                                    value={newCategory}
                                                    onChange={(e) => setNewCategory(e.target.value)}
                                                >
                                                    <option value="">-- Aucune catégorie --</option>
                                                    {categories.map(cat => (
                                                        <option key={cat.id} value={cat.id}>{cat.title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <button onClick={() => handleSave(task)}>Enregistrer</button>
                                        </>
                                    ) : (
                                        <>
                                            <h3>
                                                {task.title}
                                                {task.urgent && <span className="urgent-tag">URGENT</span>}
                                            </h3>
                                            {task.description && <p>{task.description}</p>}
                                            <p>Date d'échéance: {task.dueDate || 'Non définie'}</p>

                                            {/* Display category with the task */}
                                            {taskCategory && (
                                                <p>Catégorie: <span style={{color: taskCategory.color, fontWeight: 'bold'}}>{taskCategory.title}</span></p>
                                            )}

                                            <button onClick={() => handleEdit(task)}>Modifier</button>
                                            <button onClick={() => handleDelete(task.id)}>Supprimer</button>
                                        </>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            ))}
        </div>
    );
};

export default TaskList;