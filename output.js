//Sat Aug 03 2024 06:45:58 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
/*
new Env('阿里云社区');
@Author: Leiyiyan
@Date: 2024-07-23 13:33

@Description:
阿里云服务 每日签到、点赞、分享、评论、收藏，积分可兑换实物

获取 Cookie 方式: 阿里云 APP - 首页 - 积分商城

变量名: aliyunWeb_data、aliyunWeb_time(时间)、aliyunWeb_scene(场景：true/false)、aliyunWeb_stock(库存：true/false)

注意事项 - 因文章评论需要审核，所以请按推荐时间执行: 
   12点前执行一次: 签到、点赞、收藏、分享、评论；
   12点后执行一次: 积分收取、取消点赞、取消收藏；
   如需自定义时间，请修改 aliyunWeb_time 变量值，取值范围为 1-23 之间的整数
------------------------------------------------------------------------------
BoxJs订阅地址: 
https://raw.githubusercontent.com/leiyiyan/resource/main/subscribe/leiyiyan.boxjs.json

[Script]
http-response ^https?:\/\/developer\.aliyun\.com\/developer\/api\/my\/user\/getUser script-path=https://raw.githubusercontent.com/leiyiyan/resource/main/script/aliyun_web/aliyun_web.js, requires-body=true, timeout=60, tag=阿里云Web Cookie
cron "0 7,13 * * *" script-path=https://raw.githubusercontent.com/leiyiyan/resource/main/script/aliyun_web/aliyun_web.js, tag=阿里云社区日常任务

[MITM]
hostname = developer.aliyun.com

====================================
⚠️【免责声明】
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。
 */

// env.js 全局
//Sat Aug 03 2024 04:30:41 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("\u963F\u91CC\u4E91\u793E\u533A"),
  ckName = "aliyunWeb_data",
  controlTime = ($.isNode() ? process.env.aliyunWeb_time : $.getdata("aliyunWeb_time")) || "12",
  controlScene = ($.isNode() ? process.env.aliyunWeb_scene : $.getdata("aliyunWeb_scene")) || "false",
  controlStock = ($.isNode() ? process.env.aliyunWeb_stock : $.getdata("aliyunWeb_stock")) || "false",
  Notify = 1,
  notify = $.isNode() ? require("./sendNotify") : "";
let envSplitor = ["@"];
var userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || "";
let userList = [],
  userIdx = 0,
  userCount = 0;
const taskGroup = [{
  code: "",
  name: "\u6211\u7684\u793E\u533A"
}, {
  code: "ecs",
  name: "\u5F39\u6027\u8BA1\u7B97"
}, {
  code: "computenest",
  name: "\u8BA1\u7B97\u5DE2"
}, {
  code: "yitian",
  name: "\u501A\u5929"
}, {
  code: "wuying",
  name: "\u65E0\u5F71"
}, {
  code: "cloudnative",
  name: "\u4E91\u539F\u751F"
}, {
  code: "storage",
  name: "\u4E91\u5B58\u50A8"
}, {
  code: "luoshen",
  name: "\u98DE\u5929\u6D1B\u795E\u4E91\u7F51\u7EDC"
}, {
  code: "database",
  name: "\u6570\u636E\u5E93"
}, {
  code: "polardb",
  name: "PolarDB\u5F00\u6E90"
}, {
  code: "bigdata",
  name: "\u5927\u6570\u636E\u4E0E\u673A\u5668\u5B66\u4E60"
}, {
  code: "modelscope",
  name: "ModelScope\u6A21\u578B\u5373\u670D\u52A1"
}, {
  code: "viapi",
  name: "\u89C6\u89C9\u667A\u80FD"
}, {
  code: "dns",
  name: "\u57DF\u540D\u89E3\u6790DNS"
}, {
  code: "iot",
  name: "\u7269\u8054\u7F51"
}, {
  code: "devops",
  name: "\u4E91\u6548DevOps"
}, {
  code: "aliyun_linux",
  name: "\u9F99\u8725\u64CD\u4F5C\u7CFB\u7EDF"
}, {
  code: "modelstudio",
  name: "\u767E\u70BC\u5927\u6A21\u578B"
}, {
  code: "tongyi",
  name: "\u901A\u4E49\u5927\u6A21\u578B"
}];
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata("is_debug")) || "false";
$.notifyList = [];
$.notifyMsg = [];
let pendingScore = 0,
  userScore = 0,
  sceneId = "",
  resourceFrom = "",
  sectionId = "",
  ip = "";
