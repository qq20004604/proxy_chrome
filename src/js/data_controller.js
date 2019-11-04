const test = {test: '测试'};

// 存储数据
const saveData = function (obj = test, callback) {
    chrome.storage.sync.set(obj, function (result) {
        if (obj === test) {
            console.log('保存使用的是默认数据');
        }
        console.log('保存成功', result);
        callback(result);
    });
};

// 读取数据（参数对象，key是key，value是默认值）
const getData = function (obj = test) {
    chrome.storage.sync.get(obj, function (result) {
        if (obj === test) {
            console.log('读取使用的是默认数据');
        }
        console.log(result);
        console.log('读取成功');
    });
};

// 读取全部数据
const getAllData = function (callback = () => {
}) {
    chrome.storage.sync.get(function (result) {
        console.log(result);
        console.log('读取成功');
        callback(result);
    });
};

export {saveData, getAllData, getData};