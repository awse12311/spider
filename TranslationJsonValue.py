import json
from googletrans import Translator

def translate_value(obj, translator):
    if isinstance(obj, str):
        try:
            return translator.translate(obj, dest='zh-tw').text
        except Exception as e:
            print(f"翻譯 '{obj}' 時發生錯誤: {e}")
            return obj  # 如果翻譯失敗，返回原始字符串
    elif isinstance(obj, dict):
        return {k: translate_value(v, translator) for k, v in obj.items()}
    else:
        return obj

def translate_json_file(filename, output_filename):
    translator = Translator()

    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)

    translated_data = translate_value(data, translator)

    with open(output_filename, 'w', encoding='utf-8') as f:
        json.dump(translated_data, f, ensure_ascii=False, indent=4)

translate_json_file('C:\Users\張駿宇\Documents\GitHub\spider\jobflow_zh.json', 'jobflow_zh_translated.json')


