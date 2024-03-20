

document.querySelector('p.freeValue').addEventListener('click', function() {
    // 假设 storeName 和 storeNumber 是从其他网站抓取的数据
    // 假设目标服务器支持 CORS 或你已经有了服务器端代理
    var actionUrl = this.getAttribute('data-action');
    if (actionUrl == 'https://www.ibon.com.tw/retail_inquiry.aspx#gsc.tab=0') {
        const puppeteer = require('puppeteer');

        (async () => {
            // 启动浏览器
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // 导航到目标页面
            await page.goto(actionUrl);

            // 等待页面和必要元素加载
            await page.waitForSelector('p.freeValue'); // 确保门店列表已加载

            // 模拟点击打开 popupTitleBar
            // 注意：这里假设 'p.freeValue' 是触发 popupTitleBar 显示的元素
            await page.click('.banner');

            // 等待 popupTitleBar 加载
            await page.waitForSelector('.popupTitleBar');

            // 抓取数据
            const storeName = await page.$eval('#lblStore_Name', el => el.innerText);
            const storeNumber = await page.$eval('#lblStore_ID', el => el.innerText);

            console.log(`店名: ${storeName}, 店号: ${storeNumber}`);

            // 根据需要执行其他操作，比如填充数据到另一个页面的表单

            // 关闭浏览器
            await browser.close();
        })();
    }
});