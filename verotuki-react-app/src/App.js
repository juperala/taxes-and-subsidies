import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import AutoComplete from "material-ui/AutoComplete";
import datasource from "./datasource";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import { cyan500 } from "material-ui/styles/colors.js";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import TextField from "material-ui/TextField";
import CompanyDetails from "./CompanyDetails";

const style = {
  height: "80%",
  width: "80%",
  margin: 20,
  padding: 20,
  textAlign: "center",
  display: "inline-block"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: undefined,
      companies: []
    };
    this.handleSearchByName = this.handleSearchByName.bind(this);
    this.handleSearchByCounty = this.handleSearchByCounty.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleSearchByName(event, value) {
    this.setState({ search: value });
  }

  doSearch() {
    fetch(
      `https://auutvau7zj.execute-api.eu-west-1.amazonaws.com/prod/verotukiAPI?name=${
        this.state.search
      }`
    )
      .then(result => result.json())
      .then(companies => this.setState({ companies }));
  }

  handleSearchByCounty(value, index) {
    console.log(`handleSearchByCounty: ${value},  ${index}`);
    fetch(
      `https://auutvau7zj.execute-api.eu-west-1.amazonaws.com/prod/verotukiAPI?county=${value}`
    )
      .then(result => result.json())
      .then(companies => this.setState({ companies }));
  }

  handleCellClick(row, column) {
    console.log(`handleCellClick: ${row},  ${column}`);
    this.props.history.push(`/company/${this.state.companies[row].id}`);
  }

  render() {
    const rows = this.state.companies.map(company => {
      return (
        <TableRow key={company.id}>
          <TableRowColumn>{company.id}</TableRowColumn>
          <TableRowColumn>{company.name}</TableRowColumn>
          <TableRowColumn>{company.county}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div style={{ textAlign: "center" }} /* className="App" */>
        <AppBar
          showMenuIconButton={false} title="Yritysten tuloverot ja yritystuet"
        />
        <Paper style={style} zDepth={2}>
          <div style={{ textAlign: "left" }}>
            {/* <h1>Hae tietoja:</h1> */}
            <TextField
              hintText="Esim. Nokia"
              onChange={this.handleSearchByName}
              onKeyPress={ev => {
                console.log(`Pressed keyCode ${ev.key}`);
                if (ev.key === "Enter") {
                  this.doSearch();
                  ev.preventDefault();
                }
              }}
              floatingLabelText="Hae nimellä tai y-tunnuksella:"
              floatingLabelFixed={true}
              fullWidth={true}
            />
            <AutoComplete
              hintText="Esim. Oulu"
              dataSource={datasource}
              onNewRequest={this.handleSearchByCounty}
              filter={AutoComplete.caseInsensitiveFilter}
              floatingLabelText="Rajaa hakua paikkakunnalla:"
              floatingLabelFixed={true}
              fullWidth={true}
            />
            <div style={{ textAlign: "center" }} /* className="App" */>
              <RaisedButton
                label="HAE"
                primary={true}
                style={{
                  margin: 12
                }}
              />
            </div>
          </div>
        </Paper>

        <Paper style={style} zDepth={2}>
          <div style={{ textAlign: "left" }}>
            <Switch>
              <Route path="/company/:id" component={CompanyDetails} />
              <Route
                path="/"
                render={() => (
                  <div>
                  <h3 style={{color: cyan500}}>Hakutulokset:</h3>
                    <Table
                      selectable={false}
                      onCellClick={this.handleCellClick}
                    >
                      <TableHeader
                        displaySelectAll={false}
                        enableSelectAll={false}
                      >
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
                )}
              />
            </Switch>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withRouter(App);
