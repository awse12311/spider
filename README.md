# spider
爬蟲練習程式碼

1. 練習一 FujiFilm爬取產品
    * 使用工具如下
        * `pip install selenium pandas openpyxl webdriver_manager openpyxl Pillow`
        
    * 開發過程
        -使用selenium動態方式抓取HTML ul,li標籤
        -使用BeautifulSoup4(bs4)套件抓取靜態標籤
        -使用JavaScript 加上 driver.execute_script的方式在網頁加入點選(click)監聽(addEventListener)，抓取元素標籤內容
        -抓取產品圖片位置超連結(href),圖片下載
    * 問題
        * 抓取資料都還還好，主要是監聽在切換連結後會被洗掉
    * 解決方案
        * 每個網頁切換時重複加上 driver.execute_script
2. 練習二 7-11抓取門市基本資料
    * 使用工具
    * 開發過程
    * 問題
    * 解決方案
3. 練習三 全家便利商店門市基本資料
    * 使用工具
    * 開發過程
    * 問題
    * 解決方案
4. 加練 json to csv




