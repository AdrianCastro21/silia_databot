import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

const allowedTruckTypes = ["Camion Pesado", "Camion Mediano", "Camion Liviano", "Furgón"];

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  return body ? JSON.parse(body) : {};
}

function sanitizeIntent(intent = {}) {
  const kind = ["analysis", "edit", "dashboard", "clear", "action", "qa"].includes(intent.kind)
    ? intent.kind
    : "analysis";
  const action = ["save", "export", "share", "clear"].includes(intent.action) ? intent.action : undefined;
  const truckType = allowedTruckTypes.includes(intent.truckType) ? intent.truckType : null;
  const groupBy = intent.groupBy === "company" ? "company" : "truckType";

  const analysisTypes = ["company_distribution", "truck_distribution", "timeline", "executive_summary"];
  return {
    kind,
    analysisType: analysisTypes.includes(intent.analysisType) ? intent.analysisType : undefined,
    action,
    truckType,
    groupBy,
    thisWeek: Boolean(intent.thisWeek),
    received: Boolean(intent.received),
    wantsChart: intent.wantsChart !== false,
    wantsKpis: intent.wantsKpis !== false,
    groupedOnly: Boolean(intent.groupedOnly),
    answer: typeof intent.answer === "string" ? intent.answer.slice(0, 500) : ""
  };
}

async function buildAiIntent(question, rows) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { available: false, reason: "OPENAI_API_KEY no configurada" };
  }

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const prompt = [
    "Eres Silia DataBot. Convierte la pregunta del usuario en una intención JSON segura para una tabla de documentos.",
    "No inventes datos ni respondas con Markdown. Devuelve solo JSON válido.",
    "Campos permitidos: kind, analysisType, action, truckType, groupBy, thisWeek, received, wantsChart, wantsKpis, groupedOnly, answer.",
    "kind puede ser analysis, edit, dashboard, clear, action o qa.",
    "action solo puede ser save, export, share o clear.",
    "truckType solo puede ser Camion Pesado, Camion Mediano, Camion Liviano, Furgón o null.",
    "groupBy solo puede ser truckType o company.",
    "Si pide agrupar/distribuir/mostrar por empresa, usa kind analysis, groupBy company, groupedOnly true.",
    "Para empresa usa analysisType company_distribution. Para camiones usa truck_distribution. Para fechas, vencimientos o próximos usa timeline. Para resumen general usa executive_summary.",
    "Si pide agrupar por tipo de camión, usa kind analysis, groupBy truckType, groupedOnly true.",
    "Si pide filtrar a un camión concreto, usa kind analysis y truckType con ese valor.",
    "Si solo pregunta algo conversacional, usa kind qa y answer breve en español.",
    `Pregunta: ${question}`,
    `Filas disponibles: ${JSON.stringify(rows).slice(0, 6000)}`
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
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
    return { available: false, reason: `OpenAI respondió ${response.status}` };
  }

  const data = await response.json();
  const text = data.output_text || data.output?.flatMap(item => item.content || []).map(item => item.text || "").join("") || "{}";
  return { available: true, intent: sanitizeIntent(JSON.parse(text)) };
}

function sendFile(res, file) {
  const type = types[extname(file)] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
  createReadStream(file).pipe(res);
}

function safePath(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  return join(root, clean);
}

createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname;

  if (pathname === "/api/ai-intent" && req.method === "POST") {
    try {
      const payload = await readJson(req);
      const question = String(payload.question || "").slice(0, 1000);
      const rows = Array.isArray(payload.rows) ? payload.rows.slice(0, 50) : [];
      const result = await buildAiIntent(question, rows);
      sendJson(res, result.available ? 200 : 503, result);
    } catch (error) {
      sendJson(res, 500, { available: false, reason: error.message || "AI intent error" });
    }
    return;
  }

  if (pathname === "/" || pathname === "/table" || pathname === "/table/") {
    sendFile(res, join(root, "index.html"));
    return;
  }

  const file = safePath(pathname);

  try {
    if (existsSync(file) && (await stat(file)).isFile()) {
      sendFile(res, file);
      return;
    }
  } catch {
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
}).listen(port, () => {
  console.log(`Silia replica running at http://localhost:${port}/table`);
});
