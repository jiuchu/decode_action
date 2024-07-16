//Tue Jul 16 2024 03:29:18 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const {
  getToken,
  checkCk,
  validateCarmeWithType,
  User_Agent,
  checkCarmeCount,
  getUserInfo,
  tryCatchPromise,
  sign,
  couponNotify,
  getCookies
} = require("./common.js");
const _0x1428f0 = require("request");
const _0xa6d6a8 = require("md5");
const _0x517fdd = require("moment");
const _0x28f47f = 11;
const _0x42e8ae = process.env.couponValue || "39";
const _0x3b070e = process.env.ELE_CARME;
const _0x23d793 = process.env.threadCount || "1";
function _0x23e35a(_0x42bd2c) {
  const _0x80248e = _0x517fdd(_0x42bd2c).startOf("day");
  const _0xb28f03 = {
    hour: 10,
    minute: 0,
    second: 0,
    millisecond: 0
  };
  const _0x192d60 = _0x80248e.clone().set(_0xb28f03);
  const _0x3a3082 = _0x517fdd(_0x42bd2c).isAfter(_0x192d60);
  const _0x4bd8c1 = _0x517fdd(_0x42bd2c);
  if (_0x3a3082) {
    _0x4bd8c1.add(1, "day");
  }
  const _0x2d88c9 = {
    hour: 10,
    minute: 0,
    second: 0,
    millisecond: 0
  };
  _0x4bd8c1.set(_0x2d88c9);
  return _0x4bd8c1.valueOf();
}
async function _0x5941b2(_0x381127) {
  const _0x229b7f = {
    bizScene: "IDIOM",
    bizParam: "{\"type\":\"ggetGold\"}",
    bizMethod: "queryIndex"
  };
  let _0x4a7f98 = await _0x24835d(_0x381127, _0x229b7f);
  return _0x4a7f98.data;
}
async function _0x24835d(_0x8ee552, _0x4abe62) {
  const _0x257ed4 = {
    authority: "shopping.ele.me",
    accept: "application/json",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    origin: "https://r.ele.me",
    pragma: "no-cache",
    referer: "https://r.ele.me/linkgame/index.html?navType=3&spm-pre=a2ogi.13162730.zebra-ele-login-module-9089118186&spm=a13.b_activity_kb_m71293.0.0",
    cookie: _0x8ee552,
    "x-ele-ua": "RenderWay/H5 AppName/wap Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
    "user-agent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
  };
  const _0x50f895 = new Date().getTime();
  const _0x366a1c = 12574478;
  var _0xd5d7d6 = "data=" + encodeURIComponent(JSON.stringify(_0x4abe62));
  const _0x5e57aa = getToken(_0x8ee552),
    _0x8b72da = _0x5e57aa.split("_")[0];
  const _0x676c87 = _0xa6d6a8(_0x8b72da + "&" + _0x50f895 + "&" + _0x366a1c + "&" + JSON.stringify(_0x4abe62), _0x3b070e);
  const _0x4b5db8 = {
    url: "https://shopping.ele.me/h5/mtop.alsc.playgame.mini.game.dispatch/1.0/?jsv=2.6.1&appKey=12574478&t=" + _0x50f895 + "&sign=" + _0x676c87 + "&api=mtop.alsc.playgame.mini.game.dispatch&v=1.0&type=originaljson&dataType=json&timeout=5000&subDomain=shopping&mainDomain=ele.me&H5Request=true&pageDomain=ele.me&ttid=h5%40chrome_android_87.0.4280.141&SV=5.0",
    method: "POST",
    headers: _0x257ed4,
    body: _0xd5d7d6
  };
  return tryCatchPromise(_0x5119f1 => {
    _0x1428f0(_0x4b5db8, async (_0x5a54ed, _0x5a12fe, _0x57b0c9) => {
      if (!_0x5a54ed && _0x5a12fe.statusCode === 200) {
        try {
          const _0xb44dcb = JSON.parse(_0x57b0c9);
          _0x5119f1(_0xb44dcb);
        } catch (_0x2c0178) {
          console.log(_0x57b0c9);
          _0x5119f1(null);
        }
      } else {
        _0x5119f1(null);
      }
    });
  });
}
async function _0x6f9849(_0x19e4a2, _0x5426f9, _0x24e046) {
  const _0x42713d = {
    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    Cookie: _0x19e4a2,
    "x-tap": "wx",
    referer: "https://servicewechat.com/wxece3a9a4c82f58c9/532/page-frame.html",
    "mini-janus": "3%40s41AHfqDnza7twZ2HI4gXYAtN9eRII6d1C2B5eTDUozQHuWiR6VTpHEdvgDci1%3D%3D",
    "User-Agent": "Mozilla/5.0 (Linux; Android 13; Pixel 4 XL Build/TP1A.220905.004; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5197 MMWEBSDK/20221012 MMWEBID/3313 MicroMessenger/8.0.30.2260(0x28001E55) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android"
  };
  const _0x57905b = {
    condition: "",
    latitude: 30.17853,
    longitude: 120.221101,
    tabCode: "HONG_BAO",
    sourceFrom: "ELEME_WECHAT_MINIAPP",
    extInfo: "{\"miniAppVersion\":\"10.19.31\"}"
  };
  const _0x22f091 = new Date().getTime();
  const _0x27b2e5 = 12574478;
  var _0x3531e5 = "data=" + encodeURIComponent(JSON.stringify(_0x57905b));
  const _0x8f29ad = _0x5426f9.split(";")[0],
    _0x7b3bc = _0x8f29ad.split("_")[0];
  const _0x3d86cf = _0xa6d6a8(_0x7b3bc + "&" + _0x22f091 + "&" + _0x27b2e5 + "&" + JSON.stringify(_0x57905b), _0x3b070e);
  const _0xf4abd9 = {
    url: "https://guide-acs.m.taobao.com/h5/mtop.alsc.personal.querypasslist/1.0/2.0/?jsv=2.4.12&appKey=12574478&t=" + _0x22f091 + "&sign=" + _0x3d86cf + "&c=" + _0x5426f9 + "&api=mtop.alsc.personal.queryPassList&dataType=json&method=GET&timeout=10000&v=1.0&type=originaljson&ttid=wxece3a9a4c82f58c9%40wechat_android_11.1.5&accountSite=eleme&needLogin=true&ecole=1&_bx-m=1",
    method: "GET",
    headers: _0x42713d,
    body: _0x3531e5
  };
  return tryCatchPromise(_0x24b9c1 => {
    _0x1428f0(_0xf4abd9, async (_0x1f09bb, _0x2485b8, _0xe9a4a9) => {
      if (!_0x1f09bb && _0x2485b8.statusCode === 200) {
        try {
          const _0x31315b = JSON.parse(_0xe9a4a9);
          if (_0x31315b.c) {
            _0x24b9c1(_0x31315b.c);
          } else {
            if (_0x31315b.data.result) {
              let _0x4b0041 = _0x31315b.data.result.passInfoList[0];
              if (_0x4b0041) {
                let _0x4e9bee = _0x517fdd(new Date().getTime());
                let _0x12e906 = _0x4e9bee.startOf("day").valueOf();
                let _0x359525 = _0x4b0041.benefitList.filter(_0x2df974 => _0x2df974.benefitType === "ELE_COMMODITY_HB");
                let _0x153705 = _0x359525.filter(_0x1f9a7e => {
                  return _0x1f9a7e.gmtCreate >= _0x12e906 / 1000 + "";
                });
                let _0x2229bf = _0x153705.filter(_0x24e845 => {
                  return _0x24e845.amountText.amountText === _0x42e8ae;
                });
                if (_0x2229bf.length > 0) {
                  console.log("抢券成功", _0x2229bf[0].title);
                  await couponNotify(_0x19e4a2, "###抢券成功推送\n手机号：" + _0x24e046 + "\n抢券成功" + _0x2229bf[0].title);
                  process.exit(0);
                } else {
                  console.log("抢券失败");
                  process.exit(0);
                }
              } else {
                console.log("抢券失败");
                process.exit(0);
              }
            } else {
              console.log("抢券失败");
              process.exit(0);
            }
          }
        } catch (_0x809b07) {
          console.log("查询抢券结果异常，请到 app 中查看");
          process.exit(0);
        }
      } else {
        console.log("抢券失败");
        process.exit(0);
      }
    });
  });
}
async function _0x477589(_0x1c8efd) {
  const _0x71c99 = {
    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    Cookie: _0x1c8efd,
    "User-Agent": User_Agent
  };
  const _0x458878 = new Date().getTime();
  const _0x351be3 = 12574478;
  const _0x61d3c2 = {
    actId: "20221207144029906162546384",
    collectionId: "20221216181231449964003945",
    bizScene: "game_center",
    longitude: "114.88232396543026",
    latitude: "30.4464809037745"
  };
  var _0x20936f = "data=" + encodeURIComponent(JSON.stringify(_0x61d3c2));
  const _0x4d7fc9 = getToken(_0x1c8efd),
    _0x3c0f48 = _0x4d7fc9.split("_")[0];
  const _0x1f78ff = await sign(_0x3c0f48 + "&" + _0x458878 + "&" + _0x351be3 + "&" + JSON.stringify(_0x61d3c2), _0x3b070e);
  const _0x421f29 = {
    url: "https://mtop.ele.me/h5/mtop.koubei.interactioncenter.platform.right.exchangelist/1.0/?jsv=2.6.1&appKey=12574478&ttid=1601274958480%40eleme_android_10.14.3&t=" + _0x458878 + "&sign=" + _0x1f78ff + "&api=mtop.koubei.interactioncenter.platform.right.exchangelist",
    method: "POST",
    headers: _0x71c99,
    body: _0x20936f
  };
  return tryCatchPromise(_0x96c8c2 => {
    _0x1428f0(_0x421f29, async (_0x30812e, _0x264e0a, _0x5df090) => {
      if (!_0x30812e && _0x264e0a.statusCode == 200) {
        try {
          const _0x10f982 = JSON.parse(_0x5df090);
          if (_0x10f982.data) {
            const _0x2aaf74 = _0x10f982.data.data.rightInfoList;
            for (let _0x453eff = 0; _0x453eff < _0x2aaf74.length; _0x453eff++) {
              const _0x55efea = _0x2aaf74[_0x453eff];
              console.log(_0x55efea.rightName + "==>" + _0x55efea.rightValue + "==>" + _0x55efea.rightId);
              if (_0x55efea.rightValue === _0x42e8ae) {
                console.log("开始抢" + _0x42e8ae + "元券");
                while (true) {
                  await _0x128423(_0x1c8efd, _0x55efea.rightId);
                }
              }
            }
          }
          _0x96c8c2(_0x10f982);
        } catch (_0x399c5f) {
          console.log(_0x399c5f);
          _0x96c8c2(null);
        }
      } else {
        _0x96c8c2(null);
      }
    });
  });
}
function _0xeacdc4() {
  const _0x145992 = {
    "User-Agent": User_Agent
  };
  const _0x5316e7 = {
    url: "https://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp",
    method: "GET",
    headers: _0x145992
  };
  return tryCatchPromise(_0x1ea2ab => {
    _0x1428f0(_0x5316e7, async (_0x2ce011, _0x435771, _0x15b58c) => {
      if (!_0x2ce011 && _0x435771.statusCode === 200) {
        try {
          const _0x372487 = JSON.parse(_0x15b58c);
          if (_0x372487.data) {
            _0x1ea2ab(_0x372487.data.t);
          } else {
            _0x1ea2ab(null);
          }
        } catch (_0x35550b) {
          _0x1ea2ab(null);
        }
      } else {
        _0x1ea2ab(null);
      }
    });
  });
}
async function _0x128423(_0x32a381, _0xaf617d, _0xdc2b5e) {
  const _0x20a168 = {
    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    Cookie: _0x32a381,
    "User-Agent": User_Agent
  };
  const _0x436cf2 = new Date().getTime();
  const _0x371847 = 12574478;
  const _0x4891a0 = {
    actId: "20221207144029906162546384",
    collectionId: "20221216181231449964003945",
    copyId: _0xaf617d,
    bizScene: "game_center",
    channel: "abcd",
    asac: "2A22C0239QW1FOL3UUQY7U"
  };
  var _0x5e63df = "data=" + encodeURIComponent(JSON.stringify(_0x4891a0));
  const _0x190dee = getToken(_0x32a381),
    _0x278001 = _0x190dee.split("_")[0];
  const _0x37a118 = _0xa6d6a8(_0x278001 + "&" + _0x436cf2 + "&" + _0x371847 + "&" + JSON.stringify(_0x4891a0), _0x3b070e);
  const _0x2d6e9d = {
    url: "https://guide-acs.m.taobao.com/h5/mtop.koubei.interactioncenter.platform.right.exchange.v2/1.0/5.0/?jsv=2.7.1&SV=5.0&appKey=12574478&ttid=1601274958480%40eleme_android_10.14.3&t=" + _0x436cf2 + "&sign=" + _0x37a118 + "&api=mtop.koubei.interactioncenter.platform.right.exchange.v2",
    method: "POST",
    headers: _0x20a168,
    body: _0x5e63df
  };
  const _0x4f9c0c = {
    length: _0x23d793
  };
  const _0x5f00b7 = Array.from(_0x4f9c0c, () => {
    return tryCatchPromise(_0x4a2132 => {
      _0x1428f0(_0x2d6e9d, async (_0x309052, _0x3609a9, _0x5f1788) => {
        if (!_0x309052 && _0x3609a9.statusCode === 200) {
          try {
            const _0x40da56 = JSON.parse(_0x5f1788);
            if (_0x40da56.data.data) {
              console.log("抢券成功，获得:" + _0x40da56.data.data[0].rightName);
              await couponNotify(_0x32a381, "###抢券成功推送\n手机号：" + _0xdc2b5e + "\n抢券成功" + _0x40da56.data.data[0].rightName);
              process.exit(0);
            } else {
              _0x4a2132(null);
            }
          } catch (_0x121d52) {
            console.log(_0x121d52);
            _0x4a2132(null);
          }
        } else {
          _0x4a2132(null);
        }
      });
    });
  });
  await Promise.all(_0x5f00b7).then(_0xb280d1 => {}).catch(_0x552d9a => {});
}
async function _0x320a1f() {
  await validateCarmeWithType(_0x3b070e, 1);
  const _0x4b7cf1 = getCookies("elmqqck");
  for (let _0x27eeaa = 0; _0x27eeaa < _0x4b7cf1.length; _0x27eeaa++) {
    let _0x410beb = _0x4b7cf1[_0x27eeaa];
    _0x410beb = await checkCk(_0x410beb, _0x27eeaa);
    if (!_0x410beb) {
      process.exit(0);
    }
    let _0x58b1de = await getUserInfo(_0x410beb);
    if (!_0x58b1de.username) {
      console.log("第", _0x27eeaa + 1, "账号失效！请重新登录！！！😭");
      process.exit(0);
    }
    const _0x45c5e5 = _0x58b1de.user_id;
    let _0x39a8b2 = _0x58b1de.mobile;
    console.log("****** #" + (_0x27eeaa + 1), _0x39a8b2, "*********");
    console.log("账号的 id 为", _0x45c5e5);
    console.log("当前抢券线程数为", _0x23d793);
    let _0x2969bb = await _0x5941b2(_0x410beb);
    let _0x44d1e0 = -1;
    if (_0x2969bb.data) {
      _0x44d1e0 = JSON.parse(_0x2969bb.data).num;
    } else {
      _0x44d1e0 = -1;
    }
    if (_0x44d1e0 !== -1) {
      if (_0x42e8ae === "20" && _0x44d1e0 < 13999) {
        console.log("金币不够兑换 20 元券，程序结束");
        process.exit(0);
      } else {
        if (_0x42e8ae === "39" && _0x44d1e0 < 9999) {
          console.log("金币不够兑换 39 元券，程序结束");
          process.exit(0);
        } else {
          if (_0x42e8ae === "12" && _0x44d1e0 < 8999) {
            console.log("金币不够兑换 12 元券，程序结束");
            process.exit(0);
          } else {
            if (_0x42e8ae === "5" && _0x44d1e0 < 3999) {
              console.log("金币不够兑换 5 元券，程序结束");
              process.exit(0);
            }
          }
        }
      }
    }
    await checkCarmeCount(_0x3b070e, _0x45c5e5, _0x28f47f);
    let _0x2686c4 = "20230621180222426368753918";
    if (_0x42e8ae === "20") {
      _0x2686c4 = "20230627110035952340005303";
    } else {
      if (_0x42e8ae === "12") {
        _0x2686c4 = "20230627110004603355958966";
      } else {
        if (_0x42e8ae === "5") {
          _0x2686c4 = "20230627105739214308730651";
        }
      }
    }
    console.log("本次抢券的面额为：" + _0x42e8ae);
    let _0x24ce78 = await _0xeacdc4();
    if (!_0x24ce78) {
      _0x24ce78 = new Date().getTime();
    }
    let _0x428b23 = _0x23e35a(Number(_0x24ce78));
    let _0x43431d = _0x428b23 - _0x24ce78 - 5000;
    console.log("程序将在", _0x43431d / 1000, "秒后开始抢券");
    setTimeout(async () => {
      _0xe8fee9(_0x410beb, _0x39a8b2);
      while (true) {
        await _0x128423(_0x410beb, _0x2686c4, _0x39a8b2);
      }
    }, _0x43431d);
  }
}
function _0xe8fee9(_0x3bdea1, _0x39c9) {
  setTimeout(async () => {
    let _0x51e738 = await _0x6f9849(_0x3bdea1, "64c767d7e6851eebe3c8cd476b0bc622_1692237574823;6f86648948993abca30366d96015297a", _0x39c9);
    if (_0x51e738) {
      await _0x6f9849(_0x3bdea1, _0x51e738, _0x39c9);
    }
    process.exit(0);
  }, 10000);
}
_0x320a1f();
function Env(t, e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      return new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"),
          n = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": o,
              Accept: "*/*"
            }
          };
        this.post(n, (t, e, i) => s(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) {
          return {};
        }
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (r = Object(r)[t], void 0 === r) {
        return s;
      }
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : "";
        if (r) {
          try {
            const t = JSON.parse(r);
            e = t ? this.lodash_get(t, i, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
          o = this.getval(i),
          h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t);
          s = this.setval(JSON.stringify(o), i);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null);
            e.cookieJar = this.ckjar;
          }
        } catch (t) {
          this.logErr(t);
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body);
      }));
    }
    post(t, e = () => {}) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(t, (t, s, i) => {
          !t && s && (s.body = i, s.statusCode = s.status);
          e(t, s, i);
        });
      } else {
        if (this.isQuanX()) {
          t.method = "POST";
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: i,
              headers: r,
              body: o
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: r,
              body: o
            }, o);
          }, t => e(t));
        } else {
          if (this.isNode()) {
            this.initGotEnv(t);
            const {
              url: s,
              ...i
            } = t;
            this.got.post(s, i).then(t => {
              const {
                statusCode: s,
                statusCode: i,
                headers: r,
                body: o
              } = t;
              e(null, {
                status: s,
                statusCode: i,
                headers: r,
                body: o
              }, o);
            }, t => {
              const {
                message: s,
                response: i
              } = t;
              e(s, i, i && i.body);
            });
          }
        }
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) {
          return t;
        }
        if ("string" == typeof t) {
          return this.isLoon() ? t : this.isQuanX() ? {
            "open-url": t
          } : this.isSurge() ? {
            url: t
          } : void 0;
        }
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            };
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            };
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1000;
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }
  }(t, e);
}