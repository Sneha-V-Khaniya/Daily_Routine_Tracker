import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import TaskTable from '../components/TaskTable';
import { addTask, formatTaskData, getCurrentWeekDates, getTaskDetails, handleLogout } from '../utils/functions';
import CustomButton from '../components/CustomButton';
import '../styles/page.css';
import { Link, useNavigate } from 'react-router-dom';

// const currentWeek = [
//   { date: '10-11-24', day: 'Sun' },
//   { date: '11-11-24', day: 'Mon' },
//   { date: '12-11-24', day: 'Tue' },
//   { date: '13-11-24', day: 'Wed' },
//   { date: '14-11-24', day: 'Thus' },
//   { date: '15-11-24', day: 'Fri' },
//   { date: '16-11-24', day: 'Sat' }
// ];

// const tasks = [
//   {
//     taskName: 'task1', taskID: 't1',
//     taskData: [
//       { date: '2024-11-11T00:00:00.000+00:00', value: 1 },
//       { date: '2024-11-12T00:00:00.000+00:00', value: 0 },
//       { date: '2024-11-14T00:00:00.000+00:00', value: 1 },
//       { date: '2024-11-15T00:00:00.000+00:00', value: 0 }
//     ]
//   },
//   {
//     taskName: 'task2', taskID: 't2',
//     taskData: [
//       { date: '2024-11-11T00:00:00.000+00:00', value: 1 },
//       { date: '2024-11-12T00:00:00.000+00:00', value: 0 },
//       { date: '2024-11-13T00:00:00.000+00:00', value: 1 },
//       { date: '2024-11-14T00:00:00.000+00:00', value: 0 }
//     ]
//   },
// ];


export default function Home() {
  const { user, loading, logout } = useAuth();
  const [tasks, setTasks] = useState([]);

  const [taskName, setTaskName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const [currentWeek, setCurrentWeek] = useState(getCurrentWeekDates());

  const navigate = useNavigate();

  const getTasks = async () => {
    const details = await getTaskDetails('/api/task/details', user._id);
    setTasks(details);
  }

  const handleAddClick = async () => {
    await addTask('/api/task', taskName, user._id);
    await getTasks();
    setIsAdding(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchTasks = async () => {
      await getTasks();
    };
    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='container'>
      <div className='left'>
        <h1>Welcome, {user?.username || 'Guest'}!</h1>
        {!isAdding ? (
          <button onClick={() => setIsAdding(true)} style={{ border: 'none' }}>
            <CustomButton text='Add Task' color='white' bgColor="var(--charcoal)" />
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <button onClick={handleAddClick} style={{ border: 'none' }}>
              <CustomButton text='save' color='white' bgColor="var(--charcoal)" />
            </button>
            <button onClick={() => setIsAdding(false)} style={{ border: 'none' }}>
              <CustomButton text='cancel' color='white' bgColor="var(--charcoal)" />
            </button>
          </>
        )}
      </div>

      <div className='right'>
        <button onClick={handleLogout} style={{ border: 'none' }}>
            <CustomButton text="Logout" color="white" bgColor="var(--charcoal)" />
        </button>

        <div>Today: {new Date().toLocaleDateString()}</div>
      </div>
      <br />
      <TaskTable weekData={currentWeek} tasks={tasks} setTasks={setTasks} userID={user._id} />


    </div>
  )
}
