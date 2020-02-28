<template>
    <b-form-select v-model="value" :options="options" :disabled="locked"/>
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
            },
            value(val) {
                this.$emit('update', val)
            }
        },
        computed: {
            options() {
                return [
                    {value: null, text: 'Select', disabled: true},
                    ...Object.keys(this.field.input.options).map((key) => {
                        return {value: key, text: this.field.input.options[key]}
                    })
                ]
            }
        }
    }
</script>