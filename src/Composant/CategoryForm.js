import React, { useState } from 'react';

const CategoryForm = ({ addCategory }) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryColor, setCategoryColor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCategory = {
            name: categoryName,
            color: categoryColor,
        };
        addCategory(newCategory);
        setCategoryName('');
        setCategoryColor('');
    };

    return (
        <div className="category-form">
            <h2>Créer une catégorie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom de la catégorie"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />
                <input
                    type="color"
                    value={categoryColor}
                    onChange={(e) => setCategoryColor(e.target.value)}
                />
                <button type="submit">Ajouter la catégorie</button>
            </form>
        </div>
    );
};

export default CategoryForm;
