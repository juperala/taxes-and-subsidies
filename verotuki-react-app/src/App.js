import React, { Component } from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import SearchForm from "./SearchForm";
import CompanyDetails from "./CompanyDetails";
import CompanyList from "./CompanyList";

const paperStyle = {
  height: "80%",
  width: "90%",
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
    this.doSearch = this.doSearch.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  doSearch(name, county) {
    console.log(`doSearch: ${name},  ${county}`);
    let query = `https://auutvau7zj.execute-api.eu-west-1.amazonaws.com/prod/verotukiAPI?`;
    if (name && county) {
      query = query.concat(`name=${name}&county=${county}`);
    } else if (name) {
      query = query.concat(`name=${name}`);
    } else if (county) {
      query = query.concat(`county=${county}`);
    }

    fetch(query)
      .then(result => result.json())
      .then(companies => this.setState({ companies }));
  }

  handleCellClick(row, column) {
    console.log(`handleCellClick: ${row},  ${column}`);
    this.props.history.push(`/company/${this.state.companies[row].id}`);
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <AppBar
          showMenuIconButton={false}
          title="Yritysten tuloverot ja yritystuet"
        />
        <Paper style={paperStyle} zDepth={2}>
          <SearchForm doSearch={this.doSearch} />
        </Paper>

        <Paper style={paperStyle} zDepth={2}>
          <div style={{ textAlign: "left" }}>
            <Switch>
              <Route path="/company/:id" component={CompanyDetails} />
              <Route
                path="/"
                render={() => (
                  <CompanyList
                    handleCellClick={this.handleCellClick}
                    companies={this.state.companies}
                  />
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