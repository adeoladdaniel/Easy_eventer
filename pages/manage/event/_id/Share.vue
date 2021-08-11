<template>
    <section id="share-page" class="container">
      <p class="intro">
        Let your friends and family know about your awesome event!
      </p>

      <ul class="numbered-list">
        <li>
          <div>
            <p class="share-title" style="padding-bottom: .5rem">Share Your event Website Url </p>
            <a class="btn-proceed" style="max-width: 320px">{{'https://myevent.easyevent.com/' + id}}</a>
            <p>Click to copy!</p>
          </div>
        </li>
        <li>
          <div>
            <p class="share-title">Send Invitations </p>
            <p>Send personalized invitations to guests via email. Once you've sent your invites, easily track opens, clicks, and registration</p>
            <div class="form">
              <div class="form-control">
                <input type="text" placeholder="email address">
              </div>
              <div class="form-control">
                <textarea placeholder="Message" rows="5">{{ `Hi, I am inviting you to my event. Click here for more details - https://easyevent/${id}/connect` }}</textarea>
              </div>
              <div class="form-control">
                <a href="#" class="btn-proceed">send invitation</a>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div>
            <p class="share-title">Share on social media </p>
            <p>Send personalized invitations to guests via email. Once you've sent your invites, easily track opens, clicks, and registration</p>
            <div class="socials">
              <a href="#"><img src="@/assets/icons/facebook.svg" alt="Easy on Facebook"></a>
              <a href="#"><img src="@/assets/icons/instagram.svg" alt="Easy on Instagram"></a>
              <a href="#"><img src="@/assets/icons/twitter.svg" alt="Easy on Twitter"></a>
              <a href="#"><img src="@/assets/icons/youtube.svg" alt="Easy on YouTube"></a>
              <a href="#"><img src="@/assets/icons/linkedin.svg" alt="Easy on Likedin"></a>
            </div>
          </div>
        </li>
      </ul>
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
