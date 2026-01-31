<script>
/* =========================================================
   OLGA KESIM SERVISI - FINAL v8
   ✅ Damarlı + Dokulu kaldırıldı
   ✅ Altın/Gümüş parlak metallic görünüm
   ✅ Kadife kumaş dokulu görünüm
   ✅ Önizleme kare köşe (90 derece)
   ✅ Preset butonları ölçüleri otomatik yazar
   ✅ WhatsApp’a “Hazır Mesaj” butonu eklendi (0850 305 75 45)
========================================================= */

(function () {

  const FIRE_M = 0.30;
  const TOL_MM = 2;

  const BRAND_RGB = { r: 140, g: 89, b: 25 };
  const LOGO_URL = "https://cdn.myikas.com/images/f00c5caa-f3a4-471f-8a1a-08d779c5fb21/adce7b58-1982-4925-87c2-66534dce9be4/image_1080.webp";

  // ✅ WhatsApp Business hattın
  const WHATSAPP_PHONE = "908503057545"; // +90 850 305 75 45

  const GLASS_OPTIONS = [
    { id: "none",   label: "Cam Yok",   desc: "Cam kullanılmadan hazırlanır.", priceM2: 0 },
    { id: "plain",  label: "Düz Cam",   desc: "Temel koruma sağlar.",          priceM2: 1250 },
    { id: "mat",    label: "Mat Cam",   desc: "Yansımayı azaltır.",            priceM2: 1750 },
    { id: "museum", label: "Müze Camı", desc: "UV korumalı müze kalitesi.",    priceM2: 12000 },
  ];

  // ✅ İstenen: Damarlı + Dokulu kaldırıldı
  const MAT_TYPES = [
    { label: "Paspartu Olmasın", value: 0 },
    { label: "Düz Karton", value: 1250 },
    { label: "Altın-Gümüş", value: 1700 },
    { label: "Kadife", value: 3000 },
  ];

  // ✅ Paspartu renkleri (tam)
  const PASPARTU_COLORS = {
    1250: [
      ['W107', '#1b227c'], ['W108', '#ffa711'], ['W109', '#ff7d01'], ['W110', '#ff7d01'],
      ['W111', '#8468b3'], ['W112', '#9e508c'], ['W125', '#f23a04'], ['W131', '#fd0b35'],
      ['W132', '#871f26'], ['W135', '#847c89'], ['W136', '#fbef8b'], ['W140', '#f3f4a8'],
      ['W141', '#ebe5cb'], ['W142', '#fbf27b'], ['W146', '#f4efe9'], ['W150', '#fafbeb'],
      ['W151', '#eeede9'], ['W152', '#ecf1ed'], ['W153', '#ebdf95'], ['W154', '#ca917d'],
      ['W155', '#f5ecda'], ['W156', '#e2d2b9'], ['W158', '#e7c983'], ['W159', '#c0b7b0'],
      ['W160', '#d9d4c0'], ['W161', '#e5e8a1'], ['W162', '#98b795'], ['W163', '#48813c'],
      ['W164', '#587f50'], ['W165', '#024232'], ['W166', '#c59b5f'], ['W167', '#76391d'],
      ['W168', '#361b12'], ['W170', '#598180'], ['W171', '#001825'], ['W172', '#000000'],
      ['W176', '#cfb793'], ['W177', '#c99f6d'], ['W178', '#d7cdaa'], ['W181', '#ad2029'],
      ['W182', '#431a1e'], ['W187', '#e7af8c'], ['W188', '#7f853d'], ['W189', '#451b0b'],
      ['W190', '#ffc93e'], ['W191', '#005892'], ['W192', '#d83e08'], ['W193', '#3f5855'],
      ['W194', '#72b7be'], ['W195', '#71939c'], ['W196', '#012f49'], ['W197', '#024c33'],
      ['W198', '#2b1c17'], ['W199', '#c2400e'], ['W253', '#f3da98'], ['W406', '#3d3832']
    ],
    1700: [
      ['W232', '#d4af37'], // GOLD
      ['W233', '#c0c0c0']  // SILVER
    ],
    3000: [
      ['750', '#f6d8bc'], ['752', '#d4ad90'], ['753', '#8e4a01'], ['754', '#7a2a05'],
      ['755', '#34130a'], ['756', '#cb8f49'], ['757', '#9a9e7d'], ['758', '#00340d'],
      ['760', '#ad6c70'], ['761', '#b00305'], ['762', '#8f030c'], ['763', '#570e1f'],
      ['765', '#1e3a45'], ['767', '#050d32'], ['770', '#a49d97'], ['772', '#19191b'],
      ['777', '#6c6d33'], ['778', '#c9c8b4'], ['779', '#0e0e16'], ['780', '#6f3645'],
      ['781', '#94063e'], ['782', '#471546'], ['783', '#844921'], ['786', '#9b8b7b'],
      ['787', '#533f5a']
    ]
  };

  const STATE = {
    unitPrice: 0,
    totalPrice: 0,
    frameCost: 0,
    matCost: 0,
    glassCost: 0,

    artWMM: 0,
    artHMM: 0,
    cutWMM: 0,
    cutHMM: 0,

    totalWMM: 0,
    totalHMM: 0,

    tolAdded: true,
    sku: "-",
    qty: 1,

    matTypePriceM2: 0,
    matTypeLabel: "Paspartu Olmasın",
    matColorCode: "-",
    matColorHex: "#ffffff",
    matTop: 0,
    matBottom: 0,
    matLeft: 0,
    matRight: 0,

    glassId: "none",
    glassLabel: "Cam Yok",
    glassPriceM2: 0,
  };

  /* ---------------- Helpers ---------------- */

  function getMM(val, unit) { return unit === "cm" ? val * 10 : val; }

  function parseTRY(text) {
    if (!text) return 0;
    const raw = String(text).trim();
    if (!raw.includes("₺")) return 0;
    let s = raw.replace(/[^\d.,]/g, "");
    const hasDot = s.includes(".");
    const hasComma = s.includes(",");
    if (hasDot && hasComma) {
      const lastDot = s.lastIndexOf(".");
      const lastComma = s.lastIndexOf(",");
      if (lastComma > lastDot) s = s.replace(/\./g, "").replace(",", ".");
      else s = s.replace(/,/g, "");
    } else if (hasComma && !hasDot) {
      s = s.replace(",", ".");
    } else if (hasDot && !hasComma) {
      const parts = s.split(".");
      if (parts.length > 2) s = parts.join("");
      else if (parts.length === 2 && (parts[1] || "").length === 3) s = parts.join("");
    }
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  }

  function formatTR_TL(n) {
    const num = Number(n || 0);
    const s = new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
    return s + " TL";
  }

  function isVisible(el) {
    if (!el) return false;
    const st = getComputedStyle(el);
    if (st.display === "none" || st.visibility === "hidden" || st.opacity === "0") return false;
    const r = el.getClientRects();
    return !!(r && r.length);
  }

  function fixText(text) {
    return String(text || "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/ı/g, "i").replace(/İ/g, "I")
      .replace(/ş/g, "s").replace(/Ş/g, "S")
      .replace(/ç/g, "c").replace(/Ç/g, "C")
      .replace(/ğ/g, "g").replace(/Ğ/g, "G")
      .replace(/ö/g, "o").replace(/Ö/g, "O")
      .replace(/ü/g, "u").replace(/Ü/g, "U");
  }

  function formatDateTimeTR(d) {
    const pad = (x) => String(x).padStart(2, "0");
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  function _round1(n) { return Math.round(n * 10) / 10; }

  /* ---------------- SKU ---------------- */

  function extractSkuFromText(text) {
    const m = String(text || "").match(/SKU\s*[:\-]?\s*([A-Za-z0-9._-]{3,})/i);
    return m?.[1]?.trim() || "";
  }

  function getProductSku() {
    const skuFromHidden = document.getElementById("product_sku")?.innerText?.trim();
    if (skuFromHidden) return skuFromHidden;

    const metaSku =
      document.querySelector('meta[itemprop="sku"]')?.content ||
      document.querySelector('meta[name="sku"]')?.content ||
      document.querySelector('meta[property="product:retailer_item_id"]')?.content ||
      "";
    if (metaSku && metaSku.trim().length >= 3) return metaSku.trim();

    const t = document.body?.innerText || "";
    const v = extractSkuFromText(t);
    if (v) return v;

    const slug = (location.pathname || "").split("/").filter(Boolean).pop() || "";
    return slug ? slug.toUpperCase().slice(0, 40) : "-";
  }

  /* ---------------- TL/mt çek (290cm hariç) ---------------- */

  function extractFromJSONLD_1mtOnly() {
    try {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      let best = Infinity;

      for (const s of scripts) {
        let json;
        try { json = JSON.parse(s.textContent); } catch { continue; }
        const arr = Array.isArray(json) ? json : [json];

        for (const item of arr) {
          const type = item?.["@type"];
          const isProduct = type === "Product" || (Array.isArray(type) && type.includes("Product"));
          if (!isProduct) continue;

          const nm = String(item?.name || "").toLowerCase();
          if (nm.includes("290") && nm.includes("cm")) continue;

          const offers = item.offers;
          const offerArr = Array.isArray(offers) ? offers : (offers ? [offers] : []);

          for (const off of offerArr) {
            const p = off?.price ?? off?.lowPrice ?? off?.highPrice;
            if (!p) continue;
            const num = parseFloat(String(p).replace(",", "."));
            if (!isNaN(num) && num > 0 && num < best) best = num;
          }
        }
      }
      return isFinite(best) ? best : 0;
    } catch { return 0; }
  }

  function getUnitMeterPrice_Ignore290() {
    const j = extractFromJSONLD_1mtOnly();
    if (j > 0) return j;

    const els = Array.from(document.querySelectorAll(".text-primary"));
    const candidates = [];

    for (const el of els) {
      if (!isVisible(el)) continue;
      if (el.closest(".cc-wrapper")) continue;

      const text = (el.innerText || "").trim();
      if (!text.includes("₺")) continue;

      const near = (el.parentElement?.innerText || "").toLowerCase();
      if (near.includes("290cm") || near.includes("/ 290") || near.includes(" 290 cm")) continue;

      const val = parseTRY(text);
      if (val <= 0 || val < 20) continue;

      const fs = parseFloat(getComputedStyle(el).fontSize || "0") || 0;
      const top = el.getBoundingClientRect().top;

      let score = 0;
      score += Math.min(fs, 42) * 2;
      if (top >= 0 && top < 900) score += 60;
      if (top >= 0 && top < 500) score += 40;

      candidates.push({ val, score });
    }

    if (!candidates.length) return 0;
    candidates.sort((a,b) => b.score - a.score);
    return candidates[0].val;
  }

  /* =========================================================
     ✅ SQUARE CORNER HARD OVERRIDE
  ========================================================= */

  function forceSquareCornersHard() {
    if (document.getElementById("olga-force-square-corners")) return;

    const st = document.createElement("style");
    st.id = "olga-force-square-corners";
    st.textContent = `
      #olga_frame,
      #olga_frame_inner,
      #olga_mat,
      #olga_art,
      #olga_glass {
        border-radius: 0 !important;
        -webkit-border-radius: 0 !important;
      }
      #olga_preview_card .olga-preview-box{
        overflow: visible !important;
      }
    `;
    document.head.appendChild(st);
  }

  /* =========================================================
     ✅ UI Inject + Preview styles
  ========================================================= */

  function injectExtraStylesOnce() {
    if (document.getElementById("olga-extra-style")) return;
    const st = document.createElement("style");
    st.id = "olga-extra-style";
    st.textContent = `
      .olga-card{ margin-top:14px; padding:12px; border:1px solid #e7e1da; border-radius:10px; background:#faf8f6; }
      .olga-title{ font-weight:800; margin-bottom:8px; color:#2b241b; }
      .olga-grid{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
      .olga-chip{
        padding:10px; border:1px solid #d8cfc6; border-radius:10px;
        background:#fff; cursor:pointer; text-align:left;
        transition: .15s ease; user-select:none;
      }
      .olga-chip:hover{ border-color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}); transform: translateY(-1px); }
      .olga-chip.selected{
        border-color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        box-shadow:0 4px 14px rgba(0,0,0,.06);
        background:#fff7ef;
      }
      .olga-chip b{ display:block; font-size:13px; }
      .olga-chip small{ display:block; opacity:.75; font-size:12px; margin-top:2px; }

      .olga-select{ width:100%; padding:10px; border-radius:10px; border:1px solid #ccc; background:#fff; }

      .olga-row{ display:flex; gap:8px; flex-wrap:wrap; }
      .olga-col{ display:flex; flex-direction:column; }
      .olga-col label{ font-size:12px; opacity:.9; margin-top:6px; }
      .olga-row input{ width:92px; padding:8px; border:1px solid #ccc; border-radius:8px; background:#fff; }

      .olga-palette-wrap{
        margin-top:8px; padding:10px; border-radius:10px;
        border:1px solid #e7e1da; background:#fff;
        max-height: 210px; overflow:auto;
      }
      .olga-palette{ display:grid; grid-template-columns: repeat(6, 1fr); gap:10px; }
      @media (max-width: 520px){ .olga-palette{ grid-template-columns: repeat(4, 1fr); } }

      .olga-color-item{ text-align:center; }
      .olga-color{
        width:28px; height:28px; border-radius:0px; border:2px solid #cfc7bf;
        cursor:pointer; margin:0 auto;
      }
      .olga-color.selected{ border-color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}); }
      .olga-code{ font-size:10px; opacity:.85; margin-top:4px; }

      .olga-preview-card{
        margin:12px 0;
        padding:12px;
        border:1px solid #e7e1da;
        border-radius:12px;
        background:#fff;
        box-shadow:0 2px 10px rgba(0,0,0,.04);
      }
      .olga-preview-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
      .olga-preview-head b{ font-size:14px; color:#2b241b; }
      .olga-preview-sub{ font-size:12px; opacity:.75; }

      .olga-preview-box{
        width:100%;
        height:220px;
        border:1px dashed #d8cfc6;
        border-radius:12px;
        background: #faf8f6;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:14px;
        box-sizing:border-box;
      }

      /* ✅ Siyah çerçeve BACKGROUND + PADDING */
      .olga-frame{
        background:#2b241b;
        display:block;
        box-sizing:border-box;
      }
      .olga-frame-inner{
        background:#ffffff;
        width:100%;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        box-sizing:border-box;
      }

      .olga-mat{
        background:#ffffff;
        display:flex;
        align-items:center;
        justify-content:center;
        box-sizing:border-box;
        position:relative;
      }
      .olga-art{
        background:#e8e8e8;
        box-shadow: inset 0 0 0 1px rgba(0,0,0,.06);
      }
      .olga-glass{
        position:absolute;
        inset:0;
        pointer-events:none;
        background: linear-gradient(135deg, rgba(255,255,255,.22), rgba(255,255,255,0));
      }
      .olga-note{ margin-top:8px; font-size:12px; opacity:.78; }
    `;
    document.head.appendChild(st);
  }

  function ensureExtraUI() {
    injectExtraStylesOnce();

    const panels = Array.from(document.querySelectorAll(".cc-container .cc-panel"));
    if (!panels.length) return;

    const leftPanel = panels[0];
    const rightPanel = panels[1] || null;

    if (!document.getElementById("olga_extra_options")) {
      const block = document.createElement("div");
      block.id = "olga_extra_options";
      block.className = "olga-card";

      const matOptions = MAT_TYPES.map(x => `<option value="${x.value}">${x.label}</option>`).join("");

      const glassHTML = GLASS_OPTIONS.map(g => `
        <div class="olga-chip ${g.id === "none" ? "selected" : ""}" data-glass="${g.id}" data-price="${g.priceM2}">
          <b>${g.label}</b>
          <small>${g.desc}</small>
        </div>
      `).join("");

      block.innerHTML = `
        <div class="olga-title">Cam Seçimi</div>
        <div class="olga-grid" id="olga_glass_grid">${glassHTML}</div>

        <div style="height:12px"></div>

        <div class="olga-title">Paspartu Seçimi</div>
        <select id="olga_mat_type" class="olga-select">${matOptions}</select>

        <div id="olga_mat_controls" style="display:none; margin-top:10px">
          <div class="olga-title" style="margin-top:8px">Paspartu Kenarları (mm)</div>
          <div class="olga-row">
            <div class="olga-col"><label>Üst</label><input type="number" id="olga_mat_top" value="50" min="0"></div>
            <div class="olga-col"><label>Alt</label><input type="number" id="olga_mat_bottom" value="50" min="0"></div>
            <div class="olga-col"><label>Sol</label><input type="number" id="olga_mat_left" value="50" min="0"></div>
            <div class="olga-col"><label>Sağ</label><input type="number" id="olga_mat_right" value="50" min="0"></div>
          </div>

          <div class="olga-title" style="margin-top:12px">Paspartu Rengi</div>
          <div class="olga-palette-wrap">
            <div class="olga-palette" id="olga_mat_palette"></div>
          </div>
        </div>
      `;
      leftPanel.appendChild(block);
    }

    if (rightPanel && !document.getElementById("olga_preview_card")) {
      const sumBox = rightPanel.querySelector(".cc-summary-box");
      const card = document.createElement("div");
      card.id = "olga_preview_card";
      card.className = "olga-preview-card";
      card.innerHTML = `
        <div class="olga-preview-head">
          <b>Önizleme</b>
          <div class="olga-preview-sub" id="olga_preview_label">-</div>
        </div>
        <div class="olga-preview-box">
          <div class="olga-frame" id="olga_frame">
            <div class="olga-frame-inner" id="olga_frame_inner">
              <div class="olga-mat" id="olga_mat">
                <div class="olga-art" id="olga_art"></div>
                <div class="olga-glass" id="olga_glass" style="display:none"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="olga-note" id="olga_preview_note">Ölçü girince canlı olarak güncellenir.</div>
      `;
      if (sumBox) rightPanel.insertBefore(card, sumBox);
      else rightPanel.appendChild(card);
    }

    const summaryBox = document.querySelector(".cc-summary-box");
    if (summaryBox && !document.getElementById("olga_cost_breakdown")) {
      const wrap = document.createElement("div");
      wrap.id = "olga_cost_breakdown";
      wrap.style.marginTop = "10px";
      wrap.innerHTML = `
        <div style="border-top:1px dashed #cfc7bf; margin:10px 0"></div>
        <div>Çerçeve: <strong id="product_frameCost">-</strong></div>
        <div>Paspartu: <strong id="product_matCost">-</strong></div>
        <div>Cam: <strong id="product_glassCost">-</strong></div>
        <div style="margin-top:6px; font-size:12px; opacity:.8">
          Çerçeve Ölçüsü (Paspartu dahil): <strong id="product_totalSize">-</strong>
        </div>
      `;
      summaryBox.appendChild(wrap);
    }

    // ✅ WhatsApp butonu (HTML’ye dokunmadan otomatik ekle)
    if (rightPanel && !document.getElementById("olga_whatsapp_btn")) {
      const pdfBtn = rightPanel.querySelector('button[onclick="createPDF()"]');
      const waBtn = document.createElement("button");
      waBtn.id = "olga_whatsapp_btn";
      waBtn.type = "button";
      waBtn.textContent = "📲 WhatsApp’tan Gönder";
      waBtn.style.marginTop = "10px";
      waBtn.addEventListener("click", () => sendWhatsAppOrder());
      if (pdfBtn && pdfBtn.parentElement) pdfBtn.insertAdjacentElement("afterend", waBtn);
      else rightPanel.appendChild(waBtn);
    }
  }

  /* ---------------- Palette ---------------- */

  function renderMatPalette(matTypePriceM2) {
    const palette = document.getElementById("olga_mat_palette");
    if (!palette) return;

    palette.innerHTML = "";

    const list = PASPARTU_COLORS[matTypePriceM2] || [];
    if (!list.length) {
      palette.innerHTML = `<div style="grid-column:1/-1;font-size:12px;opacity:.75">Bu paspartu türü için renk listesi bulunamadı.</div>`;
      return;
    }

    list.forEach(([code, hex]) => {
      const item = document.createElement("div");
      item.className = "olga-color-item";

      const box = document.createElement("div");
      box.className = "olga-color";
      box.style.background = hex;
      box.dataset.code = code;
      box.dataset.hex = hex;
      box.title = code;

      // ✅ Metallic kutu
      if (code === "W232") box.style.background = "linear-gradient(135deg,#fff0b8,#d4af37,#fff7d6,#b8860b)";
      if (code === "W233") box.style.background = "linear-gradient(135deg,#ffffff,#cfcfcf,#f5f5f5,#9a9a9a)";

      const lbl = document.createElement("div");
      lbl.className = "olga-code";
      lbl.textContent = code;

      item.appendChild(box);
      item.appendChild(lbl);
      palette.appendChild(item);
    });

    const first = palette.querySelector(".olga-color");
    if (first) {
      palette.querySelectorAll(".olga-color").forEach(x => x.classList.remove("selected"));
      first.classList.add("selected");
      STATE.matColorCode = first.dataset.code || "-";
      STATE.matColorHex = first.dataset.hex || "#ffffff";
    }
  }

  function bindExtraUIEvents() {
    const glassGrid = document.getElementById("olga_glass_grid");
    const matTypeEl = document.getElementById("olga_mat_type");
    const matControls = document.getElementById("olga_mat_controls");
    const paletteWrap = document.getElementById("olga_mat_palette");

    if (glassGrid && !glassGrid.__bound) {
      glassGrid.__bound = true;
      glassGrid.addEventListener("click", (e) => {
        const chip = e.target.closest(".olga-chip");
        if (!chip) return;

        glassGrid.querySelectorAll(".olga-chip").forEach(x => x.classList.remove("selected"));
        chip.classList.add("selected");

        const id = chip.dataset.glass || "none";
        const price = parseFloat(chip.dataset.price || "0") || 0;
        const found = GLASS_OPTIONS.find(x => x.id === id);

        STATE.glassId = id;
        STATE.glassPriceM2 = price;
        STATE.glassLabel = found?.label || "Cam";

        calculate();
      });
    }

    if (matTypeEl && !matTypeEl.__bound) {
      matTypeEl.__bound = true;
      matTypeEl.addEventListener("change", () => {
        const v = parseFloat(matTypeEl.value || "0") || 0;
        STATE.matTypePriceM2 = v;
        STATE.matTypeLabel = MAT_TYPES.find(x => x.value === v)?.label || "Paspartu";

        if (matControls) matControls.style.display = v > 0 ? "block" : "none";

        const def = v > 0 ? 50 : 0;
        ["olga_mat_top","olga_mat_bottom","olga_mat_left","olga_mat_right"].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.value = def;
        });

        if (v > 0) renderMatPalette(v);
        calculate();
      });

      STATE.matTypePriceM2 = parseFloat(matTypeEl.value || "0") || 0;
      STATE.matTypeLabel = MAT_TYPES.find(x => x.value === STATE.matTypePriceM2)?.label || "Paspartu";
      if (matControls) matControls.style.display = STATE.matTypePriceM2 > 0 ? "block" : "none";
      if (STATE.matTypePriceM2 > 0) renderMatPalette(STATE.matTypePriceM2);
    }

    ["olga_mat_top","olga_mat_bottom","olga_mat_left","olga_mat_right"].forEach(id => {
      const el = document.getElementById(id);
      if (!el || el.__bound) return;
      el.__bound = true;
      el.addEventListener("input", calculate);
      el.addEventListener("change", calculate);
    });

    if (paletteWrap && !paletteWrap.__bound) {
      paletteWrap.__bound = true;
      paletteWrap.addEventListener("click", (e) => {
        const c = e.target.closest(".olga-color");
        if (!c) return;

        paletteWrap.querySelectorAll(".olga-color").forEach(x => x.classList.remove("selected"));
        c.classList.add("selected");

        STATE.matColorCode = c.dataset.code || "-";
        STATE.matColorHex = c.dataset.hex || "#ffffff";

        calculate();
      });
    }
  }

  /* =========================================================
     ✅ PRESET
  ========================================================= */

  function applyPresetFromMM(wMM, hMM) {
    const wEl = document.getElementById("product_width");
    const hEl = document.getElementById("product_height");
    const uEl = document.getElementById("product_unit");
    if (!wEl || !hEl) return;

    const unit = (uEl?.value || "cm");
    const wVal = unit === "cm" ? _round1(wMM / 10) : wMM;
    const hVal = unit === "cm" ? _round1(hMM / 10) : hMM;

    wEl.value = String(wVal);
    hEl.value = String(hVal);

    wEl.dispatchEvent(new Event("input", { bubbles: true }));
    hEl.dispatchEvent(new Event("input", { bubbles: true }));
    calculate();
  }

  function bindPresetClicks() {
    const box = document.getElementById("presetSizes");
    if (!box || box.__olgaBound) return;
    box.__olgaBound = true;

    box.addEventListener("click", (e) => {
      const btn = e.target.closest(".preset-btn");
      if (!btn) return;
      e.preventDefault?.();

      const ds = (btn.getAttribute("data-size") || "").trim();
      const m = ds.match(/^\s*(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)\s*$/i);
      if (!m) return;

      const wMM = parseFloat(m[1].replace(",", "."));
      const hMM = parseFloat(m[2].replace(",", "."));
      if (!(wMM > 0 && hMM > 0)) return;

      applyPresetFromMM(wMM, hMM);
    });
  }

  /* =========================================================
     ✅ MAT PREVIEW VISUAL
  ========================================================= */

  function getMatPreviewBackground() {
    const type = STATE.matTypePriceM2 || 0;
    const code = (STATE.matColorCode || "").toUpperCase();
    const hex = STATE.matColorHex || "#ffffff";

    // ✅ Altın / Gümüş parlak
    if (type === 1700) {
      if (code === "W232") {
        return "linear-gradient(135deg,#fff8d9 0%,#f4d98a 18%,#d4af37 42%,#fff2bf 55%,#b8860b 78%,#fff6cf 100%)";
      }
      if (code === "W233") {
        return "linear-gradient(135deg,#ffffff 0%,#e6e6e6 18%,#bfbfbf 42%,#f8f8f8 55%,#9b9b9b 78%,#ffffff 100%)";
      }
      return hex;
    }

    // ✅ Kadife dokusu
    if (type === 3000) {
      return `
        radial-gradient(circle at 20% 15%, rgba(255,255,255,.10), rgba(255,255,255,0) 35%),
        radial-gradient(circle at 80% 85%, rgba(0,0,0,.10), rgba(0,0,0,0) 40%),
        repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 2px, rgba(0,0,0,.05) 2px 4px),
        ${hex}
      `;
    }

    // ✅ Düz karton
    if (type === 1250) return hex;

    return "#ffffff";
  }

  /* =========================================================
     ✅ PREVIEW
  ========================================================= */

  function updateLivePreview() {
    const frame = document.getElementById("olga_frame");
    const frameInner = document.getElementById("olga_frame_inner");
    const mat = document.getElementById("olga_mat");
    const art = document.getElementById("olga_art");
    const glass = document.getElementById("olga_glass");
    const label = document.getElementById("olga_preview_label");
    const note = document.getElementById("olga_preview_note");
    const box = document.querySelector("#olga_preview_card .olga-preview-box");

    if (!frame || !frameInner || !mat || !art || !box) return;

    frame.style.borderRadius = "0px";
    frameInner.style.borderRadius = "0px";
    mat.style.borderRadius = "0px";
    art.style.borderRadius = "0px";
    if (glass) glass.style.borderRadius = "0px";

    const boxW = box.clientWidth;
    const boxH = box.clientHeight;

    if (!(STATE.artWMM > 0 && STATE.artHMM > 0) || boxW < 50 || boxH < 50) {
      frame.style.width = "160px";
      frame.style.height = "160px";
      frame.style.padding = "10px";

      mat.style.padding = "18px";
      mat.style.background = "#ffffff";

      art.style.width = "70px";
      art.style.height = "70px";

      if (glass) glass.style.display = "none";
      if (label) label.textContent = "-";
      if (note) note.textContent = "Ölçü girince canlı olarak güncellenir.";
      return;
    }

    const safePad = 14;
    const availW = Math.max(90, boxW - safePad * 2);
    const availH = Math.max(90, boxH - safePad * 2);

    const totalW = Math.max(STATE.totalWMM, STATE.artWMM);
    const totalH = Math.max(STATE.totalHMM, STATE.artHMM);

    const borderPx = Math.max(8, Math.min(14, Math.round(Math.min(availW, availH) * 0.055)));
    frame.style.padding = borderPx + "px";

    const innerW = Math.max(40, availW - borderPx * 2);
    const innerH = Math.max(40, availH - borderPx * 2);

    const scale = Math.min(innerW / totalW, innerH / totalH);

    const contentW = Math.max(30, totalW * scale);
    const contentH = Math.max(30, totalH * scale);

    const frameWpx = contentW + borderPx * 2;
    const frameHpx = contentH + borderPx * 2;

    frame.style.width = `${frameWpx}px`;
    frame.style.height = `${frameHpx}px`;

    const pTop = Math.max(0, (STATE.matTop || 0) * scale);
    const pBottom = Math.max(0, (STATE.matBottom || 0) * scale);
    const pLeft = Math.max(0, (STATE.matLeft || 0) * scale);
    const pRight = Math.max(0, (STATE.matRight || 0) * scale);

    const maxPadX = Math.max(0, (contentW - 20) / 2);
    const maxPadY = Math.max(0, (contentH - 20) / 2);

    const cTop = Math.min(pTop, maxPadY);
    const cBottom = Math.min(pBottom, maxPadY);
    const cLeft = Math.min(pLeft, maxPadX);
    const cRight = Math.min(pRight, maxPadX);

    mat.style.padding = `${cTop}px ${cRight}px ${cBottom}px ${cLeft}px`;

    if (STATE.matTypePriceM2 > 0) {
      mat.style.background = getMatPreviewBackground();
      mat.style.boxShadow = "inset 0 0 0 1px rgba(0,0,0,.10)";
    } else {
      mat.style.background = "#ffffff";
      mat.style.boxShadow = "none";
    }

    const artWpx = Math.max(22, STATE.artWMM * scale);
    const artHpx = Math.max(22, STATE.artHMM * scale);

    art.style.width = `${artWpx}px`;
    art.style.height = `${artHpx}px`;

    if (glass) {
      glass.style.display = (STATE.glassId && STATE.glassId !== "none") ? "block" : "none";
      glass.style.opacity = (STATE.glassId === "museum") ? "0.22" : "0.14";
    }

    if (label) label.textContent = `${STATE.totalWMM}×${STATE.totalHMM} mm`;
    if (note) {
      const matTxt = STATE.matTypePriceM2 > 0
        ? `Paspartu: ${STATE.matTypeLabel} (${STATE.matColorCode})`
        : "Paspartu: Yok";
      const glassTxt = `Cam: ${STATE.glassLabel || "Cam Yok"}`;
      note.textContent = `${matTxt} • ${glassTxt}`;
    }
  }

  /* ---------------- Hesap ---------------- */

  function calculate() {
    const wEl = document.getElementById("product_width");
    const hEl = document.getElementById("product_height");
    const uEl = document.getElementById("product_unit");
    const qEl = document.getElementById("product_quantity");
    const fittingEl = document.getElementById("product_fitting");

    if (!wEl || !hEl || !uEl || !qEl) return;

    const w = parseFloat(wEl.value || 0);
    const h = parseFloat(hEl.value || 0);
    const unit = uEl.value || "cm";
    const qty = Math.max(1, parseInt(qEl.value || "1", 10));

    const tolAdded = !(fittingEl?.checked);
    const tolMM = tolAdded ? TOL_MM : 0;

    const artWMM = getMM(w, unit);
    const artHMM = getMM(h, unit);

    const cutWMM = artWMM + tolMM;
    const cutHMM = artHMM + tolMM;

    const matTypeEl = document.getElementById("olga_mat_type");
    const matTypePriceM2 = matTypeEl ? (parseFloat(matTypeEl.value || "0") || 0) : 0;
    const matTypeLabel = MAT_TYPES.find(x => x.value === matTypePriceM2)?.label || "Paspartu";

    const hasMat = matTypePriceM2 > 0;

    const matTop = hasMat ? (parseFloat(document.getElementById("olga_mat_top")?.value || "0") || 0) : 0;
    const matBottom = hasMat ? (parseFloat(document.getElementById("olga_mat_bottom")?.value || "0") || 0) : 0;
    const matLeft = hasMat ? (parseFloat(document.getElementById("olga_mat_left")?.value || "0") || 0) : 0;
    const matRight = hasMat ? (parseFloat(document.getElementById("olga_mat_right")?.value || "0") || 0) : 0;

    const totalWMM = artWMM + matLeft + matRight;
    const totalHMM = artHMM + matTop + matBottom;

    const areaM2 = (totalWMM / 1000) * (totalHMM / 1000);

    const perimeterM = (2 * (totalWMM + totalHMM)) / 1000;
    const totalMeter = perimeterM + FIRE_M;

    const unitPrice = getUnitMeterPrice_Ignore290();

    const frameCostOne = (unitPrice > 0 && areaM2 > 0) ? (totalMeter * unitPrice) : 0;
    const matCostOne = hasMat ? (areaM2 * matTypePriceM2) : 0;
    const glassCostOne = areaM2 * (STATE.glassPriceM2 || 0);

    const totalOne = frameCostOne + matCostOne + glassCostOne;
    const total = totalOne * qty;

    STATE.unitPrice = unitPrice;
    STATE.totalPrice = total;
    STATE.frameCost = frameCostOne * qty;
    STATE.matCost = matCostOne * qty;
    STATE.glassCost = glassCostOne * qty;

    STATE.artWMM = artWMM;
    STATE.artHMM = artHMM;
    STATE.cutWMM = cutWMM;
    STATE.cutHMM = cutHMM;

    STATE.totalWMM = totalWMM;
    STATE.totalHMM = totalHMM;

    STATE.tolAdded = tolAdded;
    STATE.sku = getProductSku();
    STATE.qty = qty;

    STATE.matTypePriceM2 = matTypePriceM2;
    STATE.matTypeLabel = matTypeLabel;
    STATE.matTop = matTop;
    STATE.matBottom = matBottom;
    STATE.matLeft = matLeft;
    STATE.matRight = matRight;

    const sizeEl = document.getElementById("product_frameSize");
    const qtyEl = document.getElementById("product_quantitySummary");
    const tolEl = document.getElementById("product_toleranceText");
    const totalEl = document.getElementById("product_totalPrice");

    if (sizeEl) sizeEl.textContent = (w > 0 && h > 0) ? `${w}×${h} ${unit}` : "-";
    if (qtyEl) qtyEl.textContent = String(qty);

    if (tolEl) {
      tolEl.textContent = (w > 0 && h > 0)
        ? `${tolAdded ? "Eklendi" : "Eklenmedi"} (Kesim: ${cutWMM}×${cutHMM} mm)`
        : "-";
    }

    if (totalEl) {
      const ready = (w > 0 && h > 0);
      totalEl.textContent = ready ? formatTR_TL(total) : "-";
    }

    const frameCostEl = document.getElementById("product_frameCost");
    const matCostEl = document.getElementById("product_matCost");
    const glassCostEl = document.getElementById("product_glassCost");
    const totalSizeEl = document.getElementById("product_totalSize");

    if (frameCostEl) frameCostEl.textContent = formatTR_TL(STATE.frameCost);
    if (matCostEl) matCostEl.textContent = formatTR_TL(STATE.matCost);
    if (glassCostEl) glassCostEl.textContent = formatTR_TL(STATE.glassCost);
    if (totalSizeEl) totalSizeEl.textContent = (totalWMM > 0 && totalHMM > 0) ? `${totalWMM}×${totalHMM} mm` : "-";

    updateLivePreview();
  }

  /* =========================================================
     ✅ WhatsApp Hazır Mesaj
  ========================================================= */

  function sendWhatsAppOrder() {
    calculate();

    const lines = [
      "Merhaba Olga Çerçeve 👋",
      "Web siteniz üzerinden çerçeve hesabı yaptım:",
      "",
      `SKU: ${STATE.sku || "-"}`,
      `Adet: ${STATE.qty || 1}`,
      "",
      `Sanat eseri: ${STATE.artWMM || "-"} × ${STATE.artHMM || "-"} mm`,
      `Kesim: ${STATE.cutWMM || "-"} × ${STATE.cutHMM || "-"} mm`,
      `Çerçeve ölçüsü (paspartu dahil): ${STATE.totalWMM || "-"} × ${STATE.totalHMM || "-"} mm`,
      "",
      `Paspartu: ${STATE.matTypePriceM2 > 0 ? `${STATE.matTypeLabel} (${STATE.matColorCode || "-"})` : "Yok"}`,
      `Cam: ${STATE.glassLabel || "Cam Yok"}`,
      "",
      `Çerçeve: ${formatTR_TL(STATE.frameCost)}`,
      `Paspartu: ${formatTR_TL(STATE.matCost)}`,
      `Cam: ${formatTR_TL(STATE.glassCost)}`,
      `Toplam: ${formatTR_TL(STATE.totalPrice)}`,
      "",
      "Sipariş oluşturmak istiyorum. Yardımcı olur musunuz?"
    ];

    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
    window.open(url, "_blank");
  }
  window.sendWhatsAppOrder = sendWhatsAppOrder;

  /* ---------------- PDF ---------------- */

  function ensureJsPDF() {
    return new Promise((resolve, reject) => {
      const jsPDF = window.jspdf?.jsPDF || window.jspdf?.default?.jsPDF || window.jsPDF;
      if (jsPDF) return resolve(jsPDF);

      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = () => {
        const loaded = window.jspdf?.jsPDF || window.jspdf?.default?.jsPDF || window.jsPDF;
        loaded ? resolve(loaded) : reject(new Error("jsPDF yok"));
      };
      s.onerror = () => reject(new Error("CDN blok"));
      document.head.appendChild(s);
    });
  }

  async function loadLogoAsPngDataURL(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  async function createPDF() {
    calculate();

    let jsPDF;
    try {
      jsPDF = await ensureJsPDF();
    } catch {
      alert("PDF kütüphanesi yüklenemedi! (CDN engelli olabilir)");
      return;
    }

    const pdf = new jsPDF("p", "mm", "a4");
    const now = new Date();

    const sku = STATE.sku || getProductSku();
    const dateStr = formatDateTimeTR(now);

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    pdf.setTextColor(BRAND_RGB.r, BRAND_RGB.g, BRAND_RGB.b);
    pdf.setFont(undefined, "bold");
    pdf.setFontSize(22);
    pdf.text("OLGA Çerçeve", 15, 20);

    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, "normal");
    pdf.setFontSize(10);
    pdf.text(fixText("Tarih: " + dateStr), pageW - 15, 20, { align: "right" });

    let y = 40;
    pdf.setFontSize(12);

    pdf.text(fixText(`Sanat Eseri Boyutu : ${STATE.artWMM} mm × ${STATE.artHMM} mm`), 15, y); y += 9;
    pdf.text(fixText(`Kesim Boyutu      : ${STATE.cutWMM} mm × ${STATE.cutHMM} mm`), 15, y); y += 9;
    pdf.text(fixText(`Cerceve Olcusu    : ${STATE.totalWMM} mm × ${STATE.totalHMM} mm (Paspartu dahil)`), 15, y); y += 10;

    pdf.text(fixText(`Cerceve Adedi     : ${STATE.qty}`), 15, y); y += 9;
    pdf.text(fixText(`2 mm Pay          : ${STATE.tolAdded ? "Eklendi" : "Eklenmedi"}`), 15, y); y += 10;

    pdf.text(fixText(`Paspartu          : ${STATE.matTypePriceM2 > 0 ? STATE.matTypeLabel : "Yok"}`), 15, y); y += 9;
    if (STATE.matTypePriceM2 > 0) {
      pdf.text(fixText(`Paspartu Kodu     : ${STATE.matColorCode || "-"}`), 15, y); y += 9;
      pdf.text(fixText(`Kenarlar (mm)     : Sol ${STATE.matLeft}, Sag ${STATE.matRight}, Ust ${STATE.matTop}, Alt ${STATE.matBottom}`), 15, y); y += 10;
    }

    pdf.text(fixText(`Cam               : ${STATE.glassLabel || "Cam Yok"}`), 15, y); y += 12;

    pdf.setFont(undefined, "bold");
    pdf.text(fixText(`Cerceve Fiyati    : ${formatTR_TL(STATE.frameCost)}`), 15, y); y += 9;
    pdf.text(fixText(`Paspartu Fiyati   : ${formatTR_TL(STATE.matCost)}`), 15, y); y += 9;
    pdf.text(fixText(`Cam Fiyati        : ${formatTR_TL(STATE.glassCost)}`), 15, y); y += 10;

    pdf.setFontSize(13);
    pdf.text(fixText(`Toplam Fiyat      : ${formatTR_TL(STATE.totalPrice)}`), 15, y); y += 10;

    pdf.setFont(undefined, "normal");
    pdf.setFontSize(12);
    pdf.text(fixText(`SKU               : ${sku}`), 15, y); y += 18;

    pdf.setTextColor(BRAND_RGB.r, BRAND_RGB.g, BRAND_RGB.b);
    pdf.setFont(undefined, "bold");
    pdf.setFontSize(12);
    pdf.text(fixText("Siparis ve bilgi: 0850 305 75 45"), 15, y); y += 8;

    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, "normal");
    pdf.setFontSize(10);
    pdf.text(fixText("Whatsapp veya telefon ile ulasabilirsiniz."), 15, y); y += 6;
    pdf.text(fixText("www.olgacerceve.com"), 15, y);

    const logoPng = await loadLogoAsPngDataURL(LOGO_URL);
    if (logoPng) {
      try {
        const logoW = 55, logoH = 22;
        const x = (pageW - logoW) / 2;
        const yLogo = pageH - 40;
        pdf.addImage(logoPng, "PNG", x, yLogo, logoW, logoH);
      } catch {}
    }

    pdf.save(`urun-${sku}.pdf`);
  }
  window.createPDF = createPDF;

  /* ---------------- Preset Toggle ---------------- */

  function togglePresets() {
    const box = document.getElementById("presetSizes");
    if (!box) return;
    box.style.display = (box.style.display === "none" || !box.style.display) ? "flex" : "none";
  }
  window.togglePresets = togglePresets;

  /* ---------------- Init ---------------- */

  function attachEventsOnce() {
    if (window.__olga_cut_inited) return;
    window.__olga_cut_inited = true;

    ensureExtraUI();
    forceSquareCornersHard();
    bindExtraUIEvents();

    ["product_width", "product_height", "product_unit", "product_quantity", "product_fitting"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", calculate);
      el.addEventListener("change", calculate);
    });

    bindPresetClicks();
    calculate();
  }

  function waitForElementsAndInit() {
    const ok =
      document.getElementById("product_width") &&
      document.getElementById("product_height") &&
      document.getElementById("product_unit") &&
      document.getElementById("product_quantity");

    if (ok) {
      attachEventsOnce();
      return true;
    }
    return false;
  }

  function bootHard() {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      waitForElementsAndInit();
      calculate();
      if (tries > 120) clearInterval(timer);
    }, 350);
  }

  function boot() {
    if (waitForElementsAndInit()) {
      calculate();
      bootHard();
      return;
    }

    const obs = new MutationObserver(() => {
      if (waitForElementsAndInit()) {
        calculate();
        obs.disconnect();
        bootHard();
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });

    bootHard();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("pageshow", () => {
    window.__olga_cut_inited = false;
    boot();
  });

  window.addEventListener("popstate", () => {
    window.__olga_cut_inited = false;
    boot();
  });

})();
</script>
