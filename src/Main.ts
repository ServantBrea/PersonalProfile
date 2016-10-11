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

class Main extends egret.DisplayObjectContainer {
//前面部分    
    private static STEP_ROT:number = 1;//旋转步长定义
    private static STEP_SCALE:number = .02;//缩放步长定义
    private textfield:egret.TextField;
  
    private loadingView:LoadingUI;// 加载进度界面

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {   
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);//设置加载进度界面
 
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");//初始化Resource资源加载库
    }
          
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }// 配置文件加载完成,开始预加载preload资源组。
      
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene1();           
        }
    }// preload资源组加载完成

    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }// 资源组加载出错

    private onResourceLoadError(event:RES.ResourceEvent):void {     
        console.warn("Group:" + event.groupName + " has failed to load");//TODO    
        this.onResourceLoadComplete(event);//忽略加载失败的项目
    }// 资源组加载出错
      
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }// preload资源组加载进度

//构建整个场景
    // 创建游戏场景       
    private createGameScene1():void {  
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;//获取舞台长宽
//页面3
        var Page3:Page = new Page();
        this.addChild(Page3);
        Page3.touchEnabled = true;//定义页面3容器
        this.pagemove(Page3);//页面具有滑动效果

        var sky3:egret.Bitmap = this.createsky("sce2_jpg",stageW,stageH);
        Page3.addChildAt(sky3,0);//绘制页面3背景 

        var Jpg1:jpglist = this.createjpglist("001_jpg"); Page3.addChild(Jpg1.jpg);
        var Jpg2:jpglist = this.createjpglist("002_jpg"); Page3.addChild(Jpg2.jpg);
        var Jpg3:jpglist = this.createjpglist("003_jpg"); Page3.addChild(Jpg3.jpg);
        var Jpg4:jpglist = this.createjpglist("004_jpg"); Page3.addChild(Jpg4.jpg);
        var Jpg5:jpglist = this.createjpglist("005_jpg"); Page3.addChild(Jpg5.jpg);
        var Jpg6:jpglist = this.createjpglist("006_jpg"); Page3.addChild(Jpg6.jpg);
        var Jpg7:jpglist = this.createjpglist("007_jpg"); Page3.addChild(Jpg7.jpg);
        var Jpg8:jpglist = this.createjpglist("008_jpg"); Page3.addChild(Jpg8.jpg); 

        Jpg1.form = Jpg8; Jpg1.next = Jpg2;
        Jpg2.form = Jpg1; Jpg2.next = Jpg3;
        Jpg3.form = Jpg2; Jpg3.next = Jpg4;
        Jpg4.form = Jpg3; Jpg4.next = Jpg5;
        Jpg5.form = Jpg4; Jpg5.next = Jpg6;
        Jpg6.form = Jpg5; Jpg6.next = Jpg7;
        Jpg7.form = Jpg6; Jpg7.next = Jpg8;
        Jpg8.form = Jpg7; Jpg8.next = Jpg1; 

        var text3_characters = this.createText(162,960,30);
        text3_characters.textFlow = <Array<egret.ITextElement>>[
          {text: "Games Characters", style: {"textColor": 0xffffff,"size": 35}}
        ];
        Page3.addChild(text3_characters);//定义文字 

        var button_roll1:egret.Bitmap = this.createBitmapByName("left_png",140,545,0.3,0.3);
        this.changeanchor(button_roll1);
        button_roll1.touchEnabled = true;
        this.icon_Animation(button_roll1,2);
        Page3.addChild(button_roll1);

        var button_roll2:egret.Bitmap = this.createBitmapByName("right_png",500,545,0.3,0.3);
        this.changeanchor(button_roll2);
        button_roll2.touchEnabled = true;
        this.icon_Animation(button_roll2,3);
        Page3.addChild(button_roll2);

        this.Roll(Jpg1,Jpg2,Jpg3,Jpg4,Jpg5,Jpg6,Jpg7,Jpg8,button_roll1,button_roll2);
 
//页面2               
        var Page2:Page = new Page();
        this.addChild(Page2);
        Page2.touchEnabled = true;//定义页面2容器
        this.pagemove(Page2);//页面具有滑动效果

        var sky2:egret.Bitmap = this.createsky("sce1_jpg",stageW,stageH);
        Page2.addChild(sky2);//绘制页面1背景

        var picture1_1:egret.Bitmap = this.createBitmapByName("g1_jpg",0,205,1,1);
        Page2.addChild(picture1_1);
        var picture1_2:egret.Bitmap = this.createBitmapByName("g2_jpg",0,205,1,1);
        Page2.addChild(picture1_2);
        var picture1_3:egret.Bitmap = this.createBitmapByName("g3_jpg",0,205,1,1);
        Page2.addChild(picture1_3);

        this.pictureplay(picture1_1,picture1_2,picture1_3);

        var picture2_1:egret.Bitmap = this.createBitmapByName("g4_jpg",0,625,1,1);
        Page2.addChild(picture2_1);
        var picture2_2:egret.Bitmap = this.createBitmapByName("g5_jpg",0,625,1,1);
        Page2.addChild(picture2_2);
        var picture2_3:egret.Bitmap = this.createBitmapByName("g6_jpg",0,625,1,1);
        Page2.addChild(picture2_3);

        this.pictureplay(picture2_1,picture2_2,picture2_3);

        var text2_1 = this.createText(200,576,35);
        text2_1.textFlow = <Array<egret.ITextElement>>[
          {text: "Video Games", style: {"textColor": 0xffffff,"size": 35}}
        ];
        Page2.addChild(text2_1);//定义文字
//页面1
        var Page1:Page = new Page();
        this.addChild(Page1);
        Page1.touchEnabled = true;//定义页面1容器
        this.pagemove(Page1);//页面具有滑动效果
       
        var sky1:egret.Bitmap = this.createsky("sce_jpg",stageW,stageH);
        Page1.addChild(sky1);//绘制页面1背景

        var Mask1 = this.createMask(0,238,stageW,172);
        Page1.addChild(Mask1);//定义黑框1

        var icon1_1:egret.Bitmap = this.createBitmapByName("umbra_png",75,325,0.4,0.4);
        Page1.addChild(icon1_1);
        this.changescale(icon1_1,icon1_1.scaleX,icon1_1.scaleY);//定义标签(unbra)logo

        var text1_1 = this.createText(1000,270,35);
        text1_1.textFlow = <Array<egret.ITextElement>>[
          {text: "个人身份", style: {"textColor": 0x0000ff,"size": 35}}
        , {text:"\n"}
        , {text: "北京工业大学信息学部", style: {"textColor": 0xffffff, "size": 30}}
        , {text:"\n"}
        , {text: "数字媒体技术140811班25号", style: {"textColor": 0xffffff, "size": 30}}
        ];
        Page1.addChild(text1_1);
        this.onScroll(text1_1,270,500);//定义文字
    
        var Mask2 = this.createMask(0,443,stageW,172);
        Page1.addChild(Mask2);//定义黑框2

        var icon1_2:egret.Bitmap = this.createBitmapByName("witcher_png",70,530,0.5,0.5);
        Page1.addChild(icon1_2);
        this.changescale(icon1_2,icon1_2.scaleX,icon1_2.scaleY);//定义标签(witcher)logo
        
        var text1_2 = this.createText(1000,455,35);
        text1_2.textFlow = <Array<egret.ITextElement>>[
          {text: "联系信息", style: {"textColor": 0x0000ff,"size": 35}}
        , {text:"\n"}
        , {text: "手机：13687886372", style: {"textColor": 0xffffff, "size": 30}}
        , {text:"\n"}
        , {text: "QQ：516916849", style: {"textColor": 0xffffff, "size": 30}}
        , {text:"\n"}
        , {text: "微信：ServantBrea", style: {"textColor": 0xffffff, "size": 30}}
        ];
        Page1.addChild(text1_2);
        this.onScroll(text1_2,455,1000);//定义文字

        var Mask3 = this.createMask(0,648,stageW,172);
        Page1.addChild(Mask3);//定义黑框3

        var icon1_3:egret.Bitmap = this.createBitmapByName("codmw_png",70,735,0.35,0.35);
        Page1.addChild(icon1_3);
        this.changescale(icon1_3,icon1_3.scaleX,icon1_3.scaleY);//定义标签(witcher)logo
        
        var text1_3 = this.createText(1000,660,35);
        text1_3.textFlow = <Array<egret.ITextElement>>[
          {text: "个人爱好", style: {"textColor": 0x0000ff,"size": 35}}
        , {text:"\n"}
        , {text: "主要：大型单机游戏", style: {"textColor": 0xffffff, "size": 30}}
        , {text:"\n"}
        , {text: "其次：看漫画，动漫，学制作游戏", style: {"textColor": 0xffffff, "size": 30}}
        , {text:"\n"}
        , {text: "剩余：看新闻，电影，外国电视剧", style: {"textColor": 0xffffff, "size": 30}}
        ];
        Page1.addChild(text1_3);
        this.onScroll(text1_3,660,1500);//定义文字
        
        var Mask4 = this.createMask(0,853,stageW,172);
        Page1.addChild(Mask4);//定义黑框4 

        var icon1_4:egret.Bitmap = this.createBitmapByName("teos_png",70,940,0.35,0.35);
        Page1.addChild(icon1_4);
        this.changescale(icon1_4,icon1_4.scaleX,icon1_4.scaleY);//定义标签(witcher)logo
        
        var text1_4 = this.createText(1000,865,35);
        text1_4.textFlow = <Array<egret.ITextElement>>[
          {text: "最近正忙", style: {"textColor": 0x0000ff,"size": 35}}
        , {text:"\n"}
        , {text: "The Witcher 3,The last of us", style: {"textColor": 0xffffff, "size": 30}}
        , {text:"\n"}
        , {text: "Uncharted,One pieces,GTA5", style: {"textColor": 0xffffff, "size": 30}}
        , {text:"\n"}
        , {text: "Java,Egret,Unreal4,Opengl", style: {"textColor": 0xffffff, "size": 30}}
        ];
        Page1.addChild(text1_4);
        this.onScroll(text1_4,865,2000);//定义文字

//页面（最上不变）
        var Pageall:Page = new Page();
        this.addChild(Pageall);//页面容器最上的定义
        
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 205);
        topMask.graphics.endFill();
        Pageall.addChild(topMask);//定义黑框（标题）

        var icon_egret:egret.Bitmap = this.createBitmapByName("egret_icon_png",54,12,1,1);
        Pageall.addChild(icon_egret);//定义标签（白鹭）        
        
        var toptext = this.createText(310,60,60);
        toptext.textColor = 0xffffff;
        toptext.text = "周景城";
        Pageall.addChild(toptext);//定义标题文字

        var endtext = this.createText(20,1100,20);
        endtext.textColor = 0xffffff;
        endtext.text = "By Servant.For.Brea";
        Pageall.addChild(endtext);//定义标题文字

        var textfield = this.createText(172,135,30);
        Pageall.addChild(textfield);
        textfield.alpha = 0;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.textColor = 0xffffff;
        this.textfield = textfield;
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)//定义特殊文字显示

        var icon_up:egret.Bitmap = this.createBitmapByName("up_png",300,1060,0.3,0.3);
        Pageall.addChild(icon_up); 
        this.icon_Animation(icon_up,0);  

        var icon_down:egret.Bitmap = this.createBitmapByName("down_png",330,1040,0.3,0.3);
        Pageall.addChild(icon_down);
        this.icon_Animation(icon_down,1);
        
        //音乐按钮
        var music:egret.Sound = RES.getRes("The1_mp3");
        var musicChannel:egret.SoundChannel;
        var stop_time:number = 0;
        musicChannel = music.play(stop_time,0);//定义音乐
        var Anim_point =AnimModes.Anim_0;//定义按钮模式

        var icon_music:egret.Bitmap = this.createBitmapByName("music_png",580,1080,0.5,0.5);
        Pageall.addChild(icon_music);
        this.changeanchor(icon_music);
        icon_music.touchEnabled = true;

        icon_music.addEventListener(egret.TouchEvent.TOUCH_TAP, changeAnim, this);
        icon_music.addEventListener(egret.TouchEvent.ENTER_FRAME, if_rotation, this);         

