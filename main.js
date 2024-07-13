
const app = require('express')

let chrome = {}
let puppeteer;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

if(process.env.AWS_LAMBDA_FUNCTION_VERSION)
{
    chrome = require('chrome-aws-lambda')
    puppeteer = require('puppeteer-core')
}else{       
    puppeteer = require('puppeteer')
}

// Endpoints



app.get('/euros', async(req, res) => {
    let options = {}

    if(process.env.AWS_LAMBDA_FUNCTION_VERSION)
    {
        options = {
            args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
            defaultViewport: chrome.defaultViewport,
            executablePath: await chrome.executablePath,
            headless: true,
            ignoreHTTPSErrors: true
        }
    }

    scrapeFunction('https://www.soccerstats.com/leagueview.asp?league=euro')



})














function extractTablesContent(table)
{

    var r = 1;
    var c = 0
    
    var myTable = []
    
    var match = { 'team1': '', 'team2': '', 'score':'', 'date': '' }
    
    while (true){
    
        if(r == 9)
        {
            break
        }   
    
        console.log(r, c)
    
        if(c == 0)
        {
            match.date = table.children[0].children[r].children[c].children[0].innerHTML
        }
        if(c == 1)
        {
            match.team1 = table.children[0].children[r].children[c].children[0].innerHTML
        }
        if(c == 2)
        {
            match.score = table.children[0].children[r].children[c].children[0].children[0].children[0].innerHTML
        }
        if(c == 3)
        {
            match.team2 = table.children[0].children[r].children[c].children[1].innerHTML
        }
        
        c++
        if(c == 4)
        {
            myTable.push(match)
    
            match = {}
    
            c = 0
            r++
        }
    
    }


    return myTable
    
}


async function scrapeFunction(url)
{
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(url); // Replace with your target URL
  
    // Get the table element by ID
    const tableElement = await page.$('#btable'); // Replace with the actual table ID

  if (tableElement) {
    // Get the table's outer HTML
    const tableHTML = await page.evaluate(table => table.outerHTML, tableElement);

    const dom = new JSDOM(tableHTML);
    const document = dom.window.document;

    // Get the table element from the parsed HTML
    const tableElm = document.querySelector('table');
    console.log(tableElm)

    // console.log(tableElm.children[0].children[1].children[0].children[0].innerHTML)
    console.log(extractTablesContent(tableElm))

  } else {
    console.log('Table not found');
  }

  await browser.close();
}

app.listen(process.env.PORT || 3000, () => {
    console.log('server started')
})

module.exports = app