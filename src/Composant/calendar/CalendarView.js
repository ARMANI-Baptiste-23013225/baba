import React from 'react';

const CalendarView = ({ tasks = [] }) => {
    return (
        <div className="calendar-view">
            <h2>Vue Calendrier</h2>
            <div>
                {tasks.map((task, index) => (
                    <div key={index} className={task.urgent ? 'urgent-task' : ''}>
                        <p>
                            {task.title} - {task.dueDate}
                            {task.urgent && <span className="urgent-tag">URGENT</span>}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;