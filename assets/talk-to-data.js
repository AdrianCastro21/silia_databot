(() => {
  const icons = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>',
    export: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4"/><path d="M8.6 13.5l6.8 4"/></svg>',
    dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="8" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="15" width="7" height="6" rx="1.5"/></svg>',
    views: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/></svg>',
    clear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/></svg>'
  };
  const profilePhoto = "/assets/silia-databot-robot.png";
  const savedViewsKey = "silia-databot-saved-views";
  const chartPalette = ["#5b518c", "#8b7bd0", "#dff463", "#45a6a1", "#f3a85d", "#cf6f8d", "#6b8fd6", "#9aa06a"];

  const fallbackRows = [
    { file: "DF1.pdf", name: "Rafael Cano", company: "Farmacias YZA", fecha: "28/12/25 - 19:00", email: "rafael@farmaciasyza.com", truckType: "Camion Pesado", from: "1040 Grayson Highway Lawrenceville GA", createdAt: "Today, 09:24" },
    { file: "DF3.pdf", name: "Julio Martínez", company: "Distribuciones ABC", fecha: "22/02/26 - 14:00", email: "julio@distribucionesabc.com", truckType: "Furgón", from: "789 Elm St, Miami FL 33101", createdAt: "Today, 09:24" },
    { file: "DF5.pdf", name: "Mateo Pérez", company: "Electrodomésticos MX", fecha: "05/04/26 - 09:15", email: "mateo@electrodomesticosmx.com", truckType: "Furgón", from: "123 Pine St, San Francisco CA 94101", createdAt: "Today, 09:24" },
    { file: "DF6.pdf", name: "Lucía Fernández", company: "Transporte Rápido", fecha: "20/05/26 - 11:00", email: "lucia@transporterapido.com", truckType: "Camion Pesado", from: "321 Maple St, Chicago IL 60601", createdAt: "Today, 09:24" },
    { file: "DF4.pdf", name: "Sofía López", company: "Logística Global", fecha: "10/03/26 - 16:45", email: "sofia@logisticaglobal.com", truckType: "Camion Mediano", from: "456 Oak Ave, Seattle WA 98101", createdAt: "Today, 09:24" },
    { file: "DF7.pdf", name: "Carlos Vega", company: "Productos Innovadores", fecha: "12/06/26 - 15:30", email: "carlos@productosinnovadores.com", truckType: "Camion Liviano", from: "654 Birch St, Boston MA 02101", createdAt: "Today, 09:24" },
    { file: "DF2.pdf", name: "Isabella Ruiz", company: "Tecnología Express", fecha: "15/01/26 - 10:30", email: "isabella@tecnologiaexpress.com", truckType: "Camion Liviano", from: "2501 Main St, Dallas TX 75201", createdAt: "Today, 09:24" },
    { file: "DF8.pdf", name: "Andrés Núñez", company: "Comercial Norte", fecha: "03/07/26 - 12:00", email: "andres@comercialnorte.com", truckType: "Camion Mediano", from: "987 Cedar Rd, Portland OR 97201", createdAt: "Today, 09:24" }
  ];

  let root;
  let body;
  let input;
  let observer;
  let insightShell;
  let filteredTableView;
  let hiddenOriginalTable;
  let filteredTableCard;
  let savedViewsButton;
  let savedViewsPanel;
  let saveViewModal;
  let shareViewModal;
  let feedbackTimer;
  let originalTotalText = null;
  let currentResult = null;
  let activeMode = "analyze";

  const quickSuggestions = [
    "Agrupa solicitudes por empresa.",
    "Analiza documentos por tipo de camión.",
    "Muéstrame las fechas próximas por contacto.",
    "Genera un resumen ejecutivo de la vista.",
    "Filtra solo Camion Pesado.",
    "Limpia filtros y outputs."
  ];

  function isTableRoute() {
    return window.location.pathname.replace(/\/$/, "") === "/table";
  }

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function actionButton(action, label, quiet = false) {
    return `<button type="button" data-action="${action}" class="${quiet ? "is-quiet" : ""}">${icons[action] || ""}<span>${escapeHtml(label)}</span></button>`;
  }

  function normalize(value) {
    return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function titleCase(value) {
    return String(value || "").replace(/^./, char => char.toUpperCase());
  }

  function message(text, role = "agent") {
    const row = el("div", `ttd-message ${role === "user" ? "is-user" : "is-agent"}`);
    row.append(el("div", "ttd-bubble", escapeHtml(text)));
    body.append(row);
    body.scrollTop = body.scrollHeight;
    return row;
  }

  function richMessage(title, lines, actions = []) {
    const row = el("div", "ttd-message is-agent");
    const bubble = el("div", "ttd-bubble ttd-bubble--rich");
    bubble.innerHTML = `
      <div class="ttd-rich-title">${escapeHtml(title)}</div>
      <div class="ttd-rich-lines">${lines.map(line => `<div>${escapeHtml(line)}</div>`).join("")}</div>
      ${actions.length ? `<div class="ttd-rich-actions">${actions.map(action => `<button type="button" class="ttd-mini-action" data-action="${action.id}">${escapeHtml(action.label)}</button>`).join("")}</div>` : ""}
    `;
    bubble.querySelectorAll("[data-action]").forEach(button => {
      button.addEventListener("click", () => runPostAction(button.dataset.action));
    });
    row.append(bubble);
    body.append(row);
    body.scrollTop = body.scrollHeight;
  }

  function openPanel() {
    if (!root) createPanel();
    root.classList.add("is-open");
    window.setTimeout(() => input?.focus(), 120);
  }

  function closePanel() {
    root?.classList.remove("is-open");
  }

  function destroyDataBot() {
    closePanel();
    root?.remove();
    root = null;
    body = null;
    input = null;
    savedViewsPanel?.remove();
    savedViewsPanel = null;
    saveViewModal?.remove();
    saveViewModal = null;
    shareViewModal?.remove();
    shareViewModal = null;
    savedViewsButton?.remove();
    savedViewsButton = null;
    window.clearTimeout(feedbackTimer);
  }

  function showOutsideFeedback(title, detail) {
    if (!root) createPanel();
    root.querySelector(".ttd-feedback-toast")?.remove();
    const toast = el("div", "ttd-feedback-toast");
    toast.innerHTML = `
      <span class="ttd-feedback-icon" aria-hidden="true">✓</span>
      <div>
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(detail)}</span>
      </div>
    `;
    root.append(toast);
    window.clearTimeout(feedbackTimer);
    feedbackTimer = window.setTimeout(() => toast.remove(), 5200);
  }

  function finishChatFlow(title, detail) {
    closePanel();
    showOutsideFeedback(title, detail);
  }

  function buildActionFeedback(result) {
    const activeFilters = materialFilters(result.filters);
    if (activeFilters.length) {
      return {
        title: "Filtro aplicado",
        detail: `${result.rows.length} de ${result.allRows.length} filas visibles. Actualicé la tabla y el análisis debajo.`
      };
    }

    if (result.analysisType === "company_distribution") {
      return {
        title: "Empresas agrupadas",
        detail: `Generé KPIs y gráfica para ${result.groups.length} empresa${result.groups.length === 1 ? "" : "s"}.`
      };
    }

    if (result.analysisType === "timeline") {
      return {
        title: "Agenda generada",
        detail: `Ordené ${result.rows.length} documento${result.rows.length === 1 ? "" : "s"} por fecha y contacto.`
      };
    }

    if (result.analysisType === "executive_summary") {
      return {
        title: "Resumen ejecutivo listo",
        detail: "Preparé el pulso operativo con KPIs, empresas, tipos de camión e insights."
      };
    }

    return {
      title: "Camiones agrupados",
      detail: `Generé distribución por ${result.groupLabel || "tipo de camión"} con ${result.rows.length} documento${result.rows.length === 1 ? "" : "s"}.`
    };
  }

  function createPanel() {
    if (root) return;

    root = el("div", "ttd-root");
    const backdrop = el("div", "ttd-backdrop");
    const fab = el("button", "ttd-fab", `
      <img class="ttd-avatar" src="${profilePhoto}" alt="Silia DataBot" />
      <span class="ttd-status-dot" aria-hidden="true"></span>
      <span class="ttd-fab-copy">
        <span class="ttd-fab-title">Silia DataBot</span>
        <span class="ttd-fab-subtitle">Filtra, resume y crea vistas</span>
      </span>
    `);
    const panel = el("aside", "ttd-panel");

    fab.type = "button";
    fab.addEventListener("click", openPanel);
    backdrop.addEventListener("click", closePanel);

    panel.innerHTML = `
      <header class="ttd-header">
        <img class="ttd-mark" src="${profilePhoto}" alt="Silia DataBot" />
        <div class="ttd-title-wrap">
          <div class="ttd-title">Silia DataBot</div>
          <div class="ttd-subtitle">Agente para analizar datos</div>
        </div>
        <button class="ttd-icon-button" type="button" aria-label="Close Silia DataBot">${icons.close}</button>
      </header>
      <section class="ttd-body" aria-live="polite"></section>
      <footer class="ttd-footer">
        <form class="ttd-form">
          <input class="ttd-input" type="text" placeholder="Pide un filtro, resumen o vista" autocomplete="off" />
          <button class="ttd-send" type="submit" aria-label="Send">${icons.send}</button>
        </form>
        <div class="ttd-footnote">Puede aplicar filtros visuales, generar KPIs, gráficos, vistas guardadas y outputs reutilizables.</div>
      </footer>
    `;

    body = panel.querySelector(".ttd-body");
    input = panel.querySelector(".ttd-input");
    panel.querySelector(".ttd-icon-button").addEventListener("click", closePanel);
    panel.querySelector(".ttd-form").addEventListener("submit", event => {
      event.preventDefault();
      ask(input.value);
      input.value = "";
    });

    root.append(backdrop, fab, panel);
    document.body.append(root);
    seedConversation();
  }

  function seedConversation() {
    message("Hola. Puedo filtrar, resumir y preparar vistas con los datos de esta tabla.");
    renderSuggestions();
  }

  function renderSuggestions() {
    body.querySelector(".ttd-suggestions")?.remove();
    const suggestions = el("div", "ttd-suggestions");
    quickSuggestions.forEach(text => {
      const chip = el("button", "ttd-chip", escapeHtml(text));
      chip.type = "button";
      chip.addEventListener("click", () => ask(text));
      suggestions.append(chip);
    });
    body.append(suggestions);
  }

  function ask(raw) {
    const question = raw.trim();
    if (!question) return;
    message(question, "user");

    window.setTimeout(async () => {
      try {
        const intent = await resolveIntent(question);
        if (intent.kind === "analysis") {
          const result = runAnalysis(intent, question);
          const activeFilters = materialFilters(result.filters);
          richMessage("Listo, generé el análisis", [
            activeFilters.length
              ? `${activeFilters.length} filtro${activeFilters.length === 1 ? "" : "s"} aplicado${activeFilters.length === 1 ? "" : "s"}; la tabla se mantiene visible.`
              : `Agrupé la vista sin aplicar filtros; la tabla conserva sus ${result.rows.length} fila${result.rows.length === 1 ? "" : "s"}.`,
            `${result.rows.length} de ${result.allRows.length} fila${result.rows.length === 1 ? "" : "s"} visible${result.rows.length === 1 ? "" : "s"} en la tabla.`,
            `Vista preparada: ${displayViewName(result.savedViewName)}.`,
            `Generé ${result.kpis.length} KPIs, un gráfico por ${result.groupLabel || "tipo de camión"} y ${result.outputs.length} outputs reutilizables.`,
            "Estoy colocando los resultados debajo de la tabla."
          ], [
            { id: "save", label: "Save" },
            { id: "export", label: "Export" },
            { id: "share", label: "Share" },
            { id: "clear", label: "Clear" }
          ]);
          try {
            renderInsights(result);
            applyVisualFilter(result);
            const feedback = buildActionFeedback(result);
            finishChatFlow(feedback.title, feedback.detail);
          } catch (renderError) {
            console.error("Silia DataBot render error", renderError);
            message("El análisis está listo en el chat, pero no pude pintar la sección debajo de la tabla en este intento.");
          }
          return;
        }

        if (intent.kind === "edit") {
          const result = runEditCommand(question);
          renderEditOutput(result);
          applyVisualFilter(result);
          richMessage("Listo, edité la vista de la tabla", [
            `${result.rows.length} fila${result.rows.length === 1 ? "" : "s"} visible${result.rows.length === 1 ? "" : "s"} después del filtro.`,
            `Vista preparada: ${result.savedViewName}.`,
            "Los filtros del agente quedaron reflejados en la tabla."
          ], [
            { id: "save", label: "Save view" },
            { id: "clear", label: "Clear" }
          ]);
          finishChatFlow("Vista actualizada", `La tabla quedó con ${result.rows.length} fila${result.rows.length === 1 ? "" : "s"} visible${result.rows.length === 1 ? "" : "s"}.`);
          return;
        }

        if (intent.kind === "dashboard") {
          const result = runDashboard(question);
          renderDashboardOutput(result);
          richMessage("Listo, preparé un dashboard", [
            "Generé un layout con KPI cards, gráfico por tipo de camión y resumen operativo.",
            `Base conectada: ${result.rows.length} documentos de la tabla actual.`,
            "Puedes exportar o compartir este preview."
          ], [
            { id: "export", label: "Export" },
            { id: "share", label: "Share" },
            { id: "clear", label: "Clear" }
          ]);
          finishChatFlow("Preview listo", "Preparé los KPIs, el gráfico y el resumen operativo debajo de la tabla.");
          return;
        }

        if (intent.kind === "clear") {
          clearAgentLayer();
          message("Listo. Limpié los resaltados y oculté los outputs del agente.");
          finishChatFlow("Vista limpiada", "Quité filtros, resaltados y outputs generados por el agente.");
          return;
        }

        if (intent.kind === "action") {
          runPostAction(intent.action);
          return;
        }

        message(intent.answer || answer(question));
      } catch (error) {
        console.error("Silia DataBot error", error);
        message("Tuve un problema generando los outputs. Dejé la tabla intacta; recarga la página e intenta de nuevo.");
      }
    }, 220);
  }

  async function resolveIntent(question) {
    try {
      const response = await fetch("/api/ai-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          rows: visibleRows().map(row => ({
            file: row.file,
            name: row.name,
            company: row.company,
            fecha: row.fecha,
            truckType: row.truckType,
            from: row.from
          }))
        })
      });
      if (!response.ok) throw new Error(`AI intent unavailable: ${response.status}`);
      const data = await response.json();
      if (data?.intent) return normalizeAiIntent(data.intent, question);
    } catch (error) {
      console.info("Silia DataBot AI fallback", error.message);
    }
    return parseIntent(question);
  }

  function normalizeAiIntent(intent, question) {
    const local = parseIntent(question);
    const kind = ["analysis", "edit", "dashboard", "clear", "action", "qa"].includes(intent.kind) ? intent.kind : local.kind;
    const action = ["save", "export", "share", "clear"].includes(intent.action) ? intent.action : local.action;
    const truckTypes = unique(visibleRows().map(row => row.truckType));
    const truckType = truckTypes.includes(intent.truckType) ? intent.truckType : null;
    return {
      ...local,
      kind,
      action,
      truckType,
      groupBy: intent.groupBy === "company" ? "company" : "truckType",
      thisWeek: Boolean(intent.thisWeek),
      received: Boolean(intent.received),
      wantsChart: intent.wantsChart !== false,
      wantsKpis: intent.wantsKpis !== false,
      groupedOnly: Boolean(intent.groupedOnly),
      analysisType: normalizeAnalysisType(intent.analysisType, question, intent.groupBy === "company" ? "company" : "truckType"),
      answer: typeof intent.answer === "string" ? intent.answer : ""
    };
  }

  function normalizeAnalysisType(value, question, groupKey = "truckType") {
    const allowed = ["company_distribution", "truck_distribution", "timeline", "executive_summary"];
    if (allowed.includes(value)) return value;
    const q = normalize(question || "");
    if (q.includes("fecha") || q.includes("proxim") || q.includes("agenda") || q.includes("venc")) return "timeline";
    if (q.includes("resumen ejecutivo") || q.includes("ejecutivo") || q.includes("insight")) return "executive_summary";
    if (groupKey === "company" || q.includes("empresa") || q.includes("compania") || q.includes("company")) return "company_distribution";
    return "truck_distribution";
  }

  function parseIntent(question) {
    const q = normalize(question);
    if (q.includes("limpia") || q.includes("quita filtro") || q.includes("reset")) return { kind: "clear" };
    if (q.includes("export")) return { kind: "action", action: "export" };
    if (q.includes("compart")) return { kind: "action", action: "share" };

    const truckType = detectTruckType(question);
    const groupByCompany = q.includes("empresa") || q.includes("compania") || q.includes("company");
    const timelineRequest = q.includes("fecha") || q.includes("proxim") || q.includes("contacto") || q.includes("agenda") || q.includes("venc");
    const explicitGroup = q.includes("agrupa") || q.includes("grupo") || q.includes("group") || q.includes("distribucion") || q.includes("por tipo") || groupByCompany;
    const explicitTableFilter = !explicitGroup && (q.includes("filtra") || q.includes("filtro") || q.includes("solo") || Boolean(truckType));
    const explicitVisualEdit = q.includes("resalta") || q.includes("oculta") || q.includes("ordena") || q.includes("marca");

    if (explicitVisualEdit) return { kind: "edit" };
    if (timelineRequest) {
      return {
        kind: "analysis",
        truckType: null,
        thisWeek: false,
        received: q.includes("recib") || q.includes("document"),
        groupBy: "truckType",
        analysisType: "timeline",
        wantsChart: true,
        wantsKpis: true,
        groupedOnly: true
      };
    }
    if (explicitGroup) {
      return {
        kind: "analysis",
        truckType: null,
        thisWeek: q.includes("semana") || q.includes("week"),
        received: q.includes("recib") || q.includes("document"),
        groupBy: groupByCompany ? "company" : "truckType",
        analysisType: normalizeAnalysisType(null, question, groupByCompany ? "company" : "truckType"),
        wantsChart: true,
        wantsKpis: true,
        groupedOnly: true
      };
    }
    if (explicitTableFilter) {
      return {
        kind: "analysis",
        truckType,
        thisWeek: q.includes("semana") || q.includes("week"),
        received: q.includes("recib") || q.includes("document"),
        groupBy: "truckType",
        analysisType: normalizeAnalysisType(null, question, "truckType"),
        wantsChart: q.includes("graf") || q.includes("dashboard") || q.includes("resumen"),
        wantsKpis: q.includes("kpi") || q.includes("resumen") || q.includes("dashboard")
      };
    }

    if (activeMode === "edit") return { kind: "edit" };
    if (activeMode === "dashboard") return { kind: "dashboard" };
    if (q.includes("reporte") || q.includes("cards") || q.includes("dashboard")) return { kind: "dashboard" };
    if (q.includes("dashboard")) return { kind: "action", action: "dashboard" };
    if (q.includes("guardar") || q.includes("guarda")) return { kind: "analysis", saveOnly: true };

    const analysisWords = ["resumen", "graf", "kpi", "vista", "recibidos", "semana", "tipo de camion", "truck", "pesado", "liviano", "mediano", "furgon", "empresa", "compania", "company", "solicitudes", "fecha", "proxim", "contacto", "agenda", "venc"];
    if (analysisWords.some(word => q.includes(word))) {
      return {
        kind: "analysis",
        truckType,
        thisWeek: q.includes("semana") || q.includes("week"),
        received: q.includes("recib") || q.includes("document"),
        groupBy: groupByCompany ? "company" : "truckType",
        analysisType: normalizeAnalysisType(null, question, groupByCompany ? "company" : "truckType"),
        wantsChart: q.includes("graf") || q.includes("dashboard") || q.includes("resumen"),
        wantsKpis: q.includes("kpi") || q.includes("resumen") || q.includes("dashboard")
      };
    }

    return { kind: "qa" };
  }

  function rowNodes() {
    const semanticRows = Array.from(document.querySelectorAll("tbody tr, [role='row']"))
      .filter(row => row.querySelectorAll("td, [role='cell'], [role='gridcell']").length >= 3);
    const visualRows = fallbackRows
      .map(row => findVisualTableRow(row))
      .filter(Boolean);
    return uniqueNodes([...semanticRows, ...visualRows]);
  }

  function visibleRows() {
    const nodes = rowNodes();
    const rows = nodes.map((rowNode, index) => {
      const cells = Array.from(rowNode.querySelectorAll("td, [role='cell'], [role='gridcell']"))
        .map(cell => cell.innerText.trim().replace(/\s+/g, " "))
        .filter(Boolean);
      return { rowNode, index, cells };
    }).filter(row => row.cells.length >= 3);

    if (!rows.length) {
      return fallbackRows.map((row, index) => ({ ...row, index, rowNode: findVisualTableRow(row) }));
    }

    if (!rows.length || rows.length < fallbackRows.length) {
      return fallbackRows.map((row, index) => ({ ...row, index, rowNode: findVisualTableRow(row) }));
    }

    return rows.map(({ rowNode, index, cells }) => {
      const offset = /^\d+$/.test(cells[0] || "") ? 1 : 0;
      return {
      rowNode,
      index,
      file: cells[offset] || "",
      name: cells[offset + 1] || "",
      company: cells[offset + 2] || "",
      fecha: cells[offset + 3] || "",
      email: cells[offset + 4] || "",
      truckType: cells[offset + 5] || "Unclassified",
      from: cells[offset + 6] || "",
      createdAt: cells[offset + 7] || ""
    };
    });
  }

  function uniqueNodes(nodes) {
    return [...new Set(nodes)];
  }

  function findVisualTableRow(row) {
    const fileNode = findTextElement(row.file);
    if (!fileNode) return null;

    let best = null;
    let node = fileNode;
    while (node && node !== document.body) {
      const text = node.innerText || "";
      const rect = node.getBoundingClientRect?.();
      const hasRowText = text.includes(row.file) && text.includes(row.name) && text.includes(row.truckType);
      const rowSized = rect && rect.width > 500 && rect.height >= 34 && rect.height <= 90;
      const notWholeTable = text.split(/DF\d+\.pdf/g).length <= 3;
      if (hasRowText && rowSized && notWholeTable) {
        best = node;
        break;
      }
      node = node.parentElement;
    }

    return best;
  }

  function findTextElement(text) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue?.includes(text)) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || parent.closest(".ttd-root, .ttd-insights-shell")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const textNode = walker.nextNode();
    return textNode?.parentElement || null;
  }

  function unique(values) {
    return [...new Set(values.map(value => String(value || "").trim()).filter(Boolean))];
  }

  function isThisWeek(row) {
    const text = `${row.fecha} ${row.createdAt}`.toLowerCase();
    if (text.includes("today") || text.includes("ayer") || text.includes("esta semana")) return true;
    const date = new Date(row.fecha);
    if (!Number.isNaN(date.getTime())) {
      const now = new Date();
      const day = now.getDay() || 7;
      const monday = new Date(now);
      monday.setDate(now.getDate() - day + 1);
      monday.setHours(0, 0, 0, 0);
      return date >= monday && date <= now;
    }
    return true;
  }

  function runAnalysis(intent, question) {
    const allRows = visibleRows();
    const filters = [];
    let rows = allRows;
    const truckType = intent.truckType || detectTruckType(question);
    const groupKey = intent.groupBy === "company" ? "company" : "truckType";
    const groupLabel = groupKey === "company" ? "empresa" : "tipo de camión";
    const groupLabelPlural = groupKey === "company" ? "empresas" : "tipos de camión";

    if (intent.received || normalize(question).includes("document")) {
      filters.push({ label: "Documentos recibidos", value: "File Received no vacío" });
      rows = rows.filter(row => `${row.file}${row.name}${row.company}`.trim().length > 0);
    }

    if (intent.thisWeek) {
      filters.push({ label: "Fecha", value: "Esta semana" });
      const weekRows = rows.filter(isThisWeek);
      rows = weekRows.length ? weekRows : rows;
      if (!weekRows.length) {
        filters.push({ label: "Nota", value: "Sin coincidencias exactas; se resume la vista actual" });
      }
    }

    if (truckType) {
      filters.push({ label: "Tipo de camión", value: truckType });
      rows = rows.filter(row => normalize(row.truckType) === normalize(truckType));
    }

    const groups = groupBy(rows, groupKey);
    const topGroup = groups[0] || { label: "Sin datos", count: 0 };
    const analysisType = intent.analysisType || normalizeAnalysisType(null, question, groupKey);
    const savedViewName = intent.saveOnly
      ? "Silia - Saved view"
      : intent.groupedOnly
        ? `Silia - Documentos por ${groupLabel}`
      : truckType
        ? `Silia - ${truckType}`
        : "Silia - Documentos recibidos esta semana";
    const summary = buildSummary(rows, groups, filters, intent, groupLabel, analysisType, allRows);
    const outputs = buildOutputChips(rows, allRows, groups, filters, groupLabelPlural);

    currentResult = {
      question,
      filters,
      rows,
      allRows,
      groups,
      analysisType,
      groupKey,
      groupLabel,
      groupLabelPlural,
      savedViewName,
      summary,
      kpis: buildKpis(rows, allRows, groups, analysisType, groupLabel, groupLabelPlural),
      outputs,
      actions: ["save", "export", "share"]
    };

    return currentResult;
  }

  function detectTruckType(question) {
    const q = normalize(question);
    const types = unique(visibleRows().map(row => row.truckType));
    return types.find(type => q.includes(normalize(type))) ||
      types.find(type => normalize(type).split(/\s+/).some(part => part.length > 3 && part !== "camion" && q.includes(part))) ||
      null;
  }

  function buildKpis(rows, allRows, groups, analysisType, groupLabel, groupLabelPlural) {
    const coverage = `${Math.round(rows.length / Math.max(allRows.length, 1) * 100)}%`;
    const top = groups[0] || { label: "Sin datos", count: 0 };
    const concentration = `${Math.round(top.count / Math.max(rows.length, 1) * 100)}%`;
    const upcoming = sortedRowsByDate(rows);
    const next = upcoming[0];

    if (analysisType === "company_distribution") {
      return [
        { label: "Solicitudes", value: rows.length },
        { label: "Empresas", value: groups.length },
        { label: "Empresa top", value: top.label },
        { label: "Concentración", value: concentration }
      ];
    }

    if (analysisType === "timeline") {
      return [
        { label: "Documentos", value: rows.length },
        { label: "Fechas detectadas", value: upcoming.length },
        { label: "Próximo contacto", value: next?.name || "Sin fecha" },
        { label: "Primera fecha", value: next ? next.fecha.split(" - ")[0] : "N/A" }
      ];
    }

    if (analysisType === "executive_summary") {
      return [
        { label: "Documentos", value: rows.length },
        { label: "Empresas", value: unique(rows.map(row => row.company)).length },
        { label: "Tipos", value: unique(rows.map(row => row.truckType)).length },
        { label: "Cobertura", value: coverage }
      ];
    }

    return [
      { label: "Documentos", value: rows.length },
      { label: titleCase(groupLabelPlural), value: groups.length },
      { label: `${titleCase(groupLabel)} principal`, value: top.label },
      { label: "Cobertura filtro", value: coverage }
    ];
  }

  function sortedRowsByDate(rows) {
    return rows
      .map(row => ({ ...row, sortDate: parseRowDate(row.fecha) }))
      .filter(row => row.sortDate)
      .sort((a, b) => a.sortDate - b.sortDate);
  }

  function runEditCommand(question) {
    const allRows = visibleRows();
    const q = normalize(question);
    const truckType = detectTruckType(question);
    let rows = allRows;
    const filters = [];

    if (truckType) {
      filters.push({ label: "Tipo de camión", value: truckType });
      rows = rows.filter(row => normalize(row.truckType) === normalize(truckType));
    } else if (q.includes("junio")) {
      filters.push({ label: "Fecha", value: "Junio" });
      rows = rows.filter(row => row.fecha.includes("/06/") || normalize(row.fecha).includes("jun"));
    } else {
      filters.push({ label: "Vista", value: "Filas relevantes resaltadas" });
    }

    if (!rows.length) rows = allRows;
    const groups = groupBy(rows, "truckType");

    currentResult = {
      question,
      filters,
      rows,
      allRows,
      groups,
      savedViewName: truckType ? `Silia - ${truckType}` : "Silia - Vista operativa",
      summary: `Se preparó una edición visual de la tabla con ${rows.length} fila${rows.length === 1 ? "" : "s"} resaltada${rows.length === 1 ? "" : "s"}.`,
      kpis: [
        { label: "Filas resaltadas", value: rows.length },
        { label: "Columnas clave", value: 4 },
        { label: "Vista", value: "Lista" },
        { label: "Cambios", value: "Visuales" }
      ],
      outputs: buildOutputChips(rows, allRows, groups, filters),
      actions: ["save", "clear"]
    };

    return currentResult;
  }

  function runDashboard(question) {
    const rows = visibleRows();
    const groups = groupBy(rows, "truckType");
    const companies = unique(rows.map(row => row.company));
    const topGroup = groups[0] || { label: "Sin datos", count: 0 };

    currentResult = {
      question,
      filters: [{ label: "Fuente", value: "Tabla Quotes completa" }],
      rows,
      allRows: rows,
      groups,
      savedViewName: "Silia - Dashboard de Quotes",
      summary: `Dashboard preparado con ${rows.length} documentos, ${groups.length} tipos de camión y ${companies.length} compañías. El tipo con mayor volumen es ${topGroup.label}.`,
      kpis: [
        { label: "Documentos", value: rows.length },
        { label: "Compañías", value: companies.length },
        { label: "Tipos", value: groups.length },
        { label: "Top tipo", value: topGroup.label }
      ],
      outputs: buildOutputChips(rows, rows, groups, [{ label: "Fuente", value: "Tabla completa" }]),
      actions: ["export", "share"]
    };

    return currentResult;
  }

  function groupBy(rows, key) {
    const map = new Map();
    rows.forEach(row => {
      const label = row[key] || "Unclassified";
      map.set(label, (map.get(label) || 0) + 1);
    });
    return [...map.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }

  function buildSummary(rows, groups, filters, intent = {}, groupLabel = "tipo de camión", analysisType = "truck_distribution", allRows = rows) {
    if (!rows.length) return "No hay documentos visibles que cumplan los filtros solicitados.";
    const top = groups[0];
    const activeFilters = materialFilters(filters);
    const filtersText = activeFilters.map(filter => `${filter.label}: ${filter.value}`).join("; ");
    const coverage = Math.round(rows.length / Math.max(allRows.length, 1) * 100);
    const concentration = Math.round(top.count / Math.max(rows.length, 1) * 100);
    const second = groups[1];
    const next = sortedRowsByDate(rows)[0];

    if (analysisType === "company_distribution") {
      return `Se analizaron ${rows.length} solicitudes distribuidas en ${groups.length} empresa${groups.length === 1 ? "" : "s"}. ${top.label} aparece como la empresa con mayor presencia (${top.count}), lo que representa ${concentration}% de esta vista${second ? `; le sigue ${second.label} (${second.count})` : ""}. Esta lectura ayuda a identificar dónde se concentra la actividad comercial y qué cuentas conviene revisar primero.`;
    }

    if (analysisType === "timeline") {
      return `Se ordenaron ${rows.length} documentos por fecha y contacto para construir una agenda operativa. ${next ? `El siguiente registro relevante es ${next.name} (${next.company}) con fecha ${next.fecha.split(" - ")[0]}.` : "No se detectaron fechas válidas en la vista actual."} Esta vista sirve para priorizar seguimiento, anticipar cargas próximas y detectar contactos que requieren atención.`;
    }

    if (analysisType === "executive_summary") {
      return `La vista contiene ${rows.length} documentos, ${unique(rows.map(row => row.company)).length} empresas y ${unique(rows.map(row => row.truckType)).length} tipos de camión. El patrón principal está en ${top.label} (${top.count}), con una cobertura del ${coverage}% sobre la tabla original. En conjunto, la operación se ve ${concentration >= 40 ? "concentrada en una categoría dominante" : "balanceada entre varias categorías"}, por lo que conviene monitorear variaciones por empresa, fecha y tipo de camión.`;
    }

    if (intent.groupedOnly || !activeFilters.length) {
      return `Se agruparon ${rows.length} documento${rows.length === 1 ? "" : "s"} por ${groupLabel}. La categoría con mayor presencia es ${top.label} (${top.count}), equivalente al ${concentration}% de esta vista${second ? `; la segunda categoría es ${second.label} (${second.count})` : ""}. Esta distribución permite comparar la carga relativa entre categorías y detectar si la operación está balanceada o concentrada.`;
    }
    return `Se encontraron ${rows.length} documento${rows.length === 1 ? "" : "s"} con ${filtersText || "la vista actual"}, cubriendo ${coverage}% de la tabla original. Dentro de este subconjunto, el ${groupLabel} con mayor presencia es ${top.label} (${top.count}), lo que representa ${concentration}% de los resultados filtrados. Esta vista queda lista para revisar, guardar o compartir como segmento reutilizable.`;
  }

  function materialFilters(filters) {
    return (filters || []).filter(filter => filter.label !== "Nota");
  }

  function buildOutputChips(rows, allRows, groups, filters, groupLabelPlural = "tipos de camión") {
    const activeFilters = materialFilters(filters);
    const truckFilter = activeFilters.find(filter => filter.label === "Tipo de camión");
    const companies = unique(rows.map(row => row.company));
    const files = rows.map(row => row.file).filter(Boolean);
    const topGroup = groups[0] || { label: "Sin datos", count: 0 };
    const coverage = `${Math.round(rows.length / Math.max(allRows.length, 1) * 100)}%`;
    const chips = [];

    if (truckFilter) {
      chips.push(`${truckFilter.value}: ${rows.length} documento${rows.length === 1 ? "" : "s"}`);
    } else {
      chips.push(`${rows.length} documentos analizados`);
      chips.push(`${groups.length} ${groupLabelPlural}`);
    }

    if (files.length) {
      chips.push(`Archivos: ${files.slice(0, 3).join(", ")}${files.length > 3 ? ` +${files.length - 3}` : ""}`);
    }

    if (companies.length) {
      chips.push(`Empresas: ${companies.slice(0, 2).join(", ")}${companies.length > 2 ? ` +${companies.length - 2}` : ""}`);
    }

    chips.push(activeFilters.length ? `Cobertura filtrada: ${coverage}` : `Vista completa: ${coverage}`);
    chips.push(`Top: ${topGroup.label} (${topGroup.count})`);
    chips.push(`Export ${rows.length} row${rows.length === 1 ? "" : "s"}`);

    return chips;
  }

  function pieGradient(groups) {
    const total = groups.reduce((sum, group) => sum + group.count, 0) || 1;
    let cursor = 0;
    return groups.map((group, index) => {
      const start = cursor;
      const end = cursor + group.count / total * 100;
      cursor = end;
      return `${chartPalette[index % chartPalette.length]} ${start}% ${end}%`;
    }).join(", ");
  }

  function buildOperationalInsights(result) {
    const rows = result.rows || [];
    const companies = groupBy(rows, "company").slice(0, 3);
    const upcoming = rows
      .map(row => ({ ...row, sortDate: parseRowDate(row.fecha) }))
      .filter(row => row.sortDate)
      .sort((a, b) => a.sortDate - b.sortDate)
      .slice(0, 3);
    const cities = unique(rows.map(row => extractCity(row.from))).filter(Boolean).slice(0, 4);
    const coverage = Math.round(rows.length / Math.max(result.allRows?.length || rows.length || 1, 1) * 100);
    const top = result.groups[0] || { label: "Sin datos", count: 0 };
    const concentration = Math.round(top.count / Math.max(rows.length, 1) * 100);
    const recommendation = coverage < 100
      ? `Save this view and review ${rows.length} row${rows.length === 1 ? "" : "s"} before exporting.`
      : concentration >= 40
        ? `Priorizar ${top.label}: concentra ${concentration}% de la vista.`
        : "La distribución está balanceada; conviene monitorear cambios por tipo.";

    return [
      {
        title: "Empresas clave",
        value: companies.length ? companies.map(item => `${item.label} (${item.count})`).join(", ") : "Sin empresas",
        meta: `${unique(rows.map(row => row.company)).length} empresa${unique(rows.map(row => row.company)).length === 1 ? "" : "s"} en la vista`
      },
      {
        title: "Fechas próximas",
        value: upcoming.length ? upcoming.map(row => `${row.name} · ${row.fecha.split(" - ")[0]}`).join(", ") : "Sin fechas detectadas",
        meta: "Ordenado por fecha y contacto"
      },
      {
        title: "Cobertura geográfica",
        value: cities.length ? cities.join(", ") : "Sin ubicaciones detectadas",
        meta: `${cities.length} origen${cities.length === 1 ? "" : "es"} principales`
      },
      {
        title: "Siguiente acción",
        value: recommendation,
        meta: "Recomendación del agente"
      }
    ];
  }

  function displayViewName(name) {
    return String(name || "").replace(/^Silia\s*-\s*/i, "");
  }

  function parseRowDate(value) {
    const match = String(value || "").match(/(\d{2})\/(\d{2})\/(\d{2})/);
    if (!match) return null;
    const [, day, month, year] = match;
    const date = new Date(2000 + Number(year), Number(month) - 1, Number(day));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function extractCity(value) {
    const text = String(value || "");
    const afterComma = text.split(",")[1]?.trim();
    if (afterComma) return afterComma.replace(/\s+[A-Z]{2}\s+\d{5}.*/, "").trim();
    const parts = text.trim().split(/\s+/);
    return parts.length > 2 ? parts.slice(-3).join(" ") : text.trim();
  }

  function applyVisualFilter(result) {
    if (!materialFilters(result.filters).length) {
      clearVisualFilterOnly();
      return;
    }
    renderFilteredTableView(result);
    setTableCardFiltered(true);
    updateNativeFilterButton(result);
    updateTotalLabel(result.rows.length, result.allRows.length);
  }

  function clearVisualFilterOnly() {
    rowNodes().forEach(row => {
      row.classList.remove("ttd-row-hidden", "ttd-row-active", "ttd-row-muted");
    });
    filteredTableView?.remove();
    filteredTableView = null;
    hiddenOriginalTable?.classList.remove("ttd-original-table-hidden");
    hiddenOriginalTable = null;
    setTableCardFiltered(false);
    clearNativeFilterButton();
    restoreTotalLabel();
  }

  function clearAgentLayer() {
    clearVisualFilterOnly();
    currentResult = null;
    insightShell?.remove();
    insightShell = null;
  }

  function renderFilteredTableView(result) {
    filteredTableView?.remove();
    filteredTableView = el("section", "ttd-filtered-table-view");
    filteredTableView.innerHTML = `
      <div class="ttd-manual-filter-row">
        <div class="ttd-manual-filter-chip">
          <span class="ttd-filter-list-icon">|||</span>
          <strong>Tipo de Camión</strong>
          <span>${escapeHtml(result.filters.find(filter => filter.label === "Tipo de camión")?.value || "Vista filtrada")}</span>
          <button type="button" aria-label="Quitar filtro">x</button>
        </div>
        <button type="button" class="ttd-clear-all">Clear all</button>
      </div>
      <div class="ttd-agent-table">
        <div class="ttd-agent-table-head">
          <span>#</span>
          <span>File Rec...</span>
          <span>Name</span>
          <span>Company</span>
          <span>Fecha</span>
          <span>Email</span>
          <span>Tipo de Cami...</span>
          <span>From</span>
          <span>Created a...</span>
        </div>
        <div class="ttd-agent-table-body">
          ${result.rows.map((row, index) => `
            <div class="ttd-agent-table-row">
              <span>${index + 1}</span>
              <span><b class="ttd-file-pill">${escapeHtml(row.file)}</b></span>
              <span>${escapeHtml(row.name)}</span>
              <span>${escapeHtml(row.company)}</span>
              <span>${escapeHtml(row.fecha)}</span>
              <span><a href="mailto:${escapeHtml(row.email)}">${escapeHtml(row.email)}</a></span>
              <span><b class="ttd-truck-pill">${escapeHtml(row.truckType)}</b></span>
              <span>${escapeHtml(row.from)}</span>
              <span>${escapeHtml(row.createdAt)}</span>
            </div>
          `).join("")}
        </div>
        <div class="ttd-agent-new-row">+&nbsp; New row</div>
      </div>
    `;

    filteredTableView.querySelectorAll(".ttd-manual-filter-chip button, .ttd-clear-all").forEach(button => {
      button.addEventListener("click", () => {
        clearAgentLayer();
        message("Filtros de tabla limpiados.");
      });
    });

    const originalTable = findOriginalTableContainer();
    hiddenOriginalTable = originalTable;
    hiddenOriginalTable?.classList.add("ttd-original-table-hidden");

    if (hiddenOriginalTable) {
      hiddenOriginalTable.insertAdjacentElement("beforebegin", filteredTableView);
    } else {
      (document.querySelector("main") || document.body).append(filteredTableView);
    }
  }

  function findOriginalTableContainer() {
    if (hiddenOriginalTable && document.body.contains(hiddenOriginalTable)) return hiddenOriginalTable;
    const candidates = Array.from(document.querySelectorAll("div"))
      .filter(node => {
        if (node.closest(".ttd-root, .ttd-insights-shell, .ttd-filtered-table-view")) return false;
        const text = node.innerText || "";
        const rect = node.getBoundingClientRect?.();
        return text.includes("DF1.pdf") &&
          text.includes("DF8.pdf") &&
          text.includes("New row") &&
          !text.includes("SILIA DATABOT OUTPUT") &&
          rect &&
          rect.width > 900 &&
          rect.height > 180 &&
          rect.height < 760;
      })
      .sort((a, b) => {
        const ar = a.getBoundingClientRect();
        const br = b.getBoundingClientRect();
        return ar.height - br.height;
      });
    return candidates[0] || null;
  }

  function findTotalLabel() {
    return Array.from(document.querySelectorAll("div, span, p"))
      .find(node => node.children.length === 0 && node.innerText?.trim().startsWith("Total de Resultados"));
  }

  function findToolbarRow() {
    const filtersButton = findFiltersButton();
    const settingsButton = Array.from(document.querySelectorAll("button"))
      .find(button => button.innerText.trim() === "Settings");
    const toolbar = filtersButton?.parentElement || settingsButton?.parentElement;
    return toolbar?.parentElement || null;
  }

  function findFiltersButton() {
    const buttons = Array.from(document.querySelectorAll("button"));
    return buttons.find(button => button.innerText.trim().startsWith("Filters")) || null;
  }

  function setTableCardFiltered(active) {
    const totalLabel = findTotalLabel();
    const card = totalLabel?.parentElement || findToolbarRow()?.parentElement || null;
    if (filteredTableCard && filteredTableCard !== card) {
      filteredTableCard.classList.remove("ttd-table-card-filtered");
    }
    filteredTableCard = card;
    filteredTableCard?.classList.toggle("ttd-table-card-filtered", active);
    if (!active) filteredTableCard = null;
  }

  function updateNativeFilterButton(result) {
    const button = findFiltersButton();
    if (!button) return;
    button.classList.add("ttd-native-filter-active");
    button.querySelector(".ttd-native-filter-badge")?.remove();
    const badge = el("span", "ttd-native-filter-badge", String(result.rows.length));
    button.append(badge);
  }

  function clearNativeFilterButton() {
    const button = findFiltersButton();
    if (!button) return;
    button.classList.remove("ttd-native-filter-active");
    button.querySelector(".ttd-native-filter-badge")?.remove();
  }

  function ensureSavedViewsButton() {
    if (savedViewsButton && document.body.contains(savedViewsButton)) {
      return;
    }

    const toolbarRow = findToolbarRow();
    const filtersButton = findFiltersButton();
    const toolbar = filtersButton?.parentElement || toolbarRow?.querySelector("div");
    if (!toolbar || toolbar.querySelector(".ttd-saved-views-button")) return;

    savedViewsButton = el("button", "ttd-saved-views-button");
    savedViewsButton.type = "button";
    savedViewsButton.addEventListener("click", event => {
      event.stopPropagation();
      toggleSavedViewsPanel();
    });

    if (filtersButton?.nextSibling) {
      filtersButton.parentElement.insertBefore(savedViewsButton, filtersButton.nextSibling);
    } else {
      toolbar.prepend(savedViewsButton);
    }
    updateSavedViewsButton();
  }

  function updateSavedViewsButton() {
    if (!savedViewsButton) return;
    const count = loadSavedViews().length;
    const nextHtml = `${icons.views}<strong>Views</strong>${count ? ` <span>${count}</span>` : ""}`;
    if (savedViewsButton.innerHTML !== nextHtml) {
      savedViewsButton.innerHTML = nextHtml;
    }
  }

  function loadSavedViews() {
    try {
      const parsed = JSON.parse(localStorage.getItem(savedViewsKey) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeSavedViews(views) {
    localStorage.setItem(savedViewsKey, JSON.stringify(views));
    updateSavedViewsButton();
  }

  function saveCurrentView() {
    if (!currentResult) {
      currentResult = runAnalysis({ kind: "analysis", wantsKpis: true, wantsChart: true, groupBy: "truckType" }, "Genera un resumen de la vista actual");
      applyVisualFilter(currentResult);
      renderInsights(currentResult);
    }

    const defaultName = buildDefaultSavedViewName(currentResult);
    openSaveViewModal(defaultName);
  }

  function buildDefaultSavedViewName(result) {
    const truckType = result.filters.find(filter => filter.label === "Tipo de camión")?.value;
    const hasWeekFilter = result.filters.some(filter => filter.label === "Fecha" && normalize(filter.value).includes("semana"));
    if (truckType && hasWeekFilter) return `Documentos por tipo de camión - esta semana`;
    if (truckType) return `Documentos por tipo de camión - ${truckType}`;
    if (hasWeekFilter) return "Documentos recibidos - esta semana";
    return displayViewName(result.savedViewName || "Saved view");
  }

  function openSaveViewModal(defaultName) {
    saveViewModal?.remove();
    saveViewModal = el("div", "ttd-modal-layer");
    saveViewModal.innerHTML = `
      <div class="ttd-save-modal" role="dialog" aria-modal="true" aria-labelledby="ttd-save-view-title">
        <div class="ttd-save-modal-head">
          <div>
            <div class="ttd-save-modal-eyebrow">Table view</div>
            <h3 id="ttd-save-view-title">Save view</h3>
          </div>
          <button type="button" class="ttd-save-modal-close" aria-label="Close">${icons.close}</button>
        </div>
        <form class="ttd-save-modal-form">
          <label for="ttd-save-view-name">Name</label>
          <input id="ttd-save-view-name" name="viewName" type="text" value="${escapeHtml(defaultName)}" autocomplete="off" />
          <label for="ttd-save-view-description">Description <span>optional</span></label>
          <textarea id="ttd-save-view-description" name="description" rows="3" placeholder="E.g. View to review received documents and coordinate follow-up by truck type."></textarea>
          <fieldset class="ttd-save-modal-fieldset">
            <legend>Visibility</legend>
            <div class="ttd-save-segmented">
              <label>
                <input type="radio" name="visibility" value="private" checked />
                <span>Private</span>
              </label>
              <label>
                <input type="radio" name="visibility" value="team" />
                <span>Team</span>
              </label>
            </div>
          </fieldset>
          <div class="ttd-save-options">
            <label>
              <input type="checkbox" name="includeFilters" checked />
              <span>Include filters</span>
            </label>
            <label>
              <input type="checkbox" name="includeChart" />
              <span>Include chart</span>
            </label>
            <label>
              <input type="checkbox" name="notifyTeam" />
              <span>Notify team</span>
            </label>
          </div>
          <div class="ttd-save-modal-meta">${currentResult.rows.length} row${currentResult.rows.length === 1 ? "" : "s"} · ${currentResult.filters.filter(filter => filter.label !== "Nota").map(filter => `${filter.label}: ${filter.value}`).join(" · ") || "Current view"}</div>
          <div class="ttd-save-modal-actions">
            <button type="button" class="is-secondary">Cancel</button>
            <button type="submit" class="is-primary">${icons.save}<span>Save view</span></button>
          </div>
        </form>
      </div>
    `;

    const close = () => {
      saveViewModal?.remove();
      saveViewModal = null;
    };
    saveViewModal.addEventListener("click", event => {
      if (event.target === saveViewModal) close();
    });
    saveViewModal.querySelector(".ttd-save-modal-close")?.addEventListener("click", close);
    saveViewModal.querySelector(".is-secondary")?.addEventListener("click", close);
    saveViewModal.querySelector(".ttd-save-modal-form")?.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      commitSavedView({
        name: String(formData.get("viewName") || ""),
        description: String(formData.get("description") || ""),
        visibility: String(formData.get("visibility") || "private"),
        includeFilters: formData.get("includeFilters") === "on",
        includeChart: formData.get("includeChart") === "on",
        notifyTeam: formData.get("notifyTeam") === "on"
      });
      close();
    });

    document.body.append(saveViewModal);
    const nameInput = saveViewModal.querySelector("input");
    nameInput?.focus();
    nameInput?.select();
  }

  function commitSavedView(options) {
    const name = options.name?.trim();
    if (!name) {
      message("Save canceled. The view needs a name.");
      return;
    }

    const view = {
      id: `view-${Date.now()}`,
      name,
      description: options.description.trim(),
      visibility: options.visibility,
      includeFilters: options.includeFilters,
      includeChart: options.includeChart,
      notifyTeam: options.notifyTeam,
      createdAt: new Date().toISOString(),
      filters: currentResult.filters,
      analysisType: currentResult.analysisType || "truck_distribution",
      groupKey: currentResult.groupKey || "truckType",
      groupLabel: currentResult.groupLabel || "tipo de camión",
      groupLabelPlural: currentResult.groupLabelPlural || "tipos de camión",
      rowFiles: currentResult.rows.map(row => row.file).filter(Boolean),
      allFiles: currentResult.allRows.map(row => row.file).filter(Boolean),
      question: currentResult.question,
      summary: currentResult.summary
    };
    const views = loadSavedViews().filter(item => item.name !== view.name);
    views.unshift(view);
    writeSavedViews(views.slice(0, 12));
    currentResult.savedViewName = view.name;
    renderInsights(currentResult);
    const visibilityLabel = view.visibility === "team" ? "team" : "private";
    message(`Saved as a reusable ${visibilityLabel} view. You can find it under Views.`);
    closePanel();
    showOutsideFeedback("View saved", `"${displayViewName(view.name)}" was saved as a ${visibilityLabel} view.`);
  }

  function toggleSavedViewsPanel() {
    if (savedViewsPanel && document.body.contains(savedViewsPanel)) {
      savedViewsPanel.remove();
      savedViewsPanel = null;
      return;
    }
    renderSavedViewsPanel();
  }

  function renderSavedViewsPanel() {
    savedViewsPanel?.remove();
    const views = loadSavedViews();
    savedViewsPanel = el("div", "ttd-saved-views-panel");
    savedViewsPanel.innerHTML = `
      <div class="ttd-saved-views-head">
        <strong>Saved views</strong>
        <button type="button" aria-label="Close views">x</button>
      </div>
      ${views.length ? `
        <div class="ttd-saved-views-list">
          ${views.map(view => `
            <article class="ttd-saved-view-card" data-view-id="${escapeHtml(view.id)}">
              <div>
                <strong>${escapeHtml(view.name)}</strong>
                <span>${escapeHtml(describeSavedView(view))}</span>
              </div>
              <div class="ttd-saved-view-actions">
                <button type="button" data-saved-action="apply">Apply</button>
                <button type="button" data-saved-action="delete">Delete</button>
              </div>
            </article>
          `).join("")}
        </div>
      ` : `<p class="ttd-saved-views-empty">No saved views yet.</p>`}
    `;

    savedViewsPanel.querySelector(".ttd-saved-views-head button")?.addEventListener("click", () => {
      savedViewsPanel?.remove();
      savedViewsPanel = null;
    });
    savedViewsPanel.querySelectorAll("[data-saved-action]").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.closest("[data-view-id]");
        const id = card?.getAttribute("data-view-id");
        if (!id) return;
        if (button.dataset.savedAction === "apply") {
          applySavedView(id);
        } else {
          deleteSavedView(id);
        }
      });
    });

    const rect = savedViewsButton?.getBoundingClientRect();
    if (rect) {
      savedViewsPanel.style.top = `${rect.bottom + 8}px`;
      savedViewsPanel.style.right = `${Math.max(16, window.innerWidth - rect.right)}px`;
    }
    document.body.append(savedViewsPanel);
  }

  function describeSavedView(view) {
    const filter = view.filters?.find(item => item.label !== "Nota");
    const count = view.rowFiles?.length || 0;
    return `${filter ? `${filter.label}: ${filter.value} · ` : ""}${count} row${count === 1 ? "" : "s"}`;
  }

  function applySavedView(id) {
    const view = loadSavedViews().find(item => item.id === id);
    if (!view) return;
    const allRows = fallbackRows.map((row, index) => ({ ...row, index, rowNode: findVisualTableRow(row) }));
    const wanted = new Set(view.rowFiles || []);
    const rows = allRows.filter(row => wanted.has(row.file));
    const groupKey = view.groupKey || "truckType";
    const groupLabel = view.groupLabel || "tipo de camión";
    const groupLabelPlural = view.groupLabelPlural || "tipos de camión";
    const groups = groupBy(rows, groupKey);
    const topGroup = groups[0] || { label: "Sin datos", count: 0 };
    currentResult = {
      question: view.question || `Apply view ${view.name}`,
      filters: view.filters || [{ label: "Vista", value: view.name }],
      rows,
      allRows,
      groups,
      analysisType: view.analysisType || normalizeAnalysisType(null, view.question || view.name, groupKey),
      groupKey,
      groupLabel,
      groupLabelPlural,
      savedViewName: view.name,
      summary: buildSummary(rows, groups, view.filters || [], {}, groupLabel, view.analysisType || "truck_distribution", allRows),
      kpis: [
        { label: "Documentos", value: rows.length },
        { label: titleCase(groupLabelPlural), value: groups.length },
        { label: `${titleCase(groupLabel)} principal`, value: topGroup.label },
        { label: "Cobertura filtro", value: `${Math.round(rows.length / Math.max(allRows.length, 1) * 100)}%` }
      ],
      outputs: buildOutputChips(rows, allRows, groups, view.filters || [], groupLabelPlural),
      actions: ["save", "export", "share"]
    };
    applyVisualFilter(currentResult);
    renderInsights(currentResult);
    savedViewsPanel?.remove();
    savedViewsPanel = null;
    message(`View applied: ${view.name}.`);
  }

  function deleteSavedView(id) {
    writeSavedViews(loadSavedViews().filter(view => view.id !== id));
    renderSavedViewsPanel();
    message("Saved view deleted.");
  }

  function updateTotalLabel(filtered, total) {
    const totalLabel = findTotalLabel();
    if (!totalLabel) return;
    if (originalTotalText === null) originalTotalText = totalLabel.innerText;
    totalLabel.innerText = `Total de Resultados ${filtered} de ${total}`;
  }

  function restoreTotalLabel() {
    const totalLabel = findTotalLabel();
    if (totalLabel && originalTotalText !== null) {
      totalLabel.innerText = originalTotalText;
    }
    originalTotalText = null;
  }

  function renderInsights(result) {
    ensureInsightShell();
    insightShell.classList.remove("is-edit-mode", "is-dashboard-ready");
    insightShell.innerHTML = `
      <div class="ttd-insights-head">
        <div>
          <div class="ttd-insights-eyebrow">Silia DataBot output</div>
          <h2>Vista analizada por el agente</h2>
        </div>
        <div class="ttd-view-pill">${escapeHtml(displayViewName(result.savedViewName))}</div>
      </div>

      ${materialFilters(result.filters).length ? `
        <div class="ttd-filter-row">
          ${materialFilters(result.filters).map(filter => `<span class="ttd-filter-chip"><strong>${escapeHtml(filter.label)}</strong>${escapeHtml(filter.value)}</span>`).join("")}
        </div>
      ` : ""}

      <div class="ttd-kpi-grid">
        ${result.kpis.map(kpi => `
          <article class="ttd-kpi-card">
            <span>${escapeHtml(kpi.label)}</span>
            <strong>${escapeHtml(kpi.value)}</strong>
          </article>
        `).join("")}
      </div>

      ${renderAnalysisBody(result)}

      <div class="ttd-action-row">
        ${actionButton("save", "Save view")}
        ${actionButton("export", "Export CSV")}
        ${actionButton("share", "Share")}
        ${actionButton("clear", "Clear", true)}
      </div>
    `;

    insightShell.querySelectorAll("[data-action]").forEach(button => {
      button.addEventListener("click", () => runPostAction(button.dataset.action));
    });
    insightShell.querySelectorAll("[data-chart-mode]").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.closest(".ttd-chart-card");
        const mode = button.dataset.chartMode;
        card?.classList.toggle("is-pie-mode", mode === "pie");
        card?.querySelectorAll("[data-chart-mode]").forEach(item => {
          item.classList.toggle("is-active", item === button);
        });
      });
    });
  }

  function renderAnalysisBody(result) {
    if (result.analysisType === "timeline") return renderTimelineBody(result);
    if (result.analysisType === "executive_summary") return renderExecutiveBody(result);
    return renderDistributionBody(result);
  }

  function renderDistributionBody(result) {
    const max = Math.max(...result.groups.map(group => group.count), 1);
    const operationalInsights = buildOperationalInsights(result);
    return `
      <div class="ttd-output-grid">
        <section class="ttd-chart-card">
          <div class="ttd-chart-card-head">
            <div class="ttd-card-title">Resumen por ${escapeHtml(result.groupLabel || "tipo de camión")}</div>
            <div class="ttd-chart-toggle" role="group" aria-label="Tipo de gráfica">
              <button type="button" class="is-active" data-chart-mode="bars">Bars</button>
              <button type="button" data-chart-mode="pie">Pie</button>
            </div>
          </div>
          <div class="ttd-bars">
            ${result.groups.map(group => `
              <div class="ttd-bar-row">
                <span>${escapeHtml(group.label)}</span>
                <div class="ttd-bar-track"><div class="ttd-bar-fill" style="width:${Math.max(8, group.count / max * 100)}%"></div></div>
                <strong>${group.count}</strong>
              </div>
            `).join("")}
          </div>
          ${renderPieView(result)}
        </section>
        ${renderSummaryCard(result)}
      </div>
      ${renderInsightGrid(operationalInsights)}
    `;
  }

  function renderTimelineBody(result) {
    const rows = sortedRowsByDate(result.rows).slice(0, 6);
    return `
      <div class="ttd-output-grid is-timeline-layout">
        <section class="ttd-chart-card">
          <div class="ttd-card-title">Agenda por fecha</div>
          <div class="ttd-timeline-list">
            ${rows.map(row => `
              <div class="ttd-timeline-item">
                <strong>${escapeHtml(row.fecha.split(" - ")[0])}</strong>
                <span>${escapeHtml(row.name)} · ${escapeHtml(row.company)}</span>
                <small>${escapeHtml(row.truckType)}</small>
              </div>
            `).join("") || `<p class="ttd-empty-note">No hay fechas detectadas.</p>`}
          </div>
        </section>
        <section class="ttd-summary-card">
          <div class="ttd-card-title">Lectura temporal</div>
          <p>${escapeHtml(result.summary)}</p>
          <div class="ttd-output-list">
            ${rows.slice(0, 4).map(row => `<span>${escapeHtml(row.name)} · ${escapeHtml(row.fecha.split(" - ")[0])}</span>`).join("")}
          </div>
        </section>
      </div>
      ${renderInsightGrid(buildOperationalInsights(result).slice(1))}
    `;
  }

  function renderExecutiveBody(result) {
    const truckGroups = groupBy(result.rows, "truckType");
    const companyGroups = groupBy(result.rows, "company");
    return `
      <div class="ttd-output-grid is-executive-layout">
        <section class="ttd-chart-card">
          <div class="ttd-card-title">Pulso operativo</div>
          <div class="ttd-executive-columns">
            <div>
              <strong>Por camión</strong>
              ${truckGroups.slice(0, 4).map(group => `<span>${escapeHtml(group.label)} · ${group.count}</span>`).join("")}
            </div>
            <div>
              <strong>Por empresa</strong>
              ${companyGroups.map(group => `<span>${escapeHtml(group.label)} · ${group.count}</span>`).join("")}
            </div>
          </div>
        </section>
        ${renderSummaryCard(result)}
      </div>
      ${renderInsightGrid(buildOperationalInsights(result))}
    `;
  }

  function renderSummaryCard(result) {
    return `
      <section class="ttd-summary-card">
        <div class="ttd-card-title">Resumen</div>
        <p>${escapeHtml(result.summary)}</p>
        <div class="ttd-output-list">
          ${result.outputs.map(output => `<span>${escapeHtml(output)}</span>`).join("")}
        </div>
      </section>
    `;
  }

  function renderPieView(result) {
    return `
      <div class="ttd-pie-view" aria-label="Gráfica de pie">
        <div class="ttd-pie-chart" style="background: conic-gradient(${pieGradient(result.groups)});">
          <span>${result.rows.length}</span>
        </div>
        <div class="ttd-pie-legend">
          ${result.groups.map((group, index) => `
            <div class="ttd-pie-legend-row">
              <i style="background:${chartPalette[index % chartPalette.length]}"></i>
              <span>${escapeHtml(group.label)}</span>
              <strong>${group.count}</strong>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderInsightGrid(items) {
    return `
      <div class="ttd-enrichment-grid">
        ${items.map(item => `
          <article class="ttd-enrichment-card">
            <span>${escapeHtml(item.title)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <small>${escapeHtml(item.meta)}</small>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderEditOutput(result) {
    ensureInsightShell();
    insightShell.classList.remove("is-dashboard-ready");
    insightShell.classList.add("is-edit-mode");
    insightShell.innerHTML = `
      <div class="ttd-insights-head">
        <div>
          <div class="ttd-insights-eyebrow">Modo operador de tabla</div>
          <h2>Cambios visuales aplicados</h2>
        </div>
        <div class="ttd-view-pill">${escapeHtml(displayViewName(result.savedViewName))}</div>
      </div>

      <div class="ttd-filter-row">
        ${result.filters.map(filter => `<span class="ttd-filter-chip"><strong>${escapeHtml(filter.label)}</strong>${escapeHtml(filter.value)}</span>`).join("")}
      </div>

      <div class="ttd-edit-preview">
        <div class="ttd-edit-step is-done"><strong>1</strong><span>Tabla original preservada</span></div>
        <div class="ttd-edit-step is-done"><strong>2</strong><span>Filas no coincidentes ocultas</span></div>
        <div class="ttd-edit-step is-done"><strong>3</strong><span>Vista lista para guardar</span></div>
      </div>

      <div class="ttd-kpi-grid">
        ${result.kpis.map(kpi => `
          <article class="ttd-kpi-card">
            <span>${escapeHtml(kpi.label)}</span>
            <strong>${escapeHtml(kpi.value)}</strong>
          </article>
        `).join("")}
      </div>

      <div class="ttd-summary-card">
        <div class="ttd-card-title">Bitácora de cambios</div>
        <p>${escapeHtml(result.summary)}</p>
        <div class="ttd-output-list">
          ${result.outputs.map(output => `<span>${escapeHtml(output)}</span>`).join("")}
        </div>
      </div>

      <div class="ttd-action-row">
        ${actionButton("save", "Save view")}
        ${actionButton("export", "Export rows")}
        ${actionButton("clear", "Clear changes", true)}
      </div>
    `;

    insightShell.querySelectorAll("[data-action]").forEach(button => {
      button.addEventListener("click", () => runPostAction(button.dataset.action));
    });
  }

  function renderDashboardOutput(result) {
    ensureInsightShell();
    insightShell.classList.add("is-dashboard-ready");
    const max = Math.max(...result.groups.map(group => group.count), 1);
    insightShell.innerHTML = `
      <div class="ttd-insights-head">
        <div>
          <div class="ttd-insights-eyebrow">Modo constructor de dashboard</div>
          <h2>Dashboard preview</h2>
        </div>
        <div class="ttd-view-pill">${escapeHtml(displayViewName(result.savedViewName))}</div>
      </div>

      <div class="ttd-kpi-grid">
        ${result.kpis.map(kpi => `
          <article class="ttd-kpi-card">
            <span>${escapeHtml(kpi.label)}</span>
            <strong>${escapeHtml(kpi.value)}</strong>
          </article>
        `).join("")}
      </div>

      <div class="ttd-dashboard-layout">
        <section class="ttd-chart-card">
          <div class="ttd-card-title">Distribución por tipo de camión</div>
          <div class="ttd-bars">
            ${result.groups.map(group => `
              <div class="ttd-bar-row">
                <span>${escapeHtml(group.label)}</span>
                <div class="ttd-bar-track"><div class="ttd-bar-fill" style="width:${Math.max(8, group.count / max * 100)}%"></div></div>
                <strong>${group.count}</strong>
              </div>
            `).join("")}
          </div>
        </section>
        <section class="ttd-summary-card">
          <div class="ttd-card-title">Reporte operativo</div>
          <p>${escapeHtml(result.summary)}</p>
          <div class="ttd-output-list">
            ${result.outputs.map(output => `<span>${escapeHtml(output)}</span>`).join("")}
          </div>
        </section>
      </div>

      <div class="ttd-action-row">
        ${actionButton("share", "Share report")}
        ${actionButton("export", "Export dataset")}
        ${actionButton("clear", "Clear", true)}
      </div>
    `;

    insightShell.querySelectorAll("[data-action]").forEach(button => {
      button.addEventListener("click", () => runPostAction(button.dataset.action));
    });
  }

  function ensureInsightShell() {
    if (insightShell && document.body.contains(insightShell)) return;
    insightShell = el("section", "ttd-insights-shell");

    const totalLabel = findTotalLabel();
    const card = totalLabel?.parentElement || Array.from(document.querySelectorAll("div"))
      .find(node => node.innerText?.includes("Search documents") && node.innerText?.includes("Total de Resultados"));
    const host = document.querySelector("main") || document.body;

    if (totalLabel) {
      totalLabel.insertAdjacentElement("beforebegin", insightShell);
    } else if (card) {
      card.append(insightShell);
    } else {
      host.append(insightShell);
    }
  }

  function runPostAction(action) {
    if (action === "clear") {
      clearAgentLayer();
      message("Filtros y outputs del agente limpiados.");
      return;
    }

    if (!currentResult) {
      const result = runAnalysis({ kind: "analysis", wantsKpis: true, wantsChart: true, groupBy: "truckType" }, "Genera un resumen de la vista actual");
      applyVisualFilter(result);
      renderInsights(result);
    }

    if (action === "export") {
      exportCsv();
      message("Exporté el dataset filtrado en `silia-databot-export.csv`.");
    } else if (action === "save") {
      saveCurrentView();
    } else if (action === "share") {
      openShareViewModal();
    } else if (action === "dashboard") {
      message("Preparé la conversión a dashboard: KPIs + gráfico por tipo de camión + dataset filtrado.");
      insightShell?.classList.add("is-dashboard-ready");
    }
  }

  function exportCsv() {
    const rows = currentResult?.rows || visibleRows();
    const header = ["file", "name", "company", "fecha", "email", "truckType", "from", "createdAt"];
    const csv = [header.join(",")]
      .concat(rows.map(row => header.map(key => `"${String(row[key] || "").replace(/"/g, '""')}"`).join(",")))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = el("a");
    link.href = url;
    link.download = "silia-databot-export.csv";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function openShareViewModal() {
    if (!currentResult) return;
    const viewName = displayViewName(currentResult.savedViewName || "Vista analizada");
    shareViewModal?.remove();
    shareViewModal = el("div", "ttd-modal-layer");
    shareViewModal.innerHTML = `
      <div class="ttd-save-modal ttd-share-modal" role="dialog" aria-modal="true" aria-labelledby="ttd-share-view-title">
        <div class="ttd-save-modal-head">
          <div>
            <div class="ttd-save-modal-eyebrow">Share view</div>
            <h3 id="ttd-share-view-title">Create shareable link</h3>
          </div>
          <button type="button" class="ttd-save-modal-close" aria-label="Close">${icons.close}</button>
        </div>
        <form class="ttd-save-modal-form">
          <label for="ttd-share-view-name">Name</label>
          <input id="ttd-share-view-name" name="shareName" type="text" value="${escapeHtml(viewName)}" autocomplete="off" />
          <label for="ttd-share-message">Message <span>optional</span></label>
          <textarea id="ttd-share-message" name="message" rows="3" placeholder="E.g. Review this view with the applied KPIs and filters."></textarea>
          <fieldset class="ttd-save-modal-fieldset">
            <legend>Permission</legend>
            <div class="ttd-save-segmented">
              <label>
                <input type="radio" name="permission" value="read" checked />
                <span>Read only</span>
              </label>
              <label>
                <input type="radio" name="permission" value="duplicate" />
                <span>Can duplicate</span>
              </label>
            </div>
          </fieldset>
          <div class="ttd-save-options">
            <label>
              <input type="checkbox" name="includeFilters" checked />
              <span>Include filters</span>
            </label>
            <label>
              <input type="checkbox" name="includeKpis" checked />
              <span>Include KPIs</span>
            </label>
            <label>
              <input type="checkbox" name="includeChart" checked />
              <span>Include chart</span>
            </label>
            <label>
              <input type="checkbox" name="includeSummary" checked />
              <span>Include summary</span>
            </label>
          </div>
          <div class="ttd-save-modal-meta">${currentResult.rows.length} row${currentResult.rows.length === 1 ? "" : "s"} · ${currentResult.groupLabel ? `Summary by ${currentResult.groupLabel}` : "Current view"}</div>
          <div class="ttd-save-modal-actions">
            <button type="button" class="is-secondary">Cancel</button>
            <button type="submit" class="is-primary">${icons.share}<span>Create link</span></button>
          </div>
        </form>
      </div>
    `;

    const close = () => {
      shareViewModal?.remove();
      shareViewModal = null;
    };
    shareViewModal.addEventListener("click", event => {
      if (event.target === shareViewModal) close();
    });
    shareViewModal.querySelector(".ttd-save-modal-close")?.addEventListener("click", close);
    shareViewModal.querySelector(".is-secondary")?.addEventListener("click", close);
    shareViewModal.querySelector(".ttd-save-modal-form")?.addEventListener("submit", event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      commitSharedView({
        name: String(formData.get("shareName") || viewName),
        message: String(formData.get("message") || ""),
        permission: String(formData.get("permission") || "read"),
        includeFilters: formData.get("includeFilters") === "on",
        includeKpis: formData.get("includeKpis") === "on",
        includeChart: formData.get("includeChart") === "on",
        includeSummary: formData.get("includeSummary") === "on"
      });
      close();
    });

    document.body.append(shareViewModal);
    shareViewModal.querySelector("input")?.focus();
    shareViewModal.querySelector("input")?.select();
  }

  function commitSharedView(options) {
    const result = currentResult;
    const shareId = `share-${Date.now().toString(36)}`;
    const params = new URLSearchParams({ sharedView: shareId });
    const link = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    const permissionLabel = options.permission === "duplicate" ? "can duplicate" : "read only";
    const text = [
      `${options.name.trim() || displayViewName(result.savedViewName)}`,
      options.message.trim(),
      `Permission: ${permissionLabel}`,
      `Link: ${link}`,
      options.includeSummary ? `Summary: ${result.summary}` : "",
      options.includeKpis ? `KPIs: ${result.kpis.map(kpi => `${kpi.label}: ${kpi.value}`).join(" · ")}` : ""
    ].filter(Boolean).join("\n");

    navigator.clipboard?.writeText(text).catch(() => undefined);
    closePanel();
    showOutsideFeedback("Link ready", `"${options.name.trim() || displayViewName(result.savedViewName)}" is ready to share with ${permissionLabel} permission.`);
    message("View shared. The link is ready to send.");
  }

  function copyShareText() {
    const result = currentResult;
    const text = `${result.savedViewName}\n${result.summary}\n\nKPIs:\n${result.kpis.map(kpi => `- ${kpi.label}: ${kpi.value}`).join("\n")}`;
    navigator.clipboard?.writeText(text).catch(() => undefined);
  }

  function answer(question) {
    const q = normalize(question);
    const rows = visibleRows();
    const companies = unique(rows.map(row => row.company));
    const truckTypes = unique(rows.map(row => row.truckType));
    const sources = unique(rows.map(row => row.from));

    if (/^(hola|hey|buenas|que tal|qué tal|hi|hello)\b/.test(q)) {
      return "Hola. Puedo ayudarte a analizar la tabla: agrupar por empresa, revisar tipos de camión, ver fechas próximas, filtrar documentos o generar un resumen ejecutivo.";
    }

    if (q.includes("ayuda") || q.includes("puedes") || q.includes("como funciona") || q.includes("qué haces") || q.includes("que haces")) {
      return "Puedo trabajar con la información visible de la tabla. Prueba con: “Agrupa solicitudes por empresa”, “Muéstrame las fechas próximas por contacto” o “Filtra solo Camion Pesado”.";
    }

    if (q.includes("cuant") || q.includes("total") || q.includes("resultado")) {
      return `Hay ${rows.length} resultado${rows.length === 1 ? "" : "s"} visible${rows.length === 1 ? "" : "s"} en esta vista.`;
    }

    if (q.includes("compania") || q.includes("empresa") || q.includes("company")) {
      return companies.length ? `Compañías visibles:\n${companies.map(item => `- ${item}`).join("\n")}` : "No encontré compañías visibles en la tabla.";
    }

    if (q.includes("camion") || q.includes("truck") || q.includes("tipo")) {
      return truckTypes.length ? `Tipos de camión visibles:\n${truckTypes.map(item => `- ${item}`).join("\n")}` : "No encontré tipos de camión visibles en la tabla.";
    }

    if (q.includes("origen") || q.includes("fuente") || q.includes("from")) {
      return sources.length ? `Fuentes visibles:\n${sources.map(item => `- ${item}`).join("\n")}` : "No encontré fuentes visibles en la tabla.";
    }

    return "No encontré una acción o dato claro en esa pregunta. Puedo responder mejor si me pides algo sobre empresas, tipos de camión, fechas, contactos, filtros o resumen ejecutivo.";
  }

  function showFloatingWidget() {
    if (!isTableRoute()) return;
    createPanel();
    if (!savedViewsButton || !document.body.contains(savedViewsButton)) {
      ensureSavedViewsButton();
    }
  }

  function boot() {
    if (!isTableRoute()) return;
    createPanel();
    showFloatingWidget();
    ensureSavedViewsButton();
    observer?.disconnect();
    observer = new MutationObserver(showFloatingWidget);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function routeChanged() {
    if (isTableRoute()) {
      boot();
    } else {
      observer?.disconnect();
      observer = null;
      destroyDataBot();
    }
  }

  const originalPushState = history.pushState;
  history.pushState = function pushState(...args) {
    const result = originalPushState.apply(this, args);
    window.setTimeout(routeChanged, 0);
    return result;
  };
  window.addEventListener("popstate", routeChanged);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.setTimeout(showFloatingWidget, 700);
  window.setTimeout(showFloatingWidget, 1800);
})();
