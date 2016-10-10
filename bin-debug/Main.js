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
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    // 配置文件加载完成,开始预加载preload资源组。
    // configuration file loading is completed, start to pre-load the preload resource group    
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    // preload资源组加载完成
    // Preload resource group is loaded 
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene1();
        }
    };
    // 资源组加载出错
    //  The resource group loading failed 
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    // 资源组加载出错
    //  The resource group loading failed
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    // preload资源组加载进度
    // Loading process of preload resource group
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    //构建整个场景
    // 创建游戏场景
    // Create a game scene         
    p.createGameScene1 = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight; //获取舞台长宽
        //页面3
        var Page3 = new Page();
        this.addChild(Page3);
        Page3.touchEnabled = true; //定义页面3容器
        pagemove(Page3); //页面具有滑动效果
        var sky3 = this.createsky("sce2_jpg", stageW, stageH);
        Page3.addChild(sky3); //绘制页面3背景      
        //页面2               
        var Page2 = new Page();
        this.addChild(Page2);
        Page2.touchEnabled = true; //定义页面2容器
        pagemove(Page2); //页面具有滑动效果
        var sky2 = this.createsky("sce1_jpg", stageW, stageH);
        Page2.addChild(sky2); //绘制页面1背景
        //页面1
        var Page1 = new Page();
        this.addChild(Page1);
        Page1.touchEnabled = true; //定义页面1容器
        pagemove(Page1); //页面具有滑动效果
        var sky1 = this.createsky("sce_jpg", stageW, stageH);
        Page1.addChild(sky1); //绘制页面1背景
        var Mask1 = this.createMask(0, 238, stageW, 172);
        Page1.addChild(Mask1); //定义黑框1
        var icon_button1 = this.createBitmapByName("umbra_png", 75, 325, 0.4, 0.4);
        Page1.addChild(icon_button1);
        changescale(icon_button1, icon_button1.scaleX, icon_button1.scaleY);
        icon_button1.touchEnabled = true;
        icon_button1.addEventListener(egret.TouchEvent.TOUCH_TAP, onScroll1, this); //定义标签(unbra)按钮
        var text1 = this.createText(1000, 270, 35);
        text1.textFlow = [
            { text: "个人身份", style: { "textColor": 0x0000ff, "size": 35 } },
            { text: "\n" },
            { text: "北京工业大学信息学部", style: { "textColor": 0xffffff, "size": 30 } },
            { text: "\n" },
            { text: "数字媒体技术140811班25号", style: { "textColor": 0xffffff, "size": 30 } }
        ];
        Page1.addChild(text1); //定义文字
        var Mask2 = this.createMask(0, 443, stageW, 172);
        Page1.addChild(Mask2); //定义黑框2
        var icon_button2 = this.createBitmapByName("witcher_png", 70, 530, 0.5, 0.5);
        Page1.addChild(icon_button2);
        changescale(icon_button2, icon_button2.scaleX, icon_button2.scaleY);
        icon_button2.touchEnabled = true;
        icon_button2.addEventListener(egret.TouchEvent.TOUCH_TAP, onScroll2, this); //定义标签(witcher)按钮
        var text2 = this.createText(1000, 455, 35);
        text2.textFlow = [
            { text: "联系信息", style: { "textColor": 0x0000ff, "size": 35 } },
            { text: "\n" },
            { text: "手机：13687886372", style: { "textColor": 0xffffff, "size": 30 } },
            { text: "\n" },
            { text: "QQ：516916849", style: { "textColor": 0xffffff, "size": 30 } },
            { text: "\n" },
            { text: "微信：ServantBrea", style: { "textColor": 0xffffff, "size": 30 } }
        ];
        Page1.addChild(text2); //定义文字
        var Mask3 = this.createMask(0, 648, stageW, 172);
        Page1.addChild(Mask3); //定义黑框3
        var Mask4 = this.createMask(0, 853, stageW, 172);
        Page1.addChild(Mask4); //定义黑框4 
        //页面（最上不变）
        var Pageall = new Page();
        this.addChild(Pageall); //页面容器最上的定义
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 205);
        topMask.graphics.endFill();
        Pageall.addChild(topMask); //定义黑框（标题）
        var icon1 = this.createBitmapByName("egret_icon_png", 54, 12, 1, 1);
        Pageall.addChild(icon1); //定义标签（白鹭）        
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
        var icon_updown = this.createBitmapByName("updown_png", 310, 1070, 0.06, 0.06);
        Pageall.addChild(icon_updown);
        //音乐按钮
        var music = RES.getRes("ah_mp3");
        var musicChannel;
        var stop_time = 0;
        musicChannel = music.play(stop_time, 0); //定义音乐
        var Anim_point = AnimModes.Anim_0; //定义按钮模式
        var icon_music = this.createBitmapByName("music_png", 580, 1080, 0.5, 0.5);
        Pageall.addChild(icon_music);
        icon_music.anchorOffsetX = icon_music.width / 2;
        icon_music.anchorOffsetY = icon_music.height / 2; //改变锚点位置
        icon_music.touchEnabled = true;
        icon_music.addEventListener(egret.TouchEvent.TOUCH_TAP, changeAnim, this);
        icon_music.addEventListener(egret.TouchEvent.ENTER_FRAME, if_rotation, this);
        //各种事件函数
        function changescale(icon, sX, sY) {
            var n = 0;
            icon.anchorOffsetX = icon.width / 2;
            icon.anchorOffsetY = icon.height / 2; //改变锚点位置
            icon.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
                icon.scaleX = icon.scaleY = 0.5 * sX + 0.5 * sY * Math.abs(Math.sin(n += Main.STEP_SCALE));
            }, this); /// 仅缩放，缩放范围
        } //自身放大缩小
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
        } //是否旋转
        function onScroll1(e) {
            egret.Tween.get(text1).to({ x: 180, y: 270 }, 300, egret.Ease.sineIn);
        } //点击umbra的缓动效果
        function onScroll2(e) {
            egret.Tween.get(text2).to({ x: 180, y: 455 }, 300, egret.Ease.sineIn);
        } //点击witcher的缓动效果
        function pagemove(p) {
            p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, p.mouseDown, p);
            p.addEventListener(egret.TouchEvent.TOUCH_END, p.mouseUp, p);
        } //页面翻动         
    };
    //各种自定义函数
    //根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    //Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.    
    p.createBitmapByName = function (name, x, y, xs, ys) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.x = x;
        result.y = y;
        result.scaleX = xs;
        result.scaleY = ys;
        return result;
    }; //加载图
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
                egret.Tween.get(this).to({ x: 0, y: -1136 }, 400, egret.Ease.sineIn)
                    .wait(300).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                this.parent.addChildAt(this, 0);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            if (this.y > 500) {
                egret.Tween.get(this).to({ x: 0, y: -1136 }, 400, egret.Ease.sineIn)
                    .wait(300).to({ x: 0, y: 0 }, 100, egret.Ease.sineIn);
                this.parent.addChildAt(this, 0);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
        }
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
//# sourceMappingURL=Main.js.map