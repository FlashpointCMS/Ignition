<template>
    <div class="form-control">
        <b-form-checkbox v-model="value" :disabled="locked">
            {{ field.input.text }}
        </b-form-checkbox>
    </div>
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
        }
    }
</script>