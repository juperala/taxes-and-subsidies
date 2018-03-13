import React, { Component } from "react";
import TextField from "material-ui/TextField";
import AutoComplete from "material-ui/AutoComplete";
import RaisedButton from "material-ui/RaisedButton";
import datasource from "./datasource";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      county: null
    };
    this.handleUpdateName = this.handleUpdateName.bind(this);
    this.handleUpdateCounty = this.handleUpdateCounty.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleUpdateName(event, value) {
    this.setState({ name: value });
  }

  handleUpdateCounty(value, source, params) {
    this.setState({ county: value });
  }  

  handleSearch(event = null) {
      this.props.doSearch(this.state.name, this.state.county);
  }

  render() {
    return (
      <div style={{ textAlign: "left" }}>
        <TextField
          hintText="Esim. Nokia Oyj"
          onChange={this.handleUpdateName}
          onKeyPress={ev => {
            if (ev.key === "Enter") {
              this.handleSearch();
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
          onUpdateInput={this.handleUpdateCounty}
          filter={AutoComplete.caseInsensitiveFilter}
          floatingLabelText="Voit rajata hakua sijainnilla:"
          floatingLabelFixed={true}
          fullWidth={true}
        />
        <div style={{ textAlign: "center" }}>
          <RaisedButton
            label="HAE"
            primary={true}
            onClick={this.handleSearch}
            style={{
              margin: 12
            }}
          />
        </div>
      </div>
    );
  }
}

export default SearchForm;
