const completed = (response) => {
    const data = JSON.parse(response.target.responseText);
    displayExchangeRates(data); // Print both currencys
  };
  
  // Func to handle issues
  const error = () => console.log("Error al cargar los tipos de cambio.");
  
  // Func to load both currencys
  function loadExchangeRates() {
    const ajaxRequest = new XMLHttpRequest(); // AJAX
    ajaxRequest.addEventListener("load", completed);
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET", "http://localhost:3001/tipocambio");
    ajaxRequest.send();
  }
  
  // Show to display both currencys
  function displayExchangeRates(data) {
    document.getElementById('result').innerHTML = `
      <p>Tipo de Cambio Dólares Compra: ${data.TipoCompraDolares}</p>
      <p>Tipo de Cambio Dólares Venta: ${data.TipoVentaDolares}</p>
      <p>Tipo de Cambio Euros Compra: ${data.TipoCompraEuros}</p>
      <p>Tipo de Cambio Euros Venta: ${data.TipoVentaEuros}</p>
    `;
  }
  
  // Alter between currencys
  function toggleExchangeRate(type) {
    const ajaxRequest = new XMLHttpRequest(); // AJAX
    ajaxRequest.addEventListener("load", (response) => {
      const data = JSON.parse(response.target.responseText);
      if (type === 'dolares') {
        document.getElementById('result').innerHTML = `
          <p>Tipo de Cambio Dólares Compra: ${data.TipoCompraDolares}</p>
          <p>Tipo de Cambio Dólares Venta: ${data.TipoVentaDolares}</p>
        `;
      } else if (type === 'euros') {
        document.getElementById('result').innerHTML = `
          <p>Tipo de Cambio Euros Compra: ${data.TipoCompraEuros}</p>
          <p>Tipo de Cambio Euros Venta: ${data.TipoVentaEuros}</p>
        `;
      }
    });
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET", "http://localhost:3001/tipocambio");
    ajaxRequest.send();
  }
  
  // Load both types of currency
  window.onload = loadExchangeRates;