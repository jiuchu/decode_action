//Fri Sep 13 2024 02:54:14 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("笛扬,教程地址：https:wjkjs.top"),
  notify = $.isNode() ? require("./sendNotify") : "",
  CryptoJS = require("crypto-js"),
  salt = "FR*r!isE5W",
  appid = 68;
let cookiesArr = [],
  message = "",
  channelId = ["640e83fc79f6be3ee82e0cfc", "640e932779f6be3ee82e1060", "640ad56079f6be3ee82dbfce", "640ad573e305b42cb98d448f", "640ad6fa79f6be3ee82dc008", "640e835e79f6be3ee82e0ccb"];
cookie = ($.isNode() ? process.env.dyxw : $.getdata("dyxw")) || "";
helpAu = ($.isNode() ? process.env.dyxwhelpAu : $.getdata("dyxwhelpAu")) || true;
!(async () => {
  await requireConfig();
  for (let _0x500813 = 0; _0x500813 < cookiesArr.length; _0x500813++) {
    cookiesArr[_0x500813] && (sessionid = cookiesArr[_0x500813].split("&")[0], $.ACCOUNT = cookiesArr[_0x500813].split("&")[1], msg = "", $.index = _0x500813 + 1, $.nickName = "", $.userId = "", $.mobile = "", $.userIdStr = "", $.vehicleToken = "", $.taskList = {}, $.queryList = {}, await account_detail(), console.log("\n******开始【🐳笛扬账号" + $.index + "】" + $.nickName + "|" + $.mobile + "*********\n"), await main());
  }
  if ($.isNode() && message) {
    await notify.sendNotify("" + $.name, "" + message);
  }
})().catch(_0x528a92 => $.logErr(_0x528a92)).finally(() => $.done());
async function main() {
  if ($.userId) {
    console.log("【获取任务列表】");
    await numberCenter();
    console.log("【开始完成任务】");
    await article();
    for (i = 0; i < $.taskList.length; i++) {
      if ($.taskList[i].completed === 1) {
        console.log("[" + $.taskList[i].name + "]已完成");
        continue;
      } else console.log("去完成任务：" + $.taskList[i].name), await doTask($.taskList[i]);
    }
    helpAu == true && (console.log("【前往助力作者】"), await invite());
    console.log("【查询账号信息】");
    await account_detail();
    console.log("拥有:[" + $.integral + "]积分 | 等级:[" + $.grade + "]-" + $.grade_name);
    msg += "拥有:[" + $.integral + "]积分 \n等级:[" + $.grade + "]-" + $.grade_name + "\n\n";
    await showMsg();
  } else console.log("获取userId失败，退出任务");
}
async function doTask(_0x201928) {
  let _0x101d19 = JSON.stringify(_0x201928.id),
    _0x21c82d = Number(_0x201928.frequency) - Number(_0x201928.finish_times);
  await signin();
  switch (_0x101d19) {
    case "337":
      await signin();
      break;
    case "1702":
      for (j = 0; j < _0x21c82d && j < $.acticleList.length; j++) {
        console.log("去浏览：" + $.acticleList[j].list_title);
        await read($.acticleList[j].id);
        await $.wait(1500);
      }
      break;
    case "1698":
      for (j = 0; j < _0x21c82d && j < $.acticleList.length; j++) {
        console.log("去分享：" + $.acticleList[j].list_title);
        await share($.acticleList[j].id);
        await $.wait(1500);
      }
      break;
    case "1701":
      for (j = 0; j < _0x21c82d && j < $.acticleList.length; j++) {
        console.log("去评论：" + $.acticleList[j].list_title);
        await comment($.acticleList[j].id);
        await $.wait(1500);
      }
      break;
    case "1700":
      for (j = 0; j < _0x21c82d && j < $.acticleList.length; j++) {
        console.log("去点赞：" + $.acticleList[j].list_title);
        await like($.acticleList[j].id);
        await $.wait(1500);
      }
      break;
    case "342":
      for (j = 0; j < _0x21c82d && j < $.acticleList.length; j++) {
        await local();
        await $.wait(1500);
      }
      break;
    case "1709":
      console.log("邀请功能暂未上线");
      break;
    default:
      console.log(_0x201928.name + "暂未上线,请反馈作者");
  }
}
async function credential_auth() {
  let _0x5c339f = {
    "url": "https://passport.tmuyun.com/web/oauth/credential_auth",
    "body": "client_id=48&password=" + encodeURIComponent($.pwd) + "&phone_number=" + $.mobile,
    "headers": {
      "Host": "passport.tmuyun.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(_0x1c4bbd => {
    $.post(_0x5c339f, async (_0x31c81b, _0x5b0005, _0x3ae54a) => {
      try {
        if (_0x31c81b) {
          console.log("" + _0x31c81b);
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (_0x3ae54a) {
            _0x3ae54a = JSON.parse(_0x3ae54a);
            if (_0x3ae54a.code === 0) {
              await login(_0x3ae54a.data.authorization_code.code);
            } else console.log(_0x3ae54a.message);
          } else console.log("没有返回数据");
        }
      } catch (_0x210d45) {
        $.logErr(_0x210d45, _0x5b0005);
      } finally {
        _0x1c4bbd(_0x3ae54a);
      }
    });
  });
}
async function login(_0x268690) {
  let _0x12670b = "code=" + _0x268690;
  return sessionid = "63777162fe3fc118b09fab89", new Promise(_0x2b3c78 => {
    $.post(taskPostUrl("/api/zbtxz/login", _0x12670b), async (_0x39d817, _0x4e8bcc, _0x53072f) => {
      try {
        if (_0x39d817) console.log("" + _0x39d817), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x53072f) {
            _0x53072f = JSON.parse(_0x53072f);
            if (_0x53072f.code === 0) sessionid = _0x53072f.data.session.id;else {}
          } else {
            console.log("没有返回数据");
          }
        }
      } catch (_0x3b11e6) {
        $.logErr(_0x3b11e6, _0x4e8bcc);
      } finally {
        _0x2b3c78(_0x53072f);
      }
    });
  });
}
async function account_detail() {
  let _0x5a52fc = "";
  return new Promise(_0xcaf5b5 => {
    $.get(taskUrl("/api/user_mumber/account_detail", _0x5a52fc), async (_0x26122e, _0xf04be0, _0x517d87) => {
      try {
        if (_0x26122e) console.log("" + _0x26122e), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x517d87) {
            _0x517d87 = JSON.parse(_0x517d87);
            if (_0x517d87.code === 0) {
              $.userId = _0x517d87.data.rst.id;
              $.nickName = _0x517d87.data.rst.nick_name;
              $.mobile = _0x517d87.data.rst.mobile;
              $.grade = _0x517d87.data.rst.grade;
              $.grade_name = _0x517d87.data.rst.grade_name;
              $.integral = _0x517d87.data.rst.total_integral;
            } else console.log(JSON.stringify(_0x517d87));
          } else {
            console.log("没有返回数据");
          }
        }
      } catch (_0x103c7f) {
        $.logErr(_0x103c7f, _0xf04be0);
      } finally {
        _0xcaf5b5(_0x517d87);
      }
    });
  });
}
async function numberCenter() {
  let _0x10a74b = "?is_new=1";
  return new Promise(_0x32abc1 => {
    $.get(taskUrl("/api/user_mumber/numberCenter", _0x10a74b), async (_0x28826b, _0x45a3dd, _0x2c1fcf) => {
      try {
        if (_0x28826b) console.log("" + _0x28826b), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x2c1fcf) {
            _0x2c1fcf = JSON.parse(_0x2c1fcf);
            if (_0x2c1fcf.code === 0) console.log("获取成功！"), $.taskList = _0x2c1fcf.data.rst.user_task_list;else {
              console.log(JSON.stringify(_0x2c1fcf));
            }
          } else console.log("没有返回数据");
        }
      } catch (_0x3ce8b8) {
        $.logErr(_0x3ce8b8, _0x45a3dd);
      } finally {
        _0x32abc1(_0x2c1fcf);
      }
    });
  });
}
async function signin() {
  let _0x2e0ae3 = "";
  return new Promise(_0x365e6e => {
    $.get(taskUrl("/api/user_mumber/sign", _0x2e0ae3), async (_0x5bb6df, _0x47d671, _0x414e4d) => {
      try {
        if (_0x5bb6df) console.log("" + _0x5bb6df), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x414e4d) {
            _0x414e4d = JSON.parse(_0x414e4d);
            if (_0x414e4d.code === 0) console.log("签到成功！获得：" + _0x414e4d.data.signIntegral + "积分");else {
              console.log(_0x414e4d.message);
            }
          } else console.log("没有返回数据");
        }
      } catch (_0x1f5a67) {
        $.logErr(_0x1f5a67, _0x47d671);
      } finally {
        _0x365e6e(_0x414e4d);
      }
    });
  });
}
async function article() {
  let _0x5c5626 = "?channel_id=" + channelId[Math.floor(Math.random() * channelId.length)] + "&isDiFangHao=false&is_new=1&list_count=" + Math.floor(Math.random() * 5 + 1) * 10 + "&size=10&start=" + Date.now();
  return new Promise(_0x5817fc => {
    $.get(taskUrl("/api/article/channel_list", _0x5c5626), async (_0x3ff038, _0x282b64, _0x467d1e) => {
      try {
        if (_0x3ff038) console.log("" + _0x3ff038), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x467d1e) {
            _0x467d1e = JSON.parse(_0x467d1e);
            _0x467d1e.code === 0 ? $.acticleList = _0x467d1e.data.article_list : console.log(_0x467d1e.message);
          } else {
            console.log("没有返回数据");
          }
        }
      } catch (_0x1ef076) {
        $.logErr(_0x1ef076, _0x282b64);
      } finally {
        _0x5817fc(_0x467d1e);
      }
    });
  });
}
async function read(_0x10f82e) {
  let _0x35c2cf = "?id=" + _0x10f82e;
  return new Promise(_0x2ca88a => {
    $.get(taskUrl("/api/article/detail", _0x35c2cf), async (_0x2f5c5c, _0x1045f8, _0x39c38b) => {
      try {
        if (_0x2f5c5c) console.log("" + _0x2f5c5c), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x39c38b) {
            _0x39c38b = JSON.parse(_0x39c38b);
            if (_0x39c38b.code === 0) {
              console.log("浏览成功！");
              if (_0x39c38b.data.score_notify) console.log("浏览任务完成，获得[" + _0x39c38b.data.score_notify.integral + "]积分");
            } else console.log(_0x39c38b.message);
          } else console.log("没有返回数据");
        }
      } catch (_0x464706) {
        $.logErr(_0x464706, _0x1045f8);
      } finally {
        _0x2ca88a(_0x39c38b);
      }
    });
  });
}
async function share() {
  let _0x2f3473 = "member_type=3&memberType=3";
  return new Promise(_0x1d473b => {
    $.post(taskPostUrl("/api/user_mumber/doTask", _0x2f3473), async (_0x29f52b, _0x104fd8, _0x40a8ea) => {
      try {
        if (_0x29f52b) console.log("" + _0x29f52b), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x40a8ea) {
            _0x40a8ea = JSON.parse(_0x40a8ea);
            if (_0x40a8ea.code === 0) {
              console.log("分享成功！");
              if (_0x40a8ea.data) console.log("分享任务完成，获得[" + _0x40a8ea.data.score_notify.integral + "]积分");
            } else {
              console.log(_0x40a8ea.message);
            }
          } else {
            console.log("没有返回数据");
          }
        }
      } catch (_0x53faef) {
        $.logErr(_0x53faef, _0x104fd8);
      } finally {
        _0x1d473b(_0x40a8ea);
      }
    });
  });
}
async function comment(_0x3c324a) {
  let _0x3f7c41 = "channel_article_id=" + _0x3c324a + "&content=1";
  return new Promise(_0x303652 => {
    $.post(taskPostUrl("/api/comment/create", _0x3f7c41), async (_0x4464f3, _0x58b439, _0x1d0823) => {
      try {
        if (_0x4464f3) console.log("" + _0x4464f3), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x1d0823) {
            _0x1d0823 = JSON.parse(_0x1d0823);
            if (_0x1d0823.code === 0) {
              console.log("评论成功！");
              if (_0x1d0823.data) console.log("评论任务完成，获得[" + _0x1d0823.data.score_notify.integral + "]积分");
            } else console.log(_0x1d0823.message);
          } else console.log("没有返回数据");
        }
      } catch (_0x51ff84) {
        $.logErr(_0x51ff84, _0x58b439);
      } finally {
        _0x303652(_0x1d0823);
      }
    });
  });
}
async function like(_0x3ec185) {
  let _0x470fe2 = "id=" + _0x3ec185 + "&action=true";
  return new Promise(_0x3f51a0 => {
    $.post(taskPostUrl("/api/favorite/like", _0x470fe2), async (_0x329cbd, _0x1e6731, _0x2348e6) => {
      try {
        if (_0x329cbd) console.log("" + _0x329cbd), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x2348e6) {
            _0x2348e6 = JSON.parse(_0x2348e6);
            if (_0x2348e6.code === 0) {
              console.log("点赞成功！");
              if (_0x2348e6.data) console.log("点赞任务完成，获得[" + _0x2348e6.data.score_notify.integral + "]积分");
            } else {
              console.log(_0x2348e6.message);
            }
          } else console.log("没有返回数据");
        }
      } catch (_0x5472c3) {
        $.logErr(_0x5472c3, _0x1e6731);
      } finally {
        _0x3f51a0(_0x2348e6);
      }
    });
  });
}
async function local() {
  let _0x25cbf4 = "member_type=6&memberType=6";
  return new Promise(_0x4fc504 => {
    $.post(taskPostUrl("/api/user_mumber/doTask", _0x25cbf4), async (_0x18e1c8, _0x536c19, _0x1a5664) => {
      try {
        if (_0x18e1c8) console.log("" + _0x18e1c8), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x1a5664) {
            _0x1a5664 = JSON.parse(_0x1a5664);
            if (_0x1a5664.code === 0) {
              console.log("使用成功！");
              if (_0x1a5664.data) console.log("使用成功，获得[" + _0x1a5664.data.score_notify.integral + "]积分");
            } else console.log(_0x1a5664.message);
          } else console.log("没有返回数据");
        }
      } catch (_0x3e37fc) {
        $.logErr(_0x3e37fc, _0x536c19);
      } finally {
        _0x4fc504(_0x1a5664);
      }
    });
  });
}
async function invite() {
  let _0x926883 = "ref_code=GGNFZ9";
  return new Promise(_0x379565 => {
    $.post(taskPostUrl("/api/account/update_ref_code", _0x926883), async (_0x4137d0, _0x5ced23, _0xa0b1c5) => {
      try {
        if (_0x4137d0) console.log("" + _0x4137d0), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0xa0b1c5) {
            _0xa0b1c5 = JSON.parse(_0xa0b1c5);
            if (_0xa0b1c5.code === 0) console.log("助力成功！");else {
              console.log(_0xa0b1c5.message);
            }
          } else console.log("没有返回数据");
        }
      } catch (_0x56b634) {
        $.logErr(_0x56b634, _0x5ced23);
      } finally {
        _0x379565(_0xa0b1c5);
      }
    });
  });
}
function taskUrl(_0x2ed2ee, _0x22c21c) {
  return getSign(_0x2ed2ee), {
    "url": "https://vapp.tmuyun.com" + _0x2ed2ee + _0x22c21c,
    "headers": {
      "X-SESSION-ID": sessionid,
      "X-REQUEST-ID": requestid,
      "X-TIMESTAMP": timestamp,
      "X-SIGNATURE": sign,
      "X-ACCOUNT-ID": $.ACCOUNT,
      "Cache-Control": "no-cache",
      "X-TENANT-ID": appid,
      "Host": "vapp.tmuyun.com",
      "Connection": "Keep-Alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "3.0.1;" + requestid + ";iPad13,4;IOS;16.2;Appstore"
    }
  };
}
function taskPostUrl(_0x109b19, _0x10d8de) {
  return getSign(_0x109b19), {
    "url": "https://vapp.tmuyun.com" + _0x109b19,
    "body": "" + _0x10d8de,
    "headers": {
      "X-SESSION-ID": sessionid,
      "X-REQUEST-ID": requestid,
      "X-TIMESTAMP": timestamp,
      "X-SIGNATURE": sign,
      "Cache-Control": "no-cache",
      "X-TENANT-ID": appid,
      "Host": "vapp.tmuyun.com",
      "Connection": "Keep-Alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "1.2.2;" + requestid + ";iPad13,4;IOS;16.2;Appstore"
    }
  };
}
function getSign(_0x20d90a) {
  timestamp = Date.now();
  requestid = uuid();
  sign = CryptoJS.SHA256(_0x20d90a + "&&" + sessionid + "&&" + requestid + "&&" + timestamp + "&&" + salt + "&&" + appid).toString();
}
function uuid() {
  function _0x20e7cf() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  }
  return _0x20e7cf() + _0x20e7cf() + "-" + _0x20e7cf() + "-" + _0x20e7cf() + "-" + _0x20e7cf() + "-" + _0x20e7cf() + _0x20e7cf() + _0x20e7cf();
}
async function RSA_Encrypt(_0x598e72) {
  let _0x59724b = {
    "url": "https://www.bejson.com/Bejson/Api/Rsa/pubEncrypt",
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": " gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Host": "www.bejson.com",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
    },
    "body": "publicKey=-----BEGIN+PUBLIC+KEY-----%0D%0AMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs%2BcFqwa7ETJ%2BWXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx%2FiOiXFc%2BzCPvaKZric2dXCw27EvlH5rq%2BzwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg%2BthwIDAQAB%0D%0A-----END+PUBLIC+KEY-----&encStr=" + _0x598e72 + "&etype=rsa2"
  };
  return new Promise(_0x4dae7c => {
    $.post(_0x59724b, async (_0x28c5e8, _0x5be014, _0x3ab3e7) => {
      try {
        if (_0x28c5e8) console.log("" + _0x28c5e8), console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x3ab3e7) {
            _0x3ab3e7 = JSON.parse(_0x3ab3e7);
            if (_0x3ab3e7.code === 200) {} else console.log(_0x3ab3e7.msg);
          } else console.log("没有返回数据");
        }
      } catch (_0x4f0fff) {
        $.logErr(_0x4f0fff, _0x5be014);
      } finally {
        _0x4dae7c(_0x3ab3e7.data);
      }
    });
  });
}
function showMsg() {
  message += "=== " + $.nickName + " | " + $.mobile + " ===\n";
  message += msg;
}
function requireConfig() {
  if (cookie) {
    if (cookie.indexOf("@") != -1) cookie.split("@").forEach(_0x1b1505 => {
      cookiesArr.push(_0x1b1505);
    });else {
      if (cookie.indexOf("\n") != -1) cookie.split("\n").forEach(_0x2c427b => {
        cookiesArr.push(_0x2c427b);
      });else {
        cookiesArr.push(cookie);
      }
    }
    console.log("\n=============================================    \n脚本执行 - 北京时间(UTC+8)：" + new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString() + " \n=============================================\n");
    console.log("\n=========共有" + cookiesArr.length + "个" + $.name + "账号Cookie=========\n");
  } else {
    console.log("\n【缺少dyxw变量！】");
    return;
  }
}
async function getCookie(_0x547869) {
  _0x547869.includes("#") ? ($.pwd = await RSA_Encrypt(_0x547869.split("#")[1]), $.mobile = _0x547869.split("#")[0], await credential_auth()) : sessionid = _0x547869;
}
function Env(_0x1912bc, _0x3513c2) {
  class _0x18485b {
    constructor(_0xf5564d) {
      this.env = _0xf5564d;
    }
    ["send"](_0x294528, _0xdb48f6 = "GET") {
      _0x294528 = "string" == typeof _0x294528 ? {
        "url": _0x294528
      } : _0x294528;
      let _0x3f2c99 = this.get;
      return "POST" === _0xdb48f6 && (_0x3f2c99 = this.post), new Promise((_0x5e123d, _0x40880f) => {
        _0x3f2c99.call(this, _0x294528, (_0x518982, _0x11ae1c, _0x4eff22) => {
          _0x518982 ? _0x40880f(_0x518982) : _0x5e123d(_0x11ae1c);
        });
      });
    }
    ["get"](_0x5ef2c6) {
      return this.send.call(this.env, _0x5ef2c6);
    }
    ["post"](_0x437dbf) {
      return this.send.call(this.env, _0x437dbf, "POST");
    }
  }
  return new class {
    constructor(_0x4a2031, _0xa1e865) {
      this.name = _0x4a2031;
      this.http = new _0x18485b(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0xa1e865);
      this.log("", "🔔" + this.name + ", 开始!");
    }
    ["isNode"]() {
      return "undefined" != typeof module && !!module.exports;
    }
    ["isQuanX"]() {
      return "undefined" != typeof $task;
    }
    ["isSurge"]() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    ["isLoon"]() {
      return "undefined" != typeof $loon;
    }
    ["toObj"](_0x380404, _0x52678f = null) {
      try {
        return JSON.parse(_0x380404);
      } catch {
        return _0x52678f;
      }
    }
    ["toStr"](_0x287c19, _0x969b41 = null) {
      try {
        return JSON.stringify(_0x287c19);
      } catch {
        return _0x969b41;
      }
    }
    ["getjson"](_0x87d46d, _0x209744) {
      let _0x478b3a = _0x209744;
      const _0x2e3e77 = this.getdata(_0x87d46d);
      if (_0x2e3e77) try {
        _0x478b3a = JSON.parse(this.getdata(_0x87d46d));
      } catch {}
      return _0x478b3a;
    }
    ["setjson"](_0x31195d, _0xd57982) {
      try {
        return this.setdata(JSON.stringify(_0x31195d), _0xd57982);
      } catch {
        return !1;
      }
    }
    ["getScript"](_0x1f2c92) {
      return new Promise(_0x1218b6 => {
        this.get({
          "url": _0x1f2c92
        }, (_0x363abd, _0x4e4c46, _0x3a3382) => _0x1218b6(_0x3a3382));
      });
    }
    ["runScript"](_0x5bd664, _0x51c2fa) {
      return new Promise(_0x1de7cd => {
        let _0x4a16e6 = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0x4a16e6 = _0x4a16e6 ? _0x4a16e6.replace(/\n/g, "").trim() : _0x4a16e6;
        let _0x277972 = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x277972 = _0x277972 ? 1 * _0x277972 : 20;
        _0x277972 = _0x51c2fa && _0x51c2fa.timeout ? _0x51c2fa.timeout : _0x277972;
        const [_0x58233a, _0x30aa7b] = _0x4a16e6.split("@"),
          _0x576f0d = {
            "url": "http://" + _0x30aa7b + "/v1/scripting/evaluate",
            "body": {
              "script_text": _0x5bd664,
              "mock_type": "cron",
              "timeout": _0x277972
            },
            "headers": {
              "X-Key": _0x58233a,
              "Accept": "*/*"
            }
          };
        this.post(_0x576f0d, (_0x700a60, _0x43e23a, _0x13bd5b) => _0x1de7cd(_0x13bd5b));
      }).catch(_0x13c2db => this.logErr(_0x13c2db));
    }
    ["loaddata"]() {
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x54de7c = this.path.resolve(this.dataFile),
          _0x5cbc4d = this.path.resolve(process.cwd(), this.dataFile),
          _0x143161 = this.fs.existsSync(_0x54de7c),
          _0xc586d3 = !_0x143161 && this.fs.existsSync(_0x5cbc4d);
        if (!_0x143161 && !_0xc586d3) return {};
        {
          const _0x31e47e = _0x143161 ? _0x54de7c : _0x5cbc4d;
          try {
            return JSON.parse(this.fs.readFileSync(_0x31e47e));
          } catch (_0x5918a1) {
            return {};
          }
        }
      }
    }
    ["writedata"]() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x541350 = this.path.resolve(this.dataFile),
          _0x351331 = this.path.resolve(process.cwd(), this.dataFile),
          _0x329604 = this.fs.existsSync(_0x541350),
          _0x314f69 = !_0x329604 && this.fs.existsSync(_0x351331),
          _0x3be95b = JSON.stringify(this.data);
        _0x329604 ? this.fs.writeFileSync(_0x541350, _0x3be95b) : _0x314f69 ? this.fs.writeFileSync(_0x351331, _0x3be95b) : this.fs.writeFileSync(_0x541350, _0x3be95b);
      }
    }
    ["lodash_get"](_0x5f3cb3, _0x21127e, _0x2ad36e) {
      const _0x551d44 = _0x21127e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0x4bc535 = _0x5f3cb3;
      for (const _0xa8669c of _0x551d44) if (_0x4bc535 = Object(_0x4bc535)[_0xa8669c], void 0 === _0x4bc535) return _0x2ad36e;
      return _0x4bc535;
    }
    ["lodash_set"](_0x3075d6, _0x46487b, _0x51a3b4) {
      return Object(_0x3075d6) !== _0x3075d6 ? _0x3075d6 : (Array.isArray(_0x46487b) || (_0x46487b = _0x46487b.toString().match(/[^.[\]]+/g) || []), _0x46487b.slice(0, -1).reduce((_0x48a90b, _0xb3453, _0xdc313f) => Object(_0x48a90b[_0xb3453]) === _0x48a90b[_0xb3453] ? _0x48a90b[_0xb3453] : _0x48a90b[_0xb3453] = Math.abs(_0x46487b[_0xdc313f + 1]) >> 0 == +_0x46487b[_0xdc313f + 1] ? [] : {}, _0x3075d6)[_0x46487b[_0x46487b.length - 1]] = _0x51a3b4, _0x3075d6);
    }
    ["getdata"](_0x5762d9) {
      let _0x1b0981 = this.getval(_0x5762d9);
      if (/^@/.test(_0x5762d9)) {
        const [, _0x57ce57, _0x706238] = /^@(.*?)\.(.*?)$/.exec(_0x5762d9),
          _0x34529b = _0x57ce57 ? this.getval(_0x57ce57) : "";
        if (_0x34529b) try {
          const _0x4a91a4 = JSON.parse(_0x34529b);
          _0x1b0981 = _0x4a91a4 ? this.lodash_get(_0x4a91a4, _0x706238, "") : _0x1b0981;
        } catch (_0x2c6745) {
          _0x1b0981 = "";
        }
      }
      return _0x1b0981;
    }
    ["setdata"](_0x42d56e, _0x79b0d6) {
      let _0x5f39fb = false;
      if (/^@/.test(_0x79b0d6)) {
        const [, _0x3e800d, _0x430c9e] = /^@(.*?)\.(.*?)$/.exec(_0x79b0d6),
          _0x3fbad3 = this.getval(_0x3e800d),
          _0x316e31 = _0x3e800d ? "null" === _0x3fbad3 ? null : _0x3fbad3 || "{}" : "{}";
        try {
          const _0xb5f193 = JSON.parse(_0x316e31);
          this.lodash_set(_0xb5f193, _0x430c9e, _0x42d56e);
          _0x5f39fb = this.setval(JSON.stringify(_0xb5f193), _0x3e800d);
        } catch (_0x2e998b) {
          const _0x48eaee = {};
          this.lodash_set(_0x48eaee, _0x430c9e, _0x42d56e);
          _0x5f39fb = this.setval(JSON.stringify(_0x48eaee), _0x3e800d);
        }
      } else _0x5f39fb = this.setval(_0x42d56e, _0x79b0d6);
      return _0x5f39fb;
    }
    ["getval"](_0x11e6e7) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x11e6e7) : this.isQuanX() ? $prefs.valueForKey(_0x11e6e7) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x11e6e7]) : this.data && this.data[_0x11e6e7] || null;
    }
    ["setval"](_0x2e8d9e, _0x325188) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x2e8d9e, _0x325188) : this.isQuanX() ? $prefs.setValueForKey(_0x2e8d9e, _0x325188) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x325188] = _0x2e8d9e, this.writedata(), !0) : this.data && this.data[_0x325188] || null;
    }
    ["initGotEnv"](_0x2c18bc) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0x2c18bc && (_0x2c18bc.headers = _0x2c18bc.headers ? _0x2c18bc.headers : {}, void 0 === _0x2c18bc.headers.Cookie && void 0 === _0x2c18bc.cookieJar && (_0x2c18bc.cookieJar = this.ckjar));
    }
    ["get"](_0x273aa9, _0x46c7de = () => {}) {
      _0x273aa9.headers && (delete _0x273aa9.headers["Content-Type"], delete _0x273aa9.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x273aa9.headers = _0x273aa9.headers || {}, Object.assign(_0x273aa9.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(_0x273aa9, (_0x300274, _0x349c4f, _0x25fe7e) => {
        !_0x300274 && _0x349c4f && (_0x349c4f.body = _0x25fe7e, _0x349c4f.statusCode = _0x349c4f.status);
        _0x46c7de(_0x300274, _0x349c4f, _0x25fe7e);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x273aa9.opts = _0x273aa9.opts || {}, Object.assign(_0x273aa9.opts, {
        "hints": !1
      })), $task.fetch(_0x273aa9).then(_0x3e5250 => {
        const {
          statusCode: _0x6ec389,
          statusCode: _0x1e8e8d,
          headers: _0x49f673,
          body: _0x44adab
        } = _0x3e5250;
        _0x46c7de(null, {
          "status": _0x6ec389,
          "statusCode": _0x1e8e8d,
          "headers": _0x49f673,
          "body": _0x44adab
        }, _0x44adab);
      }, _0x429246 => _0x46c7de(_0x429246))) : this.isNode() && (this.initGotEnv(_0x273aa9), this.got(_0x273aa9).on("redirect", (_0x4c66d0, _0x2b4ca3) => {
        try {
          if (_0x4c66d0.headers["set-cookie"]) {
            const _0x9759c7 = _0x4c66d0.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            _0x9759c7 && this.ckjar.setCookieSync(_0x9759c7, null);
            _0x2b4ca3.cookieJar = this.ckjar;
          }
        } catch (_0x389d97) {
          this.logErr(_0x389d97);
        }
      }).then(_0x18d783 => {
        const {
          statusCode: _0x1d0c9b,
          statusCode: _0xabb1a9,
          headers: _0x35a076,
          body: _0x1cfe5c
        } = _0x18d783;
        _0x46c7de(null, {
          "status": _0x1d0c9b,
          "statusCode": _0xabb1a9,
          "headers": _0x35a076,
          "body": _0x1cfe5c
        }, _0x1cfe5c);
      }, _0x18ee87 => {
        const {
          message: _0x12b46d,
          response: _0x585f03
        } = _0x18ee87;
        _0x46c7de(_0x12b46d, _0x585f03, _0x585f03 && _0x585f03.body);
      }));
    }
    ["post"](_0x122690, _0x5270e6 = () => {}) {
      if (_0x122690.body && _0x122690.headers && !_0x122690.headers["Content-Type"] && (_0x122690.headers["Content-Type"] = "application/x-www-form-urlencoded"), _0x122690.headers && delete _0x122690.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (_0x122690.headers = _0x122690.headers || {}, Object.assign(_0x122690.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(_0x122690, (_0x47b209, _0x81bc8c, _0x2df820) => {
        !_0x47b209 && _0x81bc8c && (_0x81bc8c.body = _0x2df820, _0x81bc8c.statusCode = _0x81bc8c.status);
        _0x5270e6(_0x47b209, _0x81bc8c, _0x2df820);
      });else {
        if (this.isQuanX()) _0x122690.method = "POST", this.isNeedRewrite && (_0x122690.opts = _0x122690.opts || {}, Object.assign(_0x122690.opts, {
          "hints": !1
        })), $task.fetch(_0x122690).then(_0xf41077 => {
          const {
            statusCode: _0x15de8,
            statusCode: _0x24bdf9,
            headers: _0xf1b9d8,
            body: _0x41cac5
          } = _0xf41077;
          _0x5270e6(null, {
            "status": _0x15de8,
            "statusCode": _0x24bdf9,
            "headers": _0xf1b9d8,
            "body": _0x41cac5
          }, _0x41cac5);
        }, _0x499454 => _0x5270e6(_0x499454));else {
          if (this.isNode()) {
            this.initGotEnv(_0x122690);
            const {
              url: _0x2d3ece,
              ..._0x377189
            } = _0x122690;
            this.got.post(_0x2d3ece, _0x377189).then(_0x7e2182 => {
              const {
                statusCode: _0x3b49f2,
                statusCode: _0x3bf0d2,
                headers: _0x48f967,
                body: _0x2fe7de
              } = _0x7e2182;
              _0x5270e6(null, {
                "status": _0x3b49f2,
                "statusCode": _0x3bf0d2,
                "headers": _0x48f967,
                "body": _0x2fe7de
              }, _0x2fe7de);
            }, _0x169a73 => {
              const {
                message: _0x270525,
                response: _0x1e2006
              } = _0x169a73;
              _0x5270e6(_0x270525, _0x1e2006, _0x1e2006 && _0x1e2006.body);
            });
          }
        }
      }
    }
    ["time"](_0x3b0b21, _0x28e85f = null) {
      const _0x4d4a44 = _0x28e85f ? new Date(_0x28e85f) : new Date();
      let _0x1cd887 = {
        "M+": _0x4d4a44.getMonth() + 1,
        "d+": _0x4d4a44.getDate(),
        "H+": _0x4d4a44.getHours(),
        "m+": _0x4d4a44.getMinutes(),
        "s+": _0x4d4a44.getSeconds(),
        "q+": Math.floor((_0x4d4a44.getMonth() + 3) / 3),
        "S": _0x4d4a44.getMilliseconds()
      };
      /(y+)/.test(_0x3b0b21) && (_0x3b0b21 = _0x3b0b21.replace(RegExp.$1, (_0x4d4a44.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x2123b1 in _0x1cd887) new RegExp("(" + _0x2123b1 + ")").test(_0x3b0b21) && (_0x3b0b21 = _0x3b0b21.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x1cd887[_0x2123b1] : ("00" + _0x1cd887[_0x2123b1]).substr(("" + _0x1cd887[_0x2123b1]).length)));
      return _0x3b0b21;
    }
    ["msg"](_0x1d3b57 = _0x1912bc, _0xbe10c5 = "", _0x18df8a = "", _0x1a727a) {
      const _0x1ec8d9 = _0x11bb41 => {
        if (!_0x11bb41) return _0x11bb41;
        if ("string" == typeof _0x11bb41) return this.isLoon() ? _0x11bb41 : this.isQuanX() ? {
          "open-url": _0x11bb41
        } : this.isSurge() ? {
          "url": _0x11bb41
        } : void 0;
        if ("object" == typeof _0x11bb41) {
          if (this.isLoon()) {
            let _0x36cc3d = _0x11bb41.openUrl || _0x11bb41.url || _0x11bb41["open-url"],
              _0x2124ac = _0x11bb41.mediaUrl || _0x11bb41["media-url"];
            return {
              "openUrl": _0x36cc3d,
              "mediaUrl": _0x2124ac
            };
          }
          if (this.isQuanX()) {
            let _0x18cefc = _0x11bb41["open-url"] || _0x11bb41.url || _0x11bb41.openUrl,
              _0x4a3a27 = _0x11bb41["media-url"] || _0x11bb41.mediaUrl;
            return {
              "open-url": _0x18cefc,
              "media-url": _0x4a3a27
            };
          }
          if (this.isSurge()) {
            let _0x3ad851 = _0x11bb41.url || _0x11bb41.openUrl || _0x11bb41["open-url"];
            return {
              "url": _0x3ad851
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x1d3b57, _0xbe10c5, _0x18df8a, _0x1ec8d9(_0x1a727a)) : this.isQuanX() && $notify(_0x1d3b57, _0xbe10c5, _0x18df8a, _0x1ec8d9(_0x1a727a))), !this.isMuteLog) {
        let _0x4cd104 = ["", "==============📣系统通知📣=============="];
        _0x4cd104.push(_0x1d3b57);
        _0xbe10c5 && _0x4cd104.push(_0xbe10c5);
        _0x18df8a && _0x4cd104.push(_0x18df8a);
        console.log(_0x4cd104.join("\n"));
        this.logs = this.logs.concat(_0x4cd104);
      }
    }
    ["log"](..._0x2cf5ab) {
      _0x2cf5ab.length > 0 && (this.logs = [...this.logs, ..._0x2cf5ab]);
      console.log(_0x2cf5ab.join(this.logSeparator));
    }
    ["logErr"](_0x2acd6e, _0x5c1d82) {
      const _0x3e7ae1 = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      _0x3e7ae1 ? this.log("", "❗️" + this.name + ", 错误!", _0x2acd6e.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x2acd6e);
    }
    ["wait"](_0x17dfc8) {
      return new Promise(_0x3204ac => setTimeout(_0x3204ac, _0x17dfc8));
    }
    ["done"](_0x28b1d0 = {}) {
      const _0x4a3397 = new Date().getTime(),
        _0xf56eb1 = (_0x4a3397 - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0xf56eb1 + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x28b1d0);
    }
  }(_0x1912bc, _0x3513c2);
}