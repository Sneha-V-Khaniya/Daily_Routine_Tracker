import React from 'react';
import { formatDate, getTaskDetails, saveTaskData } from '../utils/functions';
import ClickableTaskInput from './ClickableTaskInput';
import { Link } from 'react-router-dom';
import '../styles/TaskTable.css';

export default function TaskTable({ weekData, tasks, setTasks, userID }) {
    const handleTaskInput = async (value, date, taskID) => {

        const [day, month, year] = date.split('-').map(Number);
        const parsedDate = new Date(`20${year}`, month - 1, day);

        // console.log(date, parsedDate);
        await saveTaskData('/api/task/data', taskID, 1 - value, parsedDate);    // toggle the value

        const details = await getTaskDetails('/api/task/details', userID);
        setTasks(details);
    };


    return (
        <div className='task-table'>
            <table border="1" style={{ width: '100%', textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th></th>
                        {weekData.map((item, index) => (
                            <th key={index}>{item.day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        {weekData.map((item, index) => (
                            <td key={index}>{item.date}</td>
                        ))}
                    </tr>

                    {tasks.map((task, taskIndex) => (
                        <tr key={taskIndex} className='task'>
                            <td >
                                {task.taskName} &nbsp;
                                <Link to={`/visualize/${task.taskID}`}>📊</Link>
                            </td>
                            {weekData.map((weekItem, weekIndex) => {
                                const taskData = task.taskData.find(
                                    (data) => formatDate(new Date(data.date)) === weekItem.date
                                );

                                return (
                                    <td key={weekIndex}
                                            onClick={() => handleTaskInput(taskData?.value ?? 0, weekItem.date, task.taskID)}
                                            role="button"
                                            aria-label={`Task ${task.taskName} on ${weekItem.date}`}
                                            style={{
                                                cursor: 'pointer',
                                                backgroundColor: taskData?.value === 0
                                                    ? 'var(--light-coral)'
                                                    : taskData?.value === 1
                                                        ? 'var(--mantis)'
                                                        : 'white',
                                            }}
                                        >
                                            {taskData ? <ClickableTaskInput value={taskData.value} /> : '-'}
                                        
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
