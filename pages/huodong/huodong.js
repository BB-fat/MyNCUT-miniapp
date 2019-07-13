// pages/huodong/huodong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        text: "毕业生晚会",
        bg: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/card_bg/毕业晚会背景.png",
        js: "毕业晚会是由我校学生会承办的校园大型文艺活动，节目包括舞蹈类、歌曲类、语言类和新颖的创意节目等，通过优质的节目与精良的舞美效果，传达出一份浓浓的工大毕业情，为师生带来一场难忘的视听盛会。",
        imgs: [
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毕业生晚会/IMG_3762.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毕业生晚会/IMG_3794.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毕业生晚会/IMG_3838.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毕业生晚会/IMG_4116.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毕业生晚会/IMG_4442.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毕业生晚会/IMG_6849.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毕业生晚会/IMG_7000.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毕业生晚会/IMG_7007.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毕业生晚会/IMG_7009.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毕业生晚会/IMG_9807.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毕业生晚会/åç§.jpg',
        ]
      },
      {
        text: "辩论赛",
        bg: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/card_bg/辩论赛背景.png",
        js: "一年一度的辩论赛，以各种新鲜有趣的辩题，锻炼同学们的思辨能力，培养同学们的合作意识和团队精神。每场辩论赛辩手们舌战群儒，高潮迭起。并且特邀专业老师对辩手们的表现进行点评，让观众也有机会了解更多的辩论知识。",
        imgs: [
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/辩论赛/IMG_0278.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/辩论赛/IMG_0409.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/辩论赛/IMG_1957.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/辩论赛/IMG_2029.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/辩论赛/IMG_2063.JPG',
        ]
      },
      {
        text: "创新创意成果秀",
        bg: 'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/card_bg/创新创意成果秀背景.png',
        js: "北方工业大学“毓科技之光，秀时代之魂”2018年创新创意成果秀，是由我校学生会主办的特色精品活动，包含实体类科技成果展示与虚体类项目展示两项内容。以“展现新工科院校专业特色，开发我校学子科研创新潜能”为目标，为学生提供了展示创新创意成果展示的平台。",
        imgs: [
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/创新创意成果秀/IMG_20181217_140458.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/创新创意成果秀/IMG_20181217_140526.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/创新创意成果秀/IMG_20181217_140601.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/创新创意成果秀/IMG_20181217_140619.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/创新创意成果秀/IMG_20181217_140642.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/创新创意成果秀/IMG_20181217_140657.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/创新创意成果秀/IMG_20181217_141010.jpg',
        ]
      },
      {
        text: "国际文化节",
        js: "文化交流是大学生活中浓墨重彩的一笔。随着国际交流的日益深入，我校顺应时代潮流开展了国际文化节，邀请来自各个国家的同学们展示家乡之美，在国际文化与中国文化的交织碰撞中求同存异，品异域特色，建长久友谊。",
        bg: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/card_bg/国际文化节背景.png",
        imgs: [
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/国际文化节/IMG_0831.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/国际文化节/IMG_0907.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/国际文化节/_MG_1617.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/国际文化节/_MG_1620.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/国际文化节/_MG_1678.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/国际文化节/_MG_1931.jpg',
        ]
      },
      {
        text: "庆祝改革开放40周年文艺晚会",
        js: "新时代的青年人应该坚持党的领导，培养爱国、科学、民主的精神。我校通过举行“庆祝改革开放40周年文艺晚会”，把优秀文化和先进精神通过艺术形式星火相传，在品味艺术的过程中深入领会以爱国主义为核心的民族精神和以改革创新为核心的时代精神，立青年志，圆中国梦。",
        bg: 'cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/card_bg/改革开放文艺晚会背景.png',
        imgs: [
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/庆祝改革开放40周年文艺晚会/DSC_0688.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/庆祝改革开放40周年文艺晚会/DSC_0725.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/庆祝改革开放40周年文艺晚会/DSC_0799.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/庆祝改革开放40周年文艺晚会/DSC_0826.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/庆祝改革开放40周年文艺晚会/DSC_0847.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/庆祝改革开放40周年文艺晚会/DSC_0860.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/庆祝改革开放40周年文艺晚会/IMG_4340.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/庆祝改革开放40周年文艺晚会/IMG_4351.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/庆祝改革开放40周年文艺晚会/IMG_4400.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/庆祝改革开放40周年文艺晚会/IMG_4427.jpg',
        ]
      },
      {
        text: "校园篮球行",
        js: "火热的夏天，哪能缺少篮球的陪伴！北方工业大学校园篮球行面向全校大一至大四的所有篮球爱好者，可通过组队报名和个人报名两种渠道进行参与，是学生们公平对决，展示球技的良好平台。只要你拥有足够的实力，便可冲入决赛，争取最高的荣誉。众星云集，蓄势待发！",
        bg: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/card_bg/校园篮球行背景.png",
        imgs: [
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/校园篮球行/116967463845997886.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/校园篮球行/28852398395819672.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/校园篮球行/3.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/校园篮球行/72127768247732242.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/校园篮球行/778703451926596002.jpg',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/校园篮球行/8419203159730871.jpg',
        ]
      },
      {
        text: "荧光夜跑",
        js: "神说要有光，所以我们为你点亮了这一片星空。荧光夜跑被称为“地球上最闪亮的5公里赛跑”，无排名之分、无速度之争，只单纯地享受着音乐、奔跑的快乐。在北方工大的操场上，你将与志同道合、热爱体育运动的小伙伴为伍，与星星、月亮为伴，用荧光装备点缀黑夜，欢声笑语充满校园。",
        bg: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/card_bg/荧光夜跑背景.png",
        imgs: [
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/荧光夜跑/DSC_0143.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/荧光夜跑/DSC_5336.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/荧光夜跑/IMG_2397.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/荧光夜跑/IMG_2398.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/荧光夜跑/IMG_2407.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/荧光夜跑/IMG_2419.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/荧光夜跑/IMG_6698.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/荧光夜跑/IMG_6733.JPG',
        ]
      },
      {
        text: "毓秀讲堂",
        js: "毓秀讲堂为我校每学期定期举办的活动，每期毓秀讲堂将选择与大学生学习、生活息息相关的主题。学校会邀请相关方面具有权威的老师，为同学们带来精彩的讲座，并且通过官方平台进行直播，增大活动受众面，深受同学们的喜爱。",
        bg: "cloud://incut-dev-hzz83.696e-incut-dev-hzz83/IMG/card_bg/毓秀讲堂背景.png",
        imgs: [
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毓秀讲堂/IMG_0043.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毓秀讲堂/IMG_0049.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毓秀讲堂/IMG_0543.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毓秀讲堂/IMG_0559.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毓秀讲堂/IMG_0597.JPG',
          'https://myncut.oss-cn-beijing.aliyuncs.com/迎新/精品活动/毓秀讲堂/IMG_0627.JPG',
        ]
      }
    ],
  },
  hideWindow: function () {
    var that=this
    var a=wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    })
    a.opacity(0,0).step()
    this.setData({
      ani:a.export()
    })
    setTimeout(function(){
      that.setData({
        showWindow:false,
      })
    },960)
  },
  detail:function(e){
    var that=this
    var a=wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    })
    a.opacity(1,1).step()
    this.setData({
      showWindow:true,
      banner:this.data.items[e.currentTarget.dataset.index].imgs,
      banner_text:this.data.items[e.currentTarget.dataset.index].js,
    })
    setTimeout(function(){
      that.setData({
        ani:a.export(),
      })
    },200)
  },
})