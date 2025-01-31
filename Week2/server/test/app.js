const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors'); // Importa el módulo cors
const path = require('path'); // Importa el módulo path

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors()); // Habilita CORS para todas las rutas

// Sirve archivos estáticos desde la carpeta "client"
app.use(express.static(path.join(__dirname, "../../client")));

const port = 3001;

// Routes
app.get('/tipocambio', function (req, res) {
  const response = {
    "TipoCompraDolares": "621",
    "TipoVentaDolares": "621",
    "TipoCompraEuros": "731.85",
    "TipoVentaEuros": "761.9"
  };
  res.json(response);
});

// Start the app
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});