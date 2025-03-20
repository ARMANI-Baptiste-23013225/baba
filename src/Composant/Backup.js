import React, { useState } from 'react';
import Datas from '../Datas.json';

const Backup = ({ taches, setTasks, categories, setCategories }) => {
    const [loadedData, setLoadedData] = useState(null);

    const handleReset = () => {
        const confirmReset = window.confirm('Êtes-vous sûr de vouloir réinitialiser ?');
        if (confirmReset) {
            setTasks([]);
            setCategories([]);
            localStorage.removeItem('taches');
            localStorage.removeItem('categories');
        }
    };

    const handleLoadBackup = () => {
        setTasks(Datas.taches);
        setCategories(Datas.categories);
        setLoadedData(Datas);
    };

    return (
        <div className="backup">
            <button onClick={handleLoadBackup}>Charger le backup</button>
            <button onClick={handleReset}>Réinitialiser</button>
            {loadedData && (
                <div>
                    <h3>Tâches chargées :</h3>
                    <ul>
                        {loadedData.taches.map((tache, index) => (
                            <li key={index}>{tache.title} - {tache.date_echeance}</li>
                        ))}
                    </ul>
                    <h3>Catégories chargées :</h3>
                    <ul>
                        {loadedData.categories.map((categorie, index) => (
                            <li key={index}>{categorie.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Backup;