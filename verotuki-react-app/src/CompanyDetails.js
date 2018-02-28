import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

class CompanyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tax: [],
      subsidy: []
    };
  }

  componentDidMount() {
    fetch(
      `https://auutvau7zj.execute-api.eu-west-1.amazonaws.com/prod/verotukiAPI?ytunnus=${
        this.props.match.params.id
      }`
    )
      .then(result => result.json())
      .then(details =>
        this.setState({ tax: details.tax, subsidy: details.subsidy })
      );
  }

  render() {
    const taxes = this.state.tax.map(tax => {
        return (
          <TableRow key={`${tax.id}-${tax.year}`}>
            <TableRowColumn>{tax.tax_income}</TableRowColumn>
            <TableRowColumn>{tax.tax}</TableRowColumn>
            <TableRowColumn>{tax.tax_outstanding}</TableRowColumn>
            <TableRowColumn>{tax.year}</TableRowColumn>
          </TableRow>
        );
      });
        
      const subsidies = this.state.subsidy.map(subsidy => {
        return (
          <TableRow key={subsidy.pk}>
            <TableRowColumn>{subsidy.sum}</TableRowColumn>
            <TableRowColumn>{subsidy.type}</TableRowColumn>
            <TableRowColumn>{subsidy.source}</TableRowColumn>
            <TableRowColumn>{subsidy.year}</TableRowColumn>
          </TableRow>
        );
      });

    return (
      <div>
        <h1>Verot</h1>
        <Table selectable={false} onCellClick={this.handleCellClick}>
          <TableHeader displaySelectAll={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn>VEROTETTAVA TULO</TableHeaderColumn>
              <TableHeaderColumn>VERO</TableHeaderColumn>
              <TableHeaderColumn>JÄÄNNÖSVERO</TableHeaderColumn>
              <TableHeaderColumn>VUOSI</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {taxes}
          </TableBody>
        </Table>
        <h1>Tuet</h1>
        <Table selectable={false} onCellClick={this.handleCellClick}>
          <TableHeader displaySelectAll={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn>SUMMA</TableHeaderColumn>
              <TableHeaderColumn>TUKi</TableHeaderColumn>
              <TableHeaderColumn>MYÖNTÄJÄ</TableHeaderColumn>
              <TableHeaderColumn>VUOSI</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {subsidies}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withRouter(CompanyDetails);
