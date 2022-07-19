import React from "react";
import Table from "react-bootstrap/Table";

export const CustomTable = ({ tableData = [], tableHeader = [] }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {tableHeader.map((head, i) => (
            <th key={i}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, i) => (
          <tr key={i}>
            {Object.keys(data).map((key, i) => (
              <td key={i}>{data[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
