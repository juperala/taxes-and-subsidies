import React from "react";
import { cyan500 } from "material-ui/styles/colors.js";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

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
      <h3 style={{ color: cyan500 }}>Hakutulokset:</h3>
      <Table selectable={false} onCellClick={props.handleCellClick}>
        <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
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