//各种事件/CreateGameScene内函数     
        function changeAnim(e: egret.TouchEvent): void {
              Anim_point = (Anim_point + 1 ) % 2;
              switch (Anim_point) {
                  case AnimModes.Anim_0 : 
                        musicChannel=music.play(stop_time,0);
                        break;
                  case AnimModes.Anim_1 :
                        stop_time = musicChannel.position; 
                        musicChannel.stop();
                        musicChannel = null;
                        break;
            } 
        }//改变按钮和音乐播放模式

        function if_rotation(e: egret.TouchEvent):void {
            switch (Anim_point) {
               case AnimModes.Anim_0 : icon_music.rotation += Main.STEP_ROT;
                    break;
               case AnimModes.Anim_1 : ;
                    break;
            }        
        }//是否旋转

        function if_playmusic(e: egret.TouchEvent):void {
            switch (Anim_point) {
               case AnimModes.Anim_0 : music.play();
                    break;
               case AnimModes.Anim_1 : music.close();
                    break;
            }        
        }//是否播放音乐                
    }

//各种自定义/private函数
    private createjpglist(filename:string):jpglist {
        var Jpg:jpglist = new jpglist;
        Jpg.jpg = this.createBitmapByName(filename,0,0,1,1);
        this.changeanchor(Jpg.jpg);
        return Jpg;
    }//建立图链表节点

    private icon_Animation(icon:egret.Bitmap,mode:number):void {
        var len = 40;
        icon_move();
        function icon_move() {
            switch (mode) {
                case 0 : { egret.Tween.get(icon).wait(500)
                                                .to({x:icon.x,y:icon.y-len,"alpha":0},1400,egret.Ease.sineIn)
                                                .to({x:icon.x,y:icon.y,"alpha":1},0,egret.Ease.sineIn).call(icon_move); 
                          break;}
                case 1 : { egret.Tween.get(icon).wait(500)
                                                .to({x:icon.x,y:icon.y+len,"alpha":0},1400,egret.Ease.sineIn)
                                                .to({x:icon.x,y:icon.y,"alpha":1},0,egret.Ease.sineIn).call(icon_move); 
                          break;}
                case 2 : { egret.Tween.get(icon).to({x:icon.x-len,y:icon.y,"alpha":0},1400,egret.Ease.sineIn)
                                                .to({x:icon.x,y:icon.y,"alpha":1},0,egret.Ease.sineIn).call(icon_move); 
                          break;}
                case 3 : { egret.Tween.get(icon).to({x:icon.x+len,y:icon.y,"alpha":0},1400,egret.Ease.sineIn)
                                                .to({x:icon.x,y:icon.y,"alpha":1},0,egret.Ease.sineIn).call(icon_move); 
                          break;}
            }
        } 
    }//标签动画

    private onScroll(text:egret.TextField,iny:number,time:number): void {
        egret.Tween.get(text).wait(time).to( {x:180,y:iny}, 300, egret.Ease.sineIn );
    }//文字的缓动出现效果

    private changescale(icon:egret.Bitmap,sX:number,sY:number):void {
        var n = 0;
        this.changeanchor(icon);
        icon.addEventListener( egret.Event.ENTER_FRAME, ( evt:egret.Event )=>{
        icon.scaleX = icon.scaleY = 0.5*sX + 0.5*sY* Math.abs( Math.sin( n += Main.STEP_SCALE ) );
        },this);             /// 仅缩放，缩放范围
    }//自身放大缩小

    private pagemove(p:Page):void {
        p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, p.mouseDown, p);
        p.addEventListener(egret.TouchEvent.TOUCH_END, p.mouseUp, p);            
    }//页面翻动 

    private changeanchor(icon:egret.Bitmap):void {
        icon.anchorOffsetX = icon.width/2;
        icon.anchorOffsetY = icon.height/2;//改变锚点位置
    }//改变锚点

    private Roll(p1:jpglist,p2:jpglist,p3:jpglist,p4:jpglist,p5:jpglist,p6:jpglist,p7:jpglist,p8:jpglist,
                 b1:egret.Bitmap,b2:egret.Bitmap){
        var po1 = this.makepoint(320,568);
        var po2_1 = this.makepoint(234,568);
        var po2_2 = this.makepoint(406,568);
        var po3_1 = this.makepoint(148,568);
        var po3_2 = this.makepoint(492,568);

        this.set(p1,po1,1,5);
        this.set(p2,po2_1,0.9,4);
        this.set(p8,po2_2,0.9,4);
        this.set(p3,po3_1,0.8,3);
        this.set(p7,po3_2,0.8,3);
        this.set(p4,po2_1,0.7,2);
        this.set(p6,po2_2,0.7,2);
        this.set(p5,po1,0.6,1);
        /*
        var timemode = 0;
        var timer:egret.Timer = new egret.Timer(1000,0);//注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER,gorollleft,this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,gorollright,this);
        timer.start();
        */
        b1.addEventListener(egret.TouchEvent.TOUCH_TAP,gorollleft,this);
        b2.addEventListener(egret.TouchEvent.TOUCH_TAP,gorollright,this);
        
        function gorollleft(/*e: egret.TouchEvent*/):void {
            egret.Tween.get(p8.jpg).to({x:po1.x,y:po1.y,scaleX:0.7*1,scaleY:0.7*1},300,egret.Ease.sineIn);
            p8.jpg.parent.setChildIndex(p8.jpg,5);

            egret.Tween.get(p1.jpg).to({x:po2_1.x,y:po2_1.y,scaleX:0.7*0.9,scaleY:0.7*0.9},300,egret.Ease.sineIn);
            p1.jpg.parent.setChildIndex(p1.jpg,4);

            egret.Tween.get(p2.jpg).to({x:po3_1.x,y:po3_1.y,scaleX:0.7*0.8,scaleY:0.7*0.8},300,egret.Ease.sineIn);
            p2.jpg.parent.setChildIndex(p2.jpg,3);
            
            egret.Tween.get(p3.jpg).to({x:po2_1.x,y:po2_1.y,scaleX:0.7*0.7,scaleY:0.7*0.7},300,egret.Ease.sineIn);
            p3.jpg.parent.setChildIndex(p3.jpg,2);
            
            egret.Tween.get(p4.jpg).to({x:po1.x,y:po1.y,scaleX:0.7*0.6,scaleY:0.7*0.6},300,egret.Ease.sineIn);
            p4.jpg.parent.setChildIndex(p4.jpg,1);
            
            egret.Tween.get(p5.jpg).to({x:po2_2.x,y:po2_2.y,scaleX:0.7*0.7,scaleY:0.7*0.7},300,egret.Ease.sineIn);
            p5.jpg.parent.setChildIndex(p5.jpg,2);
            
            egret.Tween.get(p6.jpg).to({x:po3_2.x,y:po3_2.y,scaleX:0.7*0.8,scaleY:0.7*0.8},300,egret.Ease.sineIn);
            p6.jpg.parent.setChildIndex(p6.jpg,3);
            
            egret.Tween.get(p7.jpg).to({x:po2_2.x,y:po2_2.y,scaleX:0.7*0.9,scaleY:0.7*0.9},300,egret.Ease.sineIn);
            p7.jpg.parent.setChildIndex(p7.jpg,4);  

            p1 = p1.form;  
            p2 = p2.form;
            p3 = p3.form;
            p4 = p4.form;
            p5 = p5.form;
            p6 = p6.form;
            p7 = p7.form;
            p8 = p8.form;       
        }

        function gorollright(/*e: egret.TouchEvent*/):void {
            egret.Tween.get(p2.jpg).to({x:po1.x,y:po1.y,scaleX:0.7*1,scaleY:0.7*1},300,egret.Ease.sineIn);
            p2.jpg.parent.setChildIndex(p2.jpg,5);

            egret.Tween.get(p3.jpg).to({x:po2_1.x,y:po2_1.y,scaleX:0.7*0.9,scaleY:0.7*0.9},300,egret.Ease.sineIn);
            p3.jpg.parent.setChildIndex(p3.jpg,4);

            egret.Tween.get(p4.jpg).to({x:po3_1.x,y:po3_1.y,scaleX:0.7*0.8,scaleY:0.7*0.8},300,egret.Ease.sineIn);
            p4.jpg.parent.setChildIndex(p4.jpg,3);
            
            egret.Tween.get(p5.jpg).to({x:po2_1.x,y:po2_1.y,scaleX:0.7*0.7,scaleY:0.7*0.7},300,egret.Ease.sineIn);
            p5.jpg.parent.setChildIndex(p5.jpg,2);
            
            egret.Tween.get(p6.jpg).to({x:po1.x,y:po1.y,scaleX:0.7*0.6,scaleY:0.7*0.6},300,egret.Ease.sineIn);
            p6.jpg.parent.setChildIndex(p6.jpg,1);
            
            egret.Tween.get(p7.jpg).to({x:po2_2.x,y:po2_2.y,scaleX:0.7*0.7,scaleY:0.7*0.7},300,egret.Ease.sineIn);
            p7.jpg.parent.setChildIndex(p7.jpg,2);
            
            egret.Tween.get(p8.jpg).to({x:po3_2.x,y:po3_2.y,scaleX:0.7*0.8,scaleY:0.7*0.8},300,egret.Ease.sineIn);
            p8.jpg.parent.setChildIndex(p8.jpg,3);
            
            egret.Tween.get(p1.jpg).to({x:po2_2.x,y:po2_2.y,scaleX:0.7*0.9,scaleY:0.7*0.9},300,egret.Ease.sineIn);
            p1.jpg.parent.setChildIndex(p1.jpg,4);  

            p1 = p1.next;  
            p2 = p2.next;
            p3 = p3.next;
            p4 = p4.next;
            p5 = p5.next;
            p6 = p6.next;
            p7 = p7.next;
            p8 = p8.next;        
        }
    }//图片的滚动效果

    private set(pic:jpglist,po:egret.Point,s:number,d:number):void {
        pic.jpg.x = po.x;
        pic.jpg.y = po.y;
        pic.jpg.scaleX = 0.7*s;
        pic.jpg.scaleY = 0.7*s;
        pic.jpg.parent.addChildAt(pic.jpg,d);
    }//以某点设置某图位置

    private makepoint(x:number,y:number):egret.Point {
        var point =new egret.Point(x,y);
        return point;
    }//制造点

    private pictureplay(a:egret.Bitmap,b:egret.Bitmap,c:egret.Bitmap):void {    
        var count = 0;  
        a.alpha = 0; b.alpha = 0; c.alpha = 0;
        var change:Function = function () {
        var t:egret.Bitmap;
        if(count < 3) {count++;} else{count = 1;}
            switch (count){
                case 1: t = a;break;
                case 2: t = b;break;
                case 3: t = c;break;
            }
            var tw = egret.Tween.get(t);
            tw.to({"alpha": 1}, 1000);
            tw.wait(2000);
            tw.to({"alpha": 0}, 1000);
            tw.call(change, t);
        };   
        change();
    }//图片变换
  
    private createBitmapByName(name:string,x:number,y:number,xs:number,ys:number):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.x = x;
        result.y = y;
        result.scaleX = xs;
        result.scaleY = ys;
        return result;
    }//根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。

    private startAnimation(result:Array<any>):void {
        var self:any = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };
        change();
    }//描述文件加载成功，开始播放动画

    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }// 切换描述内容
   
    private createMask(x:number,y:number,w:number,h:number):egret.Shape {
        var Mask = new egret.Shape();
        Mask.graphics.beginFill(0x000000, 0.5);
        Mask.graphics.drawRect(x, y, w, h);
        Mask.graphics.endFill();
        return Mask;
    }//生成黑框
  
    private createsky(filename:string,w:number,h:number):egret.Bitmap {
        var sky:egret.Bitmap = this.createBitmapByName(filename,0,0,1,1);      
        sky.width = w;
        sky.height = h;
        return sky;
    }//生成页面背景
  
    private createText(x:number,y:number,s:number):egret.TextField{
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
    }//格式化生成文字（具有相同特点）
}

