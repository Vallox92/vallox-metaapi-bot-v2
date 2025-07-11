const express = require('express');
const bodyParser = require('body-parser');
const MetaApi = require('metaapi.cloud-sdk').default;

const app = express();
app.use(bodyParser.json());

// 🔐 Reemplaza con tu token y accountId real
const token = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmZTU0Nzc4OTExMjY1MjhmNTExODNjMzMwNDNhZTUyZSIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVzdC1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX1dLCJpZ25vcmVSYXRlTGltaXRzIjpmYWxzZSwidG9rZW5JZCI6IjIwMjEwMjEzIiwiaW1wZXJzb25hdGVkIjpmYWxzZSwicmVhbFVzZXJJZCI6ImZlNTQ3Nzg5MTEyNjUyOGY1MTE4M2MzMzA0M2FlNTJlIiwiaWF0IjoxNzUyMTI4NTczLCJleHAiOjE3NTk5MDQ1NzN9.dtJG1A1O6nYmXdqc2ZgBm9ji8SvjT3hx2JFSt3ALVJqvNzM8ojJxb9jQCotwpws7FTjy23z8gG45SAZkh8t-UJEIVwkVlcu_kjwf0kLL4drqC2KnyJFj5GWNyxjsAVeRWgI-sA_69R6nQuDGhRCgdsxPd4GdnAn7bNt625bWRXPpIMOcIKqHFJVAgLIH50bRyj3Hrop7bzTnl87jf7_ILOVsRLF0uuUWegg3mv9jKyQKAIAU1AxuT5Q6xTVe6xiFtBrq0TlI_am_F-c2JpG8GBEu9ZOaJuPzNaBLSVD7LImy9OlFizljBojfWudBpdYiwXafq-aZQewn8mAbFvUxySRRBb2ZdSFxMMdwNiIYegcA_cRXLV7Cr59tmjp-K_KBxo9wZw9LJT2OyoVtjNuOEF-14UvPNIVmTPyaNbLIRuRMHP8SY4GJaeXJAmkM-uCuNgSUkgPWq7mz8ExTcQscrXxeuNhnKPr3g4fKk8dtkIayqZv1L0oCFxHw6rEs3xUUxvoCpmxfUh4wWq-KQOfN7YGHHsAYKgmQGciVzP436p8n3LQ_Z3QqoRJrS4aG4vPdr2xWp0dcuMov1CeRuKOMjEpV3vBi43F0BxpPL6G801UD3TgV5icMMwOUdNt0I8G3P_we-xC736MGEz_ZAt5SuILnB_n2hFkkQWR6wZoDN2c'; // tu token real aquí
const accountId = '8daf60a4-0f16-4fdc-a34c-d9e9cb5f6ca3'; // tu accountId real aquí

const api = new MetaApi(token);

app.post('/webhook', async (req, res) => {
  try {
    const { symbol, type } = req.body;

    if (!symbol || !type) {
      return res.status(400).send('Faltan datos en la alerta');
    }

    console.log(`✅ Señal recibida: ${type.toUpperCase()} en ${symbol}`);

 const connection = await account.getStreamingConnection();
await connection.connect();

// Espera hasta que la cuenta esté conectada
await account.waitConnected();

// Ejecuta orden
await connection.createMarketOrder(symbol, type.toLowerCase(), 0.01, {
  stopLoss: 50,
  takeProfit: 100
});


const result = await connection.createMarketOrder(trade);
console.log('✅ Orden ejecutada correctamente:', result);
res.send('✅ Orden ejecutada');


    res.status(200).send('Orden ejecutada correctamente');
  } catch (err) {
    console.error('❌ Error ejecutando orden:', err);
    res.status(500).send('Error ejecutando orden');
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`🚀 Bot escuchando en el puerto ${port}`);
});



