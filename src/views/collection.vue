<template>
    <b-container v-if="loaded" fluid>
        <b-row align-h="center" class="mb-3">
            <b-col cols="12" class="text-right">
                <b-button variant="primary" class="shadow-sm" @click="newEntity">
                    <b-icon-plus/>
                    New
                </b-button>
            </b-col>
        </b-row>
        <b-row align-h="center" class="mb-3">
            <b-col cols="12">
                <h5 class="px-2">Published</h5>
                <b-card no-body bg-variant="light" class="shadow-sm fp_table">
                    <fp-collection-card :schema="schema" @view="loadEntity" published/>
                </b-card>
            </b-col>
        </b-row>
        <b-row align-h="center" class="mb-3">
            <b-col cols="12">
                <h5 class="px-2">Draft</h5>
                <b-card no-body bg-variant="light" class="shadow-sm fp_table">
                    <fp-collection-card :schema="schema" @view="loadEntity"/>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
    <fp-loading v-else>
        Loading <b>{{ name }} collection</b> from <a :href="base">{{ base }}</a>...
    </fp-loading>
</template>

<script>
    import {mapGetters, mapState} from "vuex";

    export default {
        props: {
            name: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                loading: false
            }
        },
        created() {
            this.startLoading();
            this.$store.commit('service/setSchema', null);
        },
        mounted() {
            if (this.entities === null) {
                this.$store.dispatch('service/loadEntities', {name: this.name});
            }
            this.$store.dispatch('service/loadCollection', {name: this.name}).then(this.finishLoading);
        },
        computed: {
            ...mapState('service', ['base', 'entities', 'schema']),
            ...mapGetters('service', ['getEntity']),
            loaded() {
                return this.schema !== null && this.entities !== null && !this.loading;
            }
        },
        methods: {
            newEntity() {
                this.$store.dispatch('service/createEntity', {name: this.name}).then(({id}) => {
                    this.$store.commit('service/setSchema', null);
                    this.$router.push({name: 'entities.entity', params: {name: this.name, id}});
                })
            },
            loadEntity(id) {
                this.startLoading();
                this.$store.dispatch('service/loadEntity', {name: this.name, id}).then(() => {
                    this.$store.commit('service/setSchema', null);
                    this.$router.push({name: 'entities.entity', params: {name: this.name, id}});
                })
            },
            startLoading() {
                this.loading = true;
            },
            finishLoading() {
                this.loading = false;
            },
        }
    }
</script>