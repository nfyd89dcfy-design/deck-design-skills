// Рендер колоды: легкий PDF (картинки 2x, быстро открывается) и векторный PDF, PNG каждого слайда.
// Запуск: node tools/render.mjs deck.html [outDir]
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const file = process.argv[2];
const out = path.resolve(process.argv[3] || 'out');
if (!file) { console.error('usage: node tools/render.mjs deck.html [outDir]'); process.exit(2); }
fs.mkdirSync(out, { recursive: true });
const url = 'file://' + path.resolve(file);

const browser = await chromium.launch();

// 1. Векторный PDF и PNG 1x для просмотра
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({ content: '@page{size:1920px 1080px;margin:0}html,body{background:none}' });
const n = await page.locator('section.slide').count();
for (let i = 0; i < n; i++)
  await page.locator('section.slide').nth(i).screenshot({ path: path.join(out, `slide-${String(i + 1).padStart(2, '0')}.png`) });
await page.pdf({ path: path.join(out, 'deck-vector.pdf'), width: '1920px', height: '1080px', printBackground: true });

// 2. Легкий PDF: каждый слайд JPEG 2x (3840x2160), качество 92. Стекло и размытие не пересчитываются при открытии.
const hi = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
await hi.goto(url, { waitUntil: 'networkidle' });
await hi.evaluate(() => document.fonts.ready);
const imgs = [];
for (let i = 0; i < n; i++) {
  const buf = await hi.locator('section.slide').nth(i).screenshot({ type: 'jpeg', quality: 92 });
  imgs.push(buf.toString('base64'));
}
const pdfPage = await browser.newPage();
await pdfPage.setContent('<style>@page{size:1920px 1080px;margin:0}html,body{margin:0}img{display:block;width:1920px;height:1080px;page-break-after:always}</style>'
  + imgs.map(b => `<img src="data:image/jpeg;base64,${b}">`).join(''));
await pdfPage.pdf({ path: path.join(out, 'deck.pdf'), width: '1920px', height: '1080px', printBackground: true });
await browser.close();

const mb = f => (fs.statSync(path.join(out, f)).size / 1048576).toFixed(1);
console.log(`Готово: ${n} слайдов. deck.pdf ${mb('deck.pdf')} МБ (легкий), deck-vector.pdf ${mb('deck-vector.pdf')} МБ (текст выделяется)`);
console.log('Следующий шаг: открой каждый PNG и PDF глазами, потом чек-лист из references/anti-patterns.md');
