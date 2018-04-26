<template>
    <div class="Publish_Outer">
        <nav-top></nav-top>
        <Main class="Publish_Wrap">
            <Row :gutter="8">
                <Col span="17">
                    <Card>
                        <div class="Publish_Title"><Input v-model="articleTitle" size="large" placeholder="请输入文章标题..."></Input></div>
                        <textarea class='tinymce-textarea' id="articleEditor"></textarea>
                    </Card>
                </Col>
                <Col span="7" class="Publish_Right">
                    <Card>
                        <p slot="title">
                            <Icon type="navicon-round"></Icon>
                            分类目录
                        </p>
                        <Tabs type="card">
                            <TabPane label="所有分类目录">
                                <div class="Publish_Right_ClassificationCon">
                                    <Tree :data="classificationList" @on-check-change="setClassificationInAll" show-checkbox></Tree>
                                </div>
                            </TabPane>
                            <TabPane label="常用目录">标签二的内容</TabPane>
                        </Tabs>
                    </Card>
                    <Card>
                        <p slot="title">
                            <Icon type="ios-pricetags-outline"></Icon>
                            标签
                        </p>
                        <Row>
                            <Col span="18">
                                <Select v-model="articleTagSelected" multiple @on-change="handleSelectTag" placeholder="请选择文章标签">
                                    <Option v-for="item in articleTagList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </Col>
                            <Col span="6">
                                <Button v-show="!addingNewTag" @click="handleAddNewTag" long type="ghost">新建</Button>
                            </Col>
                        </Row>
                        <transition name="add-new-tag">
                            <div v-show="addingNewTag" class="add-new-tag-con">
                                <Col span="12">
                                    <Input v-model="newTagName" placeholder="请输入标签名" />                                
                                </Col>
                                <Col span="6" class="padding-left-10">
                                    <Button @click="addNewTag" type="primary">确定</Button>
                                </Col>
                                <Col span="6" class="padding-left-10">
                                    <Button @click="handleAddNewTag" type="ghost">取消</Button>
                                </Col>
                            </div>
                        </transition>
                    </Card>
                    <Card>
                        <p slot="title">
                            <Icon type="paper-airplane"></Icon>
                            发布
                        </p>
                        <p>
                            <Icon type="android-time"></Icon>&nbsp;&nbsp;状&nbsp;&nbsp;&nbsp; 态：
                            <Select size="small" style="width:90px" v-model="articleState">
                                <Option v-for="item in articleStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </p>
                        <div class="Publish_ButtonGroup">
                            <Button @click="PublishArticle" :loading="publishLoading" icon="ios-checkmark" long type="primary">
                                <span v-if="!publishLoading">发布</span>
                                <span v-else>发布中...</span>
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Main>
    </div>
</template>


<script>

    import '../../../static/tinymce/tinymce.min.js'

    import navTop from '@/views/Main/Navigation'

    import routimeData from '@/dataJson/routimeData'

    export default {

        components: {
            navTop
        },

        data() {
            return {
                content: '',
                Editor: null,
                newTagName: null,
                articleTitle: null,
                articleState: 2,
                publishLoading: false,
                addingNewTag: false,
                classificationFinalSelected: [],
                articleTagSelected: [],
                classificationList: [],
                articleTagList: routimeData.articleTagList,
                articleStateList: routimeData.articleStateList
            }
        },

        methods: {
            setClassificationInAll(selectedArray) {
                this.classificationFinalSelected = [];
                selectedArray.forEach(item => {
                    if(item.pid !== '0') {
                        this.classificationFinalSelected.push(item.id);
                    }
                });
            },
            addNewTag() {
                const _self = this;
                if(this.newTagName !== '' && this.newTagName !== null) {
                    this.$store.commit('addBlogsTags', {
                        data: {
                            tagsName: _self.newTagName
                        },
                        successCb(res) {
                            _self.$Notice.success({
                                title: res.msg,
                                onClose() {
                                    _self.getBlogsTags();
                                    _self.newTagName = '';
                                }
                            });
                        }
                    })
                } else {
                    this.$Notice.error({
                        title: '请输入标签名'
                    });
                }
            },
            getBlogsTags() {
                const _self = this;
                this.$store.commit('getBlogsTags', {
                    successCb(res) {
                        _self.articleTagList = res.data;
                    }
                });
            },
            getBlogsType() {
                const _self = this;
                this.$store.commit('getBlogsType', {
                    successCb(res) {
                        _self.classificationList = res.data;
                    }
                });
            },
            PublishArticle() {
                this.publishLoading = true;
                if(this.content === '' || this.content === null || this.content === undefined) {
                    this.$Notice.error({
                        title: '请输入内容再发布'
                    });
                    this.publishLoading = false;
                    return false;
                }
                if(this.classificationFinalSelected.length === 0) {
                    this.$Notice.error({
                        title: '请选择分类'
                    });
                    this.publishLoading = false;
                    return false;
                }
            },
            initTinyMce() {
                const _self = this;
                window.tinymce.baseURL = '/static/tinymce';
                this.Editor = window.tinymce.init({
                    selector: '#articleEditor',
                    branding: false,
                    elementpath: false,
                    height: 400,
                    menubar: 'edit insert view format table tools',
                    theme: 'modern',
                    plugins: [
                        'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                        'searchreplace visualblocks visualchars code fullscreen fullpage',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                    ],
                    toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
                    autosave_interval: '20s',
                    image_advtab: true,
                    table_default_styles: {
                        width: '100%',
                        borderCollapse: 'collapse'
                    },
                    setup: (editor) => {
                        editor.on('input change undo redo', () => {
                            _self.content = editor.getContent({format: 'raw'});
                        })
                    }
                });
            },
            handleSelectTag(selectedTagList) {
                this.articleTagSelected = selectedTagList;
            },
            handleAddNewTag() {
                this.addingNewTag = !this.addingNewTag;
            },
        },

        mounted() {

            this.initTinyMce();

            this.getBlogsType();

            this.getBlogsTags();

        }

    }
</script>

<style lang="less" scoped>
    @import '../../resources/less/Blog/Publish.less';
</style>
