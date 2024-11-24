import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchTaskData, formatTaskData } from '../utils/functions';
import BarRepresentation from '../components/BarRepresentation';
import PieChartRepresentation from '../components/PieChartRepresentation';
import HeatmapRepresentation from '../components/HeatmapRepresentation';
import '../styles/page.css';
const TaskVisualizer = () => {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        const loadTaskData = async () => {
            const response = await fetchTaskData(`/api/task/data/${id}`);
            setData(response);
        };
        loadTaskData();
    }, [id])

    return (
        <div className='container'>
            <h2> Task: {data?.taskName} </h2>
            {(data.taskData)?.length === 0 ? <p> No Data <br /> Add some input for this task...</p> :
                <div>
                    <h3>Bar Chart:</h3>
                    <BarRepresentation data={formatTaskData(data?.taskData)} />
                    <h3>Pie Chart:</h3>
                    <PieChartRepresentation data={data?.taskData} />
                    <h3>Heatmap:</h3>
                    <HeatmapRepresentation data={data?.taskData} />
                </div>
            }
        </div>
    );
};

export default TaskVisualizer;

