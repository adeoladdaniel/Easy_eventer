<template>
  <section id="activities-page">
    <div class="sales">
      <div class="sale">
        <span class="total">Total sales</span>
        <span class="price">$300</span>
      </div>

      <div class="sale">
        <span class="total">Total sales</span>
        <span class="price">$300</span>
      </div>

      <div class="sale">
        <span class="total">Total sales</span>
        <span class="price">$300</span>
      </div>

      <div class="sale">
        <span class="total">Total sales</span>
        <span class="price">$300</span>
      </div>
    </div>


    <h3>Don't worry, Ticket page loading with new design next</h3>
  </section>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
    layout: "Event",
      computed:{
          ...mapGetters({
              event: 'event/getEvent'
          }),
          id (){
              return this.$route.params.id
          }
      },
      fetch({$axios, params, store}) {
          if(process.client){
              return null;
          }

          return $axios.$get(`event/findone/${params.id}`)
              .then( res => {
                  store.commit('event/SET_EVENT', {...res.event})
              })
              .catch(res => console.log(res))
      },
  }
</script>

<style scoped>

</style>
