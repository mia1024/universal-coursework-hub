<template>

    <el-card>    Countdown:
        <Countdown :countdown-to="new Date()"></Countdown></el-card>
</template>

<script lang="ts">
import {Vue, Options} from "vue-property-decorator"
import Countdown from "./countdown.vue"

@Options({components: {Countdown}})
export default class Popup extends Vue {
}


</script>

<style scoped lang="scss">

</style>
