import React from "react";
import { useTable } from "react-table";

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

  return (
<table className="table table-striped table-bordered">
      <thead>
        <tr>
          {columns.map((column: any, index:any) => (
            <th key={index}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, rowIndex: any) => (
          <tr key={rowIndex}>
            {columns.map((column: any, colIndex: any) => 
             {
              console.log({row});
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
  if(accessor.includes('.')) {
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
