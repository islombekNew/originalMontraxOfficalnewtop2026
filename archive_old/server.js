try {
  require("dotenv").config();
} catch {}

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { WebSocketServer } = require("ws");
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ SUPABASE_URL va SUPABASE_ANON_KEY .env da yo'q!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function hashPass(pass) {
  return await bcrypt.hash(pass + "montrax_salt_2026", 10);
}

async function verifyPass(pass, hash) {
  return await bcrypt.compare(pass + "montrax_salt_2026", hash);
}

const ADMIN_PASS = process.env.ADMIN_PASS || "montrax2026";

async function initAdmins() {
  const hashed = await hashPass(ADMIN_PASS);
  return [
    { phone: "998882162882", passHash: hashed },
    { phone: "998882552882", passHash: hashed },
  ];
}

let ADMINS = [];

(async () => {
  ADMINS = await initAdmins();
})();

// Rate limiter
const rateLimitMap = new Map();
const RATE_LIMITS = {
  "/api/login": { max: 5, windowMs: 15 * 60 * 1000 },
  "/api/contact": { max: 10, windowMs: 60 * 60 * 1000 },
  default: { max: 300, windowMs: 60 * 1000 },
};

function getRealIp(req) {
  return (
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "unknown"
  );
}

function checkRateLimit(req, pathname) {
  const ip = getRealIp(req);
  const cfg = RATE_LIMITS[pathname] || RATE_LIMITS.default;
  const key = ip + ":" + pathname;
  const now = Date.now();
  let rl = rateLimitMap.get(key);
  if (!rl || now > rl.resetAt) {
    rl = { count: 0, resetAt: now + cfg.windowMs };
    rateLimitMap.set(key, rl);
  }
  rl.count++;
  return rl.count <= cfg.max;
}

setInterval(
  () => {
    const now = Date.now();
    for (const [k, v] of rateLimitMap.entries())
      if (now > v.resetAt) rateLimitMap.delete(k);
  },
  5 * 60 * 1000,
);

const SEC_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

function sanitize(str, max = 500) {
  if (typeof str !== "string") return "";
  return str
    .trim()
    .slice(0, max)
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "");
}
function validateEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

