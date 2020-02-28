<template>
    <b-col cols="6" lg="4" class="pb-4 mb-2">
        <b-card class="shadow-sm">
            <b-card-title>
                <component :is="icon"/>
                {{ title }}
            </b-card-title>
            <b-card-text>
                {{ description }}
            </b-card-text>
            <b-card-text>
                <router-link :to="{name: routeName, params: {name: name}}" class="card-link">
                    Manage
                </router-link>
            </b-card-text>
        </b-card>
    </b-col>
</template>

<script>
    export default {
        props: {
            plural: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        computed: {
            routeName() {
                return this.plural ? 'entities.collection' : 'entities.entity';
            },
            icon() {
                return this.plural ? 'b-icon-documents' : 'b-icon-document-text';
            }
        }
    }
</script>