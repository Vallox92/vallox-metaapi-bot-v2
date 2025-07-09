const express = require("express");
const bodyParser = require("body-parser");
const MetaApi = require("metaapi.cloud-sdk").default;

const app = express();
const port = process.env.PORT || 3000;

const token = "AQUÍ_TU_TOKEN"; // 👈 eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmZTU0Nzc4OTExMjY1MjhmNTExODNjMzMwNDNhZTUyZSIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjhkYWY2MGE0LTBmMTYtNGZkYy1hMzRjLWQ5ZTljYjVmNmNhMyJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6OGRhZjYwYTQtMGYxNi00ZmRjLWEzNGMtZDllOWNiNWY2Y2EzIl19LHsiaWQiOiJtZXRhYXBpLXJwYy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo4ZGFmNjBhNC0wZjE2LTRmZGMtYTM0Yy1kOWU5Y2I1ZjZjYTMiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo4ZGFmNjBhNC0wZjE2LTRmZGMtYTM0Yy1kOWU5Y2I1ZjZjYTMiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6OGRhZjYwYTQtMGYxNi00ZmRjLWEzNGMtZDllOWNiNWY2Y2EzIl19LHsiaWQiOiJyaXNrLW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJyaXNrLW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjhkYWY2MGE0LTBmMTYtNGZkYy1hMzRjLWQ5ZTljYjVmNmNhMyJdfV0sImlnbm9yZVJhdGVMaW1pdHMiOmZhbHNlLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiZmU1NDc3ODkxMTI2NTI4ZjUxMTgzYzMzMDQzYWU1MmUiLCJpYXQiOjE3NTIwOTI5NzYsImV4cCI6MTc1OTg2ODk3Nn0.ARzxcX2IAev5Hyj5rWklUND0i3Lo72GJH8RcWQt3V85ABUCXynxBwQ2l18DcNDZ_EjW03d5_cBWPsjhaaHmAjMxQ_3N_BznI__e6aeYr5sArHa4RzXRLjS6gHxOtg8cdiaeSgB6Bm7ASWGC_Nnz015oo_GvW3pauDQcwWpo9XBe5k6dOQ2DUJdl_S1BjBaU7Z1NunnRI_Z2aRze8kvEi-fKLVSbNE1veX6nItWMgLY8cx1AHP0mXinbULQxDtt7BQ4tsSE5VOBAeeBOakFEY2bIhXlHAmjx0BkbnGdHgYU3-J9jEOd4vdO_7I_-I5QFFbewpEJFmkcvIH5TuXAiHG-3jPjoYH602GUDah4K6adt65n67gjf-KSIXiD3N1jMnmICXC64yRpBU0adTyFY5U7aXPLtFmhd_5EQl6g8pTSjdlNyyiwHJw3ceZC0D-t0ztO4avHOPD-VcwUk9xcJYbXXhFQO5_SI1z6P2Z3rpDy1IrkrIydIhaATHFS0KUOq9ro0cb1dgTipM_f4QKUiNW8VK7rV_TonbmN2OjKwSWKPaGaiyiTvai9oDhndSjBeMpYvkGwqIEIjuZHaMwaPJZYjrdXv58kOW5fkd8Ebck7IYwx7TyiLoDqFvBBaW6dtWBvGT5lPzF4vf5wRHdlKxagcobjJtERFZ4Q80q0GUATo
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