let db = {
  sessions: {},
  messages: [],
  chats: {},
  projects: [
    {
      id: 1,
      name: "E-Commerce Platform",
      client: "Alisher T.",
      service: "Frontend",
      budget: "$1,500",
      deadline: "2025-06-01",
      status: "active",
      thumb: "🛒",
      desc: "React + Node.js asosida to'liq e-commerce yechimi",
      img: "https://picsum.photos/seed/proj1/800/400",
      url: "#",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Brand Identity Pack",
      client: "Startup X",
      service: "Dizayn",
      budget: "$800",
      deadline: "2025-05-20",
      status: "progress",
      thumb: "🎨",
      desc: "Logotip, rang palitrasi, brend qo'llanmasi",
      img: "https://picsum.photos/seed/proj2/800/400",
      url: "#",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: "SaaS Dashboard",
      client: "TechCorp",
      service: "Frontend",
      budget: "$3,200",
      deadline: "2025-07-15",
      status: "progress",
      thumb: "📊",
      desc: "Real-time analytics dashboard with chart.js",
      img: "https://picsum.photos/seed/proj3/800/400",
      url: "#",
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      name: "Logo + Motion Kit",
      client: "Maria K.",
      service: "Motion",
      budget: "$600",
      deadline: "2025-05-10",
      status: "done",
      thumb: "⚡",
      desc: "Animatsiyali logotip + brend harakat to'plami",
      img: "https://picsum.photos/seed/proj4/800/400",
      url: "#",
      createdAt: new Date().toISOString(),
    },
  ],
  orders: [
    {
      id: "ORD-001",
      client: "Alisher T.",
      service: "Frontend",
      amount: "$1,500",
      method: "Karta",
      date: "2025-04-20",
      status: "paid",
    },
    {
      id: "ORD-002",
      client: "Maria K.",
      service: "Dizayn",
      amount: "$800",
      method: "Kripto",
      date: "2025-04-18",
      status: "pending",
    },
    {
      id: "ORD-003",
      client: "TechCorp",
      service: "Full",
      amount: "$3,200",
      method: "Bank",
      date: "2025-04-15",
      status: "paid",
    },
    {
      id: "ORD-004",
      client: "Startup X",
      service: "Branding",
      amount: "$600",
      method: "Payme",
      date: "2025-04-10",
      status: "pending",
    },
  ],
  settings: {
    siteName: "MONTRAX",
    defaultLang: "uz",
    chatEnabled: true,
    siteOnline: true,
    telegramLink: "https://t.me/montrax",
    instagramLink: "https://instagram.com/montrax",
  },
  stats: { totalVisits: 1247, todayVisits: 38 },
  portfolio: [
    {
      id: 1,
      title: "E-Commerce Dashboard",
      cat: "React",
      icon: "⚡",
      bg: "linear-gradient(135deg,#0F1628,#1A2240)",
      url: "#",
      img: "https://picsum.photos/seed/port1/600/400",
      desc: "Real-time analytics admin panel",
    },
    {
      id: 2,
      title: "NEXUS Brand System",
      cat: "Brending",
      icon: "✦",
      bg: "linear-gradient(135deg,#1A0830,#7B2FFF)",
      url: "#",
      img: "https://picsum.photos/seed/port2/600/400",
      desc: "Full visual identity system",
    },
    {
      id: 3,
      title: "3D Product Viewer",
      cat: "Three.js",
      icon: "🌐",
      bg: "linear-gradient(135deg,#0A1A0A,#00FFB3)",
      url: "#",
      img: "https://picsum.photos/seed/port3/600/400",
      desc: "360 degree interactive showcase",
    },
    {
      id: 4,
      title: "Fintech App UI",
      cat: "UI/UX",
      icon: "📱",
      bg: "linear-gradient(135deg,#1A1200,#FFB800)",
      url: "#",
      img: "https://picsum.photos/seed/port4/600/400",
      desc: "Mobile banking interface design",
    },
    {
      id: 5,
      title: "SaaS Landing",
      cat: "Next.js",
      icon: "🚀",
      bg: "linear-gradient(135deg,#0A0D1A,#1A2240)",
      url: "#",
      img: "https://picsum.photos/seed/port5/600/400",
      desc: "High-conversion marketing site",
    },
    {
      id: 6,
      title: "Logo Motion Kit",
      cat: "Motion",
      icon: "🎬",
      bg: "linear-gradient(135deg,#1A0020,#FF3D8A)",
      url: "#",
      img: "https://picsum.photos/seed/port6/600/400",
      desc: "Brand animation package",
    },
  ],
};

async function loadDataFromSupabase() {
  try {
    // Load messages
    const { data: messages, error: msgError } = await supabase
      .from('messages')
      .select('*')
      .order('timestamp', { ascending: false });
    if (!msgError) db.messages = messages || [];

    // Load projects
    const { data: projects, error: projError } = await supabase
      .from('projects')
      .select('*');
    if (!projError) db.projects = projects || [];

    // Load orders
    const { data: orders, error: ordError } = await supabase
      .from('orders')
      .select('*');
    if (!ordError) db.orders = orders || [];

    // Load settings
    const { data: settings, error: setError } = await supabase
      .from('settings')
      .select('*');
    if (!setError) {
      db.settings = {};
      settings.forEach(s => db.settings[s.key] = s.value);
    }

    // Load stats
    const { data: stats, error: statError } = await supabase
      .from('stats')
      .select('*');
    if (!statError) {
      db.stats = {};
      stats.forEach(s => db.stats[s.key] = s.value);
    }

    // Load portfolio
    const { data: portfolio, error: portError } = await supabase
      .from('portfolio')
      .select('*');
    if (!portError) db.portfolio = portfolio || [];

    console.log("✅ Supabase dan ma'lumotlar yuklandi");
  } catch (e) {
    console.log("⚠️ Supabase dan ma'lumotlar yuklanmadi:", e.message);
  }
}

async function saveMessageToSupabase(msg) {
  try {
    const { error } = await supabase
      .from('messages')
      .insert(msg);
    if (error) console.log("⚠️ Xabar saqlanmadi:", error.message);
  } catch (e) {
    console.log("⚠️ Xabar saqlanmadi:", e.message);
  }
}

