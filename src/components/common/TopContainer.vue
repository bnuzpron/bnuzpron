<template>
    <div class="top_container">
        <div class="z_top b-header-blur b-header-blur-black">
            <div class="b-header-mask-wrp">
                <div class="b-header-mask-bg"
                     style="background-image: url('//i0.hdslb.com/bfs/archive/4f59bf959d51592016e07efe62969c411288826a.png');"></div>
                <!--  -->
                <div class="b-header-mask"></div>
            </div>
            <div class="z_header">
                <div class="z_top_nav">
                    <ul>
                        <li class="home">
                            <a class="i-link" href="/">
                                <span>主站</span>
                            </a>
                        </li>
                        <li class="hbili">
                            <a class="i-link" href="https://www.bilibili.com/anime/" title="番剧">番剧</a>
                        </li>
                        <li class="b-gc" hasframe="true">
                            <a class="i-link" href="/HotPage" title="热门漫画">热门漫画</a>
                        </li>
                        <li class="live" hasframe="true">
                            <a class="i-link" target="_blank" href="#" title="直播">直播</a>
                        </li>
                        <li class="b-zb">
                            <a class="i-link" target="_blank" href="https://show.bilibili.com/platform/home.html"
                               title="会员购">会员购</a>
                        </li>
                        <li class="planet">
                            <a class="i-link" target="_blank" href="https://www.bilibili.com/v/game/match/" title="赛事">赛事
                                <em class="new"></em>
                            </a>
                        </li>
                        <li></li>
                    </ul>
                </div>
                <div class="uns_box">
                    <ul class="menu">
                        <!-- 头像 -->
                        <li id="userhead" class="u-i" v-show="isLogin">
                            <a class="t" href="/ShowInfo">
                                <div class="head">
                                    <img v-if="isUser"
                                         :src="userhead"
                                         class="face">
                                    <img v-if="isAdmin"
                                         src="../../assets/images/admin_head2.png"
                                         class="face">
                                </div>
                            </a>
                        </li>
                        <!-- 登录注册 -->
                        <li id="i_menu_login_reg" guest="yes" class="u-i" style="display: list-item" v-show="!isLogin">
                            <a id="i_menu_login_btn" class="i-link login" @click="Login">
                                <span>登录</span>
                            </a>
                            <i class="s-line"></i>
                            <a id="i_menu_register_btn" class="i-link reg" href="/registerPage">
                                <span>注册</span>
                            </a>
                        </li>
                        <!-- 登录后样式  用v-if判断登录状态 -->
                        <li class="u-i" style="display: list-item" v-show="isLogin">
                            <a id="i_menu_personalCenter" class="i-link" href="/ShowInfo">
                                <span>个人中心</span>
                            </a>
                        </li>
                        <li class="u-i" v-show="isUser">
                            <a id="i_menu_myFavourite" class="i-link" href="/CollectPage">
                                <span>收藏夹</span>
                            </a>
                        </li>
                        <li class="u-i" v-show="isInfo">
                            <a id="i_menu_myInfo" class="i-link" href="/CompleteInfo">
                                <span>完善资料</span>
                            </a>
                        </li>
                        <li class="u-i" v-show="isAdmin">
                            <a id="i_menu_Admin" class="i-link" href="/adminPage">
                                <span>管理中心</span>
                            </a>
                        </li>
                        <li class="u-i" v-show="isLogin">
                            <a id="i_menu_exit" class="i-link">
                                <span @click="exit">退出</span>
                            </a>
                        </li>
                        <li class="u-i b-post">
                            <a class="i-link" href="/Contribute" target="_blank"
                               @mouseenter="isShowPostMenu = !isShowPostMenu"
                               @mouseleave="isShowPostMenu = !isShowPostMenu">投稿</a>
                            <!-- <PostMaterial v-show="isShowPostMenu"></PostMaterial> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PostMaterial from './PostMaterial'

    export default {
        data() {
            return {
                isShowPostMenu: false,
                isLogin: false,
                isUser: false,
                isAdmin: false,
                isInfo: false,
                userhead: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576341970432&di=a19fa702995041398ca145aa9d6f9868&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F377adab44aed2e7356b283268401a18b87d6fa65.jpg',
                form: {
                    username: "",
                    password: "",
                },
            }
        },
        mounted: function () {
            //通过Cookies判断登录状态
            if (this.$cookies.get("username") != null && this.$cookies.get("password") != null) {
                console.log(this.$cookies.get("username"), this.$cookies.get("password"));
                //改变登录状态
                this.isLogin = true;
                //判断用户是否有头像
                if(this.$cookies.get("photo") != null && this.$cookies.get("photo") != " ") {
                    this.userhead = this.$cookies.get("photo");
                }
                //判断是否是管理员
                if (this.$cookies.get("username") == 'admin') {
                    this.isAdmin = true;
                } else {
                    this.isUser = true;
                    this.isInfo = true;
                }
            }
        },
        components: {
            PostMaterial
        },
        methods: {
            showPostMenu() {
                this.isShowPostMenu = !this.isShowPostMenu
            },
            exit: function () {
                this.$cookies.set("username", '', -1);
                this.$cookies.set("password", '', -1);
                this.$cookies.set("photo", '', -1);
                // window.location.href = "/";
                location.reload();
            },
            Login() {
                // var path = "/LoginPage?"+window.location.href;
                window.location.href = "/LoginPage";
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .top_container
        color #222
        position relative
        z-index 10000
        .z_top
            background-color transparent
            height 42px
            background #fff
            box-shadow rgba(0, 0, 0, 0.1) 0 1px 2px
            top 0px
            left 0px
            width 100%
            position relative
            z-index 10000
            font-family "Microsoft YaHei", Arial, Helvetica, sans-serifsans-serif
            color #222
            .i-link
                padding 0 14px
                transition .15s background-color
                font-size 13px
            a
                color #222
        .b-header-blur
            background-color transparent
            .b-header-mask-wrp
                position absolute
                top 0px
                left 0px
                width 100%
                height 100%
                overflow hidden
                background-color #fff
                .b-header-mask-bg
                    position absolute
                    height 62px
                    padding 0 20px
                    top -10px
                    left -20px
                    width 100%
                    filter blur(5px)
                    z-index 50
                    background-position center 0 !important
                    background-repeat no-repeat
                .b-header-mask
                    position absolute
                    top 0px
                    left 0px
                    width 100%
                    height 100%
                    z-index 100
                    background-color rgba(0, 0, 0, 0.4)
            .z_header
                display block
                margin 0 auto
                position relative
                text-align left
                z-index 10000
                width 980px
                zoom 1
                &:after
                    content ''
                    display block
                    visibility hidden
                    height 0
                    clear both
                    font-size 0
                .z_top_nav
                    float left
                    height 42px
                    font-size 12px
                    li
                        .new
                            position absolute
                            right -8px
                            color #f25d8e
                            top 13px
                            background url(../../assets/images/icons.png) no-repeat
                            width 22px
                            height 10px
                            background-position -851px -412px
                        a.i-link
                            font-size 12px
                            color #fff
                        a.i-link:hover
                            background-color rgba(255, 255, 255, 0.3)
                    ul
                        zoom 1
                        &:after
                            content ''
                            display block
                            visibility hidden
                            height 0
                            clear both
                            font-size 0
                        li
                            float left
                            text-align center
                            line-height 42px
                            position relative
                            list-style-stype: none
                            a.i-link
                                height 100%
                                display block
                                color #fff
                                a.i-link:hover
                                    background-color rgba(255, 255, 255, 0.3)
                            &.home
                                margin-left -10px
                                // background-image url(../../assets/images/icons.png)
                                background-repeat no-repeat
                                background-position -845px -74px
                                .i-link
                                    width 50px
                                    height 42px
                                    padding 0 0 0
                            &.hbili
                                position relative
                            &.live
                                position relative
                .uns_box
                    float right
                    font-size 12px
                    ul
                        &.menu
                            float left
                            position relative
                            #userhead
                                float: left;
                                text-align: center;
                                line-height: 42px;
                                height: 42px;
                                margin-right: 30px;
                                position: relative;
                                background-color: hsla(0, 0%, 100%, 0);
                                white-space: nowrap;
                                .t
                                    white-space: nowrap;
                                    color: #222;
                                    height: 100%;
                                    display: block;
                                    padding: 0 7px;
                                    .head
                                        position: absolute;
                                        z-index: 20;
                                        width: 32px;
                                        height: 32px;
                                        left: 8px;
                                        top: 0;
                                        transition: .3s;
                                        .face
                                            border: 0 solid #fff;
                                            width: 100%;
                                            height: 100%;
                                            border-radius: 50%;
                                            vertical-align: middle;
                        li
                            list-style-type none
                            &.u-i
                                float left
                                text-align center
                                height 42px
                                line-height 42px
                                position relative
                                a.i-link
                                    display block
                                    color #fff
                                a.i-link:hover
                                    background-color rgba(255, 255, 255, 0.3)
                                &#i_menu_login_reg
                                    padding 0 10px
                                    .i-link
                                        display inline-block
                                        padding 0 10px
                                        color #fff
                                        span
                                            display block
                                            margin 0px
                                            padding 0px
                                    .s-line
                                        display inline-block
                                        border-left 1px solid #fff
                                        height 12px
                                        margin-top 16px
                                        vertical-align top
                                &.b-post
                                    margin-right 0px
                                    a.i-link
                                        margin 0px
                                        padding 0px
                                        width 58px
                                        position relative
                                        z-index 100
                                        background url(../../assets/images/b-post.png) center center no-repeat
                                        height 48px
                                        border-radius 0 0 5px 5px
                                        color #fff !important
                                        font-size 14px
</style>
