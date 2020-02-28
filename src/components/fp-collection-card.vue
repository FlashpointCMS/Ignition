<template>
    <b-table show-empty empty-text="There is no content to show" :fields="fields" :items="items" sticky-header
             class="mb-0">
        <template v-slot:cell(_meta)="{ item }">
            <div class="d-flex justify-content-end align-items-center">
                <b-button size="sm" variant="outline-dark" @click="$emit('view', item._meta.id)" class="border-0">
                    <b-icon-pencil/>
                </b-button>
            </div>
        </template>
    </b-table>
</template>

<script>
    export default {
        props: {
            schema: {
                type: Object,
                required: true
            },
            published: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
            fields() {
                if(!this.schema.fields){
                    return [];
                }

                let fields = this.schema.fields.map((schemaItem) => {
                    return {
                        key: schemaItem.name,
                        label: schemaItem.label
                    }
                });

                fields.push({
                    key: '_meta',
                    label: ''
                });

                return fields;
            },
            items() {
                return (this.schema.entries || []).filter(e => e._meta.published === this.published)
            }
        }
    }
</script>

<style scoped>

</style>