class Page extends egret.DisplayObjectContainer {

    private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
    private _distance:egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差

    public mouseDown(evt:egret.TouchEvent) {
             this._touchStatus = true;
             this._distance.y = evt.stageY - this.y;
             this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseMove(evt:egret.TouchEvent) {
            if( this._touchStatus ) {
                 this.y = evt.stageY - this._distance.y;
                 if( this.y < -500 ){
                     egret.Tween.get( this ).to( {x:0,y:-1136}, 300, egret.Ease.sineIn )
                     .call(down).to({x:0,y:0}, 100, egret.Ease.sineIn);   
                     this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                 }
                 if( this.y > 500 ){
                     egret.Tween.get( this ).to( {x:0,y:1136}, 300, egret.Ease.sineIn )
                     .call(down).to({x:0,y:0}, 100, egret.Ease.sineIn);
                     this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                 }
            } 

            function down():void {
                 this.parent.addChildAt(this,0);
            }//容器深度置下           
    }

    public mouseUp(evt:egret.TouchEvent) {
            this._touchStatus = false;
            if( this.y >= -500 ) {
                egret.Tween.get( this ).to( {x:0,y:0}, 300, egret.Ease.sineIn );
            }
            if( this.y <= 500 ) {
                egret.Tween.get( this ).to( {x:0,y:0}, 300, egret.Ease.sineIn );
            }
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }
 
}//页面类

class AnimModes{
    public static Anim_0:number = 0;
    public static Anim_1:number = 1;
}//按钮模式类

class jpglist {
    public form:jpglist;
    public next:jpglist;
    public jpg:egret.Bitmap;
}//图片类