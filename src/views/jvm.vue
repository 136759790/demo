
<template>
    <div>
        Welcome!!
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light'
            }
        },
        methods:{
            route(name){
                this.$router.push(name);
            }
        }
    } 
</script> 