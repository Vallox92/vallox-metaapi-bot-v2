const express = require("express");
const bodyParser = require("body-parser");
const MetaApi = require("metaapi.cloud-sdk").default;

const app = express();
const port = process.env.PORT || 3000;

const token = "AQUÍ_TU_TOKEN"; // 👈 eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmZTU0Nzc4OTExMjY1MjhmNTExODNjMzMwNDNhZTUyZSIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVzdC1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtZXRhc3RhdHMtYXBpIiwibWV0aG9kcyI6WyJtZXRhc3RhdHMtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6InJpc2stbWFuYWdlbWVudC1hcGkiLCJtZXRob2RzIjpbInJpc2stbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoiY29weWZhY3RvcnktYXBpIiwibWV0aG9kcyI6WyJjb3B5ZmFjdG9yeS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibXQtbWFuYWdlci1hcGkiLCJtZXRob2RzIjpbIm10LW1hbmFnZXItYXBpOnJlc3Q6ZGVhbGluZzoqOioiLCJtdC1tYW5hZ2VyLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJiaWxsaW5nLWFwaSIsIm1ldGhvZHMiOlsiYmlsbGluZy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfV0sImlnbm9yZVJhdGVMaW1pdHMiOmZhbHNlLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiZmU1NDc3ODkxMTI2NTI4ZjUxMTgzYzMzMDQzYWU1MmUiLCJpYXQiOjE3NTIwOTEzOTMsImV4cCI6MTc1OTg2NzM5M30.Qfe976nKmLg4QZ_MCJ2KRe8Wkvo-602qBR6xxR1MCbLPKNXPj-bC76Z_dGo3SR2SfMNKX4kaiUXzAZ-vjGTiHBOlsFrj-Zx0nHERLvJZJTngQ36ZIwSO7gpRqaw6bCvwoWqv5rQ5Itw07DI1f4M_iH8yh-qZZ4GH-befF7u3Ecz5vjuC8ZfHKEQbMoWaKOB75v-NStP_EpkvO-H-_ottg1tB0PfS4JfO72g9c9eti1y3hX8aVsmcX_JH29k2034Jaeh7nKMXEM8ukxm1MyZ486UiJREN1o-pk3Wei1A29Lcs-eS9ph_P2PWdtlofLOcE3PyTdMHabb4YDM0kyc96wTLkraHH6l63HMyNqAm6R3_qrpiixQY18z6J2GHYbj9JXm96ofxVA-w5xJd_ieRHlM5verG4AVHISC52CYCWH5zb3fMNOKGdChzluJHfHjVtPzyKY8Q3mWdTRIUa30NWDoaW2fLWSvwIdFcAlky30qZjNOtNEjA440gvEqKftcGrUXd7LNrd--gHKhq8FESLsBrv-GU0ku-_HSGcyeyDX9cCZaVBXwZEZnMfO3Olg0VOYe2ZAD6_1agD9FcOqm-7pm4xkKO5SJo99hPTsS3Dj_nM2yOG2P6m4aBRffWs4UxhD9SZuX5prjfmUihfnK4cFhD9QVQYGKpOAGqtf9BjB7s
const accountId = "AQUÍ_TU_ACCOUNT_ID"; // 👈 8daf60a4-0f16-4fdc-a34c-d9e9cb5f6ca3

const loteaje = 0.01;
const sl = 500;  // 50 pips
const tp = 1000; // 100 pips

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const { symbol, action } = req.body;

  try {
    console.log(`📩 Señal recibida: ${action} en ${symbol}`);

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
      volume: loteaje,
      stopLoss: sl,
      takeProfit: tp,
      comment: "Bot Vallox"
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
  console.log(`🚀 Bot Vallox corriendo en puerto ${port}`);
});

