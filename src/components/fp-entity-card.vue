<template>
    <b-alert v-if="section === null" show variant="danger" class="shadow-sm">
        <h4 class="alert-heading">Missing section</h4>
        <hr/>
        Section {{ schema.section }} not found!
    </b-alert>
    <b-card v-else class="shadow-sm" footer-class="d-flex justify-content-between"
            header-class="d-flex justify-content-between">
        <template v-slot:header>
            <slot name="header"/>
        </template>

        <b-form>
            <div v-for="field in section" class="">
                <fp-field :field="field" :key="field.name" @update="update(field.name, $event)" @lock="$emit('lock')"
                          :locked="locked"/>
            </div>
        </b-form>
    </b-card>
</template>

<script>
    export default {
        props: {
            schema: {
                type: Object,
                required: true
            },
            locked: {
                type: Boolean,
                required: false
            }
        },
        computed: {
            section() {
                return (this
                        .schema
                        .sections
                        .find(s => s.name === this.schema.section) || {fields: null}
                ).fields;
            }
        },
        methods: {
            update(name, value) {
                this.$emit('update', {name, value})
            }
        }
    }
</script>