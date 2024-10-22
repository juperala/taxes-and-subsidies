import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

const titleStyle = { textAlign: "center", fontSize: "14px" };

const companyList = props => {
  const rows = props.companies.map(company => {
    return (
      <TableRow key={company.id}>
        <TableRowColumn>{company.id}</TableRowColumn>
        <TableRowColumn>{company.name}</TableRowColumn>
        <TableRowColumn>{company.county}</TableRowColumn>
      </TableRow>
    );
  });

  return (
    <div>
      <Table selectable={false} onCellClick={props.handleCellClick}>
        <TableHeader
          displaySelectAll={false}
          enableSelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn colSpan="3" style={titleStyle}>
              HAKUTULOKSET
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Y-TUNNUS</TableHeaderColumn>
            <TableHeaderColumn>NIMI</TableHeaderColumn>
            <TableHeaderColumn>SIJAINTI</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover>
          {rows}
        </TableBody>
      </Table>
    </div>
  );
};

export default companyList;
