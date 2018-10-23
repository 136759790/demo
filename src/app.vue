<template>
    <div>
        <app-nav></app-nav>
        <!-- <div class="tags-con">
            <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
        </div> -->
        <router-view></router-view>
    </div>
</template>
<script>
    import Navbar from './views/nav.vue'
    import tagsPageOpened from './views/components/tags-page-opened.vue';
    import util from '@/libs/util.js';
    export default {
        components: {
            tagsPageOpened,
            'app-nav': Navbar
        },
        data() {
            return {
            };
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {

        },
        computed:{
            pageTagsList () {
                debugger;
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
        },
        watch: {
            // '$route' (to) {
            //     console.log(to);
            //     this.$store.commit('setCurrentPageName', to.name);
            //     let pathArr = util.setCurrentPath(this, to.name);
            //     if (pathArr.length > 2) {
            //         this.$store.commit('addOpenSubmenu', pathArr[1].name);
            //     }
            //     this.checkTag(to.name);
            //     localStorage.currentPageName = to.name;
            // },
        }
    };
</script>