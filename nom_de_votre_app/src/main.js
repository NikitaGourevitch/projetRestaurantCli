import Vue from 'vue'
import App from './App.vue'
import Edit from './components/Edit.vue'


Vue.component("edit", Edit)

  new Vue({
    el: "#app",
    render: h => h(App)   

});
