import Vue from 'vue'

Vue.component('fp-title-card', require('../components/fp-title-card').default);
Vue.component('fp-collection-card', require('../components/fp-collection-card').default);
Vue.component('fp-entity-card', require('../components/fp-entity-card').default);
Vue.component('fp-loading', require('../components/fp-loading').default);
Vue.component('fp-field', require('../components/fp-field').default);

Vue.component('fp-field-text', require('../components/fp-field/fp-field-text').default);
Vue.component('fp-field-select', require('../components/fp-field/fp-field-select').default);
Vue.component('fp-field-rich-text', require('../components/fp-field/fp-field-rich-text').default);
Vue.component('fp-field-checkbox', require('../components/fp-field/fp-field-checkbox').default);
Vue.component('fp-field-multi-select', require('../components/fp-field/fp-field-multi-select').default);

Vue.component('tt-editor-content', require('tiptap').EditorContent);
Vue.component('tt-editor-menu-bar', require('tiptap').EditorMenuBar);