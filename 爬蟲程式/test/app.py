
# app.py
from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/fetch-stores', methods=['GET'])
def fetch_stores():
    # 這裡將呼叫 Node.js 腳本來執行 Puppeteer 任務，並獲取結果
    # 回傳格式：jsonify({'data': '這裡將是7-11分店資訊'})
    return jsonify({'data': '暫時模擬的7-11分店資訊'})

if __name__ == '__main__':
    app.run(debug=True)
