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
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";

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
          <TableRowColumn>{tax.tax_income}</TableRowColumn>
          <TableRowColumn>{tax.tax}</TableRowColumn>
          <TableRowColumn>{tax.tax_advance}</TableRowColumn>
          <TableRowColumn>{tax.tax_return}</TableRowColumn>
          <TableRowColumn>{tax.tax_outstanding}</TableRowColumn>
          <TableRowColumn>{tax.year}</TableRowColumn>
        </TableRow>
      );
    });

    const subsidies = this.state.subsidy.map(subsidy => {
      return (
        <TableRow key={subsidy.pk}>
          <TableRowColumn>{subsidy.type}</TableRowColumn>
          <TableRowColumn>{subsidy.source}</TableRowColumn>
          <TableRowColumn>{subsidy.sum}</TableRowColumn>
          <TableRowColumn>{subsidy.loan}</TableRowColumn>
          <TableRowColumn>{subsidy.year}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div>
        <RaisedButton
          label="< TAKAISIN"
          primary={true}
          onClick={() => {
            this.props.history.push(`/`);
          }}
          style={{
            margin: 12
          }}
        />
          <br/>
          <br/>
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" style={{ textAlign: "center" }}>
                <b>PERUSTIEDOT</b>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Y-TUNNUS</TableHeaderColumn>
              <TableHeaderColumn>NIMI</TableHeaderColumn>
              <TableHeaderColumn>SIJAINTI</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>{details}</TableBody>
        </Table>

        <br/>
          <br/>

        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="6" style={{ textAlign: "center" }}>
                <b>VEROTIEDOT</b>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>TULO</TableHeaderColumn>
              <TableHeaderColumn>VERO</TableHeaderColumn>
              <TableHeaderColumn>ENNAKKO</TableHeaderColumn>
              <TableHeaderColumn>PALAUTUS</TableHeaderColumn>
              <TableHeaderColumn>JÄÄNNÖSVERO</TableHeaderColumn>
              <TableHeaderColumn>VUOSI</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>{taxes}</TableBody>
        </Table>

          <br/>
          <br/>

        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan="5" style={{ textAlign: "center" }}>
                <b>YRITYSTUET</b>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>PERUSTE</TableHeaderColumn>
              <TableHeaderColumn>MYÖNTÄJÄ</TableHeaderColumn>
              <TableHeaderColumn>TUKI €</TableHeaderColumn>
              <TableHeaderColumn>LAINA €</TableHeaderColumn>
              <TableHeaderColumn>VUOSI</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>{subsidies}</TableBody>
        </Table>
      </div>
    );
  }
}

export default withRouter(CompanyDetails);
