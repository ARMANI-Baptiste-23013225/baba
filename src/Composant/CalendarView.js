import React from 'react';

const CalendarView = ({ taches = [] }) => {
    return (
        <div className="calendar-view">
            <h2>Vue Calendrier</h2>
            <div>
                {taches?.map((tache, index) => (
                    <div key={index}>
                        <p>{tache.title} - {tache.dueDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;