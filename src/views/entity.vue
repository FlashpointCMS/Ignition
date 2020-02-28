<template>
    <b-container v-if="loaded" fluid>
        <b-row>
            <b-col cols="12" class="text-right mb-3">
                <b-button @click="goBack" variant="light" class="shadow-sm">
                    <b-icon-arrow-left/>
                    Done
                </b-button>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col lg="4" class="mb-4" order-lg="8">
                <b-card class="shadow-sm" no-body>
                    <b-card-header>
                        <div class="d-flex justify-content-between align-items-center">
                            <b-button @click="publishEntity" variant="success" :disabled="lockPublish">
                                <b-icon-check/>
                                Publish
                            </b-button>
                            <b-button v-if="meta.published" @click="deleteEntity" variant="outline-danger"
                                      class="border-0">
                                <b-icon-trash/>
                                Delete
                            </b-button>
                            <b-button v-else @click="discardEntity" variant="outline-warning" class="border-0">
                                <b-icon-x/>
                                Discard
                            </b-button>
                        </div>
                    </b-card-header>

                    <b-card-body>
                        <div class="d-flex align-items-center">
                            <b class="pr-1">Status:</b>{{ meta.published ? 'Published' : 'Draft' }}
                        </div>
                        <div v-if="meta.published" class="d-flex align-items-center">
                            {{ publishedHumanTime }}
                        </div>
                        <div class="d-flex align-items-center">
                            <b class="pr-1">Revisions:</b>
                            <template v-if="meta.revisions.length">
                                <b-button class="p-0" variant="link" v-b-toggle.revision-dropdown>
                                    {{ meta.revisions.length }} versions
                                </b-button>
                            </template>
                            <template v-else>New</template>
                        </div>
                    </b-card-body>

                    <b-collapse id="revision-dropdown">
                        <b-card-footer>
                            <b-select multiple :value="[null]">
                                <b-select-option :value="null">Latest</b-select-option>
                                <b-select-option v-for="revision in meta.revisions" :key="revision.sequence_id"
                                                 @click="loadRevision(revision.sequence_id)"
                                                 :value="revision.sequence_id">
                                    {{ revision.name }}
                                </b-select-option>
                            </b-select>
                        </b-card-footer>
                    </b-collapse>
                </b-card>
            </b-col>
            <b-col lg="8" order="4">
                <fp-entity-card :schema="schema" @update="handle" @lock="lock">
                    <template v-slot:header>
                        <b-card-title class="mb-0">
                            Edit {{ title }}
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
            }
        },
        data() {
            return {
                loading: false,
                lockPublish: false,
                dateInterval: setInterval(() => {
                    this.publishedHumanTime = this.publishedMoment ? this.publishedMoment.fromNow() : null;
                }, 1000),
                publishedMoment: null,
                publishedHumanTime: null
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
            this.$store.dispatch('service/loadEntity', {name: this.name, id: this.id}).then(() => {
                if (this.meta.published) {
                    this.publishedMoment = moment(this.meta.published_at);
                    this.publishedHumanTime = this.publishedMoment.fromNow()
                } else {
                    this.unlock();
                }
                this.finishLoading();
            });

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
            handle({name, value}) {
                this.startLoading();
                this.unlock();
                this.$store.dispatch('service/triggerEvent', {
                    name: this.name,
                    id: this.id,
                    event: 'updated',
                    field: name,
                    value
                }).then(() => {
                    this.finishLoading();
                })
            },
            goBack() {
                this.startLoading();
                this.$router.push({name: 'entities.collection', params: {name: this.name}})
            },
            publishEntity() {
                this.$store.dispatch('service/triggerEvent', {
                    name: this.name,
                    id: this.id,
                    event: 'published',
                }).then(() => {
                    this.lock();
                    this.publishedMoment = moment(this.meta.published_at);
                    this.publishedHumanTime = this.publishedMoment.fromNow()
                })
            },
            discardEntity() {
                this.$store.dispatch('service/triggerEvent', {
                    name: this.name,
                    id: this.id,
                    event: 'discarded',
                }).then(() => {
                    this.goBack();
                })
            },
            deleteEntity() {
                this.$store.dispatch('service/triggerEvent', {
                    name: this.name,
                    id: this.id,
                    event: 'deleted',
                }).then(() => {
                    this.goBack();
                })
            },
            loadRevision(sequence) {
                this.startLoading();
                this.$router.push({
                    name: 'entities.revision', params: {
                        name: this.name,
                        id: this.id,
                        sequence: sequence
                    }
                })
            },
            startLoading() {
                this.loading = true;
            },
            finishLoading() {
                this.loading = false;
            },
            lock() {
                this.lockPublish = true;
            },
            unlock() {
                this.lockPublish = false;
            }
        }
    }
</script>