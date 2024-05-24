import React from 'react';
import SchoolListBar from './SchoolListBar';

const schools = ["UCLA", "Texas", "Stanford", "USC", "Michigan", "Duke", "North Carolina"];

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <SchoolListBar schools={schools}/>
        </div>
    )
}

export default Dashboard;