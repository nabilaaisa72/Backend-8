const express = require('express');
const app = express();
const port = 3306;

app.get('/perpus', (req, res) => {
    res.send(`selamat malam`)
});

//params1
app.get('/perpus/:nmTempat', (req, res) => {
    const nmTempat = req.params.nmTempat;

    res.send(`Nama tempat yang dipilih : ${nmTempat} sudah tersedia`)
});

//params2
app.get('/perpus/:nmBuku/:nmTempat', (req, res) => {
    const nmTempat = req.params.nmTempat;
    const nmBuku = req.params.nmBuku;

    res.send(`Nama buku : ${nmBuku} dan Nama tempat yang dipilih : ${nmTempat} sudah tersedia`)
});

//query1
app.get('/get-by-nmTempat', (req,res) => {
    const nmTempat = req.query.nmTempat ;

    res.send(`Nama tempat yang dipilih : ${nmTempat} sudah tersedia`)
});

//query2
app.get('/tempat-buku', (req,res) => {
    const nmTempat = req.query.nmTempat ;
    const nmBuku = req.query.nmBuku;

    res.send(`Nama buku : ${nmBuku} dan Nama tempat yang dipilih : ${nmTempat} sudah tersedia`)
});

//body
app.use(express.json()),

app.post('/mahasiswa', (req,res)=>{
    const nim = req.body.nim;
    const nama = req.body.nama;
    const angkatan = req.body.angkatan;
    const prodi = req.body.prodi;

    const msg = {status:"sukses",
                    data:{"nim":nim, "nama":nama, "angkatan":angkatan, "prodi":prodi}}
    res.send(msg);
})

app.post('/', (req, res) => {
    res.send(`selamat sore`)
});

app.put('/', (req, res) => {
    res.send(`selamat siang`)
});

app.delete('/', (req, res) => {
    res.send(`selamat pagi`)
});

app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`)
});


// const express = require('express');
// const app = express();
// const session = require('express-session');
// const port = 5000;

// //untuk menerima req.body
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

// //konfigurasi session
// app.use(session({
//     secret: 'secret-key',
//     resave: false,
//     saveUninitialized: false,
//     // cookie: {
//     //     maxAge: 1*60*1000 //waktu
//     // }
// }));

// //middleware untuk autentikasi
// const authenticate = (req, res, next) => {
//     //if (req.session && req.session.isAuthenticated) {
//     if (req?.session.isAuthenticated) {
//         //pengguna sudah terautentikasi
//         next();
//     }  else {
//         //pengguna belum terautentikasi
//         res.status(401).send('Tidak Terautentikasi');
//     }
// };

// //route login
// app.post('/login', (req,res) => {
//     //cek kredensial pengguna (contoh sederhana)
//     const {username, password} = req.body;
//     if (username === 'admin' && password === 'password') {
//         //set session untuk pengguna yang terautentikasi
//         req.session.isAuthenticated = true;
//         res.send('Login sukses');
//     } else {
//         res.status(401).send('Kredensial Tidak Valid');
//     }
// });

// //route logout
// app.get('/logout', (req, res) => {
//     //menghapus session pengguna
//     req.session.destroy((err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send('Logout');
//         }
//     });
// });


// //route tanpa autentikasi
// app.get ('/open', (req,res) => {
//     res.send('Anda masuk pada route tidak terproteksi')
// });

// //route get yang membutuhkan autentikasi
// app.get('/protected', authenticate, (req,res) => {
//     res.send('Anda masuk pada route terproteksi (GET)');
// });

// //route POST yang membutuhkan autentikasi
// app.post('/protected', authenticate, (req,res) => {
//     res.send('Route terproteksi (POST)');
// });

// //route PUT yang membutuhkan autentikasi
// app.put('/protected', authenticate, (req,res) => {
//     res.send('Route terproteksi (PUT)');
// });
// //route DELETE yang membutuhkan autentikasi
// app.delete('/protected', authenticate, (req,res) => {
//     res.send('Route terproteksi (DELETE)');
// });

// //server berjalan pada port 5000
// app.listen(port, () => {
//     console.log(`Server berjalan pada localhost:${port}`);
// });