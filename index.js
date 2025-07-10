const express = require("express");
const MetaApi = require("metaapi.cloud-sdk").default;

const app = express();
const port = process.env.PORT || 3000;

const token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmZTU0Nzc4OTExMjY1MjhmNTExODNjMzMwNDNhZTUyZSIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVzdC1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX1dLCJpZ25vcmVSYXRlTGltaXRzIjpmYWxzZSwidG9rZW5JZCI6IjIwMjEwMjEzIiwiaW1wZXJzb25hdGVkIjpmYWxzZSwicmVhbFVzZXJJZCI6ImZlNTQ3Nzg5MTEyNjUyOGY1MTE4M2MzMzA0M2FlNTJlIiwiaWF0IjoxNzUyMTI4NTczLCJleHAiOjE3NTk5MDQ1NzN9.dtJG1A1O6nYmXdqc2ZgBm9ji8SvjT3hx2JFSt3ALVJqvNzM8ojJxb9jQCotwpws7FTjy23z8gG45SAZkh8t-UJEIVwkVlcu_kjwf0kLL4drqC2KnyJFj5GWNyxjsAVeRWgI-sA_69R6nQuDGhRCgdsxPd4GdnAn7bNt625bWRXPpIMOcIKqHFJVAgLIH50bRyj3Hrop7bzTnl87jf7_ILOVsRLF0uuUWegg3mv9jKyQKAIAU1AxuT5Q6xTVe6xiFtBrq0TlI_am_F-c2JpG8GBEu9ZOaJuPzNaBLSVD7LImy9OlFizljBojfWudBpdYiwXafq-aZQewn8mAbFvUxySRRBb2ZdSFxMMdwNiIYegcA_cRXLV7Cr59tmjp-K_KBxo9wZw9LJT2OyoVtjNuOEF-14UvPNIVmTPyaNbLIRuRMHP8SY4GJaeXJAmkM-uCuNgSUkgPWq7mz8ExTcQscrXxeuNhnKPr3g4fKk8dtkIayqZv1L0oCFxHw6rEs3xUUxvoCpmxfUh4wWq-KQOfN7YGHHsAYKgmQGciVzP436p8n3LQ_Z3QqoRJrS4aG4vPdr2xWp0dcuMov1CeRuKOMjEpV3vBi43F0BxpPL6G801UD3TgV5icMMwOUdNt0I8G3P_we-xC736MGEz_ZAt5SuILnB_n2hFkkQWR6wZoDN2c";
const accountId = "8daf60a4-0f16-4fdc-a34c-d9e9cb5f6ca3";

const loteaje = 0.01;
const sl = 500;    // 50 pips
const tp = 1000;   // 100 pips

app.use(express.json());

app.post("/", async (req, res) => {
  const { symbol, action } = req.body;

  try {
    console.log(`📩 Señal recibida: ${action}`);

    const api = new MetaApi(token);
    const account = await api.metatraderAccountApi.getAccount(accountId);

    await account.deploy();
    await account.waitConnected();

    // ✅ Esta es la forma correcta ahora:
    const connection = account.getStreamingConnection();

    await connection.connect();
    await connection.waitSynchronized();

    const order = {
      symbol,
      type: action === "buy" ? "ORDER_TYPE_BUY" : "ORDER_TYPE_SELL",
      volume: loteaje,
      stopLoss: sl,
      takeProfit: tp,
      comment: "Bot Vallox"
    };

    await connection.createMarketOrder(order);
    console.log("✅ Orden ejecutada correctamente");
    res.status(200).send("Orden ejecutada");

  } catch (err) {
    console.error("❌ Error ejecutando orden:", err.message);
    res.status(500).send("Error ejecutando orden");
  }
});

app.listen(port, () => {
  console.log(`🚀 Bot escuchando en el puerto ${port}`);
});



