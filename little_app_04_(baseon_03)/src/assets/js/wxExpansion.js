/**
 * wx api 的扩展
 */

const wxExpansion = {
    //提示信息
    toast(_text, _icon) {
        wx.showToast({
            title: _text || "",
            icon: _icon || "none",
            complete: () => {
                setTimeout(() => {
                    wx.hideToast();
                }, 1500);
            }
        })
    },
    //查看pdf/doc/excel
    viewDocument(url) {
        wx.downloadFile({
            url: url,
            success: function(res) {
                var Path = res.tempFilePath; //返回的文件临时地址
                wx.openDocument({
                    filePath: Path,
                    success: function(res) {}
                })
            },
            fail: function(res) {
                console.log("fail", res);
            }
        })
    },
    //设置 storage
    setStorage(key, value, time) {
        let t = time || 24 * 60 * 60 * 1000;
        let tempObj = {
            data: value,
            limitTime: new Date().getTime() + parseInt(t)
        }
        wx.setStorageSync(key, tempObj);
    },
    //获取 storage ，若过期则消失
    getStorage(key) {
        let obj = wx.getStorageSync(key);
        if (obj) {
            let temp = typeof obj == "string" ? JSON.parse(obj) : obj;
            if (temp.limitTime < new Date().getTime()) {
                wx.removeStorageSync(key);
                return undefined;
            } else {
                return temp.data
            }
        } else {
            return undefined;
        }
    },
    request(obj){
        
    }
}

module.exports = wxExpansion;