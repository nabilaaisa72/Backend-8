const db = require("../config/conDb")

const getAll = (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result.affectedRows === 0) {
            return res.send("Data not found");
        }
        res.send(result)
    })
}

const getByNim = (req, res) => {
    const { nim } = req.params;
    db.query('SELECT * FROM mahasiswa WHERE nim = ?', nim, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result.affectedRows === 0) {
            return res.send("Data not found");
        }
        res.send(result)
    })
}

const post = (req, res) => {
    const { nim, nama, angkatan, prodi } = req.body;
    db.query(
        "INSERT INTO mahasiswa (nim,nama,angkatan,prodi) VALUES (?, ?, ?, ?)",
        [nim, nama, angkatan, prodi],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.affectedRows === 0) {
                return res.send("Data not found");
            }
            res.send("Data added");
        }
    )
}

const updateByparams = (req, res) => {
    const { nim } = req.params;
    const { nama, angkatan, prodi } = req.body;

    db.query(
        "UPDATE mahasiswa SET nama=?, angkatan=?, prodi=? WHERE nim=?",
        [nama, angkatan, prodi, nim],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.affectedRows === 0) {
                return res.send("Data not found");
            }
            res.send("Data updated");
        }
    )
}

const updateByquery = (req, res) => {
    const { nim } = req.query;
    const { nama, angkatan, prodi } = req.body;

    db.query(
        "UPDATE mahasiswa SET nama=?, angkatan=?, prodi=? WHERE nim=?",
        [nama, angkatan, prodi, nim],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result.affectedRows === 0) {
                return res.send("Data not found");
            }
            res.send("Data updated");
        }
    )
}

const deleteBynim = (req, res) => {
    const { nim } = req.params;

    db.query('DELETE from mahasiswa WHERE nim=?', nim, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result.affectedRows === 0) {
            return res.send("Data not found");
        }
        res.send("Data deleted");
    })
}


module.exports = { getAll, getByNim, post, updateByparams, updateByquery, deleteBynim };