import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/PieChartRepresentation.css';

export default function PieChartRepresentation({ data }) {
    // Prepare summary data for the pie chart
    const summaryData = [
        { name: 'Completed', value: data?.filter(item => item.value === 1).length },
        { name: 'Not Completed', value: data?.filter(item => item.value === 0).length },
    ];

    const COLORS = ['#66bb6a', '#e57373'];

    return (
        <div className='chart-container'>
            <div className='pie-chart'>
                <ResponsiveContainer minWidth='70%' height={300}>
                    <PieChart>
                        <Pie
                            data={summaryData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {summaryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>

                </ResponsiveContainer>
            </div>
            <div className='suggestion-box'>
                {summaryData[0].value > summaryData[1].value ?
                    <p style={{ color: '#66bb6a' }}>You are going well...</p> 
                    :
                    <p style={{ color: '#e57373' }}>You can improve...</p>}
            </div>
        </div>
    );
}
