const express = require("express");
const bodyParser = require("body-parser");
const MetaApi = require("metaapi.cloud-sdk").default;

const app = express();
const port = 3000;

// Configura tus credenciales de MetaApi
const token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9. eyJfaWQiOiJmZTU0Nzc4OTExMjY1MjhmNTExODNjMzMwNDNhZTUyZSIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVzdC1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtZXRhc3RhdHMtYXBpIiwibWV0aG9kcyI6WyJtZXRhc3RhdHMtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6InJpc2stbWFuYWdlbWVudC1hcGkiLCJtZXRob2RzIjpbInJpc2stbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoiY29weWZhY3RvcnktYXBpIiwibWV0aG9kcyI6WyJjb3B5ZmFjdG9yeS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibXQtbWFuYWdlci1hcGkiLCJtZXRob2RzIjpbIm10LW1hbmFnZXItYXBpOnJlc3Q6ZGVhbGluZzoqOioiLCJtdC1tYW5hZ2VyLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJiaWxsaW5nLWFwaSIsIm1ldGhvZHMiOlsiYmlsbGluZy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfV0sImlnbm9yZVVJHdGVMaW1pdHMiOmZhbHNlLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiZmU1NDc3ODkxMTI2NTI4ZjUxMTgzYzMzMDQzYWU1MmUiLCJpYXQiOjE3NTE5OTQzODEsImV4cCI6MTc1OTc3MDM4MX0. kOB5xzjXHMF10kitpJglBzuZG7952Efec8Vn_UID2v9jP5nsiAbn5ZdNPblmwER1WnHp0xsqyhBwimqUCQLfCVKFfxbj06YaPWZyBUqnmpcN575gvoUYN1zwFO-m-8l8Th0ryyQCS_2xAkcKB6wob9uPaUom_DpJ4q9BKR97ng-pcjmFBctySaa11tyYoqHGg0FEgwbo-8aUuNifRfRVNadcQzbWcnuGVswb7FV322LjI7kFjwTUmkf-91Shywr-t6TIlBUOYJ7uwp_6uppv9eo-Yj8QeVVxIzY6-ZH4Skl7owzy5RmGatNcDb-lIOEPDMvXbijQu29Vkwz2c-QdR3AEn4fBIhds9NBDbKa18aSU2sJ4lf3cbz1IKnNPp-7TS0TF_ Cuf0jmZ6SCjRMo2QUPNmD452heSz6--YAHAhdRnPeLoV7ooEWk8xgzgrJHg4ENzqzaom0cx2S3DYAnKv-6euhcnyh9GXP564UyKkjiAjyg34BjgZLy9FFnB-jlGo755ZiWda-2RwqyaImD8721a_dcR6ufOLcolSvSBTBDIqzrHMDRUDsJrSm5SifhuxOYaAp7wlBCbqJcSBl0XToTOUrlrMcywuoXvKV86wTji7mp5tgBvAuwiveFxLP903V4IAkT216SQGuOVBDhSf8IiqCFGq3yCowk8H2Louvk";
const accountId = "8daf60a4-0f16-4fdc-a34c-d9e9cb5f6ca3";
const lotaje = 0.01;
const sl = 500; // 50 pips
const tp = 1000; // 100 pips

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const { symbol, action } = req.body;

  try {
    console.log(Senal recibida: ${action} en ${symbol});
    const api = new MetaApi(token);
    const account = await api.metatraderAccountApi.getAccount(accountId);
    await account.deploy();
    await account.waitConnected();

    const connection = account.getStreamingConnection();
    await connection.connect();
    await connection.waitSynchronized();

    const order = {
      symbol,
      type: action === "buy" ? "ORDER_TYPE_BUY" : "ORDER_TYPE_SELL",
      volume: lotaje,
      stopLoss: sl,
      takeProfit: tp,
      comment: "Bot Vallox",
    };

    const result = await connection.createMarketOrder(order);

    console.log("✅ Orden ejecutada:", result);
    res.status(200).send("Orden enviada con éxito.");
  } catch (error) {
    console.error("❌ Error ejecutando orden:", error);
    res.status(500).send("Error procesando la orden.");
  }
});

app.listen(port, () => {
  console.log(🚀 Bot Vallox corriendo en puerto ${port});
});
