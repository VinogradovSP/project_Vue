Vue.component('filter-el', {
  data() {
    return {
      userSearch: ''
    }
  },
  template: `
    <div class="top_left">
         <a href="#" class="logo"><img src="img/logo.svg" alt="logo"></a>
       <form action="#" class="search" @submit.prevent="$parent.$refs.products.filter(userSearch)">
         <button class="button_top icon-search" type="submit"></button>
         <input type="text" class="search-field" v-model="userSearch">
       </form>
    </div>
    `
})
