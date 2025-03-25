import React, { useState, useEffect } from 'react';

const SearchBar = ({ tasks = [], categories = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({ tasks: [], categories: [] });
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults({ tasks: [], categories: [] });
            setShowResults(false);
            return;
        }

        const term = searchTerm.toLowerCase();

        // Filter tasks
        const filteredTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(term) ||
            (task.description && task.description.toLowerCase().includes(term))
        );

        // Filter categories
        const filteredCategories = categories.filter(category =>
            category.title.toLowerCase().includes(term)
        );

        setSearchResults({ tasks: filteredTasks, categories: filteredCategories });
        setShowResults(true);
    }, [searchTerm, tasks, categories]);

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Rechercher des tâches ou catégories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            {showResults && searchTerm.trim() !== '' && (
                <div className="search-results">
                    {searchResults.tasks.length === 0 && searchResults.categories.length === 0 ? (
                        <p>Aucun résultat trouvé</p>
                    ) : (
                        <>
                            {searchResults.tasks.length > 0 && (
                                <div className="result-section">
                                    <h3>Tâches</h3>
                                    <ul>
                                        {searchResults.tasks.map((task, index) => (
                                            <li key={`task-${index}`} className={task.urgent ? 'urgent-task' : ''}>
                                                {task.title}
                                                {task.urgent && <span className="urgent-tag">URGENT</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {searchResults.categories.length > 0 && (
                                <div className="result-section">
                                    <h3>Catégories</h3>
                                    <ul>
                                        {searchResults.categories.map((category, index) => (
                                            <li key={`category-${index}`}>{category.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;