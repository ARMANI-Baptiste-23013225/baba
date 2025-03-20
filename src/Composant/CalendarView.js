import React from 'react';

const CalendarView = ({ tasks = [] }) => {
    return (
        <div className="calendar-view">
            <h2>Vue Calendrier</h2>
            <div>
                {tasks.map((task, index) => (
                    <div key={index}>
                        <p>{task.title} - {task.dueDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;