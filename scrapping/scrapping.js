const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;

async function scraping(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url)
        const html = await page.content();

        // await fs.writeFile('public/page.html', html);

        // await removeExtraLineBreaksAndTabs('public/page.html');

        // const savedHtml = await fs.readFile('public/page.html', 'utf8');
        // console.log(savedHtml)

        const { extract } = await import('@extractus/article-extractor');
        const article = await extract(html);
        return article;
    } catch (error) {
        console.error('Error al importar el módulo:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

// async function removeExtraLineBreaksAndTabs(file) {
//     try {
//         // Read the content of the file
//         let content = await fs.readFile(file, 'utf8');

//         // Replace multiple line breaks with a single one
//         content = content.replace(/(\n{2,})|(\t{2,})/g, match => {
//             // If the match is a line break, return a single line break
//             if (match.includes('\n')) {
//                 return '\n';
//             }
//             // If the match is a tab, return a single whitespace
//             else if (match.includes('\t')) {
//                 return ' ';
//             }
//         });

//         // Write the modified content back to the file
//         await fs.writeFile(file, content);

//         console.log('Extra line breaks removed successfully.');
//     } catch (error) {
//         console.error('Error removing extra line breaks:', error);
//     }
// }


module.exports = scraping;