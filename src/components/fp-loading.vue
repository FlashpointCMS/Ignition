<template>
    <b-container class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in"
                    :duration="300">
            <b-alert v-if="timeout === true" key="warning" show variant="warning" class="shadow-sm">
                <h4 class="alert-heading">
                    Looks like we are running slow...
                </h4>
                <hr/>
                <slot/>
            </b-alert>
            <b-alert v-else-if="timeout === false" key="danger" show variant="danger" class="shadow-sm">
                <h4 class="alert-heading">
                    Hmmm... There may be an issue...
                </h4>
                <hr/>
                <slot/>
            </b-alert>
            <b-alert v-else key="info" show variant="light" class="shadow-sm">
                <h4 class="alert-heading">
                    Loading...
                </h4>
                <hr/>
                <slot/>
            </b-alert>
        </transition>
    </b-container>
</template>

<script>
    export default {
        mounted() {
            this.timeout = setTimeout(() => {
                this.timeout = true;
            }, 1000);
            this.timeout = setTimeout(() => {
                this.timeout = false;
            }, 4000)
        },
        data() {
            return {
                timeout: null
            }
        },
        beforeDestroy() {
            clearTimeout(this.timeout);
        }
    }
</script>