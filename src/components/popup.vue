<template>
    <div>
        <el-card> Countdown:
            <Countdown :countdown-to="new Date()"></Countdown>
        </el-card>

        <a href="overviewPage.html" target="_blank">Open Config</a>
    </div>
</template>

<script lang="ts">
import {Vue, Options} from "vue-property-decorator"
import Countdown from "./countdown.vue"


@Options({components: {Countdown}})
export default class Popup extends Vue {
    // configPageURL=chrome.runtime.getURL("/configPage.html")
}
</script>

<style scoped lang="scss">

</style>
