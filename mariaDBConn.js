const mariadb = require("mariadb");
const cfg = require("./conf");

const pool = mariadb.createPool({
    host:cfg.host,
    port:cfg.port,
    user:cfg.user,
    password:cfg.pass,
    connectionLimit:cfg.connectionLimit
});

async function GetSampleList() {
    let conn, rows;
    try {
        conn = await pool.getConnection();          // 연결될 때까지 기다리기
        conn.query('USE teaspoon');
        rows = await conn.query('select * from sample');
    } catch(err) {
        throw err;
    } finally {
        if(conn) conn.end();
        return rows;
    }
}

// 모듈화하기
module.exports = {
    getSampleList: GetSampleList
};