const allowedTruckTypes = ["Camion Pesado", "Camion Mediano", "Camion Liviano", "Furgón"];

function sanitizeIntent(intent = {}) {
  const kinds = ["analysis", "edit", "dashboard", "clear", "action", "qa"];
  const actions = ["save", "export", "share", "clear"];
  const analysisTypes = ["company_distribution", "truck_distribution", "timeline", "executive_summary"];
  const kind = kinds.includes(intent.kind) ? intent.kind : "analysis";
  const groupBy = intent.groupBy === "company" ? "company" : "truckType";

  return {
    kind,
    analysisType: analysisTypes.includes(intent.analysisType) ? intent.analysisType : undefined,
    action: actions.includes(intent.action) ? intent.action : undefined,
    truckType: allowedTruckTypes.includes(intent.truckType) ? intent.truckType : null,
    groupBy,
    thisWeek: Boolean(intent.thisWeek),
    received: Boolean(intent.received),
    wantsChart: intent.wantsChart !== false,
    wantsKpis: intent.wantsKpis !== false,
    groupedOnly: Boolean(intent.groupedOnly),
    answer: typeof intent.answer === "string" ? intent.answer.slice(0, 500) : ""
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ available: false, reason: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ available: false, reason: "OPENAI_API_KEY no configurada" });
    return;
  }

  try {
    const question = String(req.body?.question || "").slice(0, 1000);
    const rows = Array.isArray(req.body?.rows) ? req.body.rows.slice(0, 50) : [];
    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
    const prompt = [
      "Eres Silia DataBot. Convierte la pregunta del usuario en una intención JSON segura para una tabla de documentos.",
      "No inventes datos ni respondas con Markdown. Devuelve solo JSON válido.",
      "Campos permitidos: kind, analysisType, action, truckType, groupBy, thisWeek, received, wantsChart, wantsKpis, groupedOnly, answer.",
      "kind puede ser analysis, edit, dashboard, clear, action o qa.",
      "action solo puede ser save, export, share o clear.",
      "truckType solo puede ser Camion Pesado, Camion Mediano, Camion Liviano, Furgón o null.",
      "groupBy solo puede ser truckType o company.",
      "Para empresa usa analysisType company_distribution. Para camiones usa truck_distribution. Para fechas, vencimientos o próximos usa timeline. Para resumen general usa executive_summary.",
      `Pregunta: ${question}`,
      `Filas disponibles: ${JSON.stringify(rows).slice(0, 6000)}`
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: prompt,
        temperature: 0.1,
        max_output_tokens: 450
      })
    });

    if (!response.ok) {
      res.status(503).json({ available: false, reason: `OpenAI respondió ${response.status}` });
      return;
    }

    const data = await response.json();
    const text = data.output_text || data.output?.flatMap(item => item.content || []).map(item => item.text || "").join("") || "{}";
    res.status(200).json({ available: true, intent: sanitizeIntent(JSON.parse(text)) });
  } catch (error) {
    res.status(500).json({ available: false, reason: error.message || "AI intent error" });
  }
}

