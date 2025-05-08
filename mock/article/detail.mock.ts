import { defineMock } from "vite-plugin-mock-dev-server";
export default defineMock({
  url: "/api/article/1",
  body: {
    id: 1,
    title: "测试",
    intro:
      "深入探讨ES6带来的重大改进，包括箭头函数、模板字符串、解构赋值等实用特性",
    cover: "http://localhost:8080/cover1.avif",
    views: 270,
    createdTime: "2025-04-25T07:16:42.000Z",
    updatedTime: "2025-05-07T07:33:35.000Z",
    content:
      "## web API\r\n\r\n### getUserMedia\r\n\r\n```js\r\nnavigator.mediaDevices.getUserMedia({\r\n    audio,\r\n    video: {\r\n        width: { min: 1024, ideal: 1280, max: 1920 }, // 指定分辨率\r\n        height: { min: 776, ideal: 720, max: 1080 }\r\n        facingMode:'user' // 前置摄像头\r\n      }\r\n}).then(stream)\r\n```\r\n\r\n可以指定范围min-max，ideal值得是理想的值，优先级最高\r\n\r\n```js\r\n{\r\n    video:{\r\n        facingMode:'user', // 前置摄像头,environment:后置摄像头\r\n        deviceId:'', // 根据这个id选择摄像头\r\n        width:1920,  // 指定分辨率\r\n        height:1080,\r\n        frameRate: { ideal: 10, max: 15 } // 指定帧率\r\n    }\r\n}\r\n```\r\n\r\n#### 注意\r\n\r\n* 屏幕分享过程中，我们应当很重视高分辨率而不是帧速率，稍微卡点也没关系；\r\n\r\n- 在普通会议过程中，我们应当重视的是画面的流畅，即帧速率而不是高分辨率；\r\n\r\n- 在开会人数多但宽带又受限的情况下，我们重视的同样是会议的流程性，同样低分辨率更适合宽带受限的多人会议；\r\n\r\n### getDisplayMedia\r\n\r\n屏幕共享\r\n\r\n```js\r\ngetDisplayMedia(constraints) // 约束和获取摄像头基本一样，除了video不能是false之外\r\n```\r\n\r\n\r\n\r\n```js\r\nnavigator.mediaDevices\r\n    .getDisplayMedia()\r\n    .then((stream) => {\r\n      video.srcObject = stream;\r\n      video.onloadedmetadata = () => video.play();\r\n    });\r\n```\r\n\r\n### 注意\r\n\r\n获取系统音视频之前，要调用当前标签中没有销毁的媒体流\r\n\r\n```js\r\nstream.getTracks().forEach(track => {\r\n   track.stop();\r\n})\r\n```\r\n\r\n### webRTC会话流程\r\n\r\n#### PeerConnection\r\n\r\nwebRTC核心对象PeerConnection。\r\n\r\n- `addIceCandidate()`： 保存 ICE 候选信息，即双方协商信息，持续整个建立通信过程，直到没有更多候选信息。\r\n\r\n- `addTrack()` ：添加音频或者视频轨道。\r\n\r\n- `createAnswer()` ：创建应答信令。\r\n\r\n- `createDataChannel()`： 创建消息通道，建立`WebRTC`通信之后，就可以` p2p` 的直接发送文本消息，无需中转服务器。\r\n\r\n- `createOffer()`： 创建初始信令。\r\n\r\n- `setRemoteDescription()`： 保存远端发送给自己的信令。\r\n\r\n- `setLocalDescription()` ：保存自己端创建的信令。\r\n\r\n#### 常用的事件监听函数\r\n\r\n- `ondatachannel`： 创建`datachannel`后监听回调以及 `p2p`消息监听。\r\n\r\n- `ontrack` ：监听远程媒体轨道即远端音视频信息。\r\n\r\n- `onicecandidate`： ICE 候选监听。\r\n\r\n### 流程\r\n\r\n1. 发起者：创建信令赋予本地描述，并且发送给远端\r\n2. 接受者：将信令设置为远端描述，并且创建应答，将自己创建的应答设置为本地描述，将应答发送给远端（发起者）\r\n3. 接受者：设置远端描述\r\n\r\n### 信令服务器搭建\r\n\r\n",
    likes: 1,
    commentCount: 9,
    author: {
      id: "33ef8b96-21d5-11f0-9294-0242ac110002",
      name: "超级管理员",
      tips: "该用户很懒",
      avatar: "https://zw997.top/zwapp/default/boy.jpeg",
    },
    isLiked: 0,
    tags: [{ id: 4, name: " 生活趣事", color: "oklch(0.656 0.241 354.308)" }],
  },
});
