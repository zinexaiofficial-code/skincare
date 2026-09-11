const { chromium } = require('/private/tmp/sashwari-qa/node_modules/playwright');
const fs = require('fs');
(async () => {
 const browser = await chromium.launch({ channel: 'chrome', headless: true });
 const page = await browser.newPage(); const errors = []; const results = [];
 page.on('pageerror', e => errors.push(e.message));
 page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
 await page.addInitScript(() => sessionStorage.setItem('sashwari-loaded', 'true'));
 const routes = ['/', '/collections', '/collections/brightening', '/collections/sensitive-skin', '/collections/pimple-care', '/collections/bridal', '/skin-concerns', '/our-science', '/about', '/contact', '/missing-page'];
 fs.mkdirSync('qa/screenshots', { recursive: true });
 for (const width of [1440,1024,768,430,375]) {
  await page.setViewportSize({ width, height: 950 });
  for (const route of routes) {
   await page.goto('http://127.0.0.1:5173'+route, { waitUntil:'networkidle' });
   await page.waitForTimeout(1500);
   await page.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=650){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,100));} });
   await page.waitForTimeout(900);
   await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
   await page.waitForTimeout(350);
   const checks = await page.evaluate(() => ({ overflow:document.documentElement.scrollWidth>innerWidth, brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src), filteredMedia:[...document.querySelectorAll('main img, main video')].filter(i=>getComputedStyle(i).filter!=='none'||getComputedStyle(i).mixBlendMode!=='normal').length, hiddenContent:[...document.querySelectorAll('main h1, main h2, main p')].filter(i=>getComputedStyle(i).opacity==='0').length, whatsapp:[...document.querySelectorAll('a[href*="wa.me"]')].every(a=>a.href.startsWith('https://wa.me/94779595915')), h1:document.querySelector('h1')?.textContent }));
   const name = route==='/'?'home':route.slice(1).replaceAll('/','-');
   await page.screenshot({ path:`qa/screenshots/${width}-${name}.png`,fullPage:true });
   results.push({width,route,...checks}); console.log(JSON.stringify(results.at(-1)));
  }
 }
 fs.writeFileSync('qa/results.json', JSON.stringify({results, errors:[...new Set(errors)]},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
