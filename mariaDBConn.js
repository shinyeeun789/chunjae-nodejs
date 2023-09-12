const mariadb = require("mariadb");
const cfg = require("./conf");

const pool = mariadb.createPool({
    host:cfg.host,
    port:cfg.port,
    user:cfg.user,
    password:cfg.pass,
    connectionLimit:cfg.connectionLimit
});

// sampleList
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

// sample
async function GetSample(no) {
    let conn, row;
    try {
        conn = await pool.getConnection();
        conn.query('USE teaspoon');
        row = await conn.query(`select * from sample where no=${no}`);
    } catch(err) {
        throw err;
    } finally {
        if(conn) conn.end();
        return row;
    }
}

// insert
async function InsertSample(sample) {
    let conn, nickname, msg, sql;
    nickname = sample.name;
    try {
        conn = await pool.getConnection();
        conn.query('USE teaspoon');
        sql = `insert into sample values(default, ?)`;
        await conn.query(sql, nickname);
        msg = "등록 성공";
    } catch(err) {
        msg = "등록 실패";
        throw err;
    } finally {
        if(conn) conn.end();
        return msg;
    }
}

// update
async function UpdateSample(sample) {
    let conn, msg, sql;
    try {
        conn = await pool.getConnection();
        conn.query('USE teaspoon');
        sql = `update sample set name=? where no=?`;
        await conn.query(sql, sample);
        msg = "수정 성공";
    } catch(err) {
        msg = "수정 실패";
        console.log(err);
        throw err;
    } finally {
        if(conn) conn.end();
        return msg;
    }
}

// delete
async function DeleteSample(no) {
    let conn;
    try {
        conn = await pool.getConnection();
        conn.query('USE teaspoon');
        await conn.query(`delete from sample where no=${no}`);
    } catch(err) {
        throw err;
    } finally {
        if(conn) conn.end();
    }
}

// 모듈화하기
module.exports = {
    getSampleList: GetSampleList,
    getSample: GetSample,
    insertSample: InsertSample,
    updateSample: UpdateSample,
    deleteSample: DeleteSample
};