<template>
    <b-collapse v-model="field.visible">
        <b-form-group :label="field.label">
            <component :is="selectInput(field)" :field="field" @update="$emit('update', $event)" @lock="$emit('lock')" :locked="locked"/>
        </b-form-group>
    </b-collapse>
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
        methods: {
            selectInput(field) {
                return require('../plugins/input-map').default[field.input.type];
            }
        }
    }
</script>