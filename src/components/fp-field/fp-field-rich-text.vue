<template>
    <div class="fp_rich-text-editor">
        <tt-editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="fp_rich-text-editor-bar">
                <b-button variant="light" squared :class="{ 'active': isActive.bold() }"
                          @click="commands.bold">
                    <b-icon-type-bold/>
                </b-button>

                <b-button variant="light" squared :class="{ 'active': isActive.italic() }"
                          @click="commands.italic">
                    <b-icon-type-italic/>
                </b-button>

                <b-button variant="light" squared :class="{ 'active': isActive.strike() }"
                          @click="commands.strike">
                    <b-icon-type-strikethrough/>
                </b-button>

                <b-button variant="light" squared :class="{ 'active': isActive.underline() }"
                          @click="commands.underline">
                    <b-icon-type-underline/>
                </b-button>

                <b-button variant="light" squared :class="{ 'active': isActive.code() }"
                          @click="commands.code">
                    <b-icon-code/>
                </b-button>

                <b-button variant="light" squared :class="{ 'active': isActive.heading({ level: 1 }) }"
                          @click="commands.heading({ level: 1 })">
                    <b-icon-type-h1/>
                </b-button>

                <b-button variant="light" squared :class="{ 'active': isActive.heading({ level: 2 }) }"
                          @click="commands.heading({ level: 2 })">
                    <b-icon-type-h2/>
                </b-button>

                <b-button variant="light" squared :class="{ 'active': isActive.heading({ level: 3 }) }"
                          @click="commands.heading({ level: 3 })">
                    <b-icon-type-h3/>
                </b-button>

                <b-button variant="light" squared :class="{ 'active': isActive.paragraph() }"
                          @click="commands.paragraph">
                    P
                </b-button>

                <b-button variant="light" squared :class="{ 'active': isActive.bullet_list() }"
                          @click="commands.bullet_list">
                    <b-icon-list-ul/>
                </b-button>

                <b-button variant="light" squared :class="{ 'active': isActive.ordered_list() }"
                          @click="commands.ordered_list">
                    <b-icon-list-ol/>
                </b-button>

                <b-button variant="light" squared :class="{ 'active': isActive.blockquote() }"
                          @click="commands.blockquote">
                    <b-icon-blockquote-left/>
                </b-button>

                <b-button variant="light" squared @click="commands.horizontal_rule">
                    <b-icon-dash/>
                </b-button>
            </div>
        </tt-editor-menu-bar>
        <tt-editor-content :editor="editor" :class="{'fp_disabled-background': locked}"/>
    </div>
</template>

<script>
    import {Editor} from "tiptap";
    import * as ttExtensions from "tiptap-extensions";

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
        mounted() {
            this.editor = new Editor({
                extensions: [
                    new ttExtensions.Blockquote(),
                    new ttExtensions.BulletList(),
                    new ttExtensions.CodeBlock(),
                    new ttExtensions.HardBreak(),
                    new ttExtensions.Heading({levels: [1, 2, 3]}),
                    new ttExtensions.HorizontalRule(),
                    new ttExtensions.ListItem(),
                    new ttExtensions.OrderedList(),
                    new ttExtensions.TodoItem(),
                    new ttExtensions.TodoList(),
                    new ttExtensions.Link(),
                    new ttExtensions.Bold(),
                    new ttExtensions.Code(),
                    new ttExtensions.Italic(),
                    new ttExtensions.Strike(),
                    new ttExtensions.Underline(),
                    new ttExtensions.History(),
                ],
                content: this.field.value,
                editable: !this.locked,
                onFocus: () => {
                    this.$emit('lock')
                },
                onBlur: () => {
                    this.$emit('update', this.editor.getHTML())
                }
            })
        },
        beforeDestroy() {
            this.editor.destroy();
        },
        data() {
            return {
                editor: null,
            }
        },
        watch: {
            'field.value'(val) {
                this.editor.setContent(val);
            },
            locked(val) {
                this.editor.setOptions({
                    editable: !val
                })
            }
        }
    }
</script>