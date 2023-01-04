//requre all modules 

const bot = require("puppeteer");
const fs = require("fs");
const botConfiguration = {
    headless: true,  

}


async function getRandomItem(links){
    let data = await fs.readFileSync(links,"utf-8");

    let proccessedData = JSON.parse(data)
    let proccessedDataLength = proccessedData.length
    let urlIndex = Math.floor(Math.random() * proccessedDataLength) 
    return (proccessedData[urlIndex]);
}



async function runAdsenseBot(){

    const numberOfTabs = 100

    const chromeBrowser = await bot.launch(botConfiguration)
  

     try{
        
        // await chromeBrowserpage.setCookie(cookies)
       

        for (let i = 0; i < numberOfTabs; i++) {
            
            let userAgent = await getRandomItem('assets/list_of_UA.json')
            let url = await getRandomItem('assets/List_of_links.json')

            console.log("===================== User Agent PICKED WAS=================")
            console.log(userAgent)

            console.log("===================== URL PICKED WAS =================")
            console.log(url)

            const chromeBrowserpage = await chromeBrowser.newPage()
            await chromeBrowserpage.setUserAgent(userAgent)

            await chromeBrowserpage.goto(url)
            
        }
       


    }catch(error){
        console.error(error)
    }finally{

        setTimeout(function() {
            chromeBrowser.close()
            runAdsenseBot()
        }, 1000 * 60 * 60);
    }
}

runAdsenseBot()