async function main() {
  try {
    $.log("\n================== \u4EFB\u52A1 ==================\n");
    for (let _0xd81f96 of userList) {
      console.log("\uD83D\uDD37\u8D26\u53F7" + _0xd81f96.index + " >> Start work");
      console.log("\u968F\u673A\u5EF6\u8FDF" + _0xd81f96.getRandomTime() + "\u79D2");
      const _0x9c1899 = Date.now();
      userScore = (await _0xd81f96.interactData()) ?? {};
      if (_0xd81f96.ckStatus) {
        if (_0x9c1899 < new Date(new Date().setHours(Math.floor(controlTime), 0, 0, 0)).getTime()) {
          for (let _0x366916 of taskGroup) {
            const _0x40f7a7 = await _0xd81f96.getUserSpaceSignInDetail(_0x366916.code),
              _0x25f6b5 = await _0xd81f96.getTasks(_0x40f7a7);
            await _0xd81f96.signin(_0x25f6b5, _0x366916.name);
            await $.wait(_0xd81f96.getRandomTime());
            const _0x134674 = await _0xd81f96.assessSignInBonusQualification(_0x40f7a7, _0x366916.name);
            await $.wait(_0xd81f96.getRandomTime());
            _0x134674 && (await _0xd81f96.receiveSignInBonus(_0x40f7a7, _0x366916.name), await $.wait(_0xd81f96.getRandomTime()));
          }
          const _0x27722a = await _0xd81f96.getEbooks();
          await $.wait(_0xd81f96.getRandomTime());
          const _0x1731c7 = await _0xd81f96.getCsrfToken(_0x27722a, "ebook");
          await $.wait(_0xd81f96.getRandomTime());
          await _0xd81f96.addBookComment(_0x27722a, _0x1731c7);
          await $.wait(_0xd81f96.getRandomTime());
          for (let _0x49d7fe = 0; _0x49d7fe < 5; _0x49d7fe++) {
            const _0x1b98bc = await _0xd81f96.getArticles();
            await $.wait(_0xd81f96.getRandomTime());
            await _0xd81f96.likeOrNotLike(_0x1b98bc, "aliyun-public-like", 0);
            await $.wait(_0xd81f96.getRandomTime());
            await _0xd81f96.likeOrNotLike(_0x1b98bc, "aliyun-public-favorite", 0);
            await $.wait(_0xd81f96.getRandomTime());
            _0x49d7fe === 0 && (await _0xd81f96.addComment(_0x1b98bc), await $.wait(_0xd81f96.getRandomTime()), await _0xd81f96.likeOrNotLike(_0x1b98bc, "aliyun-public-share", 0), await $.wait(_0xd81f96.getRandomTime()));
            const _0x26bf75 = await _0xd81f96.getAsks();
            await $.wait(_0xd81f96.getRandomTime());
            if (_0x26bf75 && _0x26bf75?.["id"]) {
              const _0x450d48 = await _0xd81f96.getCsrfToken(_0x26bf75.id, "ask");
              await $.wait(_0xd81f96.getRandomTime());
              const _0x3cc1d1 = await _0xd81f96.getAskDetail(_0x26bf75);
              await $.wait(_0xd81f96.getRandomTime());
              _0x3cc1d1 && (await _0xd81f96.voteAnswer(_0x26bf75.id, _0x3cc1d1, _0x450d48, 1), await $.wait(_0xd81f96.getRandomTime()));
            }
          }
          JSON.parse(controlScene) && (await _0xd81f96.doScene(), await $.wait(_0xd81f96.getRandomTime()));
          JSON.parse(controlStock) && (await _0xd81f96.getGroupItems());
          pendingScore = await _0xd81f96.getUserTotalPendingScore();
          $.title = "\u83B7\u5F97\u5F85\u9886\u53D6\u79EF\u5206: " + pendingScore;
          DoubleLog("\uD83C\uDF89 \u5F53\u524D\u79EF\u5206: " + userScore + ", \u5F85\u9886\u53D6\u79EF\u5206: " + pendingScore);
        } else {
          for (let _0x5f20ca of taskGroup) {
            const _0x6c1176 = await _0xd81f96.getUserSpaceSignInDetail(_0x5f20ca.code),
              _0xd92b66 = await _0xd81f96.assessSignInBonusQualification(_0x6c1176, _0x5f20ca.name);
            await $.wait(_0xd81f96.getRandomTime());
            _0xd92b66 && (await _0xd81f96.receiveSignInBonus(_0x6c1176, _0x5f20ca.name), await $.wait(_0xd81f96.getRandomTime()));
          }
          pendingScore = await _0xd81f96.getUserTotalPendingScore();
          await $.wait(_0xd81f96.getRandomTime());
          await _0xd81f96.collect();
          await $.wait(_0xd81f96.getRandomTime());
          await $.wait(_0xd81f96.getRandomTime());
          const _0x144066 = (await _0xd81f96.getFavors()) ?? [];
          await $.wait(_0xd81f96.getRandomTime());
          if (_0x144066.length) {
            for (let _0x7635a2 of _0x144066) {
              await _0xd81f96.likeOrNotLike(_0x7635a2.objectId, "aliyun-public-like", 1);
              await $.wait(_0xd81f96.getRandomTime());
              await _0xd81f96.likeOrNotLike(_0x7635a2.objectId, "aliyun-public-favorite", 1);
              await $.wait(_0xd81f96.getRandomTime());
            }
          }
          JSON.parse(controlStock) && (await _0xd81f96.getGroupItems());
          let _0x18099b = (await _0xd81f96.interactData()) ?? {};
          $.title = "\u672C\u6B21\u8FD0\u884C\u5171\u83B7\u5F97" + (pendingScore || 0) + "\u79EF\u5206";
          DoubleLog("\uD83C\uDF89 \u9886\u53D6\u79EF\u5206: " + pendingScore + ", \u5F53\u524D\u79EF\u5206: " + _0x18099b);
        }
      } else {
        $.notifyMsg.push("\u26D4\uFE0F \u8D26\u53F7" + (_0xd81f96.userName || _0xd81f96.index) + " >> Check ck error!");
      }
      $.notifyList.push({
        id: _0xd81f96.index,
        avatar: _0xd81f96.avatar,
        message: $.notifyMsg
      });
      $.notifyMsg = [];
    }
  } catch (_0x35bd44) {
    $.log("\u26D4\uFE0F main run error => " + _0x35bd44);
    throw new Error("\u26D4\uFE0F main run error => " + _0x35bd44);
  }
}
class UserInfo {
  constructor(_0x1c531f) {
    this.index = ++userIdx;
    this.token = _0x1c531f.token || _0x1c531f;
    this.userId = _0x1c531f.userId;
    this.userName = _0x1c531f.userName;
    this.avatar = _0x1c531f.avatar;
    this.ckStatus = true;
    this.baseUrl = "";
    this.host = "https://developer.aliyun.com/developer/api";
    this.headers = {
      Cookie: this.token,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Referer: "https://developer.aliyun.com/"
    };
    this.getRandomTime = () => randomInt(1, 2);
    this.fetch = async _0x4cb92a => {
      try {
        if (typeof _0x4cb92a === "string") {
          _0x4cb92a = {
            url: _0x4cb92a
          };
        }
        if (_0x4cb92a?.["url"]?.["startsWith"]("/")) {
          _0x4cb92a.url = this.host + _0x4cb92a.url;
        }
        const _0x1e24b7 = await Request({
          ..._0x4cb92a,
          headers: _0x4cb92a.headers || this.headers,
          url: _0x4cb92a.url || this.baseUrl
        });
        debug(_0x1e24b7, _0x4cb92a?.["url"]?.["replace"](/\/+$/, "")["substring"](_0x4cb92a?.["url"]?.["lastIndexOf"]("/") + 1));
        if (_0x1e24b7?.["code"] == 40001) {
          throw new Error(_0x1e24b7?.["message"] || "\u7528\u6237\u9700\u8981\u53BB\u767B\u5F55");
        }
        return _0x1e24b7;
      } catch (_0x4ff423) {
        this.ckStatus = false;
        $.log("\u26D4\uFE0F \u8BF7\u6C42\u53D1\u8D77\u5931\u8D25\uFF01" + _0x4ff423);
      }
    };
  }
  async getUser() {
    try {
      const _0x4bdfb4 = {
        url: "/my/user/getUser",
        type: "get"
      };
      await this.fetch(_0x4bdfb4);
    } catch (_0x2c4c25) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u83B7\u53D6\u7B7E\u5230\u4EFB\u52A1\u5217\u8868\u5931\u8D25! " + _0x2c4c25);
    }
  }
  async assessSignInBonusQualification(_0x25ef27, _0x5d9fca) {
    if (!_0x25ef27) {
      return null;
    }
    try {
      const _0x1e96cf = {
        url: "/sign/assessSignInBonusQualification",
        type: "get",
        params: {
          taskGroupId: _0x25ef27
        }
      };
      let _0x75b850 = await this.fetch(_0x1e96cf);
      return _0x75b850?.["data"];
    } catch (_0x1faec0) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u67E5\u8BE2\u9886\u5956\u6761\u4EF6\u5931\u8D25! " + _0x1faec0);
    }
  }
  async receiveSignInBonus(_0x17a014, _0x392c16) {
    try {
      const _0x2d1840 = {
        url: "/sign/receiveSignInBonus",
        type: "post",
        dataType: "form",
        body: {
          taskGroupId: _0x17a014
        }
      };
      let _0x5d5ece = await this.fetch(_0x2d1840);
      if (_0x5d5ece?.["code"] == "200") {
        const _0x515e27 = _0x5d5ece?.["data"] || 0;
        $.log("\u2705 \u62BD\u5956 - " + (_0x392c16 || "default") + ": \u83B7\u5F97 " + _0x515e27 + " \u79EF\u5206");
      } else {
        $.log("\u26D4\uFE0F \u62BD\u5956 - " + (_0x392c16 || "default") + ": " + _0x5d5ece?.["message"]);
      }
    } catch (_0x5d8e05) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u62BD\u5956\u5931\u8D25! " + _0x5d8e05);
    }
  }
  async getUserSpaceSignInDetail(_0x379f77) {
    try {
      const _0x44421e = {
        url: "/sign/getUserSpaceSignInDetail",
        type: "get",
        params: {
          excode: _0x379f77
        }
      };
      let _0x4a8c2d = await this.fetch(_0x44421e);
      const _0x47fee5 = _0x4a8c2d?.["data"]?.["taskGroupId"] || null;
      return _0x47fee5;
    } catch (_0x232fc0) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u83B7\u53D6\u7B7E\u5230\u4EFB\u52A1\u5217\u8868\u5931\u8D25! " + _0x232fc0);
    }
  }
  async getTasks(_0x42e37c) {
    if (!_0x42e37c) {
      return null;
    }
    try {
      const _0x55e995 = {
        url: "/task/getTaskGroup?groupId=" + _0x42e37c,
        type: "get"
      };
      let _0x28352b = await this.fetch(_0x55e995);
      const _0x429142 = _0x28352b?.["data"]?.["taskList"];
      let _0x12c288 = {};
      if (_0x429142.length) {
        const _0xeac76b = new Date().getTime();
        for (let _0x37389f of _0x429142) {
          if (_0xeac76b >= _0x37389f.gmtEnableStart && _0xeac76b <= _0x37389f.gmtEnableEnd) {
            const _0x4b59de = JSON.parse(_0x37389f.finishRule.replace(/&quot;/g, "\""));
            _0x12c288.actionCode = _0x4b59de.actions[0].actionCode;
            _0x12c288.activityCode = _0x4b59de.actions[0].actionCode;
            _0x12c288.objectId = _0x4b59de.actions[0].objectId;
          }
        }
      }
      return _0x12c288;
    } catch (_0x2703c8) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u83B7\u53D6\u7B7E\u5230\u4EFB\u52A1\u5217\u8868\u5931\u8D25! " + _0x2703c8);
    }
  }
  async signin(_0x4d9795, _0x3a18ef) {
    if (!_0x4d9795) {
      $.log("\u2705 \u7B7E\u5230 - " + (_0x3a18ef || "default") + ": \u8BE5\u793E\u533A\u65E0\u7B7E\u5230\u4EFB\u52A1");
      return;
    }
    try {
      const _0x34c6c = {
        url: "/task/actionLog",
        type: "post",
        dataType: "form",
        body: _0x4d9795
      };
      let _0xdfcf1 = await this.fetch(_0x34c6c);
      $.log("\u2705 \u7B7E\u5230 - " + (_0x3a18ef || "default") + ": " + _0xdfcf1?.["message"]);
    } catch (_0x467fd3) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u7B7E\u5230\u5931\u8D25! " + _0x467fd3);
    }
  }
  async getArticles() {
    try {
      const _0x107b3e = Math.floor(Math.random() * 31) + 1,
        _0x2c635e = {
          url: "https://developer.aliyun.com/group/aliware/article_hot?pageNum=" + _0x107b3e,
          type: "get"
        };
      let _0x57bef9 = await this.fetch(_0x2c635e);
      const _0x16a9e0 = $.Cheerio.load(_0x57bef9),
        _0x1540c5 = _0x16a9e0(".community-detail-content"),
        _0x3ce1b6 = _0x1540c5.find(".community-list").map((_0x523cb4, _0x402edf) => {
          return {
            id: _0x16a9e0(_0x402edf).find(".feed-item").attr("data-id"),
            name: _0x16a9e0(_0x402edf).find(".feed-item-content-title h3").text()
          };
        }).get(),
        _0x25163a = _0x3ce1b6[Math.floor(Math.random() * _0x3ce1b6.length)],
        {
          id: _0x1a2cb8,
          name: _0x54e668
        } = _0x25163a;
      $.log("\u2705 \u968F\u673A\u83B7\u53D6\u6587\u7AE0id: " + _0x1a2cb8 + ", \u6807\u9898: " + _0x54e668);
      return _0x1a2cb8;
    } catch (_0x5e3fcd) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u83B7\u53D6\u6587\u7AE0\u5217\u8868\u5931\u8D25! " + _0x5e3fcd);
    }
  }
  async getEbooks() {
    try {
      const _0x1abbe1 = Math.floor(Math.random() * 501) + 1,
        _0x4a62de = {
          url: "https://developer.aliyun.com/ebook/index/__0_0_0_" + _0x1abbe1,
          type: "get"
        };
      let _0x5c814f = await this.fetch(_0x4a62de);
      const _0x3b0354 = $.Cheerio.load(_0x5c814f),
        _0x30dd24 = _0x3b0354(".ebook-home-list"),
        _0x1c71b7 = _0x30dd24.find(".ebook-home-item").map((_0x29a93a, _0xc6272d) => {
          return {
            id: _0x3b0354(_0xc6272d).attr("href").replace("/ebook/", ""),
            name: _0x3b0354(_0xc6272d).find(".ebook-home-title").text()
          };
        }).get(),
        _0x2b0a68 = _0x1c71b7[Math.floor(Math.random() * _0x1c71b7.length)],
        {
          id: _0x768906,
          name: _0x4d9e79
        } = _0x2b0a68;
      $.log("\u2705 \u968F\u673A\u7535\u5B50\u4E66id: " + _0x768906 + ", \u6807\u9898: " + _0x4d9e79);
      return _0x768906;
    } catch (_0x3ba18e) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u83B7\u53D6\u7535\u5B50\u4E66\u5217\u8868\u5931\u8D25! " + _0x3ba18e);
    }
  }
  async getAsks() {
    try {
      const _0x528c49 = Math.floor(Math.random() * 31) + 1,
        _0x3e00c4 = {
          url: "https://developer.aliyun.com/ask?pageNum=" + _0x528c49,
          type: "get"
        };
      let _0x43fa1d = await this.fetch(_0x3e00c4);
      const _0x279b89 = $.Cheerio.load(_0x43fa1d),
        _0x296938 = _0x279b89(".askProduct-list"),
        _0x2f645a = _0x296938.find(".askProduct-item").map((_0x24545e, _0x58a0d3) => {
          return {
            id: _0x279b89(_0x58a0d3).attr("data-id") || "",
            name: _0x279b89(_0x58a0d3).find(".askProduct-item-title-text h3").text() || "",
            answer: parseInt(_0x279b89(_0x58a0d3).find(".askProduct-item-info-answer").text()) || ""
          };
        }).filter((_0xd6cceb, _0x133fb6) => _0x133fb6.answer > 0).get(),
        _0x5a4f4e = _0x2f645a[Math.floor(Math.random() * _0x2f645a.length)];
      if (_0x5a4f4e?.["id"] && _0x5a4f4e?.["name"]) {
        const {
          id: _0x3d0ce6,
          name: _0x572602
        } = _0x5a4f4e;
        $.log("\u2705 \u968F\u673A\u83B7\u53D6\u95EE\u7B54id: " + _0x3d0ce6 + ", \u6807\u9898: " + _0x572602);
        return _0x5a4f4e;
      }
      return null;
    } catch (_0xfee64a) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u83B7\u53D6\u95EE\u7B54\u5217\u8868\u5931\u8D25! " + _0xfee64a);
    }
  }
  async getAskDetail(_0x29e29a) {
    try {
      const _0x146abd = {
        url: "https://developer.aliyun.com/ask/" + _0x29e29a.id,
        type: "get"
      };
      let _0x4412bd = await this.fetch(_0x146abd);
      const _0x5b2dab = $.Cheerio.load(_0x4412bd),
        _0x129ea2 = _0x5b2dab(".answer-list"),
        _0xce291f = _0x129ea2.find(".answer-item").map((_0x4df284, _0x3e9f0a) => {
          return {
            id: _0x5b2dab(_0x3e9f0a).attr("data-id") || ""
          };
        }).get(),
        _0x1229f4 = _0xce291f[Math.floor(Math.random() * _0x29e29a.answer)];
      if (_0x1229f4) {
        const {
          id: _0x2862cd
        } = _0x1229f4;
        $.log("\u2705 \u968F\u673A\u83B7\u53D6\u95EE\u9898\u95EE\u7B54id: " + _0x2862cd);
        return _0x2862cd;
      }
      return null;
    } catch (_0x2d7574) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u968F\u673A\u83B7\u53D6\u95EE\u9898\u95EE\u7B54\u5931\u8D25! " + _0x2d7574);
    }
  }
  async likeOrNotLike(_0x394dde, _0x5a5176, _0x466603) {
    try {
      const _0x2ebf25 = {
        url: "https://ucc.aliyun.com/uccPagingComponent/likeOrNotLike",
        type: "get",
        params: {
          bizCategory: "yq-article",
          actionCode: _0x5a5176,
          objectId: _0x394dde,
          status: _0x466603,
          uccCsrfToken: await this.getUccCsrfToken(),
          callback: getCallback()
        }
      };
      await this.fetch(_0x2ebf25);
      let _0x1acedc = "\u6587\u7AE0" + (_0x466603 === 1 ? "\u53D6\u6D88" : "");
      if (_0x5a5176 === "aliyun-public-like") {
        _0x1acedc += "\u70B9\u8D5E";
      } else {
        if (_0x5a5176 === "aliyun-public-favorite") {
          _0x1acedc += "\u6536\u85CF";
        } else {
          _0x5a5176 === "aliyun-public-share" && (_0x1acedc += "\u5206\u4EAB");
        }
      }
      $.log("\u2705 " + _0x1acedc + "\u6210\u529F: " + _0x394dde);
    } catch (_0x2bbd6f) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F " + taskType + "\u5931\u8D25! " + _0x2bbd6f);
    }
  }
  async getCsrfToken(_0x55fe01, _0x5ee7dd) {
    try {
      const _0x287d50 = {
          url: "https://developer.aliyun.com/csrfToken",
          type: "get",
          headers: {
            Cookie: this.token,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(Aliyun/6.7.1) WindVane/8.7.2 1170x2532 WK",
            Referer: "https://developer.aliyun.com/" + _0x5ee7dd + "/" + _0x55fe01
          }
        },
        _0x14eeac = await this.fetch(_0x287d50);
      return _0x14eeac?.["token"];
    } catch (_0x468c79) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u83B7\u53D6 csrf \u5931\u8D25! " + _0x468c79);
    }
  }
  async voteAnswer(_0x1cb48f, _0x174446, _0xba390, _0x2e0c2d) {
    try {
      const _0x415f68 = {
        url: "https://developer.aliyun.com/developer/api/my/ask/voteAnswer",
        type: "post",
        dataType: "form",
        headers: {
          Cookie: this.token,
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(Aliyun/6.7.1) WindVane/8.7.2 1170x2532 WK",
          Referer: "https://developer.aliyun.com/ask/" + _0x1cb48f
        },
        params: {
          p_csrf: _0xba390
        },
        body: {
          id: _0x174446,
          votes: _0x2e0c2d
        }
      };
      await this.fetch(_0x415f68);
      $.log("\u2705 \u56DE\u7B54\u70B9\u8D5E: " + _0x1cb48f + "-" + _0x174446);
    } catch (_0x4bb2ca) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u56DE\u7B54\u70B9\u8D5E\u5931\u8D25! " + _0x4bb2ca);
    }
  }
  async addBookComment(_0x3fa91c, _0x2e589b) {
    try {
      const _0x184a6d = {
          url: "https://developer.aliyun.com/developer/api/ebook/mark/add",
          type: "post",
          dataType: "json",
          headers: {
            Cookie: this.token,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(Aliyun/6.7.1) WindVane/8.7.2 1170x2532 WK",
            Referer: "https://developer.aliyun.com/ebook/" + _0x3fa91c
          },
          params: {
            p_csrf: _0x2e589b
          },
          body: {
            eBookId: _0x3fa91c,
            score: 10,
            content: "\u5F88\u68D2\u7684\u4E00\u672C\u4E66"
          }
        },
        _0x263162 = await this.fetch(_0x184a6d);
      _0x263162?.["code"] == "200" ? $.log("\u2705 \u8BC4\u4EF7\u7535\u5B50\u4E66: " + _0x3fa91c) : $.log("\u26D4\uFE0F \u8BC4\u4EF7\u7535\u5B50\u4E66\u5931\u8D25! " + _0x263162?.["message"]);
    } catch (_0x9f49b0) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u8BC4\u4EF7\u7535\u5B50\u4E66\u5931\u8D25! " + _0x9f49b0);
    }
  }
  async getFavors() {
    try {
      const _0x5c8c82 = {
          url: "https://developer.aliyun.com/developer/api/my/subscribe/listUserFavor",
          type: "get",
          params: {
            pageNum: 1,
            pageSize: 10,
            type: 1
          }
        },
        _0x35cdd4 = await this.fetch(_0x5c8c82),
        {
          list: _0x300a5a
        } = _0x35cdd4?.["data"];
      if (_0x300a5a.length) {
        $.log("\u2705 \u5F00\u59CB\u53D6\u6D88\u6587\u7AE0\u7684\u70B9\u8D5E\u4E0E\u6536\u85CF\u8BB0\u5F55");
        return _0x300a5a;
      }
      return [];
    } catch (_0x2be402) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F " + (type === "aliyun-public-like" ? "\u6587\u7AE0\u70B9\u8D5E" : "\u6587\u7AE0\u6536\u85CF") + "\u5931\u8D25! " + _0x2be402);
    }
  }
  async addComment(_0x2be17b) {
    try {
      const _0x530eef = {
        url: "https://ucc.aliyun.com/uccPagingComponent/addComment",
        type: "get",
        params: {
          content: encodeURIComponent("\u611F\u8C22\u535A\u4E3B\u7684\u5206\u4EAB"),
          objectId: _0x2be17b,
          bizCategory: "yq-comment-type-article",
          commentType: 0,
          sourceAppCode: "developer-ecology",
          sourceBizCategory: "developer-ecology-group",
          uccCsrfToken: await this.getUccCsrfToken(),
          callback: getCallback()
        }
      };
      await this.fetch(_0x530eef);
      $.log("\u2705 \u6587\u7AE0\u8BC4\u8BBA: " + _0x2be17b);
    } catch (_0x11b439) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u6587\u7AE0\u70B9\u8D5E\u5931\u8D25! " + _0x11b439);
    }
  }
  async doScene() {
    const _0x1f06ce = this.token.match(new RegExp("c_csrf=([^;]*)"))[1];
    await this.getSceneList();
    await $.wait(this.getRandomTime());
    const _0x23943d = await this.getSceneDetailPageInfoById();
    await $.wait(this.getRandomTime());
    _0x23943d ? (await this.getSceneStartPageInfoById(), await $.wait(this.getRandomTime()), resourceFrom === "2" ? (await this.startSceneById(_0x1f06ce), await $.wait(this.getRandomTime()), await this.closeSceneById(_0x1f06ce), await $.wait(this.getRandomTime())) : await this.doScene()) : await this.doScene();
  }
  async getSceneList() {
    try {
      const _0x16caa3 = Math.floor(Math.random() * 11) + 1,
        _0x41f80b = 21,
        _0x200975 = {
          url: "https://developer.aliyun.com/adc/api/getSceneList",
          type: "get",
          params: {
            tags: encodeURIComponent(","),
            difficulty: "",
            orderBy: "useCountTotal",
            pageNum: _0x16caa3,
            pageSize: _0x41f80b
          },
          headers: {
            Cookie: this.headers.Cookie,
            Referer: "https://developer.aliyun.com/adc/labs/",
            "User-Agent": this.headers["User-Agent"]
          }
        },
        _0x3c4b18 = await this.fetch(_0x200975),
        _0x48ff47 = _0x3c4b18?.["data"]?.["list"];
      if (_0x48ff47.length) {
        const _0x495539 = _0x48ff47[Math.floor(Math.random() * _0x48ff47.length)];
        sceneId = _0x495539?.["id"];
        $.log("\u2705 \u83B7\u53D6\u573A\u666F: " + _0x495539.name + "[" + sceneId + "]");
      } else {
        $.log("\u26D4\uFE0F \u83B7\u53D6\u573A\u666F\u5931\u8D25! " + e);
      }
    } catch (_0x555ee2) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u83B7\u53D6\u573A\u666F\u5931\u8D25! " + _0x555ee2);
    }
  }
  async getSceneDetailPageInfoById() {
    try {
      const _0x196727 = {
          url: "https://developer.aliyun.com/adc/api/getSceneDetailPageInfoById",
          type: "get",
          params: {
            id: sceneId
          },
          headers: {
            cookie: this.headers.Cookie,
            referer: "https://developer.aliyun.com/adc/scenario/" + sceneId,
            "user-agent": this.headers["User-Agent"]
          }
        },
        _0x4642e4 = await this.fetch(_0x196727),
        _0x5a4de4 = _0x4642e4?.["data"]?.["developerAdcExperienceStatusVO"]?.["buttonCode"];
      return _0x5a4de4 ? _0x5a4de4 === "1" ? ($.log("\u2705 \u786E\u8BA4\u573A\u666F\u72B6\u6001: " + _0x4642e4?.["data"]?.["id"]), _0x4642e4?.["data"]?.["id"]) : ($.log("\u26D4\uFE0F \u786E\u8BA4\u573A\u666F\u72B6\u6001: " + _0x4642e4?.["data"]?.["id"] + " \u5DF2\u5B8C\u6210\uFF0C\u5C06\u91CD\u65B0\u83B7\u53D6\u573A\u666F"), null) : ($.log("\u26D4\uFE0F \u786E\u8BA4\u573A\u666F\u72B6\u6001: " + _0x4642e4?.["data"]?.["id"] + " \u72B6\u6001\u5F02\u5E38\uFF0C\u5C06\u91CD\u65B0\u83B7\u53D6\u573A\u666F"), null);
    } catch (_0x789f77) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u786E\u8BA4\u573A\u666F\u72B6\u6001\u5931\u8D25! " + _0x789f77);
    }
  }
  async getSceneStartPageInfoById() {
    try {
      const _0x1f1886 = {
          url: "https://developer.aliyun.com/adc/api/getSceneStartPageInfoById",
          type: "get",
          params: {
            id: sceneId
          },
          headers: {
            cookie: this.headers.Cookie,
            referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId,
            "user-agent": this.headers["User-Agent"]
          }
        },
        _0x4681ea = await this.fetch(_0x1f1886);
      ip = _0x4681ea?.["data"]?.["ip"];
      _0x4681ea?.["data"]?.["resourceFrom"]["indexOf"]("1") > -1 ? resourceFrom = "1" : resourceFrom = "2";
      _0x4681ea?.["data"]?.["resourceCardInfoDTOList"]["length"] && (sectionId = _0x4681ea?.["data"]?.["resourceCardInfoDTOList"][0]?.["id"]);
      $.log("\u2705 \u83B7\u53D6\u573A\u666F\u521D\u59CB\u5316\u4FE1\u606F: " + sceneId);
    } catch (_0x529931) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u83B7\u53D6\u573A\u666F\u521D\u59CB\u5316\u4FE1\u606F\u5931\u8D25! " + _0x529931);
    }
  }
  async startSceneById(_0x5301ff) {
    try {
      const _0x22b0fa = {
          url: "https://developer.aliyun.com/adc/api/startSceneById",
          type: "post",
          dataType: "form",
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x5301ff,
            "X-XSRF-TOKEN": _0x5301ff,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          },
          params: {
            p_csrf: _0x5301ff
          },
          body: {
            id: sceneId,
            resourceFrom: resourceFrom
          }
        },
        _0x102152 = await this.fetch(_0x22b0fa),
        {
          code: _0xc5adcc,
          message: _0x24c2ea
        } = _0x102152;
      console.log((_0xc5adcc === "200" ? "\u2705" : "\u26D4\uFE0F") + " \u5F00\u59CB\u573A\u666F: " + sceneId + ", " + _0x24c2ea);
    } catch (_0x2fa9cd) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u5F00\u59CB\u573A\u666F\u5931\u8D25! " + _0x2fa9cd);
    }
  }
  async closeSceneById(_0x43f819) {
    try {
      const _0x2dd18a = {
          url: "https://developer.aliyun.com/adc/api/closeSceneById",
          type: "post",
          dataType: "form",
          body: {
            sceneId: sceneId,
            forceClose: "true"
          },
          params: {
            p_csrf: _0x43f819
          },
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x43f819,
            "X-XSRF-TOKEN": _0x43f819,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          }
        },
        _0x4564b1 = await this.fetch(_0x2dd18a),
        {
          code: _0x481136,
          message: _0x2ed700
        } = _0x4564b1;
      console.log((_0x481136 === "200" ? "\u2705" : "\u26D4\uFE0F") + " \u7ED3\u675F\u573A\u666F: " + sceneId + ", " + _0x2ed700);
    } catch (_0x46b385) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u7ED3\u675F\u573A\u666F\u5931\u8D25! " + _0x46b385);
    }
  }
  async createResourceById(_0x4439cd) {
    try {
      const _0x3b123e = {
          url: "https://developer.aliyun.com/adc/api/createResourceById",
          type: "post",
          dataType: "form",
          body: {
            id: sceneId,
            sectionId: sectionId,
            ip: ip
          },
          params: {
            p_csrf: _0x4439cd
          },
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x4439cd,
            "X-XSRF-TOKEN": _0x4439cd,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          }
        },
        _0x2655b0 = await this.fetch(_0x3b123e);
      _0x2655b0?.["data"] && console.log("\u2705 \u5F00\u59CB\u521B\u5EFA\u573A\u666F\u8D44\u6E90: " + sceneId);
    } catch (_0x18f508) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u521B\u5EFA\u573A\u666F\u8D44\u6E90\u5931\u8D25! " + _0x18f508);
    }
  }
  async getResourceCardInfoById() {
    try {
      const _0x29e45c = {
          url: "https://developer.aliyun.com/adc/api/getResourceCardInfoById",
          type: "get",
          params: {
            sceneId: sceneId,
            sectionId: sectionId
          },
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          }
        },
        _0x1bf7ee = await this.fetch(_0x29e45c),
        {
          code: _0x227aee,
          data: _0x4658f3
        } = _0x1bf7ee;
      if (_0x227aee === "200" && _0x4658f3) {
        if (_0x4658f3?.["status"] !== "RUNNING") {
          await $.wait(this.getRandomTime());
          await this.getResourceCardInfoById();
        } else {
          console.log("\u2705 \u521B\u5EFA\u573A\u666F\u8D44\u6E90\u5B8C\u6BD5: " + sceneId);
          return true;
        }
      }
    } catch (_0x19524f) {
      this.ckStatus = false;
      $.log("\u26D4\uFE0F \u521B\u5EFA\u573A\u666F\u8D44\u6E90\u5931\u8D25! " + _0x19524f);
    }
  }
  async getGroupItems() {
    try {
      const _0x543bad = {
          url: "/lm/getGroupItems?pageNum=1&pageSize=50",
          type: "get"
        },
        _0xd16b8f = await this.fetch(_0x543bad),
        {
          list: _0x481aa2
        } = _0xd16b8f?.["data"];
      if (_0x481aa2.length) {
        $.log("\u2705 \u5F00\u59CB\u67E5\u8BE2\u5E93\u5B58:");
        for (let _0x307c3b of _0x481aa2) {
          $.log("\uD83C\uDF81 " + _0x307c3b.itemTitle.replace(/【.*?】/g, "") + ": " + _0x307c3b.points + " \u5206\u3010" + _0x307c3b.statusStr + "\u3011");
        }
      }
    } catch (_0x545477) {
      $.log("\u26D4\uFE0F \u67E5\u8BE2\u5F85\u6536\u83B7\u79EF\u5206\u5217\u8868\u5931\u8D25! " + _0x545477);
    }
  }
  async interactData() {
    try {
      const _0x26bd11 = {
        url: "/my/score/getUserScore?appCode=developer",
        type: "get"
      };
      let _0x457c93 = await this.fetch(_0x26bd11);
      return _0x457c93?.["data"];
    } catch (_0x393286) {
      $.log("\u26D4\uFE0F \u67E5\u8BE2\u5F85\u6536\u83B7\u79EF\u5206\u5217\u8868\u5931\u8D25! " + _0x393286);
    }
  }
  async getUserTotalPendingScore() {
    try {
      const _0x5598d1 = {
        url: "/score/pending/getUserTotalPendingScore?appCode=developer",
        type: "get"
      };
      let _0x41b85d = await this.fetch(_0x5598d1);
      $.log("\u2705 \u5F85\u9886\u53D6\u79EF\u5206: " + _0x41b85d?.["data"]);
      return _0x41b85d?.["data"];
    } catch (_0x34f0fb) {
      $.log("\u26D4\uFE0F \u67E5\u8BE2\u5F85\u9886\u53D6\u79EF\u5206\u5931\u8D25! " + _0x34f0fb);
    }
  }
  async collect() {
    try {
      const _0x172b83 = {
        url: "/score/pending/receiveAllPendingScore?appCode=developer",
        type: "get"
      };
      let _0x11492a = await this.fetch(_0x172b83);
      $.log("\u2705 \u6536\u53D6\u79EF\u5206: " + _0x11492a?.["data"]);
      return _0x11492a?.["data"];
    } catch (_0x24a160) {
      $.log("\u26D4\uFE0F \u6536\u53D6\u79EF\u5206\u5931\u8D25! " + _0x24a160);
    }
  }
  async getUccCsrfToken() {
    try {
      const _0x19a6ed = {
        url: "https://ucc.aliyun.com/uccPagingComponent/getUser",
        type: "get",
        params: {
          uccCsrfToken: "",
          callback: getCallback()
        }
      };
      let _0x486584 = await this.fetch(_0x19a6ed);
      const _0x291ada = _0x486584.indexOf("{"),
        _0x24edfe = _0x486584.lastIndexOf("}"),
        _0x14238b = _0x486584.substring(_0x291ada, _0x24edfe + 1),
        _0x1fac20 = JSON.parse(_0x14238b);
      return _0x1fac20.data.uccCsrfToken;
    } catch (_0x2ec754) {
      $.log("\u26D4\uFE0F \u83B7\u53D6UccCsrfToken\u5931\u8D25! " + _0x2ec754);
    }
  }
}
function getCallback() {
  return "jsonp_" + Date.now() + "_" + Math.ceil(100000 * Math.random());
}
async function getCookie() {
  if ($request && $request.method === "OPTIONS") {
    return;
  }
  const _0x470710 = ObjectKeys2LowerCase($request.headers),
    _0xfab98b = _0x470710.cookie,
    _0x56ddd1 = $.toObj($response.body);
  if (!_0x56ddd1?.["data"]) {
    $.msg($.name, "\u26D4\uFE0F \u83B7\u53D6Cookie\u5931\u8D25!", "");
    return;
  }
  const {
      nickname: _0x2cf7d0,
      avatar: _0x766d1f
    } = _0x56ddd1?.["data"],
    _0x471755 = {
      userId: _0x2cf7d0,
      avatar: _0x766d1f,
      token: _0xfab98b,
      userName: _0x2cf7d0
    };
  userCookie = userCookie ? JSON.parse(userCookie) : [];
  const _0x179a54 = userCookie.findIndex(_0x720b6c => _0x720b6c.userId == _0x471755.userId);
  userCookie[_0x179a54] ? userCookie[_0x179a54] = _0x471755 : userCookie.push(_0x471755);
  $.setjson(userCookie, ckName);
  $.msg($.name, "\uD83C\uDF89" + _0x471755.userName + "\u66F4\u65B0token\u6210\u529F!", "");
}
async function loadModule() {
  try {
    $.Cheerio = await loadCheerio();
    return $.Cheerio ? true : false;
  } catch (_0x27d550) {
    throw new Error("\u26D4\uFE0F loadModule run error => " + _0x27d550);
  }
}
async function checkEnv() {
  try {
    const _0x26b718 = envSplitor.find(_0xd0b47 => userCookie.includes(_0xd0b47)) || envSplitor[0];
    userCookie = $.toObj(userCookie) || userCookie.split(_0x26b718);
    userList.push(...userCookie.map(_0x9d6b4e => new UserInfo(_0x9d6b4e)).filter(Boolean));
    userCount = userList.length;
    console.log("\u5171\u627E\u5230" + userCount + "\u4E2A\u8D26\u53F7");
    return true;
  } catch (_0x10560b) {
    throw new Error("\u26D4\uFE0F checkEnv run error => " + _0x10560b);
  }
}
async function Request(_0x2b27fc) {
  if (typeof _0x2b27fc === "string") {
    _0x2b27fc = {
      url: _0x2b27fc
    };
  }
  try {
    if (!_0x2b27fc?.["url"]) {
      throw new Error("[\u53D1\u9001\u8BF7\u6C42] \u7F3A\u5C11 url \u53C2\u6570");
    }
    let {
      url: _0x3b24b0,
      type: _0x30cc23,
      headers = {},
      body: _0x262529,
      params: _0x50ffd7,
      dataType = "form",
      resultType = "data"
    } = _0x2b27fc;
    const _0x44b822 = _0x30cc23 ? _0x30cc23?.["toLowerCase"]() : "body" in _0x2b27fc ? "post" : "get",
      _0x4519c1 = _0x3b24b0.concat(_0x44b822 === "post" ? "?" + $.queryStr(_0x50ffd7) : ""),
      _0x1ae11d = _0x2b27fc.timeout ? $.isSurge() ? _0x2b27fc.timeout / 1000 : _0x2b27fc.timeout : 10000;
    if (dataType === "json") {
      headers["Content-Type"] = "application/json;charset=UTF-8";
    }
    const _0x1c3467 = _0x262529 && dataType == "form" ? $.queryStr(_0x262529) : $.toStr(_0x262529),
      _0x32dc9f = {
        ..._0x2b27fc,
        ...(_0x2b27fc?.["opts"] ? _0x2b27fc.opts : {}),
        url: _0x4519c1,
        headers: headers,
        ...(_0x44b822 === "post" && {
          body: _0x1c3467
        }),
        ...(_0x44b822 === "get" && _0x50ffd7 && {
          params: _0x50ffd7
        }),
        timeout: _0x1ae11d
      },
      _0x1a7a4a = $.http[_0x44b822.toLowerCase()](_0x32dc9f).then(_0x3b7b97 => resultType == "data" ? $.toObj(_0x3b7b97.body) || _0x3b7b97.body : $.toObj(_0x3b7b97) || _0x3b7b97).catch(_0x1baccb => $.log("\u26D4\uFE0F \u8BF7\u6C42\u53D1\u8D77\u5931\u8D25\uFF01\u539F\u56E0\u4E3A: " + _0x1baccb));
    return Promise.race([new Promise((_0x49b7ee, _0x548db5) => setTimeout(() => _0x548db5("\u5F53\u524D\u8BF7\u6C42\u5DF2\u8D85\u65F6"), _0x1ae11d)), _0x1a7a4a]);
  } catch (_0x381d57) {
    console.log("\u26D4\uFE0F \u8BF7\u6C42\u53D1\u8D77\u5931\u8D25\uFF01\u539F\u56E0\u4E3A: " + _0x381d57);
  }
}
function randomInt(_0x1d8d5b, _0x22188c) {
  return Math.round(Math.random() * (_0x22188c - _0x1d8d5b) + _0x1d8d5b);
}
function DoubleLog(_0x9db827) {
  if (_0x9db827 && $.isNode()) {
    console.log("" + _0x9db827);
    $.notifyMsg.push("" + _0x9db827);
  } else {
    _0x9db827 && (console.log("" + _0x9db827), $.notifyMsg.push("" + _0x9db827));
  }
}
function debug(_0x156986, _0x499fbd = "debug") {
  $.is_debug === "true" && ($.log("\n-----------" + _0x499fbd + "------------\n"), $.log(typeof _0x156986 == "string" ? _0x156986 : $.toStr(_0x156986) || "debug error => t=" + _0x156986), $.log("\n-----------" + _0x499fbd + "------------\n"));
}
async function SendMsgList(_0x1c952b) {
  await Promise.allSettled(_0x1c952b?.["map"](_0x3149ff => SendMsg(_0x3149ff.message.join("\n"), _0x3149ff.avatar)));
}
async function SendMsg(_0x23e0d4, _0x189043) {
  _0x23e0d4 && (0 < Notify ? $.isNode() ? await notify.sendNotify($.name, _0x23e0d4) : $.msg($.name, $.title || "", _0x23e0d4, {
    "media-url": _0x189043
  }) : console.log(_0x23e0d4));
}
function ObjectKeys2LowerCase(_0x3bb5b0) {
  _0x3bb5b0 = Object.fromEntries(Object.entries(_0x3bb5b0).map(([_0x13b737, _0x5ca16d]) => [_0x13b737.toLowerCase(), _0x5ca16d]));
  return new Proxy(_0x3bb5b0, {
    get: function (_0x5c9484, _0x48fcf8, _0x57b493) {
      return Reflect.get(_0x5c9484, _0x48fcf8.toLowerCase(), _0x57b493);
    },
    set: function (_0x51a69b, _0x230e12, _0x6e4558, _0x5eb5f4) {
      return Reflect.set(_0x51a69b, _0x230e12.toLowerCase(), _0x6e4558, _0x5eb5f4);
    }
  });
}
async function loadCheerio() {
  let _0x1b24c4 = ($.isNode() ? process.env.Cheerio_code : $.getdata("Cheerio_code")) || "";
  if (_0x1b24c4 && Object.keys(_0x1b24c4).length) {
    console.log("\u2705" + $.name + ":\u7F13\u5B58\u4E2D\u5B58\u5728Cheerio\u6A21\u5757,\u8DF3\u8FC7\u4E0B\u8F7D");
    eval(_0x1b24c4);
    return createCheerio();
  }
  console.log("\uD83D\uDE80" + $.name + ":\u5F00\u59CB\u4E0B\u8F7DCheerio\u6A21\u5757");
  return new Promise(async _0xe53978 => {
    $.getScript("https://mirror.ghproxy.com/https://raw.githubusercontent.com/Yuheng0101/X/main/Utils/cheerio.js").then(_0x1eb03b => {
      $.setdata(_0x1eb03b, "Cheerio_code");
      eval(_0x1eb03b);
      const _0x3ed81b = createCheerio();
      console.log("\u2705Cheerio\u6A21\u5757\u52A0\u8F7D\u6210\u529F,\u8BF7\u7EE7\u7EED");
      _0xe53978(_0x3ed81b);
    });
  });
}
!(async () => {
  if (typeof $request != "undefined") {
    await getCookie();
  } else {
    if (!(await loadModule())) {
      throw new Error("\u26D4\uFE0F \u52A0\u8F7D\u6A21\u5757\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6A21\u5757\u8DEF\u5F84\u662F\u5426\u6B63\u5E38");
    }
    if (!(await checkEnv())) {
      throw new Error("\u26D4\uFE0F \u672A\u68C0\u6D4B\u5230ck\uFF0C\u8BF7\u6DFB\u52A0\u73AF\u5883\u53D8\u91CF");
    }
    if (userList.length > 0) {
      await main();
    }
  }
})().catch(_0x5644f7 => $.notifyMsg.push(_0x5644f7.message || _0x5644f7)).finally(async () => {
  await SendMsgList($.notifyList);
  $.done({
    ok: 1
  });
});
function Env(t, e) {
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
      return new Promise((e, r) => {
        s.call(this, t, (t, s, a) => {
          t ? r(t) : e(s);
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
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    getEnv() {
      return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
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
      if (this.getdata(t)) {
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
        }, (t, s, r) => e(r));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        r = r ? r.replace(/\n/g, "").trim() : r;
        let a = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        a = a ? 1 * a : 20;
        a = e && e.timeout ? e.timeout : a;
        const [i, o] = r.split("@"),
          n = {
            url: `http://${o}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: a
            },
            headers: {
              "X-Key": i,
              Accept: "*/*"
            },
            timeout: a
          };
        this.post(n, (t, e, r) => s(r));
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
          r = !s && this.fs.existsSync(e);
        if (!s && !r) {
          return {};
        }
        {
          const r = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(r));
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
          r = !s && this.fs.existsSync(e),
          a = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, a) : r ? this.fs.writeFileSync(e, a) : this.fs.writeFileSync(t, a);
      }
    }
    lodash_get(t, e, s = void 0) {
      const r = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let a = t;
      for (const t of r) if (a = Object(a)[t], void 0 === a) {
        return s;
      }
      return a;
    }
    lodash_set(t, e, s) {
      Object(t) !== t || (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, r) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[r + 1]) >> 0 == +e[r + 1] ? [] : {}, t)[e[e.length - 1]] = s);
      return t;
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, r] = /^@(.*?)\.(.*?)$/.exec(t),
          a = s ? this.getval(s) : "";
        if (a) {
          try {
            const t = JSON.parse(a);
            e = t ? this.lodash_get(t, r, "") : e;
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
        const [, r, a] = /^@(.*?)\.(.*?)$/.exec(e),
          i = this.getval(r),
          o = r ? "null" === i ? null : i || "{}" : "{}";
        try {
          const e = JSON.parse(o);
          this.lodash_set(e, a, t);
          s = this.setval(JSON.stringify(e), r);
        } catch (e) {
          const i = {};
          this.lodash_set(i, a, t);
          s = this.setval(JSON.stringify(i), r);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(t);
        case "Quantumult X":
          return $prefs.valueForKey(t);
        case "Node.js":
          this.data = this.loaddata();
          return this.data[t];
        default:
          return this.data && this.data[t] || null;
      }
    }
    setval(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(t, e);
        case "Quantumult X":
          return $prefs.setValueForKey(t, e);
        case "Node.js":
          this.data = this.loaddata();
          this.data[e] = t;
          this.writedata();
          return !0;
        default:
          return this.data && this.data[e] || null;
      }
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient.get(t, (t, s, r) => {
            !t && s && (s.body = r, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, r);
          });
          break;
        case "Quantumult X":
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: r,
              headers: a,
              body: i,
              bodyBytes: o
            } = t;
            e(null, {
              status: s,
              statusCode: r,
              headers: a,
              body: i,
              bodyBytes: o
            }, i, o);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let s = require("iconv-lite");
          this.initGotEnv(t);
          this.got(t).on("redirect", (t, e) => {
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
                statusCode: r,
                statusCode: a,
                headers: i,
                rawBody: o
              } = t,
              n = s.decode(o, this.encoding);
            e(null, {
              status: r,
              statusCode: a,
              headers: i,
              rawBody: o,
              body: n
            }, n);
          }, t => {
            const {
              message: r,
              response: a
            } = t;
            e(r, a, a && s.decode(a.rawBody, this.encoding));
          });
      }
    }
    post(t, e = () => {}) {
      const s = t.method ? t.method.toLocaleLowerCase() : "post";
      switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient[s](t, (t, s, r) => {
            !t && s && (s.body = r, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, r);
          });
          break;
        case "Quantumult X":
          t.method = s;
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: r,
              headers: a,
              body: i,
              bodyBytes: o
            } = t;
            e(null, {
              status: s,
              statusCode: r,
              headers: a,
              body: i,
              bodyBytes: o
            }, i, o);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let r = require("iconv-lite");
          this.initGotEnv(t);
          const {
            url: a,
            ...i
          } = t;
          this.got[s](a, i).then(t => {
            const {
                statusCode: s,
                statusCode: a,
                headers: i,
                rawBody: o
              } = t,
              n = r.decode(o, this.encoding);
            e(null, {
              status: s,
              statusCode: a,
              headers: i,
              rawBody: o,
              body: n
            }, n);
          }, t => {
            const {
              message: s,
              response: a
            } = t;
            e(s, a, a && r.decode(a.rawBody, this.encoding));
          });
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let r = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in r) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[e] : ("00" + r[e]).substr(("" + r[e]).length)));
      return t;
    }
    queryStr(t) {
      let e = "";
      for (const s in t) {
        let r = t[s];
        null != r && "" !== r && ("object" == typeof r && (r = JSON.stringify(r)), e += `${s}=${r}&`);
      }
      e = e.substring(0, e.length - 1);
      return e;
    }
    msg(e = t, s = "", r = "", a) {
      const i = t => {
        switch (typeof t) {
          case void 0:
            return t;
          case "string":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              default:
                return {
                  url: t
                };
              case "Loon":
              case "Shadowrocket":
                return t;
              case "Quantumult X":
                return {
                  "open-url": t
                };
              case "Node.js":
                return;
            }
          case "object":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              case "Shadowrocket":
              default:
                return {
                  url: t.url || t.openUrl || t["open-url"]
                };
              case "Loon":
                return {
                  openUrl: t.openUrl || t.url || t["open-url"],
                  mediaUrl: t.mediaUrl || t["media-url"]
                };
              case "Quantumult X":
                return {
                  "open-url": t["open-url"] || t.url || t.openUrl,
                  "media-url": t["media-url"] || t.mediaUrl,
                  "update-pasteboard": t["update-pasteboard"] || t.updatePasteboard
                };
              case "Node.js":
                return;
            }
          default:
            return;
        }
      };
      if (!this.isMute) {
        switch (this.getEnv()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
          default:
            $notification.post(e, s, r, i(a));
            break;
          case "Quantumult X":
            $notify(e, s, r, i(a));
          case "Node.js":
        }
      }
      if (!this.isMuteLog) {
        let t = ["", "==============\uD83D\uDCE3\u7CFB\u7EDF\u901A\u77E5\uD83D\uDCE3=============="];
        t.push(e);
        s && t.push(s);
        r && t.push(r);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", `❗️${this.name}, 错误!`, t);
          break;
        case "Node.js":
          this.log("", `❗️${this.name}, 错误!`, t.stack);
      }
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = (new Date().getTime() - this.startTime) / 1000;
      switch (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`), this.log(), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(t);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  }(t, e);
}