async function deleteMessageFromSupabase(id) {
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    if (error) console.log("⚠️ Xabar o'chirilmadi:", error.message);
  } catch (e) {
    console.log("⚠️ Xabar o'chirilmadi:", e.message);
  }
}

async function updateMessageInSupabase(id, updates) {
  try {
    const { error } = await supabase
      .from('messages')
      .update(updates)
      .eq('id', id);
    if (error) console.log("⚠️ Xabar yangilanmadi:", error.message);
  } catch (e) {
    console.log("⚠️ Xabar yangilanmadi:", e.message);
  }
}

const DATA_FILE = path.join(__dirname, "data.json");
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const saved = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
      db = { ...db, ...saved, sessions: {} };
      console.log("✅ data.json yuklandi");
    }
  } catch {
    console.log("⚠️ data.json yuklanmadi, standart qiymatlar ishlatiladi");
  }
}
function saveData() {
  try {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(
        {
          messages: db.messages,
          chats: db.chats,
          projects: db.projects,
          orders: db.orders,
          settings: db.settings,
          stats: db.stats,
          portfolio: db.portfolio,
        },
        null,
        2,
      ),
    );
  } catch (e) {
    console.log("⚠️ data.json saqlanmadi:", e.message);
  }
}
loadData();
setInterval(saveData, 30000);

function genToken() {
  return crypto.randomBytes(48).toString("hex");
}
function genId() {
  return Date.now() + "_" + crypto.randomBytes(4).toString("hex");
}

function isAuthenticated(req) {
  const token = (req.headers["authorization"] || "")
    .replace("Bearer ", "")
    .trim();
  if (!token || token.length < 10) return false;
  const sess = db.sessions[token];
  if (!sess || Date.now() > sess.expires) {
    if (sess) delete db.sessions[token];
    return false;
  }
  return { phone: sess.phone, token };
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "",
      size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 64 * 1024) {
        req.destroy();
        resolve({});
      } else body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        resolve({});
      }
    });
    req.on("error", () => resolve({}));
  });
}

function getAllowedOrigin(req) {
  if (!req) return "*";
  const origin = req.headers && req.headers.origin ? req.headers.origin : "";
  const NETLIFY = process.env.NETLIFY_URL || "";
  if (!origin) return "*";
  if (
    origin === "http://localhost:3000" ||
    origin === "http://localhost:5500" ||
    origin === "http://127.0.0.1:5500" ||
    (NETLIFY && origin === NETLIFY) ||
    origin.endsWith(".netlify.app") ||
    origin.endsWith(".up.railway.app")
  )
    return origin;
  return "*";
}

function json(res, data, status = 200, req = null) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": getAllowedOrigin(req),
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Credentials": "true",
    ...SEC_HEADERS,
  });
  res.end(JSON.stringify(data));
}

