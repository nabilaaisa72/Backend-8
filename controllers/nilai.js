const connection = require('../config/conDb')

module.exports = {
    getNilaiByNim : (req,res) => {
        const qstring = `SELECT matakuliah.kdMk, matakuliah.matakuliah, nilai.dosen, matakuliah.sks,nilai.semester, nilai.nilai
                        FROM nilai
                        INNER JOIN matakuliah
                        ON nilai.kdMk = matakuliah.kdMk
                        WHERE nilai.nim = ${req.params.nim};`;
        connection.query(qstring, (err,data )=> {
            if(err) {
                console.log("error: ", err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat get data"
                });
            }
            else res.send(data)
        });
    },

    getNilaiByNimSemester : (req,res) => {
        const qstring = `SELECT matakuliah.kdMk, matakuliah.matakuliah, nilai.dosen, matakuliah.sks,nilai.semester, nilai.nilai
                        FROM nilai
                        INNER JOIN matakuliah
                        ON nilai.kdMk = matakuliah.kdMk
                        WHERE nilai.nim = ${req.params.nim} AND nilai.semester = ${req.params.semester};`;
        connection.query(qstring, (err,data )=> {
            if(err) {
                console.log("error: ", err);
                res.status(500).send({
                    message : err.message || "Terjadi kesalahan saat get data"
                });
            }
            else res.send(data)
        });
    },
}
