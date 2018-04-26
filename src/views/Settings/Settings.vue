<template>
    <div>
        <nav-top></nav-top>
        <Main class="Settings_Wrap">
            <Card class="Settings_Inner">
                <Tabs>
                    <TabPane label="基本资料" icon="toggle-filled">
                        <Form ref="" :label-width="80">
                            <FormItem label="用户名">
                                <Input placeholder="请输入用户名"></Input>
                            </FormItem>
                            <FormItem label="隐私保护">
                                <Checkbox>在站外搜到我在知乎创作的内容时，我的用户名将不会被显示</Checkbox>
                            </FormItem>
                            <FormItem>
                                <Button type="primary">保存</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                    <TabPane label="账号和密码" icon="person">标签二的内容</TabPane>
                </Tabs>
            </Card>
        </Main>
    </div>

</template>

<script>

    import navTop from '@/views/Main/Navigation'

    export default {
        components: {
            navTop
        }
    }
</script>

<style lang="less" scoped>
    @import '../../resources/less/Settings/Settings.less';
</style>
