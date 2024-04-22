
// 创建一个 XMLHttpRequest 对象
var xhr = new XMLHttpRequest();

// 设置请求方法和 URL，替换 'localfile.js' 为您的本地 JavaScript 文件的路径
xhr.open('GET', 'file:///path/to/your/localfile.js', true);

// 设置请求完成后的回调函数
xhr.onload = function() {
  // 当请求完成时
  if (xhr.status >= 200 && xhr.status < 300) {
    // 如果请求成功
    var responseData = xhr.responseText; // 获取响应数据
    // 在这里处理响应数据，例如将其传递给工作流程的下一个步骤
    Watch.SetVariable("ExternalData", responseData); // 将响应数据保存到工作流程变量中
  } else {
    // 如果请求失败，可以进行相应的处理
    console.error('请求失败: ' + xhr.status);
  }
};

// 设置请求出错时的回调函数
xhr.onerror = function() {
  console.error('请求出错');
};

// 发送请求
xhr.send();
