const express = require("express");
const bodyParser = require("body-parser");
const MetaApi = require("metaapi.cloud-sdk").default;

const app = express();
const port = process.env.PORT || 3000;

const token = "AQUÍ_TU_TOKEN"; // 👈 eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmZTU0Nzc4OTExMjY1MjhmNTExODNjMzMwNDNhZTUyZSIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjhkYWY2MGE0LTBmMTYtNGZkYy1hMzRjLWQ5ZTljYjVmNmNhMyJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6OGRhZjYwYTQtMGYxNi00ZmRjLWEzNGMtZDllOWNiNWY2Y2EzIl19LHsiaWQiOiJtZXRhYXBpLXJwYy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo4ZGFmNjBhNC0wZjE2LTRmZGMtYTM0Yy1kOWU5Y2I1ZjZjYTMiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo4ZGFmNjBhNC0wZjE2LTRmZGMtYTM0Yy1kOWU5Y2I1ZjZjYTMiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6OGRhZjYwYTQtMGYxNi00ZmRjLWEzNGMtZDllOWNiNWY2Y2EzIl19LHsiaWQiOiJyaXNrLW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJyaXNrLW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjhkYWY2MGE0LTBmMTYtNGZkYy1hMzRjLWQ5ZTljYjVmNmNhMyJdfV0sImlnbm9yZVJhdGVMaW1pdHMiOmZhbHNlLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiZmU1NDc3ODkxMTI2NTI4ZjUxMTgzYzMzMDQzYWU1MmUiLCJpYXQiOjE3NTIwOTI0NzUsImV4cCI6MTc1OTg2ODQ3NX0.Yw3y7tvT5Zx1PwwQDD3q3nSbzQ7OTB9vgIWgsAH5Xf2LJ-TQ98REWuGPL9c2GW4QuF8Hbzbiplf_Kyl30h0mCHTXfsvwBay3aBrPnLLswO_N-SyeZZ0wL7IFPanR7BM0E96CCIHOLiJh9t_y7a59N7dvEa9M1vYS_9c1vpB3eYHJS2U0V_WhRXWr7MjyvfPVVwaPXkZH9q2o6q5UQC_1RMCyFckM4eXxExE6TSDGy9m37dy6Y-m3xStPX-5QnphegcqMXOaorE6q8R4UpVmqfFRrGUmQWmqJPfc818Uj8ZpNi4qagTjc8YgLYc9T0Cln3EWN4vnice_XCTK8d2I70_w08Uqq3IuGVOk6XVxSRBvLqSUptopbFbfZiJYmJRj-R3M9f0olv5BnEElsxLWzZJ-x7wLry6y5sqTU0cjcwetNcA19mnZ-hulOqOnDi8u5dFaHvotNZrEcv6FX3pYLCC-3HMR5ebVugVkKLF8nVDa66hucFHet4KtoRTzeRvgm7E_vRkGzEyljf-0J3_GsFY1zSWoJ-tzweRy_Oh5bCYIf7mnmuCFOyNrelD2N_9vXK7o665DYLP3K92mDYSxbTlDfjEqqGvrNdCn7m5bFafbCqMOv3ulKYhClVQ4Y571PeeQ1cMothhaw35K3v39wjzur-AZbPhTqKBCIOn90-0g
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

