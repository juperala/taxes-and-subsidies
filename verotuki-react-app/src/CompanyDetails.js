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
//import RaisedButton from "material-ui/RaisedButton";
//import { Card, CardHeader, CardText } from "material-ui/Card";
//import MediaQuery from "react-responsive";

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
          <TableRowColumn style={{ textAlign: "right" }}>
            {tax.tax_income} €
          </TableRowColumn>
          <TableRowColumn style={{ textAlign: "right" }}>
            {tax.tax} €
          </TableRowColumn>
          <TableRowColumn style={{ textAlign: "right" }}>
            {tax.tax_advance} €
          </TableRowColumn>
          <TableRowColumn style={{ textAlign: "right" }}>
            {tax.tax_return} €
          </TableRowColumn>
          <TableRowColumn style={{ textAlign: "right" }}>
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
          <TableRowColumn style={{ textAlign: "right" }}>
            {subsidy.sum} €
          </TableRowColumn>
          <TableRowColumn style={{ textAlign: "right" }}>
            {subsidy.loan} €
          </TableRowColumn>
        </TableRow>
      );
    });

    // const taxes2 = this.state.tax.map(tax => {
    //   return (
    //     <Card key={`${tax.id}-${tax.year}`}>
    //       <CardHeader
    //         title={tax.year}
    //         // subtitle="Subtitle"
    //         actAsExpander={true}
    //         showExpandableButton={true}
    //       />
    //       {/* <CardActions>
    //       <FlatButton label="Action1" />
    //       <FlatButton label="Action2" />
    //     </CardActions> */}
    //       <CardText expandable={true}>
    //         <Table selectable={false}>
    //           <TableBody displayRowCheckbox={false}>
    //             <TableRow key={`${tax.id}-${tax.year}`}>
    //               <TableRowColumn>Verotulo</TableRowColumn>
    //               <TableRowColumn>{tax.tax_income} €</TableRowColumn>
    //             </TableRow>
    //             <TableRow key={`${tax.id}-${tax.year}`}>
    //               <TableRowColumn>Vero</TableRowColumn>
    //               <TableRowColumn>{tax.tax} €</TableRowColumn>
    //             </TableRow>
    //             <TableRow key={`${tax.id}-${tax.year}`}>
    //               <TableRowColumn>Ennakkovero</TableRowColumn>
    //               <TableRowColumn>{tax.tax_advance} €</TableRowColumn>
    //             </TableRow>
    //             <TableRow key={`${tax.id}-${tax.year}`}>
    //               <TableRowColumn>Veronpalautus</TableRowColumn>
    //               <TableRowColumn>{tax.tax_return} €</TableRowColumn>
    //             </TableRow>
    //             <TableRow key={`${tax.id}-${tax.year}`}>
    //               <TableRowColumn>Jäännösvero</TableRowColumn>
    //               <TableRowColumn>{tax.tax_outstanding} €</TableRowColumn>
    //             </TableRow>
    //           </TableBody>
    //         </Table>
    //       </CardText>
    //     </Card>
    //   );
    // });

    return (
       <div>
{/*         <RaisedButton
          label="< TAKAISIN"
          primary={true}
          onClick={() => {
            this.props.history.push(`/`);
          }}
          style={{
            margin: 12
          }}
        />

        <br />
        <br /> 
 */}
        <Table selectable={false} style={{ tableLayout: "auto" }}>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn
                colSpan="3"
                style={{ textAlign: "center", fontSize: "14px" }}
              >
                PERUSTIEDOT
              </TableHeaderColumn>
            </TableRow>
{/*             <TableRow>
              <TableHeaderColumn>Y-TUNNUS</TableHeaderColumn>
              <TableHeaderColumn>NIMI</TableHeaderColumn>
              <TableHeaderColumn>SIJAINTI</TableHeaderColumn>
            </TableRow> */}
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn
                style={{ color: "rgb(158,158,158)" }}
              >
                Y-TUNNUS
              </TableRowColumn>
              <TableRowColumn
                style={{ color: "rgb(158,158,158)" }}
              >
                NIMI
              </TableRowColumn>
              <TableRowColumn
                style={{  color: "rgb(158,158,158)" }}
              >
                VERO
              </TableRowColumn>
            </TableRow>
            {details}
          </TableBody>
        </Table>

        <br />
        <br />

{/*         <MediaQuery query="(max-width: 799px)">{taxes2}</MediaQuery>
        <MediaQuery query="(min-width: 800px)">
 */}    
       <Table selectable={false} style={{ tableLayout: "auto" }}>
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn
                  colSpan="6"
                  style={{ textAlign: "center", fontSize: "14px" }}
                >
                  VEROTIEDOT
                </TableHeaderColumn>
              </TableRow>
              {/*               <TableRow>
                <TableHeaderColumn>VUOSI</TableHeaderColumn>
                <TableHeaderColumn style={{ textAlign: "right" }}>
                  TULO
                </TableHeaderColumn>
                <TableHeaderColumn style={{ textAlign: "right" }}>
                  VERO
                </TableHeaderColumn>
                <TableHeaderColumn style={{ textAlign: "right" }}>
                  ENNAKKO
                </TableHeaderColumn>
                <TableHeaderColumn style={{ textAlign: "right" }}>
                  PALAUTUS
                </TableHeaderColumn>
                <TableHeaderColumn style={{ textAlign: "right" }}>
                  JÄÄNNÖSVERO
                </TableHeaderColumn>
              </TableRow> */}
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn
                  style={{ color: "rgb(158,158,158)" }}
                >
                  VUOSI
                </TableRowColumn>
                <TableRowColumn
                  style={{ textAlign: "right", color: "rgb(158,158,158)" }}
                >
                  TULO
                </TableRowColumn>
                <TableRowColumn
                  style={{ textAlign: "right", color: "rgb(158,158,158)" }}
                >
                  VERO
                </TableRowColumn>
                <TableRowColumn
                  style={{ textAlign: "right", color: "rgb(158,158,158)" }}
                >
                  ENNAKKO
                </TableRowColumn>
                <TableRowColumn
                  style={{ textAlign: "right", color: "rgb(158,158,158)" }}
                >
                  PALAUTUS
                </TableRowColumn>
                <TableRowColumn
                  style={{ textAlign: "right", color: "rgb(158,158,158)" }}
                >
                  JÄÄNNÖSVERO
                </TableRowColumn>
              </TableRow>

              {taxes}
            </TableBody>
          </Table>
    {/*     </MediaQuery>
 */}
        <br />
        <br />

        <Table selectable={false} style={{ tableLayout: "auto" }}>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn
                colSpan="5"
                style={{ textAlign: "center", fontSize: "14px" }}
              >
                YRITYSTUET
              </TableHeaderColumn>
            </TableRow>
            {/*           <TableRow>
              <TableHeaderColumn style={{ textAlign: "center" }}>VUOSI</TableHeaderColumn>
              <TableHeaderColumn style={{ textAlign: "center" }}>MYÖNTÄJÄ</TableHeaderColumn>
              <TableHeaderColumn style={{ textAlign: "center" }}>PERUSTE</TableHeaderColumn>
              <TableHeaderColumn style={{ textAlign: "center" }}>
                TUKI €
              </TableHeaderColumn>
              <TableHeaderColumn style={{ textAlign: "center" }}>
                LAINA €
              </TableHeaderColumn>
            </TableRow> */}
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn
                style={{color: "rgb(158,158,158)" }}
              >
                VUOSI
              </TableRowColumn>
              <TableRowColumn
                style={{color: "rgb(158,158,158)" }}
                >
                MYÖNTÄJÄ
              </TableRowColumn>
              <TableRowColumn
                style={{color: "rgb(158,158,158)" }}
                >
                PERUSTE
              </TableRowColumn>
              <TableRowColumn
                style={{ textAlign: "right", color: "rgb(158,158,158)" }}
              >
                TUKI
              </TableRowColumn>
              <TableRowColumn
                style={{ textAlign: "right", color: "rgb(158,158,158)" }}
              >
                LAINA
              </TableRowColumn>
            </TableRow>

            {subsidies}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withRouter(CompanyDetails);
