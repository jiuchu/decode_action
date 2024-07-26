//Fri Jul 26 2024 07:51:31 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("红旗智联");
let envSplitor = ["\n"];
let kami = "";
let version = "4.7.2";
const _0x5e55f2 = function () {
    let _0x718c18 = true;
    return function (_0x442fab, _0x11d3d2) {
      const _0x229f0e = _0x718c18 ? function () {
        if (_0x11d3d2) {
          const _0x311106 = _0x11d3d2.apply(_0x442fab, arguments);
          _0x11d3d2 = null;
          return _0x311106;
        }
      } : function () {};
      _0x718c18 = false;
      return _0x229f0e;
    };
  }(),
  _0x14674b = _0x5e55f2(this, function () {
    const _0x57bb3a = typeof window !== "undefined" ? window : typeof process === "object" && typeof require === "function" && typeof global === "object" ? global : this;
    const _0x5ad095 = function () {
      const _0x5346cc = new _0x57bb3a.RegExp("^([^ ]+( +[^ ]+)+)+[^ ]}");
      return !_0x5346cc.test(_0x14674b);
    };
    return _0x5ad095();
  });
_0x14674b();
const _0x5ca265 = require("crypto-js"),
  _0x5c16b8 = _0x5ca265.enc.Utf8.parse("a0RymGy6Xdq3VJpX"),
  _0x3b68ee = _0x5ca265.enc.Utf8.parse("963d29989c1099cd"),
  _0x139a3f = require("moment");
let _0x1cb7c9, _0x55365a, _0x1d029a;
const _0x3a116d = $.generateUniqueID();
let _0x32642a = ($.isNode() ? process.env.hqzl : $.getdata("hqzl")) || "",
  _0x25c7a8 = [],
  _0x40d367 = 0,
  _0x50820e = 0;