function serveFile(res, filePath) {
  const mime = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };
  const ext = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { ...SEC_HEADERS, "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    res.writeHead(200, {
      "Content-Type": mime[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=86400",
      ...SEC_HEADERS,
    });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost:" + PORT);
  const pathname = url.pathname;

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": getAllowedOrigin(req),
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "Access-Control-Allow-Credentials": "true",
    });
    res.end();
    return;
  }

  if (pathname.startsWith("/api/")) {
    if (!checkRateLimit(req, pathname))
      return json(
        res,
        { ok: false, error: "Juda ko'p so'rovlar. Biroz kuting." },
        429,
      );

    if (pathname === "/api/login" && req.method === "POST") {
      const body = await readBody(req);
      const phone = sanitize(body.phone || "", 20).replace(/[^\d]/g, "");
      const pass = sanitize(body.pass || "", 100);
      if (!phone || !pass)
        return json(
          res,
          { ok: false, error: "Telefon va parolni kiriting!" },
          400,
        );
      let admin = null;
      for (const a of ADMINS) {
        if (a.phone.replace(/[^\d]/g, "") === phone && await verifyPass(pass, a.passHash)) {
          admin = a;
          break;
        }
      }
      if (!admin) {
        console.log("⚠️ Noto'g'ri login:", getRealIp(req), phone);
        return json(
          res,
          { ok: false, error: "Telefon yoki parol noto'g'ri!" },
          401,
        );
      }
      const token = genToken();
      db.sessions[token] = {
        phone: admin.phone,
        expires: Date.now() + 8 * 60 * 60 * 1000,
        ip: getRealIp(req),
        createdAt: new Date().toISOString(),
      };
      console.log("✅ Admin kirdi:", admin.phone);
      return json(res, { ok: true, token, phone: admin.phone });
    }

    if (pathname === "/api/logout" && req.method === "POST") {
      const auth = isAuthenticated(req);
      if (auth) delete db.sessions[auth.token];
      return json(res, { ok: true });
    }

    if (pathname === "/api/me" && req.method === "GET") {
      const auth = isAuthenticated(req);
      if (!auth) return json(res, { ok: false, error: "Sessiya tugagan" }, 401);
      db.sessions[auth.token].expires = Date.now() + 8 * 60 * 60 * 1000;
      return json(res, { ok: true, phone: auth.phone });
    }

    if (pathname === "/api/contact" && req.method === "POST") {
      const body = await readBody(req);
      const name = sanitize(body.name || "", 100);
      const email = sanitize(body.email || "", 100);
      const phone = sanitize(body.phone || "", 20);
      const message = sanitize(body.message || "", 2000);
      if (!name || name.length < 2)
        return json(res, { ok: false, error: "Ismingizni kiriting!" }, 400);
      if (email && !validateEmail(email))
        return json(res, { ok: false, error: "Email noto'g'ri!" }, 400);
      if (!message || message.length < 5)
        return json(res, { ok: false, error: "Xabar juda qisqa!" }, 400);
      const msg = {
        id: genId(),
        name,
        email,
        phone,
        service: sanitize(body.service || "", 100),
        budget: sanitize(body.budget || "", 50),
        subject: sanitize(body.subject || "", 200),
        message,
        status: "unread",
        ip: getRealIp(req),
        createdAt: new Date().toISOString(),
        time: "Hozir",
      };
      db.messages.unshift(msg);
      await saveMessageToSupabase(msg);
      broadcastToAdmins({ type: "new_message", message: msg });
      console.log("📧 Yangi xabar:", msg.name, msg.subject);
      return json(res, { ok: true, id: msg.id });
    }

    const auth = isAuthenticated(req);
    if (!auth)
      return json(
        res,
        { ok: false, error: "Ruxsat yo'q. Tizimga kiring." },
        401,
      );

    // MESSAGES
    if (pathname === "/api/messages" && req.method === "GET") {
      const filter = url.searchParams.get("status") || "all";
      let msgs =
        filter === "all"
          ? db.messages
          : db.messages.filter((m) => m.status === filter);
      return json(res, { ok: true, messages: msgs, total: msgs.length });
    }
    if (pathname.startsWith("/api/messages/") && req.method === "PUT") {
      const id = pathname.split("/")[3];
      const body = await readBody(req);
      const msg = db.messages.find((m) => m.id === id);
      if (!msg) return json(res, { ok: false, error: "Topilmadi" }, 404);
      if (body.status && ["unread", "read", "done"].includes(body.status))
        msg.status = body.status;
      await updateMessageInSupabase(id, { status: body.status });
      return json(res, { ok: true, message: msg });
    }
    if (pathname.startsWith("/api/messages/") && req.method === "DELETE") {
      const id = pathname.split("/")[3];
      const before = db.messages.length;
      db.messages = db.messages.filter((m) => m.id !== id);
      if (db.messages.length === before)
        return json(res, { ok: false, error: "Topilmadi" }, 404);
      await deleteMessageFromSupabase(id);
      return json(res, { ok: true });
    }

    // PROJECTS
    if (pathname === "/api/projects" && req.method === "GET")
      return json(res, { ok: true, projects: db.projects });
    if (pathname === "/api/projects" && req.method === "POST") {
      const body = await readBody(req);
      const name = sanitize(body.name || "", 150);
      if (!name)
        return json(res, { ok: false, error: "Loyiha nomi kerak!" }, 400);
      const proj = {
        id: Date.now(),
        name,
        client: sanitize(body.client || "—", 100),
        service: sanitize(body.service || "—", 50),
        budget: sanitize(body.budget || "—", 30),
        deadline: sanitize(body.deadline || "—", 20),
        status: ["active", "progress", "done", "pause"].includes(body.status)
          ? body.status
          : "active",
        thumb: sanitize(body.thumb || "🗂️", 10),
        desc: sanitize(body.desc || "", 500),
        img: sanitize(body.img || "", 300),
        url: sanitize(body.url || "#", 300),
        createdAt: new Date().toISOString(),
      };
      db.projects.unshift(proj);
      saveData();
      broadcastToAdmins({ type: "project_added", project: proj });
      return json(res, { ok: true, project: proj });
    }
    if (pathname.startsWith("/api/projects/") && req.method === "PUT") {
      const id = parseInt(pathname.split("/")[3]);
      const body = await readBody(req);
      const proj = db.projects.find((p) => p.id === id);
      if (!proj)
        return json(res, { ok: false, error: "Loyiha topilmadi" }, 404);
      if (body.name) proj.name = sanitize(body.name, 150);
      if (body.client !== undefined) proj.client = sanitize(body.client, 100);
      if (body.service !== undefined) proj.service = sanitize(body.service, 50);
      if (body.budget !== undefined) proj.budget = sanitize(body.budget, 30);
      if (body.deadline !== undefined)
        proj.deadline = sanitize(body.deadline, 20);
      if (
        body.status &&
        ["active", "progress", "done", "pause"].includes(body.status)
      )
        proj.status = body.status;
      if (body.thumb !== undefined) proj.thumb = sanitize(body.thumb, 10);
      if (body.desc !== undefined) proj.desc = sanitize(body.desc, 500);
      if (body.img !== undefined) proj.img = sanitize(body.img, 300);
      if (body.url !== undefined) proj.url = sanitize(body.url, 300);
      proj.updatedAt = new Date().toISOString();
      saveData();
      return json(res, { ok: true, project: proj });
    }
    if (pathname.startsWith("/api/projects/") && req.method === "DELETE") {
      const id = parseInt(pathname.split("/")[3]);
      db.projects = db.projects.filter((p) => p.id !== id);
      saveData();
      return json(res, { ok: true });
    }

    // PORTFOLIO
    if (pathname === "/api/portfolio" && req.method === "GET")
      return json(res, { ok: true, portfolio: db.portfolio });
    if (pathname === "/api/portfolio" && req.method === "POST") {
      const body = await readBody(req);
      const title = sanitize(body.title || "", 150);
      if (!title)
        return json(res, { ok: false, error: "Sarlavha kerak!" }, 400);
      const item = {
        id: Date.now(),
        title,
        cat: sanitize(body.cat || "—", 50),
        icon: sanitize(body.icon || "⚡", 10),
        bg: sanitize(body.bg || "linear-gradient(135deg,#0F1628,#1A2240)", 200),
        url: sanitize(body.url || "#", 300),
        img: sanitize(body.img || "", 300),
        desc: sanitize(body.desc || "", 500),
        createdAt: new Date().toISOString(),
      };
      db.portfolio.unshift(item);
      saveData();
      return json(res, { ok: true, item });
    }
    if (pathname.startsWith("/api/portfolio/") && req.method === "PUT") {
      const id = parseInt(pathname.split("/")[3]);
      const body = await readBody(req);
      const item = db.portfolio.find((p) => p.id === id);
      if (!item) return json(res, { ok: false, error: "Topilmadi" }, 404);
      if (body.title) item.title = sanitize(body.title, 150);
      if (body.cat !== undefined) item.cat = sanitize(body.cat, 50);
      if (body.icon !== undefined) item.icon = sanitize(body.icon, 10);
      if (body.bg !== undefined) item.bg = sanitize(body.bg, 200);
      if (body.url !== undefined) item.url = sanitize(body.url, 300);
      if (body.img !== undefined) item.img = sanitize(body.img, 300);
      if (body.desc !== undefined) item.desc = sanitize(body.desc, 500);
      item.updatedAt = new Date().toISOString();
      saveData();
      return json(res, { ok: true, item });
    }
    if (pathname.startsWith("/api/portfolio/") && req.method === "DELETE") {
      const id = parseInt(pathname.split("/")[3]);
      db.portfolio = db.portfolio.filter((p) => p.id !== id);
      saveData();
      return json(res, { ok: true });
    }

    // ORDERS
    if (pathname === "/api/orders" && req.method === "GET")
      return json(res, { ok: true, orders: db.orders });
    if (pathname === "/api/orders" && req.method === "POST") {
      const body = await readBody(req);
      const client = sanitize(body.client || "", 100);
      if (!client)
        return json(res, { ok: false, error: "Mijoz ismi kerak!" }, 400);
      const order = {
        id: "ORD-" + String(db.orders.length + 1).padStart(3, "0"),
        client,
        service: sanitize(body.service || "—", 50),
        amount: sanitize(body.amount || "—", 20),
        method: sanitize(body.method || "—", 30),
        date: new Date().toISOString().split("T")[0],
        status: ["paid", "pending", "cancelled"].includes(body.status)
          ? body.status
          : "pending",
        notes: sanitize(body.notes || "", 300),
      };
      db.orders.unshift(order);
      saveData();
      return json(res, { ok: true, order });
    }
    if (pathname.startsWith("/api/orders/") && req.method === "PUT") {
      const id = pathname.split("/")[3];
      const body = await readBody(req);
      const order = db.orders.find((o) => o.id === id);
      if (!order) return json(res, { ok: false, error: "Topilmadi" }, 404);
      if (body.status && ["paid", "pending", "cancelled"].includes(body.status))
        order.status = body.status;
      if (body.client) order.client = sanitize(body.client, 100);
      if (body.amount) order.amount = sanitize(body.amount, 20);
      if (body.notes !== undefined) order.notes = sanitize(body.notes, 300);
      saveData();
      return json(res, { ok: true, order });
    }
    if (pathname.startsWith("/api/orders/") && req.method === "DELETE") {
      const id = pathname.split("/")[3];
      db.orders = db.orders.filter((o) => o.id !== id);
      saveData();
      return json(res, { ok: true });
    }

    // SETTINGS
    if (pathname === "/api/settings" && req.method === "GET")
      return json(res, { ok: true, settings: db.settings });
    if (pathname === "/api/settings" && req.method === "PUT") {
      const body = await readBody(req);
      const allowed = [
        "siteName",
        "defaultLang",
        "chatEnabled",
        "siteOnline",
        "telegramLink",
        "instagramLink",
      ];
      for (const key of allowed) {
        if (body[key] !== undefined) {
          db.settings[key] =
            typeof body[key] === "boolean"
              ? body[key]
              : sanitize(String(body[key]), 200);
        }
      }
      saveData();
      broadcastToAdmins({ type: "settings_updated", settings: db.settings });
      return json(res, { ok: true, settings: db.settings });
    }

    // CHANGE PASSWORD
    if (pathname === "/api/change-password" && req.method === "POST") {
      const body = await readBody(req);
      const oldPass = sanitize(body.oldPass || "", 100);
      const newPass = sanitize(body.newPass || "", 100);
      if (!oldPass || !newPass)
        return json(
          res,
          { ok: false, error: "Eski va yangi parolni kiriting!" },
          400,
        );
      if (newPass.length < 8)
        return json(
          res,
          {
            ok: false,
            error: "Parol kamida 8 ta belgidan iborat bo'lishi kerak!",
          },
          400,
        );
      const adminIdx = ADMINS.findIndex(
        (a) =>
          a.phone.replace(/[^\d]/g, "") === auth.phone.replace(/[^\d]/g, ""),
      );
      if (adminIdx === -1)
        return json(res, { ok: false, error: "Admin topilmadi" }, 400);
      if (ADMINS[adminIdx].passHash !== hashPass(oldPass))
        return json(res, { ok: false, error: "Eski parol noto'g'ri!" }, 401);
      ADMINS[adminIdx].passHash = hashPass(newPass);
      db.sessions = {};
      console.log("🔑 Parol o'zgartirildi:", auth.phone);
      return json(res, {
        ok: true,
        message: "Parol o'zgartirildi. Qayta kiring.",
      });
    }

    // STATS
    if (pathname === "/api/stats" && req.method === "GET") {
      const totalRevenue = db.orders
        .filter((o) => o.status === "paid")
        .reduce((s, o) => {
          const n = parseFloat((o.amount || "0").replace(/[^0-9.]/g, ""));
          return s + (isNaN(n) ? 0 : n);
        }, 0);
      return json(res, {
        ok: true,
        stats: {
          totalMessages: db.messages.length,
          unreadMessages: db.messages.filter((m) => m.status === "unread")
            .length,
          totalProjects: db.projects.length,
          activeProjects: db.projects.filter(
            (p) => p.status === "active" || p.status === "progress",
          ).length,
          doneProjects: db.projects.filter((p) => p.status === "done").length,
          totalOrders: db.orders.length,
          paidOrders: db.orders.filter((o) => o.status === "paid").length,
          pendingOrders: db.orders.filter((o) => o.status === "pending").length,
          totalRevenue: Math.round(totalRevenue),
          totalChats: Object.keys(db.chats).length,
          onlineUsers: wsUsers.size,
          portfolioItems: db.portfolio.length,
          ...db.stats,
        },
      });
    }

    // CHATS
    if (pathname === "/api/chats" && req.method === "GET") {
      const chatList = Object.entries(db.chats)
        .map(([userId, data]) => ({
          userId,
          name: data.name || "Foydalanuvchi",
          lastMsg: data.messages[data.messages.length - 1]?.text || "",
          lastTime: data.messages[data.messages.length - 1]?.time || "",
          unread: data.messages.filter((m) => m.from === "user" && !m.read)
            .length,
          online: wsUsers.has(userId),
          msgCount: data.messages.length,
        }))
        .sort((a, b) => b.unread - a.unread);
      return json(res, { ok: true, chats: chatList });
    }
    if (pathname.startsWith("/api/chats/") && req.method === "GET") {
      const userId = pathname.split("/")[3];
      if (!db.chats[userId])
        return json(res, { ok: false, error: "Chat topilmadi" }, 404);
      db.chats[userId].messages.forEach((m) => {
        if (m.from === "user") m.read = true;
      });
      saveData();
      return json(res, { ok: true, chat: db.chats[userId] });
    }
    if (pathname.startsWith("/api/chats/") && req.method === "DELETE") {
      const userId = pathname.split("/")[3];
      delete db.chats[userId];
      saveData();
      return json(res, { ok: true });
    }

    return json(res, { ok: false, error: "Noma'lum endpoint" }, 404);
  }

  // STATIC FILES
  db.stats.totalVisits++;
  db.stats.todayVisits++;

  let filePath;
  try {
    const decoded = decodeURIComponent(pathname);
    filePath = path.normalize(
      path.join(__dirname, decoded === "/" ? "index.html" : decoded),
    );
    if (!filePath.startsWith(path.resolve(__dirname))) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
  } catch {
    res.writeHead(400);
    res.end("Bad Request");
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile())
    return serveFile(res, filePath);
  if (fs.existsSync(filePath + ".html"))
    return serveFile(res, filePath + ".html");
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 — Sahifa topilmadi");
});

