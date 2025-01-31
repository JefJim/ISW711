const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); // Neccesary for handling paths

const app = express();
app.use(express.static(path.join(__dirname, "")));
app.use(express.static(path.join(__dirname, "server")));
app.use(express.static(path.join(__dirname, "client")));


//middlewares
app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: '*'
}));

//routes
app.get('/tipocambio', function (req, res) {
  let response = {};
  switch(req.query.type) {
    case 'usd':
      response = {
        "TipoCompraDolares" : "621",
        "TipoVentaDolares" : "621"
      }
    break;
    case 'eur':
      response = {
        "TipoCompraEuros" : "731.85",
        "TipoVentaEuros" : "761.9"
      }
    break;
    default:
      response = {
        "TipoCompraDolares" : "621",
        "TipoVentaDolares" : "621",
        "TipoCompraEuros" : "731.85",
        "TipoVentaEuros" : "761.9"
      }
    break;
  }
  res.json(response);
});

const port = 3000;
//start the app
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});