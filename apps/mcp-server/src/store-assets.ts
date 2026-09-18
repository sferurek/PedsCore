import { deflateSync } from "node:zlib";

type Rgba = readonly [number, number, number, number];

const crc32 = (data: Buffer) => {
  let crc = 0xffffffff;
  for (const byte of data) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
};

const chunk = (type: string, data: Buffer) => {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
};

const makePng = (
  width: number,
  height: number,
  pixelAt: (x: number, y: number) => Rgba
) => {
  const stride = width * 4 + 1;
  const raw = Buffer.alloc(stride * height);

  for (let y = 0; y < height; y += 1) {
    raw[y * stride] = 0;
    for (let x = 0; x < width; x += 1) {
      const [r, g, b, a] = pixelAt(x, y);
      const offset = y * stride + 1 + x * 4;
      raw[offset] = r;
      raw[offset + 1] = g;
      raw[offset + 2] = b;
      raw[offset + 3] = a;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);
};

const insideRoundedRect = (
  x: number,
  y: number,
  left: number,
  top: number,
  right: number,
  bottom: number,
  radius: number
) => {
  if (x < left || x >= right || y < top || y >= bottom) return false;
  const cx = x < left + radius ? left + radius : x >= right - radius ? right - radius - 1 : x;
  const cy = y < top + radius ? top + radius : y >= bottom - radius ? bottom - radius - 1 : y;
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= radius * radius;
};

const iconPixel = (size: number, x: number, y: number): Rgba => {
  const navy: Rgba = [17, 24, 39, 255];
  const teal: Rgba = [53, 188, 185, 255];
  const white: Rgba = [255, 255, 255, 255];

  const border = Math.max(2, Math.round(size * 0.035));
  const radius = Math.round(size * 0.2);

  if (!insideRoundedRect(x, y, 0, 0, size, size, radius)) return [0, 0, 0, 0];

  const inner = insideRoundedRect(x, y, border, border, size - border, size - border, Math.max(1, radius - border));
  if (!inner) return teal;

  const stemLeft = Math.round(size * 0.29);
  const stemRight = Math.round(size * 0.40);
  const top = Math.round(size * 0.20);
  const bottom = Math.round(size * 0.81);
  if (x >= stemLeft && x < stemRight && y >= top && y < bottom) return white;

  const bowlLeft = stemLeft;
  const bowlTop = top;
  const bowlRight = Math.round(size * 0.70);
  const bowlBottom = Math.round(size * 0.54);
  const bowlRadius = Math.round(size * 0.16);
  if (insideRoundedRect(x, y, bowlLeft, bowlTop, bowlRight, bowlBottom, bowlRadius)) {
    const holeLeft = Math.round(size * 0.40);
    const holeTop = Math.round(size * 0.29);
    const holeRight = Math.round(size * 0.57);
    const holeBottom = Math.round(size * 0.44);
    if (insideRoundedRect(x, y, holeLeft, holeTop, holeRight, holeBottom, Math.round(size * 0.05))) {
      return navy;
    }
    return white;
  }

  return navy;
};

export const createStoreIcon = (size: number) =>
  makePng(size, size, (x, y) => iconPixel(size, x, y));

export const createStoreCarousel = () => {
  const width = 600;
  const height = 900;

  return makePng(width, height, (x, y) => {
    const t = y / (height - 1);
    const bg: Rgba = [
      Math.round(9 + 12 * t),
      Math.round(18 + 37 * t),
      Math.round(31 + 45 * t),
      255
    ];

    if (insideRoundedRect(x, y, 48, 72, 552, 828, 40)) {
      const card: Rgba = [248, 250, 252, 255];

      if (insideRoundedRect(x, y, 88, 118, 208, 238, 26)) {
        return iconPixel(120, x - 88, y - 118);
      }

      const accent: Rgba = [224, 245, 244, 255];
      if (
        insideRoundedRect(x, y, 88, 330, 512, 430, 20) ||
        insideRoundedRect(x, y, 88, 458, 512, 558, 20) ||
        insideRoundedRect(x, y, 88, 586, 512, 686, 20)
      ) {
        return accent;
      }

      const teal: Rgba = [13, 118, 116, 255];
      if (
        (x >= 116 && x < 146 && y >= 364 && y < 396) ||
        (x >= 116 && x < 146 && y >= 492 && y < 524) ||
        (x >= 116 && x < 146 && y >= 620 && y < 652)
      ) {
        return teal;
      }

      const line: Rgba = [71, 85, 105, 255];
      if (
        (x >= 170 && x < 462 && y >= 357 && y < 369) ||
        (x >= 170 && x < 430 && y >= 383 && y < 393) ||
        (x >= 170 && x < 462 && y >= 485 && y < 497) ||
        (x >= 170 && x < 440 && y >= 511 && y < 521) ||
        (x >= 170 && x < 462 && y >= 613 && y < 625) ||
        (x >= 170 && x < 408 && y >= 639 && y < 649)
      ) {
        return line;
      }

      if (x >= 88 && x < 512 && y >= 742 && y < 748) {
        return [53, 188, 185, 255];
      }

      return card;
    }

    return bg;
  });
};

const pageShell = (title: string, body: string) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="index,follow">
<title>${title} | PedsCore AI</title>
<style>
body{margin:0;background:#f8fafc;color:#111827;font:16px/1.65 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
main{max-width:780px;margin:0 auto;padding:48px 24px 72px}
.brand{display:flex;align-items:center;gap:12px;margin-bottom:36px;font-weight:800}
.mark{width:36px;height:36px;border-radius:10px;background:#111827;color:white;display:grid;place-items:center;border:2px solid #35bcb9}
h1{font-size:clamp(2rem,5vw,3rem);line-height:1.08;margin:.2em 0 .5em}
h2{margin-top:2em;font-size:1.25rem}
p,li{color:#334155}
.notice{padding:18px 20px;border-radius:16px;background:#e8f6f5;border:1px solid #9edbd8}
a{color:#0f766e}
small{color:#64748b}
</style>
</head>
<body><main><div class="brand"><span class="mark">P</span>PedsCore AI</div>${body}
<p><small>Effective date: 18 September 2026</small></p></main></body></html>`;

export const privacyPolicyHtml = pageShell(
  "Privacy Policy",
  `<h1>Privacy Policy</h1>
<p class="notice">PedsCore AI is an educational pediatric clinical learning service. It is not designed to receive identifying patient information.</p>
<h2>Information processed</h2>
<p>The service processes the text and structured clinical-learning inputs a user submits so it can discover PedsCore tools, return tool metadata, and execute supported deterministic calculations. Users should not submit names, record numbers, contact details, or other information that identifies a patient.</p>
<h2>Storage and logs</h2>
<p>PedsCore AI does not require a PedsCore user account for the current Alexa+ educational experience. The application does not intentionally create a longitudinal clinical record from MCP tool requests. Hosting and platform providers may process ordinary technical logs needed to operate, secure, and troubleshoot the service.</p>
<h2>How information is used</h2>
<p>Submitted information is used to provide the requested educational functionality, maintain service reliability, investigate errors, and protect the service from misuse. It is not used by PedsCore to make autonomous clinical decisions.</p>
<h2>Third-party infrastructure</h2>
<p>The service uses third-party infrastructure to host the MCP endpoint and may be accessed through Amazon Alexa+. Those providers may process technical information under their own terms and privacy policies.</p>
<h2>Children and patients</h2>
<p>The service is intended for professional education and training. It is not directed to children as end users and should not be used to store or transmit identifiable patient data.</p>
<h2>Contact</h2>
<p>Questions about this policy can be raised through the public PedsCore project repository at <a href="https://github.com/sferurek/PedsCore">github.com/sferurek/PedsCore</a>.</p>`
);

export const termsOfUseHtml = pageShell(
  "Terms of Use",
  `<h1>Terms of Use</h1>
<p class="notice">PedsCore AI is provided for education, training, simulation, and clinical reference. It does not replace clinical assessment, local protocols, or professional judgment.</p>
<h2>Permitted use</h2>
<p>You may use the service to discover pediatric clinical tools, inspect educational metadata and evidence references, and run supported deterministic calculations for learning or reference purposes.</p>
<h2>Clinical responsibility</h2>
<p>Outputs can be incomplete, outdated, misapplied, or inappropriate for a specific patient. Users remain responsible for verifying source guidance, checking all inputs and units, applying local policy, and making their own clinical decisions.</p>
<h2>No emergency service</h2>
<p>PedsCore AI is not an emergency communication service and must not be relied on to obtain urgent medical assistance.</p>
<h2>Data restrictions</h2>
<p>Do not submit identifiable patient information, confidential records, credentials, or other sensitive personal data. Use de-identified educational scenarios whenever possible.</p>
<h2>Availability and changes</h2>
<p>The service is experimental and may change, be interrupted, or be withdrawn without notice. Tools, references, integration behavior, and availability can evolve as the open-source project develops.</p>
<h2>Open-source software</h2>
<p>PedsCore software is developed openly. Repository source code and licensing information are available at <a href="https://github.com/sferurek/PedsCore">github.com/sferurek/PedsCore</a>.</p>`
);
