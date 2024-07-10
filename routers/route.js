const { Router } = require('express');
const route = Router();
const {getAll, getByNim, post, updateByparams, updateByquery, deleteBynim} = require("../controllers/controllers")

route.get('/', getAll)

route.get("/:nim", getByNim)

route.post('/add', post)

route.put('/update/:nim', updateByparams)

route.put('/update', updateByquery)

route.delete('/delete/:nim', deleteBynim)

module.exports = route;
