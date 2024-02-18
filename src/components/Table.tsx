import React from "react";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader
} from 'react-bs-datatable';
import { Col, Row, Table } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

interface ITableProps {
    columns: any;
    data: any;
}

function CustomTable({ columns, data }: ITableProps) {
  const navigate = useNavigate();
  return (
    <DatatableWrapper body={data} headers={columns} 
    // sortProps={{
    //   sortValueObj: {
    //     date: (date) =>
    //       parse(`${date}`, 'MMMM dd, yyyy', new Date()).getTime()
    //   }
    // }}
    paginationOptionsProps={{
      initialState: {
        rowsPerPage: 25,
        options: [25, 30, 50]
      }
    }}>
      <Row className="mb-4">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOptions />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination />
        </Col>
        </Row>
      <Table>
        <TableHeader />
        <TableBody    onRowClick={(row, event) => {
          navigate(`/user/${row.id}`, { state: { user: row } })
          }} />
      </Table>
   
    </DatatableWrapper>
  );
};

export default CustomTable;
