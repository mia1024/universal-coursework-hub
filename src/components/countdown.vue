<template>
    <div>
        <span v-if="secondsLeft < 0">-</span>{{ formatSecond(secondsLeft) }}
    </div>
</template>

<script lang="ts">
import {Watch, Vue} from "vue-property-decorator";

class Props {
    countdownTo: Date
}

export default class Countdown extends Vue.with(Props) {

    secondsLeft: number = 0

    beforeCreate() {
        this.secondsLeft = Math.floor((this.countdownTo.getTime() - new Date().getTime()) / 1000)
        setTimeout(_ => this.secondsLeft = Math.floor((this.countdownTo.getTime() - new Date().getTime()) / 1000),
                1000 - (this.countdownTo.getTime() - new Date().getTime()) % 1000) // calibrate to second mark
    }


    @Watch('secondsLeft')
    calcSecondsLeft() {
        setTimeout(_ => this.secondsLeft = Math.floor((this.countdownTo.getTime() - new Date().getTime()) / 1000), 1000)
    }

    formatSecond(s: number): string {
        s = Math.abs(s)
        const seconds = s % 60;
        const minutes = Math.floor(s / 60) % 60
        const hours = Math.floor(s / 3600)

        if (hours > 48)  // 2 days
            return Math.floor(hours / 24).toString() + " days"
        else if (hours > 3)
            return hours.toString() + " hours"
        else { // less than 3 hours
            if (hours > 0)
                return `0${hours}:${minutes.toString().padStart(2, '0')}`
            else
                return `00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        }
    }
}

</script>

<style scoped>

</style>
