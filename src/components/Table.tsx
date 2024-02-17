import React from "react";
import { useTable } from "react-table";
import PostApiService from "../utils/PostApiService";
import UserView from "./UserView";
import { useNavigate } from 'react-router-dom';

interface ITableProps {
    columns: any;
    data: any;
}

export default function Table({ columns, data }: ITableProps) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    const navigate = useNavigate();

    const sortTableElements = (sortBy: any) => {
        console.log("sort");
    }

    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    {columns.map((column: any, index: any) => (
                        <th key={index} onClick={() => sortTableElements(column.Header)} >{column.Header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row: any, rowIndex: any) => (
                    <tr key={rowIndex} className="tableRow" onClick={() => navigate(`/user/${row.id}`, { state: { user: row } })}>
                        {columns.map((column: any, colIndex: any) => {
                            //   console.log({row});
                            return <td key={colIndex}>{getColumnValue(row, column.accessor)}</td>
                        }
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

// Function to get nested property value
// Function to get nested or non-nested property value
function getColumnValue(row: any, accessor: any) {
    if (accessor.includes('.')) {
        const keys = accessor.split('.');
        let value = row;
        for (const key of keys) {
            if (value[key] !== undefined) {
                value = value[key];
            } else {
                return ''; // Return empty string if property not found
            }
        }
        return value;
    } else {
        return row[accessor]; // Direct property access
    }
}