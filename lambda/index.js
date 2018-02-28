console.log("PostgreSQL GET Function");

const pg = require("pg");

const conn = process.env.conn;

exports.handler = (event, context, callback) => {
  const done = (err, data) => {
    if (!err) {
      console.log(JSON.stringify(data));
    }
    callback(null, {
      statusCode: err ? "400" : "200",
      body: err ? err.message : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  };

  const queryCompany = (query, params) => {
    console.log(`Query: ${query}, params: ${JSON.stringify(params)}`);

    const client = new pg.Client(conn);
    client.connect();
    console.log("Connected to PostgreSQL database");

    client.query(query, params, (err, res) => {
      console.log(`Error: ${JSON.stringify(err)}`);
      console.log(`res: ${JSON.stringify(res)}`);
      done(err, res.rows);
      client.end();
    });
  };

//  https://auutvau7zj.execute-api.eu-west-1.amazonaws.com/prod/verotukiAPI?ytunnus=2586213-3

  const queryCompanyDetails = yid => {
    let subsidy, tax;
    const client = new pg.Client(conn);
    client.connect();
    console.log("Connected to PostgreSQL database");

    client.query('SELECT * FROM "Subsidy" WHERE id=$1;', [yid], (err, res) => {
      console.log(`Subsidy Error: ${JSON.stringify(err)}`);
      console.log(`Subsidy res: ${JSON.stringify(res)}`);
      subsidy = res.rows;
      if (err) {
        done(err, res.rows);
        client.end();
      } else {
        client.query('SELECT * FROM "Tax" WHERE id=$1;', [yid], (err, res) => {
          console.log(`Tax Error: ${JSON.stringify(err)}`);
          console.log(`Tax res: ${JSON.stringify(res)}`);
          tax = res.rows;
          done(err, { tax: tax, subsidy: subsidy });
          client.end();
        });
      }
    });
  };

  switch (event.httpMethod) {
    case "GET":
      const yid = event.queryStringParameters.ytunnus;
      const name = event.queryStringParameters.name;
      const county = event.queryStringParameters.county;

      let query, params;
      if (yid) {
        queryCompanyDetails(yid);
      } else if (name) {
        queryCompany(
          'SELECT * FROM "Company" WHERE name ILIKE $1 ORDER BY name ASC;',
          [`%${name}%`]
        );
      } else if (county) {
        queryCompany(
          'SELECT * FROM "Company" WHERE county=$1 ORDER BY name ASC;',
          [county]
        );
      } else {
        console.log("No parameters provided.");
        done(
          new Error(`Missing parameters: Either yid, name or county required.`)
        );
        return;
      }
      break;
    default:
      done(new Error(`Unsupported method "${event.httpMethod}"`));
  }
};
