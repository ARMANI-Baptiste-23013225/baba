import React, { useState } from 'react';

const CategoryForm = ({ addCategory, categories = [], deleteCategory }) => {
    const [categoryTitle, setCategoryTitle] = useState('');
    const [categoryColor, setCategoryColor] = useState('#000000');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCategory = {
            id: Date.now().toString(),
            title: categoryTitle,
            color: categoryColor,
        };
        addCategory(newCategory);
        setCategoryTitle('');
        setCategoryColor('#000000');
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (selectedCategoryId) {
            deleteCategory(selectedCategoryId);
            setSelectedCategoryId('');
        }
    };

    return (
        <div className="category-form">
            <h2>Créer une catégorie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom de la catégorie"
                    value={categoryTitle}
                    onChange={(e) => setCategoryTitle(e.target.value)}
                    required
                />
                <input
                    type="color"
                    value={categoryColor}
                    onChange={(e) => setCategoryColor(e.target.value)}
                    required
                />
                <button type="submit">Ajouter la catégorie</button>
            </form>

            <h3>Supprimer une catégorie</h3>
            <form onSubmit={handleDelete}>
                <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    required
                >
                    <option value="">-- Sélectionnez une catégorie --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
                <button type="submit">Supprimer la catégorie</button>
            </form>
        </div>
    );
};

export default CategoryForm;