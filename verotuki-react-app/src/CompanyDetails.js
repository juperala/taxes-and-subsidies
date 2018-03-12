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

const titleStyle = { textAlign: "center", fontSize: "14px" };
const rightStyle = { textAlign: "right" };
const grayStyle = { color: "rgb(158,158,158)" };
const grayRightStyle = { textAlign: "right", color: "rgb(158,158,158)" };

class CompanyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null,
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
        this.setState({
          company: details.company,
          tax: details.tax,
          subsidy: details.subsidy
        })
      );
  }

  render() {
    const details = this.state.company && (
      <TableRow>
        <TableRowColumn>{this.state.company.id}</TableRowColumn>
        <TableRowColumn>{this.state.company.name}</TableRowColumn>
        <TableRowColumn>{this.state.company.county}</TableRowColumn>
      </TableRow>
    );

    const taxes = this.state.tax.map(tax => {
      return (
        <TableRow key={`${tax.id}-${tax.year}`}>
          <TableRowColumn>{tax.year}</TableRowColumn>
          <TableRowColumn style={rightStyle}>{tax.tax_income} €</TableRowColumn>
          <TableRowColumn style={rightStyle}>{tax.tax} €</TableRowColumn>
          <TableRowColumn style={rightStyle}>
            {tax.tax_advance} €
          </TableRowColumn>
          <TableRowColumn style={rightStyle}>{tax.tax_return} €</TableRowColumn>
          <TableRowColumn style={rightStyle}>
            {tax.tax_outstanding} €
          </TableRowColumn>
        </TableRow>
      );
    });

    const subsidies = this.state.subsidy.map(subsidy => {
      return (
        <TableRow key={subsidy.pk}>
          <TableRowColumn>{subsidy.year}</TableRowColumn>
          <TableRowColumn>{subsidy.source}</TableRowColumn>
          <TableRowColumn>{subsidy.type}</TableRowColumn>
          <TableRowColumn style={rightStyle}>{subsidy.sum} €</TableRowColumn>
          <TableRowColumn style={rightStyle}>{subsidy.loan} €</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div>
        <Table
          selectable={false}
          style={{ tableLayout: "auto" }}
          bodyStyle={{ overflowX: "auto" }}
        >
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" style={titleStyle}>
                PERUSTIEDOT
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn style={grayStyle}>Y-TUNNUS</TableRowColumn>
              <TableRowColumn style={grayStyle}>NIMI</TableRowColumn>
              <TableRowColumn style={grayStyle}>VERO</TableRowColumn>
            </TableRow>
            {details}
          </TableBody>
        </Table>

        <br />
        <br />

        <Table
          selectable={false}
          style={{ tableLayout: "auto" }}
          bodyStyle={{ overflowX: "auto" }}
        >
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="6" style={titleStyle}>
                VEROTIEDOT
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn style={grayStyle}>VUOSI</TableRowColumn>
              <TableRowColumn style={grayRightStyle}>TULO</TableRowColumn>
              <TableRowColumn style={grayRightStyle}>VERO</TableRowColumn>
              <TableRowColumn style={grayRightStyle}>ENNAKKO</TableRowColumn>
              <TableRowColumn style={grayRightStyle}>PALAUTUS</TableRowColumn>
              <TableRowColumn style={grayRightStyle}>
                JÄÄNNÖSVERO
              </TableRowColumn>
            </TableRow>

            {taxes}
          </TableBody>
        </Table>

        <br />
        <br />

        <Table
          selectable={false}
          style={{ tableLayout: "auto" }}
          bodyStyle={{ overflowX: "auto" }}
        >
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="5" style={titleStyle}>
                YRITYSTUET
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn style={grayStyle}>VUOSI</TableRowColumn>
              <TableRowColumn style={grayStyle}>MYÖNTÄJÄ</TableRowColumn>
              <TableRowColumn style={grayStyle}>PERUSTE</TableRowColumn>
              <TableRowColumn style={grayRightStyle}>TUKI</TableRowColumn>
              <TableRowColumn style={grayRightStyle}>LAINA</TableRowColumn>
            </TableRow>

            {subsidies}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withRouter(CompanyDetails);
