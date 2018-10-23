
<template>
    <div>
        <Layout>
            <Sider :style="{background: '#fff'}" width="300">
                <Card>
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        查询条件
                    </p>
                    <Form :model="queryForm" label-position="top">
                        <FormItem label="名称">
                            <Input v-model="queryForm.beanName" placeholder="请输入bean名称"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleQuery()" style="margin-top:20px;">查询</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Sider>
            <Layout>    
                <Content>
                <Card>
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        查询结果
                    </p>
                    <Table size="small" @on-current-change="handleSelect" highlight-row ref="currentRowTable" border   :columns="columns1" :data="data1"></Table>
                    <template>
                        <Page @on-change="changePage" style="padding-top:20px;" :total="pageTotal"></Page>
                    </template>
                </Card>
                </Content>
            </Layout>
        </Layout>

        <Modal v-model="modalStatus" title="操作"
         width="1200">
            <Tabs value="tabProp">
                <TabPane label="属性" name="tabProp">
                    <Content>
                        <Card>
                            <p slot="title">
                                <Icon type="ios-film-outline"></Icon>
                                Bean名称
                            </p>
                            {{modalBeanName}}
                            <Table size="small" height="300"  border  :columns="columnsProp" :data="dataProp"></Table>
                        </Card>
                    </Content>
                </TabPane>
                <TabPane label="方法" name="tabMethod">
                    <Content>
                        <Card>
                            <p slot="title">
                                <Icon type="ios-film-outline"></Icon>
                                Bean名称
                            </p>
                            {{modalBeanName}}
                            <Table size="small"height="300"  border  :columns="columnsMethod" :data="dataMethod"></Table>
                        </Card>
                    </Content>
                </TabPane>
            </Tabs>
        </Modal>
        <Modal v-model="modalParamStatus" title="执行"
         width="800">
            <Content>
                <Card>
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        执行方法
                    </p>
                    <Table size="small" height="100"  border  :columns="columnsParam" :data="dataParam.params"></Table>
                    <Form>
                        <FormItem label="类名称：">
                            {{modalBeanName}}
                        </FormItem>
                        <FormItem label="返回结果：">
                            <Input v-model="dataParam.returnValue" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="返回结果"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" :disabled="dataParam.canExe" @click="handleExeMethod()">执行</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Content>
        </Modal>
        <Modal v-model="modalSubPropStatus" title="执行" @on-ok="handleModalOk"
         width="500">
            <Content>
                <Card>
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        修改属性
                    </p>
                    <Form :model="propModify">
                        <FormItem label="类名称：">
                            {{propModify.dataSubName}}
                        </FormItem>
                        <FormItem label="属性名称：">
                            {{propModify.dataSubPropName}}
                        </FormItem>
                        <FormItem label="属性值：">
                            {{propModify.dataSubPropValue}}
                        </FormItem>
                        <FormItem label="属性类型：">
                            {{propModify.dataSubPropType}}
                        </FormItem>
                        <FormItem label="修改值：">
                            <Input v-model="propModify.dataSubModifyPropValue" placeholder="请输入要修改的值" style="width: 300px"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleModifyProp()">修改</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Content>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columnsProp: [
                    {title: '#',type:'index',width:60},
                    {title: '属性',key: 'key'},
                    {title: '类型',key: 'type'},
                    {title: '值',key: 'value'},
                    {title: '修改',render:(h,params)=>{
                        return h('Button',{
                            props:{
                                type: 'primary',
                                size: 'small'
                            },
                            style:{
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.showProp(params.index);
                                }
                            }
                        },"修改");
                    }},
                ],
                columnsParam: [
                    {title: '#',type:'index',width:60},
                    {title: '名称',key: 'name'},
                    {title: '类型',key: 'type'},
                    {title: '值',key:'value',render:(h,params)=>{
                        return  h('Input',{
                            props:{
                                value:this.dataParam.params[params.index].value
                            },
                            on:{
                                'on-blur':(event)=>{
                                    this.dataParam.params[params.index].value=event.target.value;
                                }
                            }
                        });
                    }},
                ],
                columnsMethod: [
                    {title: '#',type:'index',width:60},
                    {title: '方法',key: 'name'},
                    {title: '返回类型',key: 'returnType'},
                    {
                        title:'操作',
                        width:150,
                        align:'center',
                        render:(h,params) =>{
                            return h('div',[
                                h('Button',{
                                    props:{
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style:{
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.showMethod(params.index);
                                        }
                                    }
                                },'执行')
                            ])
                        }
                    }
                ],
                columns1: [
                    {title: '#',type:'index',width:60},
                    {title: 'SpringBean',key: 'name'},
                    {
                        title: '操作',
                        key: 'name',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '操作')
                            ]);
                        }
                    }
                ],
                data1: [],
                dataProp: [],
                dataMethod: [],
                dataParam:{
                    params:[],
                    beanName:'',
                    methodName:'',
                    returnValue:'',
                    canExe:true,
                },
                pageTotal:1,
                currentRow:{},
                queryForm:{
                    beanName:''
                },
                modalTitle:'操作',
                modalStatus:false,
                modalParamStatus:false,
                modalSubPropStatus:false,
                modalBeanName:'',
                propModify:{
                    index:1,
                    dataSubName:'',
                    dataSubPropName:'',
                    dataSubPropValue:'',
                    dataSubPropType:'',
                    dataSubModifyPropValue:'',
                }

            }
        },
        created:function () {
            this.handleInit();
        },
        methods: {
            handleExeMethod(){
                let $vue=this;
                var params={
                    cmd:3,
                    beanName:this.modalBeanName,
                    methodName:this.dataParam.methodName
                };
                let pk='';//参数名称
                let pv='';//参数值
                let pt='';//参数类型
                for (var i = 0; i < this.dataParam.params.length; i++) {
                    var e = this.dataParam.params[i];
                    if(i == 0){
                        pk=e.name;
                        pv=e.value;
                        pt=e.type;
                    }else{
                        pk+=','+e.name;
                        pv+=','+e.value;
                        pt+=','+e.type;
                    }
                }
                params.pk=pk;
                params.pv=pv;
                params.pt=pt;
                let postData=this.$qs.stringify(params);
                this.$ajax.post('/jmx_gcs/monitor.do',postData)
                .then(function (res) {
                    if(res.data.status == 'success'){
                        $vue.$Message.success(res.data.msg);
                        $vue.dataParam.returnValue=res.data.result;
                    }
                })
                .catch(function (error) {
                    $vue.$Message.error(res.data.msg);
                    console.log(error);
                });
            },
            handleQuery(){
                let $vue=this;
                this.$ajax.get('/jmx_gcs/monitor.do?curName='+this.queryForm.beanName)
                .then(function (response) {
                    $vue.data1=response.data.result;
                    $vue.pageTotal=response.data.total;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            handleModalOk(){
                this.modalStatus=false;
            },
            handleInit(){
                let $vue=this;
                this.$ajax.get('/jmx_gcs/monitor.do')
                .then(function (response) {
                    $vue.data1=response.data.result;
                    $vue.pageTotal=response.data.total;
                })
                .catch(function (error) {
                    console.log(error);
                }); 
            },
            handleModifyProp(){
                let postData=this.$qs.stringify({
                    cmd:2,
                    beanName:this.modalBeanName,
                    propName:this.propModify.dataSubPropName,
                    propValue:this.propModify.dataSubModifyPropValue
                });
                let vue=this;
                this.$ajax.post('/jmx_gcs/monitor.do',postData).then(function(res){
                    debugger;
                    if(res.data.status == 'success'){
                        vue.$Message.success(res.data.msg);    
                        vue.propModify.dataSubPropValue=vue.propModify.dataSubModifyPropValue;
                    }else{
                        vue.$Message.error(res.data.msg);
                    }
                }).catch(function(error){
                    vue.$Message.error("res.data.msg");
                });
            },
            show(index){
                this.handleBeanDetail(index);
                this.modalStatus=true;
            },
            handleBeanDetail(index){
                let $vue=this; 
                let curName=this.data1[index].name;
                this.modalBeanName=curName;
                this.$ajax.get('/jmx_gcs/monitor.do?cmd=1&curName='+curName)
                .then(function (response) {
                    $vue.dataProp=response.data.props;
                    $vue.dataMethod=response.data.methods;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            showMethod(index){
                debugger;
                this.dataParam.canExe=false;
                let pas=this.dataMethod[index].parameters;
                this.dataParam.params=pas;
                this.dataParam.beanName=this.modalBeanName,
                this.dataParam.methodName=this.dataMethod[index].name;
                this.modalParamStatus=true;
                let reg='java.lang.String,java.lang.Integer,java.lang.Boolean,java.lang.Long,int,long,String';
                for(var i=0;i<pas.length;i++){
                    if(reg.indexOf(pas[i].type) < 0){
                        this.dataParam.canExe=true;
                        break;
                    }
                }
            },
            showProp(index){
                let p=this.dataProp[index];
                this.propModify.index=index;
                this.propModify.dataSubName=this.modalBeanName;
                this.propModify.dataSubPropName=p.key;
                this.propModify.dataSubPropType=p.type;
                this.propModify.dataSubPropValue=p.value;
                this.modalSubPropStatus=true;
            },
            changePage (page) {
                let $vue=this;  
                this.$ajax.get('/jmx_gcs/monitor.do?curPage='+page+'&pageCount=10&curName='+this.queryForm.beanName)
                .then(function (response) {
                    $vue.data1=response.data.result;
                    $vue.pageTotal=response.data.total;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            handleSelect (currentRow,oldRow) {
                console.log(currentRow);
                this.currentRow=currentRow;
            }
        }
    }
</script> 