//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView); //设置加载进度界面
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/"); //初始化Resource资源加载库
    };
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }; // 配置文件加载完成,开始预加载preload资源组。
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene1();
        }
    }; // preload资源组加载完成
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }; // 资源组加载出错
    p.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load"); //TODO    
        this.onResourceLoadComplete(event); //忽略加载失败的项目
    }; // 资源组加载出错
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }; // preload资源组加载进度
    //构建整个场景
    // 创建游戏场景       
    p.createGameScene1 = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight; //获取舞台长宽
        //页面3
        var Page3 = new Page();
        this.addChild(Page3);
        Page3.touchEnabled = true; //定义页面3容器
        this.pagemove(Page3); //页面具有滑动效果
        var sky3 = this.createsky("sce2_jpg", stageW, stageH);
        Page3.addChildAt(sky3, 0); //绘制页面3背景 
        var Jpg1 = this.createjpglist("001_jpg");
        Page3.addChild(Jpg1.jpg);
        var Jpg2 = this.createjpglist("002_jpg");
        Page3.addChild(Jpg2.jpg);
        var Jpg3 = this.createjpglist("003_jpg");
        Page3.addChild(Jpg3.jpg);
        var Jpg4 = this.createjpglist("004_jpg");
        Page3.addChild(Jpg4.jpg);
        var Jpg5 = this.createjpglist("005_jpg");
        Page3.addChild(Jpg5.jpg);
        var Jpg6 = this.createjpglist("006_jpg");
        Page3.addChild(Jpg6.jpg);
        var Jpg7 = this.createjpglist("007_jpg");
        Page3.addChild(Jpg7.jpg);
        var Jpg8 = this.createjpglist("008_jpg");
        Page3.addChild(Jpg8.jpg);
        Jpg1.form = Jpg8;
        Jpg1.next = Jpg2;
        Jpg2.form = Jpg1;
        Jpg2.next = Jpg3;
        Jpg3.form = Jpg2;
        Jpg3.next = Jpg4;
        Jpg4.form = Jpg3;
        Jpg4.next = Jpg5;
        Jpg5.form = Jpg4;
        Jpg5.next = Jpg6;
        Jpg6.form = Jpg5;
        Jpg6.next = Jpg7;
        Jpg7.form = Jpg6;
        Jpg7.next = Jpg8;
        Jpg8.form = Jpg7;
        Jpg8.next = Jpg1;
        var text3_characters = this.createText(162, 960, 30);
        text3_characters.textFlow = [
            { text: "Games Characters", style: { "textColor": 0xffffff, "size": 35 } }
        ];
        Page3.addChild(text3_characters); //定义文字 
        var button_roll1 = this.createBitmapByName("left_png", 140, 545, 0.3, 0.3);
        this.changeanchor(button_roll1);
        button_roll1.touchEnabled = true;
        this.icon_Animation(button_roll1, 2);
        Page3.addChild(button_roll1);
        var button_roll2 = this.createBitmapByName("right_png", 500, 545, 0.3, 0.3);
        this.changeanchor(button_roll2);
        button_roll2.touchEnabled = true;
        this.icon_Animation(button_roll2, 3);
        Page3.addChild(button_roll2);
        this.Roll(Jpg1, Jpg2, Jpg3, Jpg4, Jpg5, Jpg6, Jpg7, Jpg8, button_roll1, button_roll2);
        //页面2               
        var Page2 = new Page();
        this.addChild(Page2);
        Page2.touchEnabled = true; //定义页面2容器
        this.pagemove(Page2); //页面具有滑动效果
        var sky2 = this.createsky("sce1_jpg", stageW, stageH);
        Page2.addChild(sky2); //绘制页面1背景
        var picture1_1 = this.createBitmapByName("g1_jpg", 0, 205, 1, 1);
        Page2.addChild(picture1_1);
        var picture1_2 = this.createBitmapByName("g2_jpg", 0, 205, 1, 1);
        Page2.addChild(picture1_2);
        var picture1_3 = this.createBitmapByName("g3_jpg", 0, 205, 1, 1);
        Page2.addChild(picture1_3);
        this.pictureplay(picture1_1, picture1_2, picture1_3);
        var picture2_1 = this.createBitmapByName("g4_jpg", 0, 625, 1, 1);
        Page2.addChild(picture2_1);
        var picture2_2 = this.createBitmapByName("g5_jpg", 0, 625, 1, 1);
        Page2.addChild(picture2_2);
        var picture2_3 = this.createBitmapByName("g6_jpg", 0, 625, 1, 1);
        Page2.addChild(picture2_3);
        this.pictureplay(picture2_1, picture2_2, picture2_3);
        var text2_1 = this.createText(200, 576, 35);
        text2_1.textFlow = [
            { text: "Video Games", style: { "textColor": 0xffffff, "size": 35 } }
        ];
        Page2.addChild(text2_1); //定义文字
        //页面1
        var Page1 = new Page();
        this.addChild(Page1);
        Page1.touchEnabled = true; //定义页面1容器
        this.pagemove(Page1); //页面具有滑动效果
        var sky1 = this.createsky("sce_jpg", stageW, stageH);
        Page1.addChild(sky1); //绘制页面1背景
        var Mask1 = this.createMask(0, 238, stageW, 172);
        Page1.addChild(Mask1); //定义黑框1
        var icon1_1 = this.createBitmapByName("umbra_png", 75, 325, 0.4, 0.4);
        Page1.addChild(icon1_1);
        this.changescale(icon1_1, icon1_1.scaleX, icon1_1.scaleY); //定义标签(unbra)logo
        var text1_1 = this.createText(1000, 270, 35);
        text1_1.textFlow = [
            { text: "个人身份", style: { "textColor": 0x0000ff, "size": 35 } },
            { text: "\n" },
            { text: "北京工业大学信息学部", style: { "textColor": 0xffffff, "size": 30 } },
            { text: "\n" },
            { text: "数字媒体技术140811班25号", style: { "textColor": 0xffffff, "size": 30 } }
        ];
        Page1.addChild(text1_1);
        this.onScroll(text1_1, 270, 500); //定义文字
        var Mask2 = this.createMask(0, 443, stageW, 172);
        Page1.addChild(Mask2); //定义黑框2
        var icon1_2 = this.createBitmapByName("witcher_png", 70, 530, 0.5, 0.5);
        Page1.addChild(icon1_2);
        this.changescale(icon1_2, icon1_2.scaleX, icon1_2.scaleY); //定义标签(witcher)logo
        var text1_2 = this.createText(1000, 455, 35);
        text1_2.textFlow = [
            { text: "联系信息", style: { "textColor": 0x0000ff, "size": 35 } },
            { text: "\n" },
            { text: "手机：13687886372", style: { "textColor": 0xffffff, "size": 30 } },
            { text: "\n" },
            { text: "QQ：516916849", style: { "textColor": 0xffffff, "size": 30 } },
            { text: "\n" },
            { text: "微信：ServantBrea", style: { "textColor": 0xffffff, "size": 30 } }
        ];
        Page1.addChild(text1_2);
        this.onScroll(text1_2, 455, 1000); //定义文字
        var Mask3 = this.createMask(0, 648, stageW, 172);
        Page1.addChild(Mask3); //定义黑框3
        var icon1_3 = this.createBitmapByName("codmw_png", 70, 735, 0.35, 0.35);
        Page1.addChild(icon1_3);
        this.changescale(icon1_3, icon1_3.scaleX, icon1_3.scaleY); //定义标签(witcher)logo
        var text1_3 = this.createText(1000, 660, 35);
        text1_3.textFlow = [
            { text: "个人爱好", style: { "textColor": 0x0000ff, "size": 35 } },
            { text: "\n" },
            { text: "主要：大型单机游戏", style: { "textColor": 0xffffff, "size": 30 } },
            { text: "\n" },
            { text: "其次：看漫画，动漫，学制作游戏", style: { "textColor": 0xffffff, "size": 30 } },
            { text: "\n" },
            { text: "剩余：看新闻，电影，外国电视剧", style: { "textColor": 0xffffff, "size": 30 } }
        ];
        Page1.addChild(text1_3);
        this.onScroll(text1_3, 660, 1500); //定义文字
        var Mask4 = this.createMask(0, 853, stageW, 172);
        Page1.addChild(Mask4); //定义黑框4 
        var icon1_4 = this.createBitmapByName("teos_png", 70, 940, 0.35, 0.35);
        Page1.addChild(icon1_4);
        this.changescale(icon1_4, icon1_4.scaleX, icon1_4.scaleY); //定义标签(witcher)logo
        var text1_4 = this.createText(1000, 865, 35);
        text1_4.textFlow = [
            { text: "最近正忙", style: { "textColor": 0x0000ff, "size": 35 } },
            { text: "\n" },
            { text: "The Witcher 3,The last of us", style: { "textColor": 0xffffff, "size": 30 } },
            { text: "\n" },
            { text: "Uncharted,One pieces,GTA5", style: { "textColor": 0xffffff, "size": 30 } },
            { text: "\n" },
            { text: "Java,Egret,Unreal4,Opengl", style: { "textColor": 0xffffff, "size": 30 } }
        ];
        Page1.addChild(text1_4);
        this.onScroll(text1_4, 865, 2000); //定义文字
        //页面（最上不变）
        var Pageall = new Page();
        this.addChild(Pageall); //页面容器最上的定义
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 205);
        topMask.graphics.endFill();
        Pageall.addChild(topMask); //定义黑框（标题）
        var icon_egret = this.createBitmapByName("egret_icon_png", 54, 12, 1, 1);
        Pageall.addChild(icon_egret); //定义标签（白鹭）        
        var toptext = this.createText(310, 60, 60);
        toptext.textColor = 0xffffff;
        toptext.text = "周景城";
        Pageall.addChild(toptext); //定义标题文字
        var endtext = this.createText(20, 1100, 20);
        endtext.textColor = 0xffffff;
        endtext.text = "By Servant.For.Brea";
        Pageall.addChild(endtext); //定义标题文字
        var textfield = this.createText(172, 135, 30);
        Pageall.addChild(textfield);
        textfield.alpha = 0;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.textColor = 0xffffff;
        this.textfield = textfield;
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this); //定义特殊文字显示
        var icon_up = this.createBitmapByName("up_png", 300, 1060, 0.3, 0.3);
        Pageall.addChild(icon_up);
        this.icon_Animation(icon_up, 0);
        var icon_down = this.createBitmapByName("down_png", 330, 1040, 0.3, 0.3);
        Pageall.addChild(icon_down);
        this.icon_Animation(icon_down, 1);
        //音乐按钮
        var music = RES.getRes("ah_mp3");
        var musicChannel;
        var stop_time = 0;
        musicChannel = music.play(stop_time, 0); //定义音乐
        var Anim_point = AnimModes.Anim_0; //定义按钮模式
        var icon_music = this.createBitmapByName("music_png", 580, 1080, 0.5, 0.5);
        Pageall.addChild(icon_music);
        this.changeanchor(icon_music);
        icon_music.touchEnabled = true;
        icon_music.addEventListener(egret.TouchEvent.TOUCH_TAP, changeAnim, this);
        icon_music.addEventListener(egret.TouchEvent.ENTER_FRAME, if_rotation, this);
        //各种事件/CreateGameScene内函数     
        function changeAnim(e) {
            Anim_point = (Anim_point + 1) % 2;
            switch (Anim_point) {
                case AnimModes.Anim_0:
                    musicChannel = music.play(stop_time, 0);
                    break;
                case AnimModes.Anim_1:
                    stop_time = musicChannel.position;
                    musicChannel.stop();
                    musicChannel = null;
                    break;
            }
        } //改变按钮和音乐播放模式
        function if_rotation(e) {
            switch (Anim_point) {
                case AnimModes.Anim_0:
                    icon_music.rotation += Main.STEP_ROT;
                    break;
                case AnimModes.Anim_1:
                    ;
                    break;
            }
        } //是否旋转
        function if_playmusic(e) {
            switch (Anim_point) {
                case AnimModes.Anim_0:
                    music.play();
                    break;
                case AnimModes.Anim_1:
                    music.close();
                    break;
            }
        } //是否播放音乐                
    };
    //各种自定义/private函数
    p.createjpglist = function (filename) {
        var Jpg = new jpglist;
        Jpg.jpg = this.createBitmapByName(filename, 0, 0, 1, 1);
        this.changeanchor(Jpg.jpg);
        return Jpg;
    }; //建立图链表节点
    p.icon_Animation = function (icon, mode) {
        var len = 40;
        icon_move();
        function icon_move() {
            switch (mode) {
                case 0: {
                    egret.Tween.get(icon).wait(500)
                        .to({ x: icon.x, y: icon.y - len, "alpha": 0 }, 1400, egret.Ease.sineIn)
                        .to({ x: icon.x, y: icon.y, "alpha": 1 }, 0, egret.Ease.sineIn).call(icon_move);
                    break;
                }
                case 1: {
                    egret.Tween.get(icon).wait(500)
                        .to({ x: icon.x, y: icon.y + len, "alpha": 0 }, 1400, egret.Ease.sineIn)
                        .to({ x: icon.x, y: icon.y, "alpha": 1 }, 0, egret.Ease.sineIn).call(icon_move);
                    break;
                }
                case 2: {
                    egret.Tween.get(icon).to({ x: icon.x - len, y: icon.y, "alpha": 0 }, 1400, egret.Ease.sineIn)
                        .to({ x: icon.x, y: icon.y, "alpha": 1 }, 0, egret.Ease.sineIn).call(icon_move);
                    break;
                }
                case 3: {
                    egret.Tween.get(icon).to({ x: icon.x + len, y: icon.y, "alpha": 0 }, 1400, egret.Ease.sineIn)
                        .to({ x: icon.x, y: icon.y, "alpha": 1 }, 0, egret.Ease.sineIn).call(icon_move);
                    break;
                }
            }
        }
    }; //标签动画
    p.onScroll = function (text, iny, time) {
        egret.Tween.get(text).wait(time).to({ x: 180, y: iny }, 300, egret.Ease.sineIn);
    }; //文字的缓动出现效果
    p.changescale = function (icon, sX, sY) {
        var n = 0;
        this.changeanchor(icon);
        icon.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            icon.scaleX = icon.scaleY = 0.5 * sX + 0.5 * sY * Math.abs(Math.sin(n += Main.STEP_SCALE));
        }, this); /// 仅缩放，缩放范围
    }; //自身放大缩小
    p.pagemove = function (p) {
        p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, p.mouseDown, p);
        p.addEventListener(egret.TouchEvent.TOUCH_END, p.mouseUp, p);
    }; //页面翻动 
    p.changeanchor = function (icon) {
        icon.anchorOffsetX = icon.width / 2;
        icon.anchorOffsetY = icon.height / 2; //改变锚点位置
    }; //改变锚点
    p.Roll = function (p1, p2, p3, p4, p5, p6, p7, p8, b1, b2) {
        var po1 = this.makepoint(320, 568);
        var po2_1 = this.makepoint(234, 568);
        var po2_2 = this.makepoint(406, 568);
        var po3_1 = this.makepoint(148, 568);
        var po3_2 = this.makepoint(492, 568);
        this.set(p1, po1, 1, 5);
        this.set(p2, po2_1, 0.9, 4);
        this.set(p8, po2_2, 0.9, 4);
        this.set(p3, po3_1, 0.8, 3);
        this.set(p7, po3_2, 0.8, 3);
        this.set(p4, po2_1, 0.7, 2);
        this.set(p6, po2_2, 0.7, 2);
        this.set(p5, po1, 0.6, 1);
        /*
        var timemode = 0;
        var timer:egret.Timer = new egret.Timer(1000,0);//注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER,gorollleft,this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,gorollright,this);
        timer.start();
        */
        b1.addEventListener(egret.TouchEvent.TOUCH_TAP, gorollleft, this);
        b2.addEventListener(egret.TouchEvent.TOUCH_TAP, gorollright, this);
        function gorollleft() {
            egret.Tween.get(p8.jpg).to({ x: po1.x, y: po1.y, scaleX: 0.7 * 1, scaleY: 0.7 * 1 }, 300, egret.Ease.sineIn);
            p8.jpg.parent.setChildIndex(p8.jpg, 5);
            egret.Tween.get(p1.jpg).to({ x: po2_1.x, y: po2_1.y, scaleX: 0.7 * 0.9, scaleY: 0.7 * 0.9 }, 300, egret.Ease.sineIn);
            p1.jpg.parent.setChildIndex(p1.jpg, 4);
            egret.Tween.get(p2.jpg).to({ x: po3_1.x, y: po3_1.y, scaleX: 0.7 * 0.8, scaleY: 0.7 * 0.8 }, 300, egret.Ease.sineIn);
            p2.jpg.parent.setChildIndex(p2.jpg, 3);
            egret.Tween.get(p3.jpg).to({ x: po2_1.x, y: po2_1.y, scaleX: 0.7 * 0.7, scaleY: 0.7 * 0.7 }, 300, egret.Ease.sineIn);
            p3.jpg.parent.setChildIndex(p3.jpg, 2);
            egret.Tween.get(p4.jpg).to({ x: po1.x, y: po1.y, scaleX: 0.7 * 0.6, scaleY: 0.7 * 0.6 }, 300, egret.Ease.sineIn);
            p4.jpg.parent.setChildIndex(p4.jpg, 1);
            egret.Tween.get(p5.jpg).to({ x: po2_2.x, y: po2_2.y, scaleX: 0.7 * 0.7, scaleY: 0.7 * 0.7 }, 300, egret.Ease.sineIn);
            p5.jpg.parent.setChildIndex(p5.jpg, 2);
            egret.Tween.get(p6.jpg).to({ x: po3_2.x, y: po3_2.y, scaleX: 0.7 * 0.8, scaleY: 0.7 * 0.8 }, 300, egret.Ease.sineIn);
            p6.jpg.parent.setChildIndex(p6.jpg, 3);
            egret.Tween.get(p7.jpg).to({ x: po2_2.x, y: po2_2.y, scaleX: 0.7 * 0.9, scaleY: 0.7 * 0.9 }, 300, egret.Ease.sineIn);
            p7.jpg.parent.setChildIndex(p7.jpg, 4);
            p1 = p1.form;
            p2 = p2.form;
            p3 = p3.form;
            p4 = p4.form;
            p5 = p5.form;
            p6 = p6.form;
            p7 = p7.form;
            p8 = p8.form;
        }
        function gorollright() {
            egret.Tween.get(p2.jpg).to({ x: po1.x, y: po1.y, scaleX: 0.7 * 1, scaleY: 0.7 * 1 }, 300, egret.Ease.sineIn);
            p2.jpg.parent.setChildIndex(p2.jpg, 5);
            egret.Tween.get(p3.jpg).to({ x: po2_1.x, y: po2_1.y, scaleX: 0.7 * 0.9, scaleY: 0.7 * 0.9 }, 300, egret.Ease.sineIn);
            p3.jpg.parent.setChildIndex(p3.jpg, 4);
            egret.Tween.get(p4.jpg).to({ x: po3_1.x, y: po3_1.y, scaleX: 0.7 * 0.8, scaleY: 0.7 * 0.8 }, 300, egret.Ease.sineIn);
            p4.jpg.parent.setChildIndex(p4.jpg, 3);
            egret.Tween.get(p5.jpg).to({ x: po2_1.x, y: po2_1.y, scaleX: 0.7 * 0.7, scaleY: 0.7 * 0.7 }, 300, egret.Ease.sineIn);
            p5.jpg.parent.setChildIndex(p5.jpg, 2);
            egret.Tween.get(p6.jpg).to({ x: po1.x, y: po1.y, scaleX: 0.7 * 0.6, scaleY: 0.7 * 0.6 }, 300, egret.Ease.sineIn);
            p6.jpg.parent.setChildIndex(p6.jpg, 1);
            egret.Tween.get(p7.jpg).to({ x: po2_2.x, y: po2_2.y, scaleX: 0.7 * 0.7, scaleY: 0.7 * 0.7 }, 300, egret.Ease.sineIn);
            p7.jpg.parent.setChildIndex(p7.jpg, 2);
            egret.Tween.get(p8.jpg).to({ x: po3_2.x, y: po3_2.y, scaleX: 0.7 * 0.8, scaleY: 0.7 * 0.8 }, 300, egret.Ease.sineIn);
            p8.jpg.parent.setChildIndex(p8.jpg, 3);
            egret.Tween.get(p1.jpg).to({ x: po2_2.x, y: po2_2.y, scaleX: 0.7 * 0.9, scaleY: 0.7 * 0.9 }, 300, egret.Ease.sineIn);
            p1.jpg.parent.setChildIndex(p1.jpg, 4);
            p1 = p1.next;
            p2 = p2.next;
            p3 = p3.next;
            p4 = p4.next;
            p5 = p5.next;
            p6 = p6.next;
            p7 = p7.next;
            p8 = p8.next;
        }
    }; //图片的滚动效果
    p.set = function (pic, po, s, d) {
        pic.jpg.x = po.x;
        pic.jpg.y = po.y;
        pic.jpg.scaleX = 0.7 * s;
        pic.jpg.scaleY = 0.7 * s;
        pic.jpg.parent.addChildAt(pic.jpg, d);
    }; //以某点设置某图位置
    p.makepoint = function (x, y) {
        var point = new egret.Point(x, y);
        return point;
    }; //制造点
    p.pictureplay = function (a, b, c) {
        var count = 0;
        a.alpha = 0;
        b.alpha = 0;
        c.alpha = 0;
        var change = function () {
            var t;
            if (count < 3) {
                count++;
            }
            else {
                count = 1;
            }
            switch (count) {
                case 1:
                    t = a;
                    break;
                case 2:
                    t = b;
                    break;
                case 3:
                    t = c;
                    break;
            }
            var tw = egret.Tween.get(t);
            tw.to({ "alpha": 1 }, 1000);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 1000);
            tw.call(change, t);
        };
        change();
    }; //图片变换
    p.createBitmapByName = function (name, x, y, xs, ys) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.x = x;
        result.y = y;
        result.scaleX = xs;
        result.scaleY = ys;
        return result;
    }; //根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    p.startAnimation = function (result) {
        var self = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = [];
        for (var i = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }
        var textfield = self.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];
            self.changeDescription(textfield, lineArr);
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };
        change();
    }; //描述文件加载成功，开始播放动画
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    }; // 切换描述内容
    p.createMask = function (x, y, w, h) {
        var Mask = new egret.Shape();
        Mask.graphics.beginFill(0x000000, 0.5);
        Mask.graphics.drawRect(x, y, w, h);
        Mask.graphics.endFill();
        return Mask;
    }; //生成黑框
    p.createsky = function (filename, w, h) {
        var sky = this.createBitmapByName(filename, 0, 0, 1, 1);
        sky.width = w;
        sky.height = h;
        return sky;
    }; //生成页面背景
    p.createText = function (x, y, s) {
        var nomalText = new egret.TextField();
        nomalText.width = this.stage.stageWidth - 172;
        nomalText.textAlign = "left";
        nomalText.bold = true;
        nomalText.fontFamily = "Microsoft YaHei";
        nomalText.x = x;
        nomalText.y = y;
        nomalText.size = s;
        nomalText.cacheAsBitmap = true;
        return nomalText;
    }; //格式化生成文字（具有相同特点）
    //前面部分    
    Main.STEP_ROT = 1; //旋转步长定义
    Main.STEP_SCALE = .02; //缩放步长定义
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
var Page = (function (_super) {
    __extends(Page, _super);
    function Page() {
        _super.apply(this, arguments);
        this._touchStatus = false; //当前触摸状态，按下时，值为true
        this._distance = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
    }
    var d = __define,c=Page,p=c.prototype;
    p.mouseDown = function (evt) {
        this._touchStatus = true;
        this._distance.y = evt.stageY - this.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    p.mouseMove = function (evt) {
        if (this._touchStatus) {
            this.y = evt.stageY - this._distance.y;
            if (this.y < -500) {
                egret.Tween.get(this).to({ x: 0, y: -1136 }, 300, egret.Ease.sineIn)
                    .call(down).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            if (this.y > 500) {
                egret.Tween.get(this).to({ x: 0, y: 1136 }, 300, egret.Ease.sineIn)
                    .call(down).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
        }
        function down() {
            this.parent.addChildAt(this, 0);
        } //容器深度置下           
    };
    p.mouseUp = function (evt) {
        this._touchStatus = false;
        if (this.y >= -500) {
            egret.Tween.get(this).to({ x: 0, y: 0 }, 300, egret.Ease.sineIn);
        }
        if (this.y <= 500) {
            egret.Tween.get(this).to({ x: 0, y: 0 }, 300, egret.Ease.sineIn);
        }
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    return Page;
}(egret.DisplayObjectContainer));
egret.registerClass(Page,'Page');
 //页面类
var AnimModes = (function () {
    function AnimModes() {
    }
    var d = __define,c=AnimModes,p=c.prototype;
    AnimModes.Anim_0 = 0;
    AnimModes.Anim_1 = 1;
    return AnimModes;
}());
egret.registerClass(AnimModes,'AnimModes');
 //按钮模式类
var jpglist = (function () {
    function jpglist() {
    }
    var d = __define,c=jpglist,p=c.prototype;
    return jpglist;
}());
egret.registerClass(jpglist,'jpglist');
 //图片类
//# sourceMappingURL=Main.js.map