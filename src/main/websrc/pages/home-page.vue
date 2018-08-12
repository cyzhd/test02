<template>
    <div class="home-page">
        <h1>Hello World!</h1>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';

    @Component
    export default class HomePage extends Vue {
    }
</script>
<style lang="scss" type="text/scss">

    .home-page {
        background-color: #AAA;
    }
</style>