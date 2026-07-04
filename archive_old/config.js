/* ══════════════════════════════════════════════════
   MONTRAX — Server konfiguratsiyasi
   
   Render deploy qilgandan keyin:
   SERVER_URL = sizning Render URL ingiz
   Masalan: https://montrax-backend.onrender.com
   ══════════════════════════════════════════════════ */

const MONTRAX_CONFIG = (() => {
  // Render URL shu yerga yozing (oxirida / bo'lmasin):
  const RENDER_URL = 'https://your-app.onrender.com';

  // Agar sahifa server tomonidan serve qilinsa (localhost) — o'sha serverga murojaat qil
  // Agar Netlify dan serve qilinsa — Render URL ishlatiladi
  const isServedByBackend = (
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1'
  );

  const baseUrl = isServedByBackend ? '' : RENDER_URL;
  const wsProtocol = (isServedByBackend ? location.protocol : 'https:') === 'https:' ? 'wss:' : 'ws:';
  const wsHost = isServedByBackend ? location.host : RENDER_URL.replace(/^https?:\/\//, '');

  return {
    API_BASE: baseUrl,
    WS_URL: `${wsProtocol}//${wsHost}`,
    RENDER_URL,
  };
})();