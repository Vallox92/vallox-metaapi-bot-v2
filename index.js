const express = require("express");
const MetaApi = require("metaapi.cloud-sdk").default;
const app = express();
app.use(express.json());

const token = "TU_TOKEN_METAAPI"; // 🔴 reemplaza por tu token real de MetaApi
const accountId = "TU_ACCOUNT_ID"; // 🔴 reemplaza por tu cuenta real
const lotaje = 0.01;
const sl = 500; // 50 pips
const tp = 1000; // 100 pips

const metaApi = new MetaApi(token);

app.post("/webhook", async (req, res) => {
  const { signal } = req.body;

  try {
    const account = await metaApi.metatraderAccountApi.getAccount(accountId);
    if (!account || account.state !== "DEPLOYED") {
      return res.status(400).send("Cuenta no está desplegada");
    }

    await account.waitConnected();

    const connection = account.getStreamingConnection();
    await connection.connect();
    await connection.waitSynchronized();

    const symbol = "XAUUSD";
    const action = signal === "buy" ? "ORDER_TYPE_BUY" : "ORDER_TYPE_SELL";

    await connection.createMarketOrder(symbol, action, lotaje, {
      stopLoss: sl,
      takeProfit: tp
    });

    res.send("Orden ejecutada");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error ejecutando orden");
  }
});

app.listen(3000, () => {
  console.log("Bot Vallox corriendo en puerto 3000");
});
