// Scrape RetroPGF projects from https://retropgfhub.com/explore/ using Puppeteer
// Usage: node scrape-retropgf-puppeteer.js

import puppeteer from 'puppeteer';

async function scrapeRetroPGF() {
  const url = 'https://retropgfhub.com/explore/';
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log('Navigating to URL...');
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  console.log('Page loaded');

  // Add a delay to ensure dynamic content loads
  await page.waitForTimeout(5000);
  console.log('Waited 5 seconds for content to load');

  // Log the page content for debugging
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  console.log('Page HTML length:', bodyHTML.length);
  console.log('First 500 characters of HTML:', bodyHTML.substring(0, 500));

  // Extract project data
  const projects = await page.evaluate(() => {
    // First try to get all articles or divs that look like project cards
    const cards = document.querySelectorAll('article, div[class*="card"], div[class*="project"], div[role="listitem"]');
    console.log('Found', cards.length, 'potential project cards');
    
    const results = [];
    cards.forEach((card, index) => {
      // Look for any text that could be a title or description
      const title = card.querySelector('h1, h2, h3, h4, [class*="title"]')?.innerText?.trim() || '';
      const description = card.querySelector('p, [class*="description"], [class*="content"]')?.innerText?.trim() || '';
      const link = card.querySelector('a')?.href || '';
      
      if (title || description) {
        results.push({ title, description, link });
      }
    });
    return results;
  });

  console.log(projects);
  await browser.close();
}

scrapeRetroPGF();
