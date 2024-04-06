import React, { useEffect } from 'react';
import styles from '../styles/ExtendedList.module.css';

//create a table with dynamic width and height
function createDynamicTable(data, client, opp) {
    const table = document.createElement("table");
    table.style.width = "100%";
    table.classList.add("dynamic-table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    //TABLE HEADER, TBD, USING KEYS FOR NOW
    let keys = ["", "serverName", "setScore", "gameScore", "pointScore", "pointWonBy", "lastShotResult", "rallyCount"];
    let keys_headers = ["", "Server", "Set Score", "Game Score", "Point", "Point Winner", "Last Shot Type", "Duration"];
    keys_headers.forEach((key) => {
        const th = document.createElement("th");
        th.textContent = key;
        th.style.fontSize = '20px';
        th.style.fontWeight = 'normal';
        th.style.textAlign= 'left';
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    //ADD DIV?
    console.log(data)
    console.log(client)
    console.log(opp)
    const tbody = document.createElement("tbody");
    data.forEach((item) => {
        const row = document.createElement("tr");
        keys.forEach((key, index) => {
            const td = document.createElement("td");            
            const img = document.createElement("img");
            if(index==0){
            console.log(item['player1Name'])
                if(item['player1Name']===item['serverName']){
                    img.src = client;
                }
                else{
                    img.src = opp;
                }
                img.width="35";
                td.appendChild(img);
            }
            else{
                td.textContent = item[key];
            td.style.fontSize='20px';
            td.style.fontWeight = 'bold';
            td.style.textAlign= 'left';
            td.style.padding = "8px";
            td.style.borderBottom="solid 0.2px #EDEDED";
            td.style.padding = "20px";
            }
            row.appendChild(td);
        });
        // if (index !== data.length - 1) {
            // row.style.border='5px';
        // }
        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    return table;
}

const ExtendedList = ({ pointsData, client, opp }) => {
    useEffect(() => {
        const tableContainer = document.getElementById("table-container");
        const dynamicTable = createDynamicTable(pointsData, client, opp);
        const tableWrapper = document.createElement("div");
        tableWrapper.classList.add(styles.tableContainer); 
        tableWrapper.appendChild(dynamicTable);
        tableContainer.appendChild(tableWrapper);
        // return () => {
        //     if (tableContainer && tableWrapper) {
        //         tableContainer.removeChild(tableWrapper);
        //     }
        // };
    }, [pointsData]);

    return (
        <div id="table-container" className={styles.tableContainer}>
        </div>
    );
};

export default ExtendedList;
