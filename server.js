const express = require('express');
const mysql = require("mysql2");
const app = express();
const port = 3306;

//untuk menerima req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//create a connection to thw database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nabila1208',
    database: 'kuliah'
  });

  //open the mySql  connection
  connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

app.get('/', (req, res) => {
  const qstring = "SELECT * FROM mahasiswa";
  connection.query(qstring, (err, data) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).send({
        message : err.message || "Terjadi kesalahan saat get data"
      });
    }
    else res.send(data)
  });
})

app.get('/:nim', (req, res) => {
    const qstring = `SELECT * FROM mahasiswa WHERE nim = '${req.params.nim}'`;
    connection.query(qstring, (err, data) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send({
                message : err.message || "Terjadi kesalahan saat get data"
            });
        }
        else res.send(data)
    });
})

app.post('/', (req,res) => {
  const mahasiswaBaru = req.body;

  connection.query("INSERT INTO mahasiswa SET ?", mahasiswaBaru, (err) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).send({
        message : err.message || "Terjadi kesalahan saat insert data"
      });
    }
    else
      res.send(mahasiswaBaru)
  });
})

app.put('/:nim', (req, res) => {
    const nim = req.params.nim;
    const mhs = req.body;
    const qstring = `UPDATE mahasiswa
                     SET nama = '${mhs.nama}', angkatan = '${mhs.angkatan}', prodi = '${mhs.prodi}'
                     WHERE nim = '${nim}'`
    connection.query(qstring, (err, data) => {
        if(err) {
            res.status(500).send({
                message: "Error update mahasiswa with NIM" + nim
            });
        }
        else if(data.affectedRows = 0) {
            res.status(404).send({
                message: `Not found mahasiswa with NIM ${nim}.`
            });
        }
        else {
            console.log("update mahasiswa: ", { nim: nim, ...mhs });
            res.send({ nim: nim, ... mhs});
        }
    })
})

app.delete('/:nim', (req,res) => {
    const nim = req.params.nim
    const qstring = `DELETE FROM mahasiswa WHERE nim = '${nim}'`
    connection.query(qstring, (err, data) => {
        if(err) {
            res.status(500).send({
                message: "ERROR deleting mahasiswa with NIM: " + nim
            });
        }
        else if(data.affectedRows == 0) {
            res.status(404).send({
                message: `NOT found mahasiswa with NIM ${nim}.`
            });
        }
        else res.send(`Mahasiswa dengan nim = ${nim} telah terhapus`)
    });
})

app.post('/matakuliah', (req,res) => {
  const mataKuliah = req.body;
  connection.query("INSERT INTO matakuliah SET ?", mataKuliah, (err) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).send({
        message : err.message || "Terjadi kesalahan saat insert data"
      });
    }
    else
      res.send(req.body)
  });
})

app.get('/matakuliah', (req, res) => {
  connection.query('SELECT * FROM matakuliah', (error, result) => {
    if (error) throw error;
    res.json(result);
  })
})

app.get('/matakuliah/:kdmk', (req, res) => {
  const qstring = "SELECT * FROM kdmk";
  connection.query(qstring, (err, data) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).send({
        message : err.message || "Terjadi kesalahan saat get data"
      });
    }
    else res.send(data)
  });
})

app.listen(port, () => {
    console.log(`server berjalan pada localhost:${port}`)
});