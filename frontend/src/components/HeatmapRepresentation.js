import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import '../styles/HeatmapRepresentation.css';
// import { useAuth } from '../contexts/AuthContext';

export default function HeatmapRepresentation({ data }) {

    // const {user} = useAuth();
    const heatmapData = data?.map(item => ({
        date: item.date.split('T')[0],
        count: item.value,
    })) || [];

    return (
        <div className="heatmap-container">
            <CalendarHeatmap
                startDate={new Date('2024-01-01')}
                endDate={new Date()}
                values={heatmapData}
                classForValue={(value) => {
                    if (!value) return 'color-empty';
                    return value?.count === 1 ? 'color-completed' : 'color-not-completed';
                }}
                tooltipDataAttrs={(value) => {
                    if (!value || !value?.date) return { 'data-tooltip-id': 'heatmap-tooltip', 'data-tooltip-content': 'No data' };
                    return {
                        'data-tooltip-id': 'heatmap-tooltip',
                        'data-tooltip-content': `${value?.date}: ${value?.count === 1 ? 'Completed' : 'Not Completed'}`,
                    };
                }}
            />

            <Tooltip id="heatmap-tooltip" />
        </div>
    );
}
