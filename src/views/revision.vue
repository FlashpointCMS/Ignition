<template>
    <b-container v-if="loaded" fluid>
        <b-row>
            <b-col cols="12" class="text-right mb-3">
                <b-button @click="goBack" variant="light" class="shadow-sm">
                    <b-icon-arrow-left/>
                    Cancel
                </b-button>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col lg="4" class="mb-4" order-lg="8">
                <b-card class="shadow-sm" no-body>
                    <b-card-header>
                        <div class="d-flex justify-content-between align-items-center">
                            <b-button variant="primary" @click="restore">
                                <b-icon-clock/>
                                Restore
                            </b-button>
                        </div>
                    </b-card-header>

                    <b-card-body>
                        <div class="d-flex align-items-center">
                            <b class="pr-1">Published:</b>{{ publishedHumanTime }}
                        </div>
                        <div class="d-flex align-items-center">
                            <b class="pr-1">Revised:</b>{{ deletedHumanTime }}
                        </div>
                    </b-card-body>

                    <b-card-footer>
                        <b-select multiple :value="[sequence]">
                            <b-select-option :value="null" @click="goBack">Latest</b-select-option>
                            <b-select-option v-for="revision in meta.revisions" :key="revision.sequence_id"
                                             @click="loadRevision(revision.sequence_id)"
                                             :value="revision.sequence_id">
                                {{ revision.name }}
                            </b-select-option>
                        </b-select>
                    </b-card-footer>
                </b-card>
            </b-col>
            <b-col lg="8" order="4">
                <fp-entity-card :schema="schema" locked>
                    <template v-slot:header>
                        <b-card-title class="mb-0">
                            Revise {{ title }}
                        </b-card-title>
                    </template>
                </fp-entity-card>
            </b-col>
        </b-row>
    </b-container>
    <fp-loading v-else>
        Loading entity from <a :href="base">{{ base }}</a>...
    </fp-loading>
</template>

<script>
    import {mapState} from "vuex";
    import moment from "moment";

    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            sequence: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                dateInterval: setInterval(() => {
                    this.publishedHumanTime = this.publishedMoment ? this.publishedMoment.fromNow() : null;
                    this.deletedHumanTime = this.deletedMoment ? this.deletedMoment.fromNow() : null;
                }, 1000),
                publishedMoment: null,
                publishedHumanTime: null,
                deletedMoment: null,
                deletedHumanTime: null
            }
        },
        created() {
            this.$store.commit('service/setSchema', null);
        },
        mounted() {
            this.load();
        },
        beforeDestroy() {
            clearInterval(this.dateInterval);
        },
        computed: {
            ...mapState('service', ['base', 'entities', 'schema']),
            loaded() {
                return this.schema !== null && this.entities !== null;
            },
            title() {
                return this.entities.find(e => e.name === this.name).title
            },
            meta() {
                return this.schema._meta || {}
            }
        },
        methods: {
            restore() {
                this.$store.dispatch('service/triggerEvent', {
                    name: this.name,
                    id: this.id,
                    event: 'restored',
                    sequence: this.sequence
                }).then(() => {
                    this.goBack();
                })
            },
            goBack() {
                this.$router.push({name: 'entities.entity', params: {name: this.name, id: this.id}})
            },
            loadRevision(sequence) {
                if (sequence === this.sequence) {
                    return;
                }

                this.$store.commit('service/setSchema', null);
                this.$router.push({
                    name: 'entities.revision', params: {
                        name: this.name,
                        id: this.id,
                        sequence: sequence
                    }
                }).then(() => {
                    this.load();
                })
            },
            load() {
                if (this.entities === null) {
                    this.$store.dispatch('service/loadEntities', {name: this.name});
                }
                this.$store.dispatch('service/loadEntity', {
                    name: this.name,
                    id: this.id,
                    sequence: this.sequence
                }).then(() => {
                    this.publishedMoment = moment(this.meta.published_at);
                    this.publishedHumanTime = this.publishedMoment.fromNow();
                    this.deletedMoment = moment(this.meta.deleted_at);
                    this.deletedHumanTime = this.deletedMoment.fromNow();
                });
            }
        }
    }
</script>