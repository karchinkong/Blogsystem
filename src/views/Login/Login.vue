<template>
    <div class="SignFlowHomepage">
        <div class="SignFlowHomepage-content">
            <Card class="SignContainer-content">
                <div class="SignContainer-Logo">
                    <img src="@/resources/images/Common/logo-min.jpg" />
                    <h3>登录KnowHu,发现更大的世界</h3>
                </div>
                <div class="SignContainer-Inner">
                    <Form ref="LoginForm" :model="loginForm" :rules="loginRules">
                        <FormItem prop="username">
                            <Input v-model="loginForm.username" placeholder="Enter your Name..." size="large" />
                        </FormItem>
                        <FormItem prop="password">
                            <Input 
                                placeholder="Enter your Password..." 
                                :type="isPassword ? 'password' : 'text'" 
                                :icon="isPassword ? 'eye-disabled' : 'eye'" 
                                size="large" 
                                @on-click="showPassword" 
                                v-model="loginForm.password" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" long size="large" @click="Login">登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isPassword: true,
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [
                        { required: true, message: 'Please Enter your Username', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please Enter your Password', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            showPassword() {
                this.isPassword = !this.isPassword;
            },
            Login() {
                const _self = this;
                this.$refs.LoginForm.validate(valid => {
                    if(valid) {
                        this.$store.commit('login', {
                            data: {
                                username: _self.loginForm.username,
                                password: _self.loginForm.password
                            },
                            successCb(res) {
                                _self.$router.push({ path: '/' });
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../resources/less/Login/Login.less';
</style>
