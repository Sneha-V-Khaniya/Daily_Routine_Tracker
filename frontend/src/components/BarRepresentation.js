import React from 'react';
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Cell,
} from "recharts";

export default function BarRepresentation({ data }) {
    return (
        <div>
            <ResponsiveContainer width="100%" height={150}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis hide />
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const { date, value } = payload[0].payload;
                                return (
                                    <div style={{ backgroundColor: 'transparent' }}>
                                        <p>{`Date: ${date}`}</p>
                                        <p>{`Status: ${value === 1 ? 'Completed' : 'Not Completed'}`}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar
                        dataKey="height"
                        barSize={20}
                    >
                        {data?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.value === 0 ? '#e57373' : '#66bb6a'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
