const Express = require('express')
const app = Express()
const PORT = 3306;
const route = require("./routers/route");

app.use(Express.json())

app.use(route);

app.listen(PORT, () => 
    console.log(`Server running on http://localhost:${PORT}`)
);


