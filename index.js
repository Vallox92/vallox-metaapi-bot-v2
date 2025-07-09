const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Bot Vallox está corriendo correctamente 🦁');
});

app.post('/', (req, res) => {
  const { symbol, action } = req.body;

  console.log(🚨 Alerta recibida: ${symbol} - ${action});

  // Aquí iría la lógica real para ejecutar la orden con MetaApi

  res.status(200).send('✅ Señal recibida');
});

app.listen(port, () => {
  console.log(✅ Bot Vallox corriendo en puerto ${port});
});
