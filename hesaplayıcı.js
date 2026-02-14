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
    { id: "pvc",    label: "PVC Cam",   desc: "Hafif ve kırılmaz alternatif.", priceM2: 1250 },
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

  // ========== ÇERÇEVE GÖRSELLERİ (SKU -> URL ve kalınlık) ==========
  // Her çerçeve modeli için:
  // - url: Görsel linki
  // - slice: Border-image slice değeri (görselin nasıl dilimleneceği)
  // - borderScale: Ekrandaki çerçeve kalınlık oranı (1.0 = en kalın referans)
  //   Kalın çerçeveler: 1.0
  //   Orta kalınlık: 0.6-0.8
  //   İnce çerçeveler: 0.4-0.55
  //   Çok ince çerçeveler: 0.25-0.35
  const FRAME_DATA = {
    "GD154-4313-BA": {
      url: "https://cdn.myikas.com/images/04a76b35-2c55-499a-b485-0058f5ce13ce/e5ef8594-d86b-49b1-898c-d70ffc6ab1cc/image_1080.webp",
    },
    "GD154-3427-BA": {
      url: "https://cdn.myikas.com/images/04a76b35-2c55-499a-b485-0058f5ce13ce/5bc0e7d1-c8c9-451b-98c8-f0412188e500/image_1080.webp",
    },
    "GB139-1211T": {
      url: "https://cdn.myikas.com/images/04a76b35-2c55-499a-b485-0058f5ce13ce/d8342518-97a5-4c14-bb26-0d2b09d8b1b9/image_1080.webp",
    },
    "GG128-3110-P": {
      url: "https://cdn.myikas.com/images/04a76b35-2c55-499a-b485-0058f5ce13ce/476aee5a-3b63-4802-8470-3c7bf46d506b/image_1080.webp",
    },
    // Yeni çerçeveler: sadece url ekleyin
    // "SKU-KODU": { url: "https://cdn.../gorsel.webp" },
  };

  // Tüm çerçeveler için sabit değerler
  const FRAME_SLICE = "21%";
  const FRAME_BORDER_SCALE = 1.3;

  // Eser alanı arka planı - oluklu mukavva/karton dokusu
  const ART_BG_TEXTURE = `
    repeating-linear-gradient(0deg, rgba(160,120,70,0.25) 0px, rgba(200,170,130,0.12) 1px, rgba(140,100,55,0.18) 2px, transparent 3px, transparent 5px),
    repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, rgba(255,255,255,0.02) 1px, transparent 2px),
    #b8976a
  `;

  // Çerçeve verilerini SKU'dan al (url ve slice)
  function getFrameData() {
    const sku = getProductSku();
    if (!sku) return null;

    // Tam eşleşme
    if (FRAME_DATA[sku]) {
      return FRAME_DATA[sku];
    }

    // Normalize edilmiş arama
    const skuNormalized = sku.toUpperCase().replace(/[\s-_]/g, '');
    for (const key in FRAME_DATA) {
      const keyNormalized = key.toUpperCase().replace(/[\s-_]/g, '');
      if (keyNormalized === skuNormalized) {
        return FRAME_DATA[key];
      }
    }

    return null;
  }

  // Geriye uyumluluk için - sadece URL döndürür
  function getFrameImageUrl() {
    const data = getFrameData();
    return data ? data.url : null;
  }

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

    // 1. Katman (İç Paspartu)
    matTypePriceM2: 0,
    matTypeLabel: "Paspartu Olmasın",
    matColorCode: "-",
    matColorHex: "#ffffff",
    matTop: 0,
    matBottom: 0,
    matLeft: 0,
    matRight: 0,

    // Çift Paspartu (2. Katman - Dış Paspartu)
    isDoubleMat: false,
    mountingWidth: 5, // Alt montaj genişliği (mm) - tüm kenarlara uygulanır
    mat2TypePriceM2: 0,
    mat2TypeLabel: "Paspartu Olmasın",
    mat2ColorCode: "-",
    mat2ColorHex: "#ffffff",
    mat2Cost: 0,

    glassId: "none",
    glassLabel: "Cam Yok",
    glassPriceM2: 0,
  };

  /* ---------------- Premium Helpers ---------------- */

  // Debounce fonksiyonu - performans optimizasyonu
  function debounce(func, wait = 150) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle fonksiyonu - yoğun eventler için
  function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Ripple efekti oluştur
  function createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "olga-ripple";

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (event.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (event.clientY - rect.top - size / 2) + "px";

    element.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }

  // Loading state yönetimi
  function setLoading(element, isLoading) {
    if (!element) return;
    if (isLoading) {
      element.classList.add("olga-loading");
      element.setAttribute("aria-busy", "true");
    } else {
      element.classList.remove("olga-loading");
      element.setAttribute("aria-busy", "false");
    }
  }

  // Error state yönetimi
  function showInputError(inputEl, message) {
    if (!inputEl) return;
    inputEl.classList.add("olga-input-error");
    inputEl.setAttribute("aria-invalid", "true");

    // Tooltip göster
    const tooltip = document.createElement("div");
    tooltip.className = "olga-tooltip";
    tooltip.textContent = message;
    tooltip.style.position = "absolute";

    const rect = inputEl.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - 100 + "px";
    tooltip.style.top = rect.top - 40 + "px";
    document.body.appendChild(tooltip);

    setTimeout(() => {
      inputEl.classList.remove("olga-input-error");
      inputEl.setAttribute("aria-invalid", "false");
      tooltip.remove();
    }, 2000);
  }

  // Başarılı güncelleme animasyonu
  function showPriceUpdate(element) {
    if (!element) return;
    element.classList.remove("olga-price-updated");
    void element.offsetWidth; // Reflow trigger
    element.classList.add("olga-price-updated");
  }

  // Safe number parse
  function safeParseFloat(value, defaultValue = 0) {
    const parsed = parseFloat(value);
    return isNaN(parsed) || !isFinite(parsed) ? defaultValue : parsed;
  }

  // Safe integer parse
  function safeParseInt(value, defaultValue = 0) {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) || !isFinite(parsed) ? defaultValue : parsed;
  }

  // Validate dimension
  function validateDimension(value, min = 15, max = 2900) {
    const num = safeParseFloat(value);
    if (num < min) return { valid: false, error: `Minimum ${min} mm olmalı` };
    if (num > max) return { valid: false, error: `Maximum ${max} mm olmalı` };
    return { valid: true, value: num };
  }

  // Announce to screen readers
  function announceToSR(message) {
    let announcer = document.getElementById("olga-sr-announcer");
    if (!announcer) {
      announcer = document.createElement("div");
      announcer.id = "olga-sr-announcer";
      announcer.setAttribute("role", "status");
      announcer.setAttribute("aria-live", "polite");
      announcer.setAttribute("aria-atomic", "true");
      announcer.style.cssText = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";
      document.body.appendChild(announcer);
    }
    announcer.textContent = message;
  }

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
      /* ========== PREMIUM ANIMATIONS ========== */
      @keyframes olga-fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes olga-pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.4); }
        50% { box-shadow: 0 0 0 8px rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0); }
      }
      @keyframes olga-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes olga-ripple {
        to { transform: scale(4); opacity: 0; }
      }
      @keyframes olga-shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-4px); }
        75% { transform: translateX(4px); }
      }
      @keyframes olga-bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      @keyframes olga-glow {
        0%, 100% { box-shadow: 0 0 5px rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.3); }
        50% { box-shadow: 0 0 20px rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.6); }
      }
      @keyframes olga-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      /* ========== GLASSMORPHISM BASE ========== */
      .olga-glass-effect {
        background: rgba(255, 255, 255, 0.85) !important;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
      }

      /* ========== CARD STYLES ========== */
      .olga-card{
        margin-top:14px;
        padding:12px;
        border:1px solid #e7e1da;
        border-radius:14px;
        background: linear-gradient(135deg, #fdfcfb 0%, #f7f4f1 100%);
        box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        animation: olga-fadeIn 0.4s ease-out;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .olga-card:hover {
        box-shadow: 0 8px 30px rgba(0,0,0,0.06);
      }

      .olga-title{
        font-weight:800;
        margin-bottom:10px;
        color:#2b241b;
        font-size: 14px;
        letter-spacing: -0.3px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .olga-title::before {
        content: '';
        width: 4px;
        height: 16px;
        background: linear-gradient(180deg, rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}), #c9a66b);
        border-radius: 2px;
      }

      /* ========== CHIP/BUTTON STYLES ========== */
      .olga-grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      @media (max-width: 400px) { .olga-grid { grid-template-columns: 1fr; } }

      .olga-chip{
        padding:12px 14px;
        border:1px solid #e0d6cc;
        border-radius:12px;
        background: linear-gradient(135deg, #ffffff 0%, #faf8f6 100%);
        cursor:pointer;
        text-align:left;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        user-select:none;
        position: relative;
        overflow: hidden;
      }
      .olga-chip::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b},0.05), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .olga-chip:hover {
        border-color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.12);
      }
      .olga-chip:hover::before { opacity: 1; }
      .olga-chip:active { transform: translateY(0) scale(0.98); }

      .olga-chip.selected{
        border-color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        background: linear-gradient(135deg, #fff7ef 0%, #fff3e6 100%);
        box-shadow: 0 4px 16px rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.15);
        animation: olga-bounce 0.3s ease;
      }
      .olga-chip.selected::after {
        content: '✓';
        position: absolute;
        top: 8px;
        right: 10px;
        font-size: 12px;
        color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        font-weight: bold;
      }
      .olga-chip b{ display:block; font-size:13px; font-weight: 700; color: #2b241b; }
      .olga-chip small{ display:block; opacity:.7; font-size:11px; margin-top:3px; line-height: 1.3; }

      /* ========== RIPPLE EFFECT ========== */
      .olga-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.3);
        transform: scale(0);
        animation: olga-ripple 0.6s linear;
        pointer-events: none;
      }

      /* ========== SELECT STYLES ========== */
      .olga-select{
        width:100%;
        padding:12px 14px;
        border-radius:12px;
        border:1px solid #d8cfc6;
        background: linear-gradient(135deg, #ffffff 0%, #fdfcfb 100%);
        font-size: 14px;
        font-weight: 500;
        color: #2b241b;
        cursor: pointer;
        transition: all 0.25s ease;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238c5919' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
      }
      .olga-select:hover, .olga-select:focus {
        border-color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        box-shadow: 0 0 0 3px rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.1);
        outline: none;
      }

      /* ========== INPUT STYLES ========== */
      .olga-row{ display:flex; gap:10px; flex-wrap:wrap; }
      .olga-col{ display:flex; flex-direction:column; flex: 1; min-width: 70px; }
      .olga-col label{
        font-size:11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        opacity:.8;
        margin-top:6px;
        margin-bottom: 4px;
        color: #5a5047;
      }
      .olga-row input{
        width: 100%;
        padding:10px 12px;
        border:1px solid #d8cfc6;
        border-radius:10px;
        background: linear-gradient(135deg, #ffffff 0%, #fdfcfb 100%);
        font-size: 14px;
        font-weight: 600;
        color: #2b241b;
        transition: all 0.25s ease;
        box-sizing: border-box;
      }
      .olga-row input:hover {
        border-color: #c9bfb3;
      }
      .olga-row input:focus {
        border-color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        box-shadow: 0 0 0 3px rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.1);
        outline: none;
      }
      .olga-row input.olga-input-error {
        border-color: #e53935;
        animation: olga-shake 0.4s ease;
      }

      /* ========== PALETTE STYLES ========== */
      .olga-palette-wrap{
        margin-top:10px;
        padding:12px;
        border-radius:12px;
        border:1px solid #e7e1da;
        background: linear-gradient(135deg, #ffffff 0%, #fdfcfb 100%);
        max-height: 220px;
        overflow:auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.3) transparent;
      }
      .olga-palette-wrap::-webkit-scrollbar { width: 6px; }
      .olga-palette-wrap::-webkit-scrollbar-track { background: transparent; }
      .olga-palette-wrap::-webkit-scrollbar-thumb {
        background: rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.3);
        border-radius: 3px;
      }

      .olga-palette{ display:grid; grid-template-columns: repeat(6, 1fr); gap:12px; }
      @media (max-width: 520px){ .olga-palette{ grid-template-columns: repeat(4, 1fr); } }

      .olga-color-item{
        text-align:center;
        transition: transform 0.2s ease;
      }
      .olga-color-item:hover { transform: scale(1.1); }

      .olga-color{
        width:32px;
        height:32px;
        border-radius:6px;
        border:2px solid #e0d6cc;
        cursor:pointer;
        margin:0 auto;
        transition: all 0.2s ease;
        box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      }
      .olga-color:hover {
        border-color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .olga-color.selected{
        border-color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        box-shadow: 0 0 0 3px rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.3);
        animation: olga-pulse 1.5s ease infinite;
      }
      .olga-code{ font-size:9px; font-weight: 600; opacity:.75; margin-top:5px; }

      /* ========== PREVIEW CARD ========== */
      .olga-preview-card{
        margin:12px 0;
        padding:16px;
        border:1px solid #e7e1da;
        border-radius:16px;
        background: linear-gradient(135deg, #ffffff 0%, #fdfcfb 100%);
        box-shadow: 0 4px 24px rgba(0,0,0,0.04);
        animation: olga-fadeIn 0.5s ease-out;
        transition: all 0.3s ease;
      }
      .olga-preview-card:hover {
        box-shadow: 0 8px 32px rgba(0,0,0,0.06);
      }

      .olga-preview-head{
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:12px;
        padding-bottom: 10px;
        border-bottom: 1px solid #f0ebe6;
      }
      .olga-preview-head b{
        font-size:15px;
        color:#2b241b;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .olga-preview-head b::before {
        content: '🖼️';
        font-size: 16px;
      }
      .olga-preview-sub{
        font-size:12px;
        font-weight: 600;
        color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        background: rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.1);
        padding: 4px 10px;
        border-radius: 20px;
      }

      .olga-preview-box{
        width:100%;
        height:240px;
        border:2px dashed #e0d6cc;
        border-radius:14px;
        background: #ffffff;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:16px;
        box-sizing:border-box;
        transition: all 0.4s ease;
        position: relative;
        overflow: hidden;
      }
      .olga-preview-box::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%);
        background-size: 200% 200%;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .olga-preview-box:hover::before {
        opacity: 1;
        animation: olga-shimmer 2s infinite;
      }

      /* ========== FRAME PREVIEW ========== */
      .olga-frame-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Gerçek çerçeve görseli (background-image, esneme yok) */
      .olga-frame-image {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        z-index: 5;
        pointer-events: none;
        border-style: solid;
        border-width: 0;
        border-color: transparent;
        border-image-repeat: stretch;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        transition: width 0.35s ease-out, height 0.35s ease-out, border-width 0.35s ease-out;
      }

      .olga-frame{
        background: #000000;
        display:grid;
        box-sizing:border-box;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        border-style: solid;
        border-width: 0;
        border-color: transparent;
        border-image-repeat: stretch;
        transition: width 0.35s ease-out, height 0.35s ease-out, padding 0.35s ease-out, border-width 0.35s ease-out;
        position: relative;
      }

      /* Dış Paspartu */
      .olga-mat-outer{
        background:transparent;
        display:grid;
        box-sizing:border-box;
        transition: padding 0.3s ease-out, background 0.25s ease;
      }

      /* 45° Bevel - Beyaz kesim çizgisi */
      .olga-bevel-outer, .olga-bevel-inner{
        background: transparent;
        display:grid;
        box-sizing:border-box;
        transition: padding 0.3s ease-out;
      }

      /* İç Paspartu */
      .olga-mat-inner{
        background:transparent;
        display:grid;
        box-sizing:border-box;
        transition: padding 0.3s ease-out, background 0.25s ease, opacity 0.25s ease;
      }

      /* Eser Alanı - oluklu mukavva dokusu */
      .olga-art, .olga-art-single{
        background:
          repeating-linear-gradient(0deg, rgba(160,120,70,0.25) 0px, rgba(200,170,130,0.12) 1px, rgba(140,100,55,0.18) 2px, transparent 3px, transparent 5px),
          repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, rgba(255,255,255,0.02) 1px, transparent 2px),
          #b8976a;
        box-sizing:border-box;
        transition: all 0.3s ease-out;
      }

      .olga-glass{
        position:absolute;
        inset:0;
        pointer-events:none;
        background: linear-gradient(135deg, rgba(255,255,255,.25) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,.1) 100%);
        transition: opacity 0.3s ease;
        z-index: 10;
      }
      .olga-note{
        margin-top:10px;
        font-size:12px;
        color: #6b6259;
        text-align: center;
        line-height: 1.4;
      }

      /* ========== LOADING STATE ========== */
      .olga-loading {
        position: relative;
        pointer-events: none;
      }
      .olga-loading::after {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(255,255,255,0.8);
        border-radius: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .olga-spinner {
        width: 24px;
        height: 24px;
        border: 3px solid rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.2);
        border-top-color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        border-radius: 50%;
        animation: olga-spin 0.8s linear infinite;
      }

      /* ========== BUTTON PREMIUM STYLES ========== */
      .cc-panel button,
      #olga_whatsapp_btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        background: linear-gradient(135deg, rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}) 0%, #a36b2a 100%) !important;
        box-shadow: 0 4px 15px rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.3);
      }
      .cc-panel button:hover,
      #olga_whatsapp_btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.4) !important;
      }
      .cc-panel button:active,
      #olga_whatsapp_btn:active {
        transform: translateY(0) scale(0.98);
      }

      /* ========== SUMMARY BOX PREMIUM ========== */
      .cc-summary-box {
        background: linear-gradient(135deg, #f8f6f4 0%, #f0ebe6 100%) !important;
        border-radius: 12px !important;
        border: 1px solid #e7e1da !important;
        padding: 14px !important;
        transition: all 0.3s ease;
      }
      .cc-summary-box > div {
        padding: 6px 0;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        transition: all 0.2s ease;
      }
      .cc-summary-box > div:last-child {
        border-bottom: none;
      }
      .cc-summary-box > div:hover {
        padding-left: 8px;
        background: rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.03);
        border-radius: 6px;
      }

      /* ========== PRICE HIGHLIGHT ========== */
      #product_totalPrice {
        font-size: 1.15em;
        color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        text-shadow: 0 1px 2px rgba(0,0,0,0.1);
      }
      .olga-price-updated {
        animation: olga-glow 0.5s ease;
      }

      /* ========== ACCESSIBILITY FOCUS STATES ========== */
      .olga-chip:focus-visible,
      .olga-color:focus-visible,
      .olga-select:focus-visible,
      .olga-row input:focus-visible {
        outline: 2px solid rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        outline-offset: 2px;
      }

      /* ========== TOOLTIP PREMIUM ========== */
      .olga-tooltip {
        position: absolute;
        background: linear-gradient(135deg, #2b241b 0%, #3d352a 100%);
        color: #fff;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 500;
        box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        z-index: 1000;
        animation: olga-fadeIn 0.2s ease;
        max-width: 200px;
        text-align: center;
      }
      .olga-tooltip::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #2b241b;
      }

      /* ========== COLLAPSIBLE SECTIONS ========== */
      .olga-collapsible-header {
        font-weight: 800;
        color: #2b241b;
        font-size: 14px;
        letter-spacing: -0.3px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
        padding: 6px 0;
        margin-bottom: 2px;
        border-radius: 8px;
        transition: background 0.2s ease;
      }
      .olga-collapsible-header:hover {
        background: rgba(0,0,0,0.03);
      }
      .olga-collapsible-header::before {
        content: '';
        width: 4px;
        height: 16px;
        background: linear-gradient(180deg, rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}), #c9a66b);
        border-radius: 2px;
        flex-shrink: 0;
      }
      .olga-collapsible-chevron {
        margin-left: auto;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        flex-shrink: 0;
      }
      .olga-collapsible-chevron svg {
        width: 12px;
        height: 12px;
        fill: none;
        stroke: #8c7e6a;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .olga-collapsible-header.open .olga-collapsible-chevron {
        transform: rotate(180deg);
      }
      .olga-collapsible-badge {
        font-size: 11px;
        font-weight: 600;
        color: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        background: rgba(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b}, 0.1);
        padding: 2px 8px;
        border-radius: 12px;
        transition: opacity 0.25s ease;
      }
      .olga-collapsible-header.open .olga-collapsible-badge {
        opacity: 0.4;
      }
      .olga-collapsible-body {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        opacity: 0;
      }
      .olga-collapsible-body.open {
        max-height: 600px;
        opacity: 1;
      }

      /* ========== MOBILE PREVIEW OPTIMIZATION ========== */
      @media (max-width: 600px) {
        .olga-preview-box {
          height: 340px !important;
          padding: 22px !important;
        }
        .olga-preview-card {
          padding: 14px;
        }
      }
      @media (max-width: 400px) {
        .olga-preview-box {
          height: 380px !important;
          padding: 18px !important;
        }
      }

      /* ========== REDUCED MOTION ========== */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
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
        <div class="olga-collapsible-header" id="olga_glass_toggle" role="button" aria-expanded="false" tabindex="0">
          Cam Seçimi
          <span class="olga-collapsible-badge" id="olga_glass_badge">Cam Yok</span>
          <span class="olga-collapsible-chevron"><svg viewBox="0 0 12 12"><polyline points="2,4 6,8 10,4"/></svg></span>
        </div>
        <div class="olga-collapsible-body" id="olga_glass_collapse">
          <div class="olga-grid" id="olga_glass_grid">${glassHTML}</div>
        </div>

        <div style="height:12px"></div>

        <div class="olga-title">Paspartu Seçimi</div>

        <!-- Tek/Çift Paspartu Toggle -->
        <div class="olga-mat-mode" style="display:flex; gap:8px; margin-bottom:10px;">
          <div class="olga-chip selected" data-mat-mode="single" style="flex:1; text-align:center;">
            <b>Tek Paspartu</b>
            <small>Standart tek katman</small>
          </div>
          <div class="olga-chip" data-mat-mode="double" style="flex:1; text-align:center;">
            <b>Çift Paspartu</b>
            <small>Dış + Alt katman</small>
          </div>
        </div>

        <!-- TEK PASPARTU veya ÇİFT'te DIŞ PASPARTU (üstte görünen, kalın) -->
        <div class="olga-mat-layer" id="olga_mat_layer1">
          <div class="olga-title" style="font-size:13px;"><span id="olga_mat1_title">Paspartu Türü</span></div>
          <select id="olga_mat_type" class="olga-select">${matOptions}</select>

          <div id="olga_mat_controls" style="display:none; margin-top:10px">
            <div class="olga-title" style="margin-top:8px">Paspartu Kenarları (mm)</div>
            <div class="olga-row">
              <div class="olga-col"><label>Üst</label><input type="number" id="olga_mat_top" value="50" min="0"></div>
              <div class="olga-col"><label>Alt</label><input type="number" id="olga_mat_bottom" value="50" min="0"></div>
              <div class="olga-col"><label>Sol</label><input type="number" id="olga_mat_left" value="50" min="0"></div>
              <div class="olga-col"><label>Sağ</label><input type="number" id="olga_mat_right" value="50" min="0"></div>
            </div>

            <div class="olga-title" style="margin-top:12px"><span id="olga_mat1_color_title">Paspartu Rengi</span></div>
            <div class="olga-palette-wrap">
              <div class="olga-palette" id="olga_mat_palette"></div>
            </div>
          </div>
        </div>

        <!-- ÇİFT PASPARTU: İÇ PASPARTU (altta görünen ince şerit) -->
        <div class="olga-mat-layer" id="olga_mat_layer2" style="display:none; margin-top:14px; padding-top:14px; border-top:2px dashed #e7e1da;">
          <div class="olga-title" style="font-size:13px;">İç Paspartu Türü</div>

          <select id="olga_mat2_type" class="olga-select">${matOptions}</select>

          <div id="olga_mat2_controls" style="display:none; margin-top:10px">
            <!-- Alt Montaj Genişliği -->
            <div class="olga-mounting-wrap" style="margin-bottom:12px; padding:12px; background:linear-gradient(135deg,#f8f6f4,#f0ebe6); border-radius:10px; border:1px solid #e7e1da;">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <label style="font-size:13px; font-weight:600; color:#2b241b; white-space:nowrap;">Alt Montaj Genişliği:</label>
                <input type="number" id="olga_mounting_width" value="5" min="1" max="30" style="width:65px; padding:8px 10px; border:1px solid #d8cfc6; border-radius:8px; font-size:14px; font-weight:600; text-align:center;">
                <span style="font-size:12px; color:#6b6259;">mm</span>
                <span class="cc-info-icon" data-tooltip="İç paspartunun görünen kenar kalınlığı." style="margin-left:auto;">i</span>
              </div>
            </div>

            <div class="olga-title" style="margin-top:12px">İç Paspartu Rengi</div>
            <div class="olga-palette-wrap">
              <div class="olga-palette" id="olga_mat2_palette"></div>
            </div>
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
          <div class="olga-frame-wrapper" id="olga_frame_wrapper">
            <!-- Gerçek çerçeve görseli (background overlay) -->
            <div class="olga-frame-image" id="olga_frame_image" style="display:none;"></div>
            <!-- Fallback çerçeve (görsel yoksa) -->
            <div class="olga-frame" id="olga_frame">
              <!-- Dış Paspartu -->
              <div class="olga-mat-outer" id="olga_mat_outer">
                <!-- 45° Bevel - Dış paspartu kesimi -->
                <div class="olga-bevel-outer" id="olga_bevel_outer">
                  <!-- TEK paspartu için eser -->
                  <div class="olga-art-single" id="olga_art_single"></div>
                  <!-- ÇİFT paspartu için iç katman -->
                  <div class="olga-mat-inner" id="olga_mat_inner" style="display:none;">
                    <!-- 45° Bevel - İç paspartu kesimi -->
                    <div class="olga-bevel-inner" id="olga_bevel_inner">
                      <!-- Eser -->
                      <div class="olga-art" id="olga_art"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="olga-glass" id="olga_glass" style="display:none"></div>
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

  // Generic palette render function - layer: 1 veya 2
  function renderMatPaletteGeneric(matTypePriceM2, layer = 1) {
    const paletteId = layer === 1 ? "olga_mat_palette" : "olga_mat2_palette";
    const palette = document.getElementById(paletteId);
    if (!palette) return;

    palette.innerHTML = "";

    const list = PASPARTU_COLORS[matTypePriceM2] || [];
    if (!list.length) {
      palette.innerHTML = `<div style="grid-column:1/-1;font-size:12px;opacity:.75" role="alert">Bu paspartu türü için renk listesi bulunamadı.</div>`;
      return;
    }

    list.forEach(([code, hex], index) => {
      const item = document.createElement("div");
      item.className = "olga-color-item";

      const box = document.createElement("div");
      box.className = "olga-color";
      box.style.background = hex;
      box.dataset.code = code;
      box.dataset.hex = hex;
      box.dataset.layer = layer;
      box.title = code;

      // Accessibility attributes
      box.setAttribute("role", "option");
      box.setAttribute("tabindex", "0");
      box.setAttribute("aria-label", `Renk kodu: ${code}`);
      box.setAttribute("aria-selected", "false");

      // Metallic kutu with premium gradients
      if (code === "W232") {
        box.style.background = "linear-gradient(135deg,#fff0b8,#d4af37,#fff7d6,#b8860b)";
        box.setAttribute("aria-label", `Altın renk, kod: ${code}`);
      }
      if (code === "W233") {
        box.style.background = "linear-gradient(135deg,#ffffff,#cfcfcf,#f5f5f5,#9a9a9a)";
        box.setAttribute("aria-label", `Gümüş renk, kod: ${code}`);
      }

      const lbl = document.createElement("div");
      lbl.className = "olga-code";
      lbl.textContent = code;
      lbl.id = `olga-color-label-${layer}-${index}`;
      box.setAttribute("aria-labelledby", lbl.id);

      item.appendChild(box);
      item.appendChild(lbl);
      palette.appendChild(item);
    });

    const first = palette.querySelector(".olga-color");
    if (first) {
      palette.querySelectorAll(".olga-color").forEach(x => {
        x.classList.remove("selected");
        x.setAttribute("aria-selected", "false");
      });
      first.classList.add("selected");
      first.setAttribute("aria-selected", "true");

      if (layer === 1) {
        STATE.matColorCode = first.dataset.code || "-";
        STATE.matColorHex = first.dataset.hex || "#ffffff";
      } else {
        STATE.mat2ColorCode = first.dataset.code || "-";
        STATE.mat2ColorHex = first.dataset.hex || "#ffffff";
      }
    }
  }

  // Backward compatible wrapper
  function renderMatPalette(matTypePriceM2) {
    renderMatPaletteGeneric(matTypePriceM2, 1);
  }

  // 2. katman için palette render
  function renderMat2Palette(matTypePriceM2) {
    renderMatPaletteGeneric(matTypePriceM2, 2);
  }

  // Debounced calculate for performance
  const debouncedCalculate = debounce(calculate, 150);

  function bindExtraUIEvents() {
    const glassGrid = document.getElementById("olga_glass_grid");
    const matTypeEl = document.getElementById("olga_mat_type");
    const matControls = document.getElementById("olga_mat_controls");
    const paletteWrap = document.getElementById("olga_mat_palette");

    // ========== TEK/ÇİFT PASPARTU TOGGLE ==========
    const matModeWrap = document.querySelector(".olga-mat-mode");
    if (matModeWrap && !matModeWrap.__bound) {
      matModeWrap.__bound = true;

      matModeWrap.addEventListener("click", (e) => {
        const chip = e.target.closest(".olga-chip");
        if (!chip) return;

        createRipple(e, chip);

        matModeWrap.querySelectorAll(".olga-chip").forEach(x => x.classList.remove("selected"));
        chip.classList.add("selected");

        const mode = chip.dataset.matMode;
        STATE.isDoubleMat = (mode === "double");

        const layer2 = document.getElementById("olga_mat_layer2");
        const mat1Title = document.getElementById("olga_mat1_title");

        const mat1ColorTitle = document.getElementById("olga_mat1_color_title");

        if (STATE.isDoubleMat) {
          if (layer2) layer2.style.display = "block";
          if (mat1Title) mat1Title.textContent = "Dış Paspartu Türü";
          if (mat1ColorTitle) mat1ColorTitle.textContent = "Dış Paspartu Rengi";
          announceToSR("Çift paspartu seçildi");
        } else {
          if (layer2) layer2.style.display = "none";
          if (mat1Title) mat1Title.textContent = "Paspartu Türü";
          if (mat1ColorTitle) mat1ColorTitle.textContent = "Paspartu Rengi";
          announceToSR("Tek paspartu seçildi");
        }

        calculate();
      });
    }

    // ========== ALT MONTAJ GENİŞLİĞİ ==========
    const mountingWidthEl = document.getElementById("olga_mounting_width");
    if (mountingWidthEl && !mountingWidthEl.__bound) {
      mountingWidthEl.__bound = true;
      mountingWidthEl.setAttribute("aria-label", "Alt montaj genişliği (mm)");
      mountingWidthEl.addEventListener("input", debouncedCalculate);
      mountingWidthEl.addEventListener("change", () => {
        STATE.mountingWidth = safeParseFloat(mountingWidthEl.value, 5);
        calculate();
      });
    }

    // ========== 2. KATMAN (DIŞ PASPARTU) ==========
    const mat2TypeEl = document.getElementById("olga_mat2_type");
    const mat2Controls = document.getElementById("olga_mat2_controls");
    const palette2Wrap = document.getElementById("olga_mat2_palette");

    if (mat2TypeEl && !mat2TypeEl.__bound) {
      mat2TypeEl.__bound = true;
      mat2TypeEl.setAttribute("aria-label", "Dış paspartu türü seçin");

      mat2TypeEl.addEventListener("change", () => {
        const v = safeParseFloat(mat2TypeEl.value, 0);
        STATE.mat2TypePriceM2 = v;
        STATE.mat2TypeLabel = MAT_TYPES.find(x => x.value === v)?.label || "Paspartu";

        if (mat2Controls) {
          mat2Controls.style.display = v > 0 ? "block" : "none";
        }

        const def = v > 0 ? 30 : 0;
        if (v > 0) renderMat2Palette(v);
        announceToSR(`Dış paspartu: ${STATE.mat2TypeLabel} seçildi`);
        calculate();
      });
    }

    // 2. katman palette event
    if (palette2Wrap && !palette2Wrap.__bound) {
      palette2Wrap.__bound = true;
      palette2Wrap.setAttribute("role", "listbox");
      palette2Wrap.setAttribute("aria-label", "Dış paspartu renkleri");

      palette2Wrap.addEventListener("click", (e) => {
        const c = e.target.closest(".olga-color");
        if (!c) return;

        palette2Wrap.querySelectorAll(".olga-color").forEach(x => {
          x.classList.remove("selected");
          x.setAttribute("aria-selected", "false");
        });
        c.classList.add("selected");
        c.setAttribute("aria-selected", "true");

        STATE.mat2ColorCode = c.dataset.code || "-";
        STATE.mat2ColorHex = c.dataset.hex || "#ffffff";

        announceToSR(`Dış paspartu rengi: ${STATE.mat2ColorCode} seçildi`);
        calculate();
      });

      palette2Wrap.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const color = e.target.closest(".olga-color");
          if (color) color.click();
        }
      });
    }

    if (glassGrid && !glassGrid.__bound) {
      glassGrid.__bound = true;

      // Accessibility: make chips focusable
      glassGrid.querySelectorAll(".olga-chip").forEach((chip, index) => {
        chip.setAttribute("tabindex", "0");
        chip.setAttribute("role", "radio");
        chip.setAttribute("aria-checked", chip.classList.contains("selected") ? "true" : "false");
      });
      glassGrid.setAttribute("role", "radiogroup");
      glassGrid.setAttribute("aria-label", "Cam seçenekleri");

      glassGrid.addEventListener("click", (e) => {
        const chip = e.target.closest(".olga-chip");
        if (!chip) return;

        // Ripple efekti
        createRipple(e, chip);

        glassGrid.querySelectorAll(".olga-chip").forEach(x => {
          x.classList.remove("selected");
          x.setAttribute("aria-checked", "false");
        });
        chip.classList.add("selected");
        chip.setAttribute("aria-checked", "true");

        const id = chip.dataset.glass || "none";
        const price = safeParseFloat(chip.dataset.price, 0);
        const found = GLASS_OPTIONS.find(x => x.id === id);

        STATE.glassId = id;
        STATE.glassPriceM2 = price;
        STATE.glassLabel = found?.label || "Cam";

        // Badge güncelle
        const badge = document.getElementById("olga_glass_badge");
        if (badge) badge.textContent = found?.label || "Cam Yok";

        announceToSR(`${found?.label || "Cam"} seçildi`);
        calculate();
      });

      // Keyboard navigation
      glassGrid.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const chip = e.target.closest(".olga-chip");
          if (chip) chip.click();
        }
      });
    }

    // ========== CAM SEÇİMİ COLLAPSIBLE TOGGLE ==========
    const glassToggle = document.getElementById("olga_glass_toggle");
    const glassCollapse = document.getElementById("olga_glass_collapse");
    if (glassToggle && glassCollapse && !glassToggle.__bound) {
      glassToggle.__bound = true;
      const toggleGlass = () => {
        const isOpen = glassToggle.classList.toggle("open");
        glassCollapse.classList.toggle("open");
        glassToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      };
      glassToggle.addEventListener("click", toggleGlass);
      glassToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleGlass();
        }
      });
    }

    if (matTypeEl && !matTypeEl.__bound) {
      matTypeEl.__bound = true;
      matTypeEl.setAttribute("aria-label", "Paspartu türü seçin");

      matTypeEl.addEventListener("change", () => {
        const v = safeParseFloat(matTypeEl.value, 0);
        STATE.matTypePriceM2 = v;
        STATE.matTypeLabel = MAT_TYPES.find(x => x.value === v)?.label || "Paspartu";

        if (matControls) {
          matControls.style.display = v > 0 ? "block" : "none";
          matControls.setAttribute("aria-hidden", v > 0 ? "false" : "true");
        }

        const def = v > 0 ? 50 : 0;
        ["olga_mat_top","olga_mat_bottom","olga_mat_left","olga_mat_right"].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.value = def;
        });

        if (v > 0) renderMatPalette(v);
        announceToSR(`${STATE.matTypeLabel} paspartu seçildi`);
        calculate();
      });

      STATE.matTypePriceM2 = safeParseFloat(matTypeEl.value, 0);
      STATE.matTypeLabel = MAT_TYPES.find(x => x.value === STATE.matTypePriceM2)?.label || "Paspartu";
      if (matControls) {
        matControls.style.display = STATE.matTypePriceM2 > 0 ? "block" : "none";
        matControls.setAttribute("aria-hidden", STATE.matTypePriceM2 > 0 ? "false" : "true");
      }
      if (STATE.matTypePriceM2 > 0) renderMatPalette(STATE.matTypePriceM2);
    }

    ["olga_mat_top","olga_mat_bottom","olga_mat_left","olga_mat_right"].forEach(id => {
      const el = document.getElementById(id);
      if (!el || el.__bound) return;
      el.__bound = true;
      el.setAttribute("aria-label", id.replace("olga_mat_", "Paspartu ") + " kenarı (mm)");

      // Use debounced calculate for better performance
      el.addEventListener("input", debouncedCalculate);
      el.addEventListener("change", calculate);
    });

    if (paletteWrap && !paletteWrap.__bound) {
      paletteWrap.__bound = true;
      paletteWrap.setAttribute("role", "listbox");
      paletteWrap.setAttribute("aria-label", "Paspartu renkleri");

      paletteWrap.addEventListener("click", (e) => {
        const c = e.target.closest(".olga-color");
        if (!c) return;

        paletteWrap.querySelectorAll(".olga-color").forEach(x => {
          x.classList.remove("selected");
          x.setAttribute("aria-selected", "false");
        });
        c.classList.add("selected");
        c.setAttribute("aria-selected", "true");

        STATE.matColorCode = c.dataset.code || "-";
        STATE.matColorHex = c.dataset.hex || "#ffffff";

        announceToSR(`${STATE.matColorCode} renk seçildi`);
        calculate();
      });

      // Keyboard navigation for colors
      paletteWrap.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const color = e.target.closest(".olga-color");
          if (color) color.click();
        }
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
        return `
          repeating-linear-gradient(180deg, rgba(255,250,200,0.4) 0px, rgba(160,120,0,0.12) 1px, rgba(255,245,180,0.3) 2px, rgba(255,255,230,0.15) 3px, transparent 4px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, transparent 1px, rgba(255,255,200,0.08) 2px, transparent 3px),
          #d4af37
        `;
      }
      if (code === "W233") {
        return `
          repeating-linear-gradient(180deg, rgba(255,255,255,0.45) 0px, rgba(140,140,140,0.15) 1px, rgba(250,250,250,0.35) 2px, rgba(255,255,255,0.2) 3px, transparent 4px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0px, transparent 1px, rgba(230,230,230,0.1) 2px, transparent 3px),
          #c8c8c8
        `;
      }
      return hex;
    }

    // ✅ Kadife dokusu - kumaş mikro-doku (radial yok → elementler arası pürüzsüz geçiş)
    if (type === 3000) {
      return `
        repeating-linear-gradient(90deg, rgba(0,0,0,.03) 0px, rgba(255,255,255,.02) 1px, rgba(0,0,0,.02) 2px, transparent 3px),
        repeating-linear-gradient(0deg, rgba(0,0,0,.02) 0px, rgba(255,255,255,.015) 1px, transparent 2px),
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

  // 2. katman için arka plan
  function getMat2PreviewBackground() {
    const type = STATE.mat2TypePriceM2 || 0;
    const code = (STATE.mat2ColorCode || "").toUpperCase();
    const hex = STATE.mat2ColorHex || "#ffffff";

    if (type === 1700) {
      if (code === "W232") return "linear-gradient(135deg,#fff8d9 0%,#f4d98a 18%,#d4af37 42%,#fff2bf 55%,#b8860b 78%,#fff6cf 100%)";
      if (code === "W233") return "linear-gradient(135deg,#ffffff 0%,#e6e6e6 18%,#bfbfbf 42%,#f8f8f8 55%,#9b9b9b 78%,#ffffff 100%)";
      return hex;
    }

    // Kadife dokusu - premium kumaş görünümü (renk korunur)
    if (type === 3000) {
      return `repeating-linear-gradient(90deg, rgba(0,0,0,.03) 0px, rgba(255,255,255,.02) 1px, rgba(0,0,0,.02) 2px, transparent 3px),
              repeating-linear-gradient(0deg, rgba(0,0,0,.02) 0px, rgba(255,255,255,.015) 1px, transparent 2px),
              radial-gradient(ellipse at 25% 25%, rgba(255,255,255,.08), transparent 60%),
              radial-gradient(ellipse at 75% 75%, rgba(0,0,0,.1), transparent 60%),
              ${hex}`;
    }

    if (type === 1250) return hex;
    return "#ffffff";
  }

  function updateLivePreview() {
    const frame = document.getElementById("olga_frame");
    const matOuter = document.getElementById("olga_mat_outer");
    const bevelOuter = document.getElementById("olga_bevel_outer");
    const matInner = document.getElementById("olga_mat_inner");
    const bevelInner = document.getElementById("olga_bevel_inner");
    const art = document.getElementById("olga_art");
    const artSingle = document.getElementById("olga_art_single");
    const glass = document.getElementById("olga_glass");
    const label = document.getElementById("olga_preview_label");
    const note = document.getElementById("olga_preview_note");
    const box = document.querySelector("#olga_preview_card .olga-preview-box");
    const frameWrapper = document.getElementById("olga_frame_wrapper");
    const frameImage = document.getElementById("olga_frame_image");

    if (!frame || !matOuter || !bevelOuter || !box) return;

    // Gerçek çerçeve görseli kontrolü
    const frameData = getFrameData();
    const realFrameUrl = frameData ? frameData.url : null;
    const hasRealFrame = !!realFrameUrl;

    const boxW = box.clientWidth;
    const boxH = box.clientHeight;

    // Çift paspartu modunu kontrol et
    const isDouble = STATE.isDoubleMat && STATE.mat2TypePriceM2 > 0;

    // 45° kesim (bevel) kalınlığı
    const bevelPx = 2;

    // Görünürlük ayarları (grid layout)
    if (matInner) matInner.style.display = isDouble ? "grid" : "none";
    if (bevelInner) bevelInner.style.display = isDouble ? "grid" : "none";
    if (artSingle) artSingle.style.display = isDouble ? "none" : "block";
    if (art) art.style.display = isDouble ? "block" : "none";

    // Aktif eser alanı
    const activeArt = isDouble ? art : artSingle;

    // Varsayılan durum (ölçü girilmemiş)
    if (!(STATE.artWMM > 0 && STATE.artHMM > 0) || boxW < 50 || boxH < 50) {
      const defaultBorderPx = hasRealFrame ? Math.max(15, Math.round(35 * FRAME_BORDER_SCALE)) : 15;
      frame.style.width = "200px";
      frame.style.height = "200px";

      // Gerçek çerçeve - border-image doğrudan frame'e
      if (hasRealFrame) {
        frameWrapper.classList.add("has-real-frame");
        frame.style.padding = "0";
        frame.style.borderWidth = defaultBorderPx + "px";
        frame.style.borderImageSource = `url('${realFrameUrl}')`;
        frame.style.borderImageSlice = FRAME_SLICE;
      } else {
        frameWrapper.classList.remove("has-real-frame");
        frame.style.padding = defaultBorderPx + "px";
        frame.style.borderWidth = "0";
        frame.style.borderImageSource = "none";
      }
      if (frameImage) frameImage.style.display = "none";

      matOuter.style.padding = "15px";
      matOuter.style.background = "#ffffff";
      bevelOuter.style.padding = `${bevelPx}px`;
      bevelOuter.style.background = "#ffffff";
      // Fallback modda (gerçek çerçeve yok) background siyah kalmalı ki çerçeve görünsün
      if (hasRealFrame) {
        frame.style.background = "#ffffff";
      } else {
        frame.style.background = "";  // CSS default (#000000) kullanılsın
      }

      if (activeArt) {
        activeArt.style.background = ART_BG_TEXTURE;
      }

      if (glass) glass.style.display = "none";
      if (label) label.textContent = "-";
      if (note) note.textContent = "Ölçü girince canlı olarak güncellenir.";
      return;
    }

    // Boyut hesaplamaları
    const safePad = 6;
    const availW = Math.max(90, boxW - safePad * 2);
    const availH = Math.max(90, boxH - safePad * 2);

    const totalW = Math.max(STATE.totalWMM, STATE.artWMM);
    const totalH = Math.max(STATE.totalHMM, STATE.artHMM);

    // Çerçeve kalınlığı - gerçek çerçeve varsa modelin borderScale'ine göre orantılı
    const baseFrameBorderPx = Math.max(22, Math.min(48, Math.round(Math.min(availW, availH) * 0.16)));
    const frameBorderPx = hasRealFrame ? Math.max(8, Math.round(baseFrameBorderPx * FRAME_BORDER_SCALE)) : baseFrameBorderPx;

    const innerW = Math.max(40, availW - frameBorderPx * 2);
    const innerH = Math.max(40, availH - frameBorderPx * 2);

    const scale = Math.min(innerW / totalW, innerH / totalH);

    const contentW = Math.max(30, totalW * scale);
    const contentH = Math.max(30, totalH * scale);

    frame.style.width = `${contentW + frameBorderPx * 2}px`;
    frame.style.height = `${contentH + frameBorderPx * 2}px`;

    // ========== ÇERÇEVE DOKUSU (border-image doğrudan .olga-frame'e) ==========
    // border-image frame elementine uygulanınca iç kenarı ile içerik alanı
    // (paspartu/eser) arasında boşluk oluşması IMKANSIZ olur.
    if (hasRealFrame) {
      frameWrapper.classList.add("has-real-frame");
      // border olarak uygula (padding değil) - doku doğrudan border alanına çizilir
      frame.style.padding = "0";
      frame.style.borderWidth = frameBorderPx + "px";
      frame.style.borderImageSource = `url('${realFrameUrl}')`;
      frame.style.borderImageSlice = FRAME_SLICE;
    } else {
      frameWrapper.classList.remove("has-real-frame");
      // Fallback: düz renk çerçeve - padding ile
      frame.style.padding = frameBorderPx + "px";
      frame.style.borderWidth = "0";
      frame.style.borderImageSource = "none";
    }
    // frame-image elementini artık kullanmıyoruz
    if (frameImage) frameImage.style.display = "none";

    // Paspartu kenar ölçüleri (px) - minimum 8px görünür olsun
    const minMatPx = 8; // Minimum paspartu kalınlığı (px)
    const rawTop = (STATE.matTop || 0) * scale;
    const rawBottom = (STATE.matBottom || 0) * scale;
    const rawLeft = (STATE.matLeft || 0) * scale;
    const rawRight = (STATE.matRight || 0) * scale;

    // Paspartu varsa minimum kalınlık uygula
    const hasMatEdges = STATE.matTypePriceM2 > 0 && (STATE.matTop > 0 || STATE.matBottom > 0 || STATE.matLeft > 0 || STATE.matRight > 0);
    const cTop = hasMatEdges && STATE.matTop > 0 ? Math.max(minMatPx, Math.min(rawTop, (contentH - 20) / 2)) : 0;
    const cBottom = hasMatEdges && STATE.matBottom > 0 ? Math.max(minMatPx, Math.min(rawBottom, (contentH - 20) / 2)) : 0;
    const cLeft = hasMatEdges && STATE.matLeft > 0 ? Math.max(minMatPx, Math.min(rawLeft, (contentW - 20) / 2)) : 0;
    const cRight = hasMatEdges && STATE.matRight > 0 ? Math.max(minMatPx, Math.min(rawRight, (contentW - 20) / 2)) : 0;

    // ========== ÇİFT PASPARTU ==========
    if (isDouble) {
      // İç paspartu minimum 5px görünür olsun
      const minMountPx = 5;
      const mountingPx = Math.max(minMountPx, (STATE.mountingWidth || 5) * scale);

      // DIŞ PASPARTU - kalın renkli alan
      // Görünür kalınlık = kenarlar - montaj - bevel (minimum 6px)
      const minOuterPx = 6;
      const outerTop = Math.max(minOuterPx, cTop - mountingPx - bevelPx);
      const outerRight = Math.max(minOuterPx, cRight - mountingPx - bevelPx);
      const outerBottom = Math.max(minOuterPx, cBottom - mountingPx - bevelPx);
      const outerLeft = Math.max(minOuterPx, cLeft - mountingPx - bevelPx);

      matOuter.style.padding = `${outerTop}px ${outerRight}px ${outerBottom}px ${outerLeft}px`;
      matOuter.style.background = getMatPreviewBackground();

      // BEVEL OUTER - 45° beyaz kesim (dış paspartunun iç kenarı)
      bevelOuter.style.padding = `${bevelPx}px`;
      bevelOuter.style.background = "#ffffff";

      // İÇ PASPARTU - ince şerit (montaj genişliği - bevel, minimum 3px)
      if (matInner) {
        matInner.style.padding = `${Math.max(3, mountingPx - bevelPx)}px`;
        matInner.style.background = getMat2PreviewBackground();
      }

      // BEVEL INNER - 45° beyaz kesim (iç paspartunun iç kenarı)
      if (bevelInner) {
        bevelInner.style.padding = `${bevelPx}px`;
        bevelInner.style.background = "#ffffff";
      }

    } else {
      // ========== TEK PASPARTU ==========
      if (STATE.matTypePriceM2 > 0) {
        // Paspartu var
        matOuter.style.padding = `${Math.max(0, cTop - bevelPx)}px ${Math.max(0, cRight - bevelPx)}px ${Math.max(0, cBottom - bevelPx)}px ${Math.max(0, cLeft - bevelPx)}px`;
        matOuter.style.background = getMatPreviewBackground();

        // BEVEL OUTER - 45° beyaz kesim
        bevelOuter.style.padding = `${bevelPx}px`;
        bevelOuter.style.background = "#ffffff";
      } else {
        // Paspartu yok - tüm ara katmanları transparent yap
        matOuter.style.padding = "0px";
        matOuter.style.background = "transparent";
        bevelOuter.style.padding = "0px";
        bevelOuter.style.background = "transparent";
      }
    }

    // Eser alanı
    if (activeArt) {
      activeArt.style.background = ART_BG_TEXTURE;
    }

    // Frame arka planını SADECE gerçek çerçeve varken paspartu dokusuyla doldur
    // Kadife/altın/gümüş seçilince frame dolgusu da aynı gradient/texture olur
    if (hasRealFrame) {
      if (hasMatEdges) {
        frame.style.background = getMatPreviewBackground();
      } else {
        frame.style.background = "#d0d0d0";
      }
    } else {
      frame.style.background = "";  // CSS default (#000000) kullanılsın
    }

    // Cam efekti
    if (glass) {
      glass.style.display = (STATE.glassId && STATE.glassId !== "none") ? "block" : "none";
      glass.style.opacity = (STATE.glassId === "museum") ? "0.22" : "0.14";
    }

    // Etiketler
    if (label) label.textContent = `${STATE.totalWMM}×${STATE.totalHMM} mm`;
    if (note) {
      let matTxt = "";
      if (STATE.matTypePriceM2 > 0) {
        if (isDouble) {
          matTxt = `Dış: ${STATE.matTypeLabel} (${STATE.matColorCode}) | İç: ${STATE.mat2TypeLabel} (${STATE.mat2ColorCode})`;
          if (STATE.mountingWidth > 0) matTxt += ` | ${STATE.mountingWidth}mm`;
        } else {
          matTxt = `Paspartu: ${STATE.matTypeLabel} (${STATE.matColorCode})`;
        }
      } else {
        matTxt = "Paspartu: Yok";
      }

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

    const w = safeParseFloat(wEl.value, 0);
    const h = safeParseFloat(hEl.value, 0);
    const unit = uEl.value || "cm";
    const qty = Math.max(1, safeParseInt(qEl.value, 1));

    // Validation with visual feedback
    const wMM = getMM(w, unit);
    const hMM = getMM(h, unit);

    if (w > 0 && wMM < 15) {
      showInputError(wEl, "Minimum 15mm gerekli");
    }
    if (h > 0 && hMM < 15) {
      showInputError(hEl, "Minimum 15mm gerekli");
    }
    if (wMM > 2900) {
      showInputError(wEl, "Maximum 2900mm");
    }
    if (hMM > 2900) {
      showInputError(hEl, "Maximum 2900mm");
    }

    const tolAdded = !(fittingEl?.checked);
    const tolMM = tolAdded ? TOL_MM : 0;

    const artWMM = getMM(w, unit);
    const artHMM = getMM(h, unit);

    const cutWMM = artWMM + tolMM;
    const cutHMM = artHMM + tolMM;

    // ========== 1. KATMAN (İÇ PASPARTU) ==========
    const matTypeEl = document.getElementById("olga_mat_type");
    const matTypePriceM2 = matTypeEl ? (parseFloat(matTypeEl.value || "0") || 0) : 0;
    const matTypeLabel = MAT_TYPES.find(x => x.value === matTypePriceM2)?.label || "Paspartu";

    const hasMat = matTypePriceM2 > 0;

    const matTop = hasMat ? (parseFloat(document.getElementById("olga_mat_top")?.value || "0") || 0) : 0;
    const matBottom = hasMat ? (parseFloat(document.getElementById("olga_mat_bottom")?.value || "0") || 0) : 0;
    const matLeft = hasMat ? (parseFloat(document.getElementById("olga_mat_left")?.value || "0") || 0) : 0;
    const matRight = hasMat ? (parseFloat(document.getElementById("olga_mat_right")?.value || "0") || 0) : 0;

    // ========== 2. KATMAN (DIŞ PASPARTU) ==========
    const mat2TypeEl = document.getElementById("olga_mat2_type");
    const mat2TypePriceM2 = (STATE.isDoubleMat && mat2TypeEl) ? (parseFloat(mat2TypeEl.value || "0") || 0) : 0;
    const mat2TypeLabel = MAT_TYPES.find(x => x.value === mat2TypePriceM2)?.label || "Paspartu";

    const hasMat2 = STATE.isDoubleMat && mat2TypePriceM2 > 0;

    // Alt montaj genişliği (dış paspartunun tüm kenarlarına uygulanır)
    const mountingWidthEl = document.getElementById("olga_mounting_width");
    const mountingWidth = hasMat2 ? (parseFloat(mountingWidthEl?.value || "5") || 5) : 0;
    STATE.mountingWidth = mountingWidth;

    // Toplam ölçü: Sanat eseri + İç paspartu + Dış paspartu (mounting width * 2 her yön için)
    const totalWMM = artWMM + matLeft + matRight + (hasMat2 ? mountingWidth * 2 : 0);
    const totalHMM = artHMM + matTop + matBottom + (hasMat2 ? mountingWidth * 2 : 0);

    // İç paspartu dahil ölçü (2. katman öncesi)
    const innerMatWMM = artWMM + matLeft + matRight;
    const innerMatHMM = artHMM + matTop + matBottom;

    const areaM2 = (totalWMM / 1000) * (totalHMM / 1000);

    const perimeterM = (2 * (totalWMM + totalHMM)) / 1000;
    const totalMeter = perimeterM + FIRE_M;

    const unitPrice = getUnitMeterPrice_Ignore290();

    const frameCostOne = (unitPrice > 0 && areaM2 > 0) ? (totalMeter * unitPrice) : 0;

    // 1. katman (dış paspartu) maliyeti - dış alan üzerinden
    const matCostOne = hasMat ? (areaM2 * matTypePriceM2) : 0;

    // 2. katman (iç paspartu) maliyeti - dış alan üzerinden
    // Çift paspartuda her iki karton da dış alan üzerinden hesaplanır = x2
    const mat2CostOne = hasMat2 ? (areaM2 * mat2TypePriceM2) : 0;

    const glassCostOne = areaM2 * (STATE.glassPriceM2 || 0);

    const totalOne = frameCostOne + matCostOne + mat2CostOne + glassCostOne;
    const total = totalOne * qty;

    // 2. katman state güncelle
    STATE.mat2TypePriceM2 = mat2TypePriceM2;
    STATE.mat2TypeLabel = mat2TypeLabel;
    STATE.mat2Cost = mat2CostOne * qty;

    STATE.unitPrice = unitPrice;
    STATE.totalPrice = total;
    STATE.frameCost = frameCostOne * qty;
    STATE.matCost = (matCostOne + mat2CostOne) * qty; // Toplam paspartu maliyeti
    STATE.glassCost = glassCostOne * qty;

    STATE.artWMM = artWMM;
    STATE.artHMM = artHMM;
    STATE.cutWMM = cutWMM;
    STATE.cutHMM = cutHMM;

    STATE.totalWMM = totalWMM;
    STATE.totalHMM = totalHMM;

    // İç paspartu dahil ölçü (önizleme için)
    STATE.innerMatWMM = innerMatWMM;
    STATE.innerMatHMM = innerMatHMM;

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

    // Paspartu bilgisi oluştur
    let paspartuInfo = "";
    if (STATE.matTypePriceM2 > 0) {
      const kenarBilgisi = `Sol: ${STATE.matLeft}mm, Sağ: ${STATE.matRight}mm, Üst: ${STATE.matTop}mm, Alt: ${STATE.matBottom}mm`;
      if (STATE.isDoubleMat && STATE.mat2TypePriceM2 > 0) {
        paspartuInfo = `Dış Paspartu: ${STATE.matTypeLabel} (${STATE.matColorCode || "-"})`;
        paspartuInfo += `\nKenar Kalınlıkları: ${kenarBilgisi}`;
        paspartuInfo += `\nİç Paspartu: ${STATE.mat2TypeLabel} (${STATE.mat2ColorCode || "-"})`;
        paspartuInfo += `\nAlt Montaj Genişliği: ${STATE.mountingWidth || 5}mm`;
      } else {
        paspartuInfo = `Paspartu: ${STATE.matTypeLabel} (${STATE.matColorCode || "-"})`;
        paspartuInfo += `\nKenar Kalınlıkları: ${kenarBilgisi}`;
      }
    } else {
      paspartuInfo = "Paspartu: Yok";
    }

    // Çift paspartu bilgisi zaten yukarıda eklendi
    let mat2Info = "";

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
      paspartuInfo + mat2Info,
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

    // Find PDF button and show loading state
    const pdfBtn = document.querySelector('button[onclick="createPDF()"]');
    const originalText = pdfBtn?.textContent || "📄 PDF İndir";

    if (pdfBtn) {
      pdfBtn.disabled = true;
      pdfBtn.innerHTML = `<span class="olga-spinner" style="display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:olga-spin 0.8s linear infinite;vertical-align:middle;margin-right:8px;"></span> PDF Hazırlanıyor...`;
      setLoading(pdfBtn, true);
    }

    let jsPDF;
    try {
      jsPDF = await ensureJsPDF();
    } catch (error) {
      console.error("jsPDF yükleme hatası:", error);
      if (pdfBtn) {
        pdfBtn.disabled = false;
        pdfBtn.textContent = originalText;
        setLoading(pdfBtn, false);
      }
      // Show user-friendly error
      announceToSR("PDF oluşturulamadı");
      alert("PDF kütüphanesi yüklenemedi! Lütfen internet bağlantınızı kontrol edin.");
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

    // Paspartu Bilgileri
    if (STATE.matTypePriceM2 > 0) {
      if (STATE.isDoubleMat && STATE.mat2TypePriceM2 > 0) {
        // Çift Paspartu
        pdf.text(fixText(`Dis Paspartu      : ${STATE.matTypeLabel} (${STATE.matColorCode || "-"})`), 15, y); y += 9;
        pdf.text(fixText(`Kenarlar (mm)     : Sol ${STATE.matLeft}, Sag ${STATE.matRight}, Ust ${STATE.matTop}, Alt ${STATE.matBottom}`), 15, y); y += 9;
        pdf.text(fixText(`Ic Paspartu       : ${STATE.mat2TypeLabel} (${STATE.mat2ColorCode || "-"})`), 15, y); y += 9;
        pdf.text(fixText(`Alt Montaj Gen.   : ${STATE.mountingWidth || 5} mm`), 15, y); y += 10;
      } else {
        // Tek Paspartu
        pdf.text(fixText(`Paspartu          : ${STATE.matTypeLabel} (${STATE.matColorCode || "-"})`), 15, y); y += 9;
        pdf.text(fixText(`Kenarlar (mm)     : Sol ${STATE.matLeft}, Sag ${STATE.matRight}, Ust ${STATE.matTop}, Alt ${STATE.matBottom}`), 15, y); y += 10;
      }
    } else {
      pdf.text(fixText(`Paspartu          : Yok`), 15, y); y += 10;
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

    // Reset button state
    if (pdfBtn) {
      pdfBtn.disabled = false;
      pdfBtn.textContent = originalText;
      setLoading(pdfBtn, false);
    }

    announceToSR("PDF başarıyla indirildi");
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
    injectAccessibilityEnhancements();

    ["product_width", "product_height", "product_unit", "product_quantity", "product_fitting"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      // Add ARIA labels
      if (id === "product_width") el.setAttribute("aria-label", "Genişlik değeri");
      if (id === "product_height") el.setAttribute("aria-label", "Yükseklik değeri");
      if (id === "product_unit") el.setAttribute("aria-label", "Ölçü birimi");
      if (id === "product_quantity") el.setAttribute("aria-label", "Çerçeve adedi");
      if (id === "product_fitting") el.setAttribute("aria-label", "Montaj toleransı eklenmesin");

      // Use debounced calculate for input, immediate for change
      el.addEventListener("input", debouncedCalculate);
      el.addEventListener("change", () => {
        calculate();
        // Show price update animation
        showPriceUpdate(document.getElementById("product_totalPrice"));
      });
    });

    // Add ripple effect to all buttons
    document.querySelectorAll(".cc-panel button, .preset-btn").forEach(btn => {
      if (btn.__rippleBound) return;
      btn.__rippleBound = true;
      btn.addEventListener("click", (e) => createRipple(e, btn));
    });

    bindPresetClicks();
    calculate();

    // Announce ready state
    announceToSR("Çerçeve hesaplayıcı hazır");
  }

  // Accessibility enhancements
  function injectAccessibilityEnhancements() {
    // Add skip link for keyboard users
    if (!document.getElementById("olga-skip-link")) {
      const skipLink = document.createElement("a");
      skipLink.id = "olga-skip-link";
      skipLink.href = "#product_width";
      skipLink.textContent = "Hesaplayıcıya atla";
      skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: rgb(${BRAND_RGB.r},${BRAND_RGB.g},${BRAND_RGB.b});
        color: white;
        padding: 8px 16px;
        z-index: 10000;
        text-decoration: none;
        border-radius: 0 0 8px 0;
        transition: top 0.3s ease;
      `;
      skipLink.addEventListener("focus", () => skipLink.style.top = "0");
      skipLink.addEventListener("blur", () => skipLink.style.top = "-40px");

      const wrapper = document.querySelector(".cc-wrapper");
      if (wrapper) wrapper.prepend(skipLink);
    }

    // Add landmark roles
    const wrapper = document.querySelector(".cc-wrapper");
    if (wrapper) wrapper.setAttribute("role", "application");

    const summaryBox = document.querySelector(".cc-summary-box");
    if (summaryBox) {
      summaryBox.setAttribute("role", "region");
      summaryBox.setAttribute("aria-label", "Hesaplama özeti");
      summaryBox.setAttribute("aria-live", "polite");
    }

    // Make info icons accessible
    document.querySelectorAll(".cc-info-icon").forEach(icon => {
      icon.setAttribute("role", "button");
      icon.setAttribute("tabindex", "0");
      icon.setAttribute("aria-label", "Bilgi: " + (icon.dataset.tooltip || ""));
    });
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
