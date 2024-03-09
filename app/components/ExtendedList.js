import React, { useEffect } from 'react';
import styles from '../styles/ExtendedList.module.css';

//create a table with dynamic width and height
function createDynamicTable(data) {
    const table = document.createElement("table");
    table.style.width = "100%";
    table.classList.add("dynamic-table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    //TABLE HEADER, TBD, USING KEYS FOR NOW
    let keys = ["serverName", "setScore", "gameScore", "pointScore", "pointWonBy", "lastShotResult", "rallyCount"];
    let keys_headers = ["Server", "Set Score", "Game Score", "Point", "Point Winner", "Last Shot Type", "Duration"];
    keys_headers.forEach((key) => {
        const th = document.createElement("th");
        th.textContent = key;
        th.style.fontSize = '16px';
        th.style.textAlign= 'center';
        th.style.padding = "8px";
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    //ADD DIV?
    const tbody = document.createElement("tbody");

    data.forEach((item) => {
        const row = document.createElement("tr");
        keys.forEach((key) => {
            const td = document.createElement("td");
            td.textContent = item[key];
            td.style.fontSize='20px';
            td.style.textAlign= 'center';
            td.style.padding = "8px";
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    return table;
}

const ExtendedList = ({ pointsData, onPointSelect }) => {
    useEffect(() => {
        const tableContainer = document.getElementById("table-container");
        const dynamicTable = createDynamicTable(pointsData);
        const tableWrapper = document.createElement("div");
        tableWrapper.classList.add(styles.tableContainer); 
        tableWrapper.appendChild(dynamicTable);
        tableContainer.appendChild(tableWrapper);
        return () => {
            if (tableContainer && tableWrapper) {
                tableContainer.removeChild(tableWrapper);
            }
        };
    }, [pointsData]);

    return (
        <div id="table-container" className={styles.tableContainer}>
        </div>
    );
};

export default ExtendedList;
