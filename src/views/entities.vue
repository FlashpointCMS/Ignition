<template>
    <b-container v-if="entities !== null">
        <b-row align-h="center">
            <template v-if="entities.length">
                <template v-for="entity in entities">
                    <fp-title-card :title="entity.title" :description="entity.description" :name="entity.name"
                                   :plural="entity.plural"/>
                </template>
            </template>
            <template v-else>
                <b-col>No entities defined at {{ base }}</b-col>
            </template>
        </b-row>
    </b-container>
    <fp-loading v-else>
        Loading <b>entities</b> from <a :href="base">{{ base }}</a>...
    </fp-loading>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        mounted() {
            this.$store.dispatch('service/loadEntities');
        },
        computed: {
            ...mapState('service', ['base', 'entities'])
        }
    }
</script>