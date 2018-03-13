import React, { Component } from "react";
import "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import SearchForm from "./SearchForm";
import CompanyDetails from "./CompanyDetails";
import CompanyList from "./CompanyList";
import IconButton from "material-ui/IconButton";
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back";

const paperStyle = {
  height: "80%",
  width: "85%",
  margin: 20,
  padding: 20,
  textAlign: "center",
  display: "inline-block"
};

const resultStyle = {
  width: "90%",
  margin: 20,
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
    this.props.history.push(`/company/${this.state.companies[row].id}`);
  }

  render() {
    return (
      <div className="vero-app">
        <Switch>
          <Route
            path="/company/:id"
            render={props => (
              <div>
                <AppBar
                  onLeftIconButtonClick={() => {
                    this.props.history.push(`/`);
                  }}
                  title={`Y-Tunnus: ${props.match.params.id}`}
                  iconElementLeft={
                    <IconButton>
                      <NavigationArrowBack />
                    </IconButton>
                  }
                />

                <div style={resultStyle}>
                  <div style={{ textAlign: "left" }}>
                    <CompanyDetails />
                  </div>
                </div>
              </div>
            )}
          />
          <Route
            path="/"
            render={() => (
              <div>
                <AppBar showMenuIconButton={false} title="Tuloverot ja tuet" />
                <Paper style={paperStyle} zDepth={1}>
                  <div style={{ textAlign: "left" }}>
                    <SearchForm doSearch={this.doSearch} />
                  </div>
                </Paper>

                <div style={resultStyle}>
                  <div style={{ textAlign: "left" }}>
                    <CompanyList
                      handleCellClick={this.handleCellClick}
                      companies={this.state.companies}
                    />
                  </div>
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
