<template>
    <b-form-input type="text" v-model="value" @blur="$emit('update', value)" @focus="$emit('lock')" :disabled="locked"/>
</template>

<script>
    export default {
        props: {
            field: {
                type: Object,
                required: true
            },
            locked: {
                type: Boolean,
                required: false
            }
        },
        data() {
            return {
                value: this.field.value
            }
        },
        watch: {
            'field.value'(val) {
                this.value = val;
            }
        }
    }
</script>