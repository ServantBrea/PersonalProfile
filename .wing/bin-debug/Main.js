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
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene2();
            this.createGameScene1();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene1 = function () {
        var sky = this.createBitmapByName("sce_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH; //全背景
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 205);
        topMask.graphics.endFill();
        this.addChild(topMask); //黑框1（标题）
        var icon1 = this.createBitmapByName("egret_icon_png");
        this.addChild(icon1);
        icon1.x = 54;
        icon1.y = 12; //标签（白鹭）        
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.bold = true;
        colorLabel.text = "周景城";
        colorLabel.size = 60;
        colorLabel.x = 172;
        colorLabel.y = 60;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.bold = true;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 30;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this);
        //
        var Mask1 = new egret.Shape();
        Mask1.graphics.beginFill(0x000000, 0.5);
        Mask1.graphics.drawRect(0, 0, stageW, 172);
        Mask1.graphics.endFill();
        Mask1.y = 238;
        this.addChild(Mask1); //黑框1
        var icon_music = this.createBitmapByName("umbra_png");
        this.addChild(icon_music);
        icon_music.scaleX = 0.3;
        icon_music.scaleY = 0.3;
        icon_music.x = 54;
        icon_music.y = 288; //标签(unbra)按钮
        icon_music.touchEnabled = true;
        icon_music.addEventListener(egret.TouchEvent.TOUCH_TAP, onScroll, this);
        function onScroll(e) {
            egret.Tween.get(colorLabel1_1).to({ x: 0, y: 260 }, 300, egret.Ease.sineIn);
            egret.Tween.get(colorLabel1_2).to({ x: 82, y: 310 }, 300, egret.Ease.sineIn);
            egret.Tween.get(colorLabel1_3).to({ x: 120, y: 360 }, 300, egret.Ease.sineIn);
            egret.Tween.get(sky).to({ x: 120, y: 360 }, 300, egret.Ease.sineIn);
        } //缓动
        var colorLabel1_1 = new egret.TextField();
        colorLabel1_1.textColor = 0x0000ff;
        colorLabel1_1.width = stageW - 172;
        colorLabel1_1.textAlign = "center";
        colorLabel1_1.text = "个人身份";
        colorLabel1_1.bold = true;
        colorLabel1_1.scrollRect = new egret.Rectangle(0, 0, 300, 50);
        colorLabel1_1.cacheAsBitmap = true;
        colorLabel1_1.size = 35;
        colorLabel1_1.x = 1000;
        colorLabel1_1.y = 260;
        this.addChild(colorLabel1_1);
        var colorLabel1_2 = new egret.TextField();
        colorLabel1_2.textColor = 0xffffff;
        colorLabel1_2.width = stageW - 172;
        colorLabel1_2.textAlign = "center";
        colorLabel1_2.text = "北京工业大学信息学部";
        colorLabel1_2.bold = true;
        colorLabel1_2.scrollRect = new egret.Rectangle(0, 0, 400, 50);
        colorLabel1_2.cacheAsBitmap = true;
        colorLabel1_2.size = 30;
        colorLabel1_2.x = 1000;
        colorLabel1_2.y = 310;
        this.addChild(colorLabel1_2);
        var colorLabel1_3 = new egret.TextField();
        colorLabel1_3.textColor = 0xffffff;
        colorLabel1_3.width = stageW - 172;
        colorLabel1_3.textAlign = "center";
        colorLabel1_3.text = "数字媒体技术140811班25号";
        colorLabel1_3.bold = true;
        colorLabel1_3.scrollRect = new egret.Rectangle(0, 0, 500, 50);
        colorLabel1_3.cacheAsBitmap = true;
        colorLabel1_3.size = 30;
        colorLabel1_3.x = 1000;
        colorLabel1_3.y = 360;
        this.addChild(colorLabel1_3);
        //
        var Mask2 = new egret.Shape();
        Mask2.graphics.beginFill(0x000000, 0.5);
        Mask2.graphics.drawRect(0, 0, stageW, 172);
        Mask2.graphics.endFill();
        Mask2.y = 443;
        this.addChild(Mask2); //黑框2
        //
        var Mask3 = new egret.Shape();
        Mask3.graphics.beginFill(0x000000, 0.5);
        Mask3.graphics.drawRect(0, 0, stageW, 172);
        Mask3.graphics.endFill();
        Mask3.y = 648;
        this.addChild(Mask3); //黑框3
        //
        var Mask4 = new egret.Shape();
        Mask4.graphics.beginFill(0x000000, 0.5);
        Mask4.graphics.drawRect(0, 0, stageW, 172);
        Mask4.graphics.endFill();
        Mask4.y = 853;
        this.addChild(Mask4); //黑框4 
        var icon_music = this.createBitmapByName("music_png");
        this.addChild(icon_music);
        icon_music.scaleX = 0.25;
        icon_music.scaleY = 0.25;
        icon_music.x = 530;
        icon_music.y = 1040; //标签(music)按钮
        icon_music.touchEnabled = true;
        //icon_music.addEventListener(egret.TouchEvent.TOUCH_TAP, onScroll, this);
    };
    //
    p.createGameScene2 = function () {
        ;
        var sky = this.createBitmapByName("sce1_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH; //全背景
    };
    //////////////////////////////////后函数
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
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
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map