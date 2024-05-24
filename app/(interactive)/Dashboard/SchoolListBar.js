import React from 'react';

const SchoolListBar = ({ schools }) => {
    return (
        <div className="school-list-bar">
            {schools.map((school, index) => // iterate through the list fo schools
            (   // give each school an index and display each school
                <div key={index} className="school-item"> 
                    {school} 
                </div>
            ))}
            <div>Hello</div>
        </div>
    );
};

export default SchoolListBar;