const wss = new WebSocketServer({ server, maxPayload: 64 * 1024 });
const adminClients = new Set();
const wsUsers = new Map();

wss.on("connection", (ws, req) => {
  let clientType = null,
    clientId = null;
  const ip = getRealIp(req);
  const pingInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) ws.ping();
  }, 30000);

  ws.on("message", (raw) => {
    try {
      if (raw.length > 8192) return;
      const data = JSON.parse(raw.toString());

      if (data.type === "admin") {
        const token = sanitize(data.token || "", 200);
        const sess = db.sessions[token];
        if (!sess || Date.now() > sess.expires) {
          ws.send(JSON.stringify({ type: "error", msg: "Auth failed" }));
          ws.close(1008, "Auth failed");
          return;
        }
        clientType = "admin";
        adminClients.add(ws);
        ws.adminToken = token;
        ws.send(JSON.stringify({ type: "connected", role: "admin" }));
        return;
      }

      if (data.type === "user_connect") {
        clientType = "user";
        clientId = sanitize(data.userId || genId(), 50);
        if (!/^[\w_-]+$/.test(clientId)) clientId = genId();
        wsUsers.set(clientId, ws);
        if (!db.chats[clientId])
          db.chats[clientId] = {
            name: sanitize(data.name || "Foydalanuvchi", 50),
            messages: [],
            createdAt: new Date().toISOString(),
          };
        ws.send(JSON.stringify({ type: "connected", userId: clientId }));
        broadcastToAdmins({
          type: "user_online",
          userId: clientId,
          name: db.chats[clientId].name,
        });
        return;
      }

      if (data.type === "msg" && data.from === "user" && clientId) {
        const text = sanitize(data.text || "", 1000);
        if (!text) return;
        if (!db.chats[clientId])
          db.chats[clientId] = {
            name: "Foydalanuvchi",
            messages: [],
            createdAt: new Date().toISOString(),
          };
        const msg = {
          from: "user",
          text,
          time: new Date().toLocaleTimeString("uz-UZ", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          read: false,
        };
        db.chats[clientId].messages.push(msg);
        if (db.chats[clientId].messages.length > 500)
          db.chats[clientId].messages = db.chats[clientId].messages.slice(-500);
        saveData();
        broadcastToAdmins({
          type: "msg",
          from: "user",
          userId: clientId,
          text,
          time: msg.time,
          name: db.chats[clientId].name,
        });
        return;
      }

      if (data.type === "adminMsg" && clientType === "admin") {
        // Verify token still valid
        if (!ws.adminToken || !db.sessions[ws.adminToken]) return;
        const to = sanitize(data.to || "", 50);
        const text = sanitize(data.text || "", 1000);
        if (!to || !text) return;
        const targetWs = wsUsers.get(to);
        const msg = {
          from: "admin",
          text,
          time: new Date().toLocaleTimeString("uz-UZ", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        if (!db.chats[to])
          db.chats[to] = {
            name: "Foydalanuvchi",
            messages: [],
            createdAt: new Date().toISOString(),
          };
        db.chats[to].messages.push(msg);
        saveData();
        if (targetWs && targetWs.readyState === 1)
          targetWs.send(
            JSON.stringify({
              type: "msg",
              from: "admin",
              text,
              time: msg.time,
            }),
          );
        return;
      }

      if (data.type === "mark_read" && data.userId && clientType === "admin") {
        const userId = sanitize(data.userId, 50);
        if (db.chats[userId]) {
          db.chats[userId].messages.forEach((m) => {
            if (m.from === "user") m.read = true;
          });
          saveData();
        }
      }
    } catch {}
  });

  ws.on("close", () => {
    clearInterval(pingInterval);
    if (clientType === "admin") adminClients.delete(ws);
    if (clientType === "user" && clientId) {
      wsUsers.delete(clientId);
      broadcastToAdmins({ type: "user_offline", userId: clientId });
    }
  });
  ws.on("error", () => {
    clearInterval(pingInterval);
  });
});

function broadcastToAdmins(data) {
  const msg = JSON.stringify(data);
  adminClients.forEach((ws) => {
    if (ws.readyState === 1)
      try {
        ws.send(msg);
      } catch {}
  });
}

async function startServer() {
  await loadDataFromSupabase();

  server.listen(PORT, "0.0.0.0", () => {
    console.log("\n╔══════════════════════════════════════════╗");
    console.log("║   MONTRAX Backend v2.0 — Ishga tushdi   ║");
    console.log("║   http://localhost:" + PORT + "                 ║");
    console.log("╠══════════════════════════════════════════╣");
    console.log("║  🔒 Rate Limiting       — YOQILGAN      ║");
    console.log("║  🔒 Security Headers    — YOQILGAN      ║");
    console.log("║  🔒 Input Validation    — YOQILGAN      ║");
    console.log("║  🔒 XSS Protection      — YOQILGAN      ║");
    console.log("║  🔒 Password Hashing    — YOQILGAN      ║");
    console.log("║  🔒 WS Auth Verification — YOQILGAN    ║");
    console.log("╚══════════════════════════════════════════╝\n");
  });
}

startServer();

process.on("SIGINT", () => {
  saveData();
  console.log("\n💾 Saqlandi. Server to'xtatildi.");
  process.exit(0);
});
process.on("SIGTERM", () => {
  saveData();
  process.exit(0);
});
process.on("uncaughtException", (err) => {
  console.error("Xato:", err.message);
  saveData();
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled:", reason);
});