class _0x29a0af {
  constructor(_0xcd3c50) {
    this.index = ++_0x40d367;
    this.name = this.index;
    this.valid = false;
    this.canRead = false;
    try {
      this.param = $.str2json(_0xcd3c50);
      this.ckValid = true;
    } catch (_0x28b031) {
      this.ckValid = false;
      $.logAndNotify("账号[" + this.index + "]CK格式错误");
    }
  }
  async my() {
    try {
      let _0x409521 = "" + $.randomString(16),
        _0x1fe9d3 = "",
        _0x580194 = "",
        _0x99c7d7 = "",
        _0x35944f = "https://hqapp.faw.cn/fawcshop/mall/v1/apiCus/getUserInfo",
        _0x592016 = "{\"userId\":\"" + this.param.aid + "\"}",
        _0x467dfe = this.param.az + "@" + this.param.aid,
        _0x47232a = _0x494c12(_0x35944f, _0x409521, _0x1fe9d3, _0x580194, _0x99c7d7, _0x467dfe, _0x592016);
      await _0x1728b5("post", _0x47232a);
      delete _0x47232a.headers["X-User-Token"];
      delete _0x47232a.headers.timestamp;
      delete _0x47232a.headers.nonce;
      delete _0x47232a.headers.signature;
      let _0x5d4c12 = _0x1cb7c9;
      if (!_0x5d4c12) {
        return;
      }
      _0x5d4c12.code == "000000" ? ($.logAndNotify("账号[" + this.name + "] 昵称 " + _0x5d4c12.data.nickname + " 手机号 " + $.phoneNum(_0x5d4c12.data.mobile) + " 当前积分 " + _0x5d4c12.data.scoreCount), this.valid = true, this.canRead = true) : await this.pushplus();
    } catch (_0x5f2276) {
      console.log(_0x5f2276);
    } finally {
      return Promise.resolve(1);
    }
  }
  async signin() {
    try {
      let _0x174f9f = "" + $.randomString(16),
        _0x54b38a = Date.now(),
        _0x51c3a1 = "" + $.randomString(64),
        _0x437655 = _0x57976a("" + _0x54b38a + _0x51c3a1 + "{\"scoreType\":\"2\"}", _0x5c16b8, _0x3b68ee),
        _0x4f7545 = "https://hqapp.faw.cn/fawcshop/collect-public/v1/score/addScore",
        _0x3acb0d = "{\"scoreType\":\"2\"}",
        _0x5b20b2 = this.param.az + "@" + this.param.aid,
        _0x1ecf04 = _0x494c12(_0x4f7545, _0x174f9f, _0x54b38a, _0x51c3a1, _0x437655, _0x5b20b2, _0x3acb0d);
      await _0x1728b5("post", _0x1ecf04);
      delete _0x1ecf04.headers["X-User-Token"];
      let _0x508853 = _0x1cb7c9;
      if (!_0x508853) {
        return;
      }
      if (_0x508853.code == "000000") {
        $.logAndNotify("账号[" + this.name + "] 签到 " + _0x508853.data.name);
      } else {
        if (_0x508853.code == "999999") {
          $.logAndNotify("账号[" + this.name + "] 签到 " + _0x508853.msg);
        }
      }
    } catch (_0x457a7d) {
      console.log(_0x457a7d);
    } finally {
      return Promise.resolve(1);
    }
  }
  async share() {
    try {
      let _0x18f68f = "" + $.randomString(16),
        _0x5bc0f7 = Date.now(),
        _0x110a8d = "" + $.randomString(64),
        _0x5a96b3 = _0x57976a("" + _0x5bc0f7 + _0x110a8d + "{\"scoreType\":\"4\"}", _0x5c16b8, _0x3b68ee),
        _0x2b2194 = "https://hqapp.faw.cn/fawcshop/collect-public/v1/score/addScore",
        _0x13ed89 = "{\"scoreType\":\"4\"}",
        _0x1b5b95 = this.param.az + "@" + this.param.aid,
        _0x4958b4 = _0x494c12(_0x2b2194, _0x18f68f, _0x5bc0f7, _0x110a8d, _0x5a96b3, _0x1b5b95, _0x13ed89);
      await _0x1728b5("post", _0x4958b4);
      delete _0x4958b4.headers["X-User-Token"];
      let _0x2bb52b = _0x1cb7c9;
      if (!_0x2bb52b) {
        return;
      }
      $.logAndNotify("账号[" + this.name + "] 分享 " + _0x2bb52b.data.name);
    } catch (_0x3cd06e) {
      console.log(_0x3cd06e);
    } finally {
      return Promise.resolve(1);
    }
  }
  async hot_list() {
    try {
      let _0x1e70a2 = "" + $.randomString(16),
        _0x2fa907 = "",
        _0x4c4429 = "",
        _0x36a650 = "",
        _0xa36841 = _0x38c437(2, 19),
        _0x790b56 = "https://hqapp.faw.cn/fawcshop/cms/api/front/content/v1/queryUnionContentPostList?columnCodeAll=COLUMN3%2CCOLUMN5&stats=6&pageNo=" + _0xa36841 + "&pageSize=10",
        _0x4fdab1 = "",
        _0x1dc8d3 = this.param.az + "@" + this.param.aid,
        _0x3cf6eb = _0x494c12(_0x790b56, _0x1e70a2, _0x2fa907, _0x4c4429, _0x36a650, _0x1dc8d3, _0x4fdab1);
      await _0x1728b5("get", _0x3cf6eb);
      delete _0x3cf6eb.headers["X-User-Token"];
      delete _0x3cf6eb.headers.timestamp;
      delete _0x3cf6eb.headers.nonce;
      delete _0x3cf6eb.headers.signature;
      let _0x3e66fe = _0x1cb7c9;
      if (!_0x3e66fe) {
        return;
      }
      let _0x5d3922 = Math.floor(Math.random() * 10000) + 5000;
      $.logAndNotify("账号[" + this.name + "] 热点列表 " + _0x3e66fe.msg + " 随机等待" + _0x5d3922 / 1000 + "秒....");
      let _0x250327 = _0x38c437(0, 9);
      this.contentId = _0x3e66fe.data[_0x250327].result.id;
      await $.wait(_0x5d3922);
    } catch (_0x457bcf) {
      console.log(_0x457bcf);
    } finally {
      return Promise.resolve(1);
    }
  }
  async hitokoto() {
    try {
      let _0xcdc4f1 = "",
        _0x51ea8e = "" + $.randomString(16),
        _0x20fd1d = "",
        _0x2abeab = "",
        _0x155bed = "",
        _0x20dd47 = this.param.az + "@" + this.param.aid,
        _0x3c32de = "https://v2.jinrishici.com/sentence",
        _0x409916 = _0x494c12(_0x3c32de, _0x51ea8e, _0x20fd1d, _0x2abeab, _0x155bed, _0x20dd47, _0xcdc4f1);
      await _0x1728b5("get", _0x409916);
      let _0x568aec = _0x1cb7c9;
      if (!_0x568aec) {
        return;
      }
      if (_0x568aec.status == "success") {
        this.content_text = _0x568aec.data.content;
      } else {
        $.logAndNotify("账号[" + this.name + "]获取随机语录失败！停止任务");
      }
    } catch (_0x2f06f5) {
      console.log(_0x2f06f5);
    } finally {}
  }
  async comment() {
    await this.hot_list();
    await this.hitokoto();
    try {
      let _0x3b0100 = "" + $.randomString(16),
        _0x10ecff = "",
        _0x1947cb = "",
        _0xb3d477 = "",
        _0x1e8459 = "https://hqapp.faw.cn/fawcshop/collect-sns/v1/dynamicTopic/saveCommentDetailsRevision",
        _0x2ee411 = "{\"commentContext\":\"" + this.content_text + "\",\"commentType\":\"8500\",\"contentId\":\"" + this.contentId + "\",\"parentId\":\"0\",\"fileString\":[]}",
        _0x2f7165 = this.param.az + "@" + this.param.aid,
        _0x10422f = _0x494c12(_0x1e8459, _0x3b0100, _0x10ecff, _0x1947cb, _0xb3d477, _0x2f7165, _0x2ee411);
      await _0x1728b5("post", _0x10422f);
      delete _0x10422f.headers["X-User-Token"];
      delete _0x10422f.headers.timestamp;
      delete _0x10422f.headers.nonce;
      delete _0x10422f.headers.signature;
      let _0x1a00a0 = _0x1cb7c9;
      if (!_0x1a00a0) {
        return;
      }
      let _0x58ced1 = Math.floor(Math.random() * 13000) + 8000;
      $.logAndNotify("账号[" + this.name + "] 评论 " + _0x1a00a0.msg + " 随机等待" + _0x58ced1 / 1000 + "秒....");
      await $.wait(_0x58ced1);
    } catch (_0x44304a) {
      console.log(_0x44304a);
    } finally {
      return Promise.resolve(1);
    }
  }
  async dy_list() {
    try {
      let _0x58a6da = "" + $.randomString(16),
        _0x2fbbee = "",
        _0x2a1381 = "",
        _0xb3cb7e = "",
        _0x18559d = _0x38c437(1, 10),
        _0x27e062 = _0x139a3f(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        _0x52d548 = "https://hqapp.faw.cn/fawcshop/collect-sns/v1/dynamicTopic/getDynamicList?pageNo=" + _0x18559d + "&refreshTime=" + _0x27e062 + "&likeFlag=0&orderByRule=RULE15&pageSize=10",
        _0xb265b7 = "",
        _0x4223cc = this.param.az + "@" + this.param.aid,
        _0x2b5a29 = _0x494c12(_0x52d548, _0x58a6da, _0x2fbbee, _0x2a1381, _0xb3cb7e, _0x4223cc, _0xb265b7);
      await _0x1728b5("get", _0x2b5a29);
      delete _0x2b5a29.headers["X-User-Token"];
      delete _0x2b5a29.headers.timestamp;
      delete _0x2b5a29.headers.nonce;
      delete _0x2b5a29.headers.signature;
      let _0x481c7b = _0x1cb7c9;
      if (!_0x481c7b) {
        return;
      }
      if (_0x481c7b.data[_0x18559d].content.length > 50 && _0x481c7b.data[_0x18559d].picList.length > 3) {
        this.dycontent = _0x481c7b.data[_0x18559d].content;
        this.fileString = _0x481c7b.data[_0x18559d].picList[1].imgPath;
        this.fileString1 = _0x481c7b.data[_0x18559d].picList[2].imgPath;
      } else {
        $.logAndNotify("账号[" + this.name + "]未抓到有效数据,重新抓取");
        await this.dy_list();
      }
    } catch (_0x48c08f) {
      console.log(_0x48c08f);
    } finally {
      return Promise.resolve(1);
    }
  }
  async saveDynamicInfoImgUrl() {
    await this.dy_list();
    try {
      let _0x591344 = "" + $.randomString(16),
        _0x142438 = "",
        _0x5b92b5 = "",
        _0x20c6c8 = "",
        _0x559565 = "https://hqapp.faw.cn/fawcshop/collect-sns/v1/dynamicTopic/saveDynamicInfoImgUrl";
      const _0x500a7e = {
        province: "北京市",
        city: "北京市",
        content: "" + this.dycontent,
        fileString: ["" + this.fileString, "" + this.fileString1]
      };
      let _0x375f98 = JSON.stringify(_0x500a7e),
        _0x14e0dc = this.param.az + "@" + this.param.aid,
        _0x17554e = _0x494c12(_0x559565, _0x591344, _0x142438, _0x5b92b5, _0x20c6c8, _0x14e0dc, _0x375f98);
      await _0x1728b5("post", _0x17554e);
      delete _0x17554e.headers["X-User-Token"];
      delete _0x17554e.headers.timestamp;
      delete _0x17554e.headers.nonce;
      delete _0x17554e.headers.signature;
      let _0x57e143 = _0x1cb7c9;
      if (!_0x57e143) {
        return;
      }
      let _0x11190b = Math.floor(Math.random() * 6000) + 16000;
      $.logAndNotify("账号[" + this.name + "] 发布动态 " + _0x57e143.msg + " 随机等待" + _0x11190b / 1000 + "秒....");
      await $.wait(_0x11190b);
    } catch (_0x1d86ea) {
      console.log(_0x1d86ea);
    } finally {
      return Promise.resolve(1);
    }
  }
  async pushplus() {
    try {
      let _0x50efb5 = "",
        _0x2e1e9c = this.param.az + "@" + this.param.aid,
        _0xdc895b = "",
        _0x3b62f9 = "",
        _0x3c674a = "",
        _0x1c1ebc = "",
        _0x3401c7 = "http://www.pushplus.plus/send?token=f944a36b922441618f0e19125bc9814e&title=红旗智联&content=账号[" + this.name + "]变量失效了,赶紧重新抓",
        _0x4b25ba = _0x494c12(_0x3401c7, _0xdc895b, _0x3b62f9, _0x3c674a, _0x1c1ebc, _0x2e1e9c, _0x50efb5);
      await _0x1728b5("get", _0x4b25ba);
      let _0x165df2 = _0x1cb7c9;
      if (!_0x165df2) {
        return;
      }
      _0x165df2.code == 200 ? ($.logAndNotify("消息发送成功"), await $.wait(3000)) : $.logAndNotify("消息发送失败");
    } catch (_0x1145e5) {
      console.log(_0x1145e5);
    } finally {}
  }
  async task_list() {
    try {
      let _0x3b6e64 = "" + $.randomString(16),
        _0x11397a = "",
        _0x213893 = "",
        _0x147dcc = "",
        _0x2a861b = "https://hqapp.faw.cn/fawcshop/members/task/v3/getTaskList",
        _0x19dce9 = "",
        _0x2ca184 = this.param.az + "@" + this.param.aid,
        _0x5dcc30 = _0x494c12(_0x2a861b, _0x3b6e64, _0x11397a, _0x213893, _0x147dcc, _0x2ca184, _0x19dce9);
      await _0x1728b5("get", _0x5dcc30);
      delete _0x5dcc30.headers["X-User-Token"];
      delete _0x5dcc30.headers.timestamp;
      delete _0x5dcc30.headers.nonce;
      delete _0x5dcc30.headers.signature;
      let _0x70585d = _0x1cb7c9;
      if (!_0x70585d) {
        return;
      }
      let _0x6787d4 = _0x70585d.data.dailyTaskList;
      for (const _0x416794 of _0x6787d4) {
        this.task_name = _0x416794.taskName;
        this.completeCount = _0x416794.completeCount;
        this.totalCount = _0x416794.totalCount;
        if (_0x416794.completeFlag == false) {
          _0x416794.taskCode == "PT-APP_share" && ($.logAndNotify("账号[" + this.name + "] " + this.task_name + "----" + this.completeCount + "/" + this.totalCount), await this.share(this.task_name));
          if (_0x416794.taskCode == "PT-APP_comment") {
            $.logAndNotify("账号[" + this.name + "] " + this.task_name + "----" + this.completeCount + "/" + this.totalCount);
            let _0x2389b8 = this.totalCount - this.completeCount;
            for (let _0x4d8930 = 0; _0x4d8930 < _0x2389b8; _0x4d8930++) {
              await this.comment(this.task_name);
            }
          }
          if (_0x416794.taskCode == "PT-APP_article") {
            $.logAndNotify("账号[" + this.name + "] " + this.task_name + "----" + this.completeCount + "/" + this.totalCount);
            await this.saveDynamicInfoImgUrl(this.task_name);
          }
        } else {
          $.logAndNotify("账号[" + this.name + "] " + this.task_name + " 已完成");
        }
      }
    } catch (_0xf77f40) {
      console.log(_0xf77f40);
    } finally {
      return Promise.resolve(1);
    }
  }
}
!(async () => {
  if (!(typeof $request !== "undefined")) {
    if (!(await _0x588a93())) {
      return;
    }
    await _0x535a32();
    if (!(await _0x5d3915())) {
      return;
    }
    let _0x39255a = [],
      _0xaa4ac3 = _0x25c7a8.filter(_0x18f1e7 => _0x18f1e7.ckValid);
    if (_0xaa4ac3.length > 0) {
      $.logAndNotify("\n-------------- 账号检测 --------------");
      _0x39255a = [];
      for (let _0x566b25 of _0xaa4ac3) {
        _0x39255a.push(_0x566b25.my());
      }
      await Promise.all(_0x39255a);
      _0xaa4ac3 = _0xaa4ac3.filter(_0x2363e9 => _0x2363e9.valid);
      if (_0xaa4ac3.length > 0) {
        $.logAndNotify("\n-------------- 每日签到 --------------");
        _0x39255a = [];
        for (let _0x52a14b of _0xaa4ac3.filter(_0x19117b => _0x19117b.canRead)) {
          _0x39255a.push(_0x52a14b.signin());
        }
        await Promise.all(_0x39255a);
      }
      if (_0xaa4ac3.length > 0) {
        $.logAndNotify("\n-------------- 任务列表 --------------");
        _0x39255a = [];
        for (let _0x1b07a8 of _0xaa4ac3.filter(_0x423c6b => _0x423c6b.canRead)) {
          _0x39255a.push(_0x1b07a8.task_list());
        }
        await Promise.all(_0x39255a);
      }
    }
    await $.showmsg();
  }
})().catch(_0x57961b => console.log(_0x57961b)).finally(() => $.done());
function _0x38c437(_0x389ab4, _0x472188) {
  _0x389ab4 = Math.ceil(_0x389ab4);
  _0x472188 = Math.floor(_0x472188);
  return Math.floor(Math.random() * (_0x472188 - _0x389ab4 + 1)) + _0x389ab4;
}
async function _0x535a32() {
  try {
    let _0x375641 = "https://v1.jinrishici.com/all.json",
      _0x43ae3d = "",
      _0x570469 = _0x5a92f9(_0x375641, _0x43ae3d);
    await _0x1728b5("get", _0x570469);
    let _0x437a0a = _0x1cb7c9;
    if (!_0x437a0a) {
      return;
    }
    $.logAndNotify("\n" + _0x437a0a.content + "  \n————《" + _0x437a0a.origin + "》" + _0x437a0a.author);
  } catch (_0x334cf6) {
    console.log(_0x334cf6);
  } finally {
    return Promise.resolve(1);
  }
}
async function _0x5d3915() {
  try {
    let _0x4b1995 = "http://111.67.197.7/api.php?act=km_logon&app=10002&uuid=" + _0x3a116d + "&kami=" + kami,
      _0x4c6c64 = "",
      _0xd2e486 = _0x5a92f9(_0x4b1995, _0x4c6c64);
    await _0x1728b5("get", _0xd2e486);
    let _0x2f4e3a = _0x1cb7c9;
    if (!_0x2f4e3a) {
      return;
    }
    if (_0x2f4e3a.code == 200) {
      console.log("\n卡密校验成功");
      return true;
    } else {
      console.log("\n⚠️卡密校验: " + _0x2f4e3a.msg + "!");
    }
  } catch (_0x58718d) {} finally {}
}
async function _0x588a93() {
  if (_0x32642a) {
    let _0x212a6f = envSplitor[0];
    for (let _0x3c52aa of envSplitor) {
      if (_0x32642a.indexOf(_0x3c52aa) > -1) {
        _0x212a6f = _0x3c52aa;
        break;
      }
    }
    for (let _0x181e60 of _0x32642a.split(_0x212a6f)) {
      if (_0x181e60) {
        _0x25c7a8.push(new _0x29a0af(_0x181e60));
      }
    }
    _0x50820e = _0x25c7a8.length;
  } else {
    console.log("\n❌未找到CK 请阅读脚本说明");
    return;
  }
  console.log("共找到" + _0x50820e + "个账号");
  return true;
}
function _0x57976a(_0x2b7624, _0x360adb, _0x31534d) {
  var _0x3699d0 = _0x5ca265.AES.encrypt(_0x2b7624, _0x360adb, {
    iv: _0x31534d,
    mode: _0x5ca265.mode.CBC
  });
  return _0x3699d0.toString();
}
function _0x494c12(_0x2503c1, _0x256819, _0x4e8b43, _0x29c0fa, _0x43c3fc, _0x586200, _0x435e46 = "") {
  let _0x76a9e2 = _0x2503c1.replace("//", "/").split("/")[1],
    _0x4f290a = _0x586200.match(/(\S*)@/)[1],
    _0x16d53a = _0x586200.match(/@([^;]+)/)[1];
  const _0x11e8d8 = {
    Authorization: _0x4f290a,
    platform: "2",
    aid: _0x16d53a,
    version: version,
    timestamp: _0x4e8b43,
    nonce: _0x29c0fa,
    signature: _0x43c3fc,
    tenantId: "03001001",
    "X-Feature": "sprint3-demo",
    anonymousId: _0x256819,
    Host: _0x76a9e2,
    Connection: "Keep-Alive",
    "User-Agent": "okhttp/3.11.0",
    "X-User-Token": "H9VgROuVNNHVqrQ7WuHr4dIHioWghuaj"
  };
  const _0x1a40a8 = {
    url: _0x2503c1,
    headers: _0x11e8d8,
    timeout: 5000
  };
  _0x435e46 && (_0x1a40a8.body = _0x435e46, _0x1a40a8.headers["content-type"] = "application/json", _0x1a40a8.headers["Content-Length"] = _0x1a40a8.body ? Buffer.byteLength(_0x435e46, "utf8") : 0);
  return _0x1a40a8;
}
function _0x5a92f9(_0x1741e7, _0xf5a250 = "") {
  let _0x41494f = _0x1741e7.replace("//", "/").split("/")[1];
  const _0x42fb6a = {
    Host: _0x41494f
  };
  const _0x186b88 = {
    url: _0x1741e7,
    headers: _0x42fb6a,
    timeout: 5000
  };
  _0xf5a250 && (_0x186b88.body = _0xf5a250, _0x186b88.headers["content-type"] = "application/json", _0x186b88.headers["Content-Length"] = _0x186b88.body ? Buffer.byteLength(_0xf5a250, "utf8") : 0);
  return _0x186b88;
}
async function _0x1728b5(_0x20e2c9, _0x534d30) {
  _0x1cb7c9 = null;
  _0x55365a = null;
  _0x1d029a = null;
  return new Promise(_0xee5bee => {
    $.send(_0x20e2c9, _0x534d30, async (_0x4d4dac, _0x5af64e, _0x4aefe9) => {
      try {
        _0x55365a = _0x5af64e;
        _0x1d029a = _0x4aefe9;
        if (_0x4d4dac) {
          _0x1cb7c9 = JSON.parse(_0x5af64e.body);
        } else {
          if (_0x4aefe9.body) {
            if (typeof _0x4aefe9.body == "object") {
              _0x1cb7c9 = _0x4aefe9.body;
            } else {
              try {
                _0x1cb7c9 = JSON.parse(_0x4aefe9.body);
              } catch (_0x4d369b) {
                _0x1cb7c9 = _0x4aefe9.body;
              }
            }
          }
        }
      } catch (_0x4a500b) {} finally {
        _0xee5bee();
      }
    });
  });
}
function Env(_0x148c1a, _0x23a834) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  return new class {
    constructor(_0x27e0f6, _0x18889b) {
      this.name = _0x27e0f6;
      this.notifyStr = "";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x18889b);
      console.log(this.name + "：行运始开 ".split("").reverse().join(""));
    }
    ["edoNsi".split("").reverse().join("")]() {
      return "denifednu".split("").reverse().join("") != typeof module && !!module.exports;
    }
    ["XnauQsi".split("").reverse().join("")]() {
      return "denifednu".split("").reverse().join("") != typeof $task;
    }
    ["egruSsi".split("").reverse().join("")]() {
      return "denifednu".split("").reverse().join("") != typeof $httpClient && "denifednu".split("").reverse().join("") == typeof $loon;
    }
    ["nooLsi".split("").reverse().join("")]() {
      return "undefined" != typeof $loon;
    }
    ["atadteg".split("").reverse().join("")](_0x4f5ba7) {
      let _0x4e97da = this.getval(_0x4f5ba7);
      if (/^@/.test(_0x4f5ba7)) {
        const [, _0x32cf88, _0x41a710] = /^@(.*?)\.(.*?)$/.exec(_0x4f5ba7),
          _0x4fb92a = _0x32cf88 ? this.getval(_0x32cf88) : "".split("").reverse().join("");
        if (_0x4fb92a) {
          try {
            const _0x2ad8e1 = JSON.parse(_0x4fb92a);
            _0x4e97da = _0x2ad8e1 ? this.lodash_get(_0x2ad8e1, _0x41a710, "".split("").reverse().join("")) : _0x4e97da;
          } catch (_0x56bb64) {
            _0x4e97da = "";
          }
        }
      }
      return _0x4e97da;
    }
    setdata(_0x2bd8fa, _0x5584ab) {
      let _0x4ad6e3 = !1;
      if (/^@/.test(_0x5584ab)) {
        const [, _0x4222fd, _0x476984] = /^@(.*?)\.(.*?)$/.exec(_0x5584ab),
          _0xeb625 = this.getval(_0x4222fd),
          _0x1856ce = _0x4222fd ? "llun".split("").reverse().join("") === _0xeb625 ? null : _0xeb625 || "{}" : "}{".split("").reverse().join("");
        try {
          const _0x5ae8c6 = JSON.parse(_0x1856ce);
          this.lodash_set(_0x5ae8c6, _0x476984, _0x2bd8fa);
          _0x4ad6e3 = this.setval(JSON.stringify(_0x5ae8c6), _0x4222fd);
        } catch (_0x464f7a) {
          const _0x421155 = {};
          this.lodash_set(_0x421155, _0x476984, _0x2bd8fa);
          _0x4ad6e3 = this.setval(JSON.stringify(_0x421155), _0x4222fd);
        }
      } else {
        _0x4ad6e3 = this.setval(_0x2bd8fa, _0x5584ab);
      }
      return _0x4ad6e3;
    }
    getval(_0x148d20) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x148d20) : this.isQuanX() ? $prefs.valueForKey(_0x148d20) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x148d20]) : this.data && this.data[_0x148d20] || null;
    }
    setval(_0x2429e5, _0xff6895) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x2429e5, _0xff6895) : this.isQuanX() ? $prefs.setValueForKey(_0x2429e5, _0xff6895) : this.isNode() ? (this.data = this.loaddata(), this.data[_0xff6895] = _0x2429e5, this.writedata(), !0) : this.data && this.data[_0xff6895] || null;
    }
    send(_0x4ee094, _0x388407, _0x522ee9 = () => {}) {
      if (_0x4ee094 != "get" && _0x4ee094 != "tsop".split("").reverse().join("") && _0x4ee094 != "put" && _0x4ee094 != "delete") {
        console.log("无效的http方法：" + _0x4ee094);
        return;
      }
      if (_0x4ee094 == "get" && _0x388407.headers) {
        delete _0x388407.headers["content-type"];
        delete _0x388407.headers["Content-Length"];
      } else {
        if (_0x388407.body && _0x388407.headers) {
          if (!_0x388407.headers["content-type"]) {
            _0x388407.headers["content-type"] = "nosj/noitacilppa".split("").reverse().join("");
          }
        }
      }
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          _0x388407.headers = _0x388407.headers || {};
          Object.assign(_0x388407.headers, {
            "X-Surge-Skip-Scripting": !1
          });
        }
        let _0x246aaa = {
          method: _0x4ee094,
          url: _0x388407.url,
          headers: _0x388407.headers,
          timeout: _0x388407.timeout,
          data: _0x388407.body
        };
        if (_0x4ee094 == "get") {
          delete _0x246aaa.data;
        }
        $axios(_0x246aaa).then(_0x1949cf => {
          const {
            status: _0x324b99,
            request: _0x3ac4b1,
            headers: _0x142c7c,
            data: _0x54c58b
          } = _0x1949cf;
          _0x522ee9(null, _0x3ac4b1, {
            statusCode: _0x324b99,
            headers: _0x142c7c,
            body: _0x54c58b
          });
        }).catch(_0x1a82b3 => console.log(_0x1a82b3));
      } else {
        if (this.isQuanX()) {
          _0x388407.method = _0x4ee094.toUpperCase();
          this.isNeedRewrite && (_0x388407.opts = _0x388407.opts || {}, Object.assign(_0x388407.opts, {
            hints: !1
          }));
          $task.fetch(_0x388407).then(_0x2dbbac => {
            const {
              statusCode: _0x2f0e20,
              request: _0x5d3d50,
              headers: _0x5c9d5a,
              body: _0x35983c
            } = _0x2dbbac;
            _0x522ee9(null, _0x5d3d50, {
              statusCode: _0x2f0e20,
              headers: _0x5c9d5a,
              body: _0x35983c
            });
          }, _0x1dbc72 => _0x522ee9(_0x1dbc72));
        } else {
          if (this.isNode()) {
            this.got = this.got ? this.got : require("got");
            const {
              url: _0x32e2c8,
              ..._0x8d1896
            } = _0x388407;
            this.instance = this.got.extend({
              followRedirect: false
            });
            this.instance[_0x4ee094](_0x32e2c8, _0x8d1896).then(_0xe51f0f => {
              const {
                statusCode: _0x1e9420,
                request: _0x380f92,
                headers: _0x15d613,
                body: _0x1a81fe
              } = _0xe51f0f;
              _0x522ee9(null, _0x380f92, {
                statusCode: _0x1e9420,
                headers: _0x15d613,
                body: _0x1a81fe
              });
            }, _0x545f39 => {
              const {
                message: _0x53c189,
                response: _0x4ad641
              } = _0x545f39;
              _0x522ee9(_0x53c189, _0x4ad641, _0x4ad641 && _0x4ad641.body);
            });
          }
        }
      }
    }
    ["emit".split("").reverse().join("")](_0x49dd53) {
      let _0x3b034a = {
        "M+": new Date().getMonth() + 1,
        "d+": new Date().getDate(),
        "h+": new Date().getHours(),
        "m+": new Date().getMinutes(),
        "s+": new Date().getSeconds(),
        "q+": Math.floor((new Date().getMonth() + 3) / 3),
        S: new Date().getMilliseconds()
      };
      /(y+)/.test(_0x49dd53) && (_0x49dd53 = _0x49dd53.replace(RegExp.$1, (new Date().getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0xb1b5f3 in _0x3b034a) new RegExp("(" + _0xb1b5f3 + ")").test(_0x49dd53) && (_0x49dd53 = _0x49dd53.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x3b034a[_0xb1b5f3] : ("00".split("").reverse().join("") + _0x3b034a[_0xb1b5f3]).substr(("" + _0x3b034a[_0xb1b5f3]).length)));
      return _0x49dd53;
    }
    async showmsg() {
      if (!this.notifyStr) {
        return;
      }
      let _0x28ba20 = this.name + " 运行通知\n" + this.notifyStr;
      if ($.isNode()) {
        var _0x126f15 = require("yfitoNdnes/.".split("").reverse().join(""));
        console.log("\n============== 推送 ==============");
        await _0x126f15.sendNotify(this.name, _0x28ba20);
      } else {
        this.msg(_0x28ba20);
      }
    }
    logAndNotify(_0x52818e) {
      console.log(_0x52818e);
      this.notifyStr += _0x52818e;
      this.notifyStr += "\n";
    }
    ["gsm".split("").reverse().join("")](_0x3be5cd = t, _0x430613 = "".split("").reverse().join(""), _0x5b6257 = "", _0x24c7f0) {
      const _0x30bb62 = _0x490848 => {
        if (!_0x490848) {
          return _0x490848;
        }
        if ("string" == typeof _0x490848) {
          return this.isLoon() ? _0x490848 : this.isQuanX() ? {
            "open-url": _0x490848
          } : this.isSurge() ? {
            url: _0x490848
          } : void 0;
        }
        if ("object" == typeof _0x490848) {
          if (this.isLoon()) {
            let _0xd06b34 = _0x490848.openUrl || _0x490848.url || _0x490848["open-url"],
              _0x27375c = _0x490848.mediaUrl || _0x490848["media-url"];
            return {
              openUrl: _0xd06b34,
              mediaUrl: _0x27375c
            };
          }
          if (this.isQuanX()) {
            let _0x39abed = _0x490848["open-url"] || _0x490848.url || _0x490848.openUrl,
              _0x1b88a8 = _0x490848["media-url"] || _0x490848.mediaUrl;
            return {
              "open-url": _0x39abed,
              "media-url": _0x1b88a8
            };
          }
          if (this.isSurge()) {
            let _0x81519c = _0x490848.url || _0x490848.openUrl || _0x490848["open-url"];
            return {
              url: _0x81519c
            };
          }
        }
      };
      this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x3be5cd, _0x430613, _0x5b6257, _0x30bb62(_0x24c7f0)) : this.isQuanX() && $notify(_0x3be5cd, _0x430613, _0x5b6257, _0x30bb62(_0x24c7f0)));
      let _0x3855a7 = ["".split("").reverse().join(""), "============== 系统通知 =============="];
      _0x3855a7.push(_0x3be5cd);
      _0x430613 && _0x3855a7.push(_0x430613);
      _0x5b6257 && _0x3855a7.push(_0x5b6257);
      console.log(_0x3855a7.join("\n"));
    }
    getMin(_0x40f0b5, _0x4aed93) {
      return _0x40f0b5 < _0x4aed93 ? _0x40f0b5 : _0x4aed93;
    }
    getMax(_0x3e9871, _0x51760d) {
      return _0x3e9871 < _0x51760d ? _0x51760d : _0x3e9871;
    }
    padStr(_0x2acb10, _0x5cd019, _0x1b9486 = "0") {
      let _0x2a2c86 = String(_0x2acb10);
      let _0xbb9ada = _0x5cd019 > _0x2a2c86.length ? _0x5cd019 - _0x2a2c86.length : 0;
      let _0x1ec43a = "".split("").reverse().join("");
      for (let _0x58b5bb = 0; _0x58b5bb < _0xbb9ada; _0x58b5bb++) {
        _0x1ec43a += _0x1b9486;
      }
      _0x1ec43a += _0x2a2c86;
      return _0x1ec43a;
    }
    phoneNum(_0x4fb62c) {
      if (_0x4fb62c.length == 11) {
        let _0x1c52a9 = _0x4fb62c.replace(/(\d{3})\d{4}(\d{4})/, "2$****1$".split("").reverse().join(""));
        return _0x1c52a9;
      } else {
        return _0x4fb62c;
      }
    }
    ["rts2nosj".split("").reverse().join("")](_0x5050f4, _0x451946, _0x517e7b = false) {
      let _0x197d42 = [];
      for (let _0x434f58 of Object.keys(_0x5050f4).sort()) {
        let _0x31956e = _0x5050f4[_0x434f58];
        if (_0x31956e && _0x517e7b) {
          _0x31956e = encodeURIComponent(_0x31956e);
        }
        _0x197d42.push(_0x434f58 + "=" + _0x31956e);
      }
      return _0x197d42.join(_0x451946);
    }
    str2json(_0x4296dd, _0xb2466f = false) {
      let _0x35b7d9 = {};
      for (let _0x46cedb of _0x4296dd.split("&")) {
        if (!_0x46cedb) {
          continue;
        }
        let _0x3a290e = _0x46cedb.indexOf("=");
        if (_0x3a290e == -1) {
          continue;
        }
        let _0x25ca6d = _0x46cedb.substr(0, _0x3a290e);
        let _0x330568 = _0x46cedb.substr(_0x3a290e + 1);
        if (_0xb2466f) {
          _0x330568 = decodeURIComponent(_0x330568);
        }
        _0x35b7d9[_0x25ca6d] = _0x330568;
      }
      return _0x35b7d9;
    }
    generateUniqueID() {
      const _0x57764d = require("so".split("").reverse().join(""));
      const _0x247339 = _0x57764d.networkInterfaces();
      const _0xe2e070 = [];
      for (const _0xc4382d in _0x247339) {
        const _0x1a4eaa = _0x247339[_0xc4382d];
        for (const _0x429aff of _0x1a4eaa) {
          if (_0x429aff.mac && _0x429aff.mac !== "00:00:00:00:00:00" && _0x429aff.mac !== "ff:ff:ff:ff:ff:ff") {
            _0xe2e070.push(_0x429aff.mac);
          }
        }
      }
      _0xe2e070.sort();
      const _0x2b941a = _0xe2e070.join("");
      return _0x2b941a;
    }
    randomString(_0x29b6c0, _0x45b871 = "abcdef0123456789") {
      let _0x14c677 = "";
      for (let _0x199743 = 0; _0x199743 < _0x29b6c0; _0x199743++) {
        _0x14c677 += _0x45b871.charAt(Math.floor(Math.random() * _0x45b871.length));
      }
      return _0x14c677;
    }
    randomList(_0x2d9bb4) {
      let _0x288dfe = Math.floor(Math.random() * _0x2d9bb4.length);
      return _0x2d9bb4[_0x288dfe];
    }
    ["tiaw".split("").reverse().join("")](_0x17aaa3) {
      return new Promise(_0x1393e1 => setTimeout(_0x1393e1, _0x17aaa3));
    }
    done(_0x50dd98 = {}) {
      const _0x136842 = new Date().getTime(),
        _0x1757f4 = (_0x136842 - this.startTime) / 1000;
      console.log("\n" + this.name + " 运行结束，共运行了 " + _0x1757f4 + "！秒 ".split("").reverse().join(""));
      if (this.isSurge() || this.isQuanX() || this.isLoon()) {
        $done(_0x50dd98);
      }
    }
  }(_0x148c1a, _0x23a834);
}