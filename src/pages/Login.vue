<template>
    <div class="loginPage">
        <div class="form" id="loginform">
            <h1> Login </h1>
            <form novalidate @blur="">
                <p class="userName">
                    <label for="userName">UserName <span>*</span>
                    </label>
                    <input class="input" required type="text" id="userName" name="userName" v-model="userName" />
                    <span class="validation req"> This field is required</span>
                </p>
                <p class="password">
                    <label for="password">Password <span>*</span></label>
                    <input class="input" required type="password" id="password" v-model="password" name="password" />
                    <span class="validation req"> This field is required</span>
                </p>
                <p class="remember">
                    <input class="checkbox" type="checkbox" id="remember" v-model="isRemember" />
                    <label for="remember"> Remember me</label>
                </p>
                <p class="login">
                    <input type="button" value="Login" @click="setLogin" />
                </p>
            </form>
        </div>
    </div>

</template>

<script setup>

import { ref } from 'vue'
import api from '../api/api.js'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus';
const userName = ref("")
const password = ref("")
const isRemember = ref(false)
const router = useRouter()

function setLogin() {
    api.postAPI("/admin/adminLogin", {
        userName: userName.value,
        password: password.value
    }).then((res) => {
        // 判断是否请求成功
        if (res.data.status == 1) {
            console.log('res.errors :>> ', res.data.errors)
            res.data.errors.forEach(x => {
                ElMessage.error(x.msg)
            })
        } else {
            // 判断以什么方法存储token
            if (isRemember.value) {
                localStorage.setItem("token", res.data.token)
            } else {
                sessionStorage.setItem("token", res.data.token)
            }
            ElMessage.success("登录成功!")
            router.push("/home")
        }
    })
}
</script>

<style lang="scss" scoped>
$primary : #FEDC2A;
$complementary :#5A3B5D;
$lightsep: rgb(220, 220, 220);

// 将整个页面扩展到整个屏幕 不局限于双容器
.loginPage {
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0;
    background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);

    .form {
        margin-top: 3em;
    }
}

.checkbox+label:before {
    background: rgb(255, 255, 255);
    border: 1px solid rgb(216, 216, 216);
}

/* transitionned state when checked */
.checkbox:checked+label:before {
    background: $complementary;
    border-color: $complementary;
}

/* applying transition */
.checkbox+label:before {
    transition:
        background .2s,
        border-color .2s;
    /* double transition, yup ! */
}



/* Let's animate the mark */
.checkbox:not(:checked)+label:after {
    transform: scale(0);
}

.checkbox:checked+label:after {
    transform: scale(1);
}

.checkbox+label:after {
    transition: transform .4s;
}

/****** 2. Let's shake this form  ******/

/* Creating the animation */
@keyframes shakeMe {

    0%,
    100% {
        transform: translateX(0);
    }

    20%,
    60% {
        transform: translateX(-10px);
    }

    40%,
    80% {
        transform: translateX(10px);
    }
}


/* Applying the animation */
.errors {
    animation-name: shakeMe;
    animation-duration: .5s;
}

/****** Here come the unicorns, aka all the styling not useful for the animation demo at the conference :)  ******/

body {
    background: #FEDC2A;
    font-family: 'Raleway', sans-serif;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}


.form {
    background: #fff;
    border: 1px solid #D9D9D9;
    color: rgb(99, 99, 99);
    width: 300px;
    border-radius: 4px;
    margin: 0 auto;
    padding: 20px 30px;

    h1 {
        text-transform: uppercase;
        font-weight: normal;
        font-size: 1.5em;
        text-align: center;
        margin: 0;
        padding: 10px 0px;
        border-bottom: 1px solid $lightsep;
    }
}

form p {
    position: relative;
    margin: 25px 0 10px 0;
    position: relative;
}


p.remember {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid $lightsep;
}

.userName label,
.password label,
.input {
    display: block;
    width: 100%;
    padding-bottom: 10px;
    box-sizing: border-box;
}


/* button button Styling */

[type="button"] {
    display: block;
    color: $complementary;
    font-weight: bold;
    border-radius: 2px;
    background: $primary;
    box-shadow: 5px 5px 0 0 $primary,
        inset 4px 4px 0 0 white;
    border: 2px solid $complementary;
    border-radius: 3px;
    padding: 10px;
    width: 100%;
    margin: 0 auto;
    transition: background .3s;

    // 选中触发 显示阴影
    &:hover {
        background: white;
        box-shadow: 5px 5px 0 0 $primary,
            inset 4px 4px 0 0 white;
    }

    // 聚焦或被选中时触发
    &:active,
    &:focus {
        position: relative;
        top: 1px;
        outline: none;
        background: darken($primary, 10%);
    }
}

[type="password"],
[name="userName"] {
    padding: 20px;

    &:focus {
        outline: none;
    }
}

/* Styling the input */

.input {
    font-size: .85em;
    background: rgb(255, 255, 255);
    border: 1px solid $lightsep;
    height: 40px;
    transition: border-color .4s, box-shadow 1s;
}

// 被选中或聚焦时 添加上边框与阴影效果
.input:active,
.input:focus {
    border: 1px solid $complementary;
    box-shadow: 4px 4px 0 #C7A9CD;
}

// 当检测内容不为空时隐藏错误信息
.input:valid~.validation {
    opacity: 0;
    transition: opacity .5s;
}


/* Removing the checkbox from screen */
.checkbox {
    position: absolute;
    left: -300%;
}

.checkbox+label {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
}

/* Creating the fake checkbox */
.checkbox+label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 15px;
    height: 15px;
    border-radius: 2px;
}

/* accessibility */
.checkbox:focus+label:before {
    border: 1px solid $complementary;
    box-shadow: 4px 4px 0 #C7A9CD;
}

/* Adding the SVG mark */

.checkbox+label:after {
    content: " ";
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.7 8.7" enable-background="new 0 0 10.7 8.7"><path fill="white" d="M4.2 8.7c-.3 0-.5-.3-.7-.5l-3.2-3.1c-.4-.4-.4-1.1 0-1.5s1-.4 1.4 0l2.4 2.3 4.9-5.6c.4-.4 1-.5 1.4-.1.4.4.5 1 .1 1.4l-5.6 6.6c-.1.2-.4.5-.7.5z"/></svg>') no-repeat;
    /* OMG you can embed SVG in background, awesoome */
    position: absolute;
    left: 2px;
    top: 3px;
    width: 13px;
    height: 13px;
}



/****** Validation messages ******/
// 错误信息的css
.invalid {
    border-color: rgb(183, 0, 76);
}

.required {
    border-color: #B54300;
}

.validation {
    display: block;
    font-size: .8em;
    padding-top: .5em;
    position: absolute;
    right: 0;
    opacity: 1;
    // transition: opacity 1s;
}

.validation.req {
    color: #B54300;
}

.validation.error {
    color: rgb(183, 0, 76);
}


.invalid:not(.required)~.validation.error {
    opacity: 1;
    transform: scale(1);
}

.required~.validation.req {
    opacity: 1;
    transform: scale(1);
}
</style>