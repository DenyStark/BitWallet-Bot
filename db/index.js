const {
  PG_HOST,
  PG_USER,
  PG_PORT,
  PG_PASSWORD,
  PG_DATABASE
} = process.env;

const PgClient = require('pg').Client;

const client = new PgClient({
  host: PG_HOST,
  user: PG_USER,
  port: PG_PORT,
  password: PG_PASSWORD,
  database: PG_DATABASE
});
client.connect().catch(error => console.info(error.toString()));

// const getRows = result => (result.rows || []);
// const getFirst = rows => (rows[0] || {});
// const getField = (row, field) => (row[field] || null);

// const query = sql => (client
//   .query(sql)
//   .catch(error => {
//     console.warn(sql);
//     console.error(error);
//   })
// );
// const request = buildSql => params => {
//   const sql = buildSql(params);
//   return query(sql);
// };

// const getAll = requestFunc => async(params) => {
//   const result = await requestFunc(params) || {};
//   return getRows(result);
// };
// const getRow = requestFunc => async(params) => {
//   const result = await requestFunc(params) || {};
//   return getFirst(getRows(result));
// };
// const getId = requestFunc => async(params) => {
//   const result = await requestFunc(params) || {};
//   return getField(getFirst(getRows(result)), 'id');
// };
// const getValue = requestFunc => async(params) => {
//   const result = await requestFunc(params) || {};
//   return getField(getFirst(getRows(result)), 'value');
// };

// const buildSQL = (module, request) => params => (module(request, params));

module.exports = {
};
