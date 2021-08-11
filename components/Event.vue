<template>
  <div class="event">
    <a style="cursor:pointer;" @click="loadEvent(event._id)">
      <div class="top">
        <Loader v-if="processing"></Loader>
        <img :src="BG" alt="" class="event-poster">
        <div class="price" :class="{paid: i === 1, free: i === 3}">
          FREE
        </div>
        <img class="arc" src="~assets/icons/arc.svg" alt="">
      </div>
      <div class="bottom">
        <div class="date" style="text-transform: uppercase">
          {{ event.start_date | moment("MMM Do") }}
        </div>
        <h2 class="title"> {{event.event_name | shorten }}</h2>
        <p class="desc">{{event.about_event | shortenDesc }}</p>
        <p class="full-date"><span class="date-small"> {{ event.start_date | moment("dddd, MMMM Do YYYY") }} </span>
        </p>
      </div>
    </a>
    <div class="misc">
      <div class="like-wrapper" :class="{like: liked, hide: !isAuth}" @click="likeEvent">
        <img src="~assets/icons/love.svg">
      </div>
      <div class="social">
        <a v-show="event.facebook_link" :href="event.facebook_link"><img src="~assets/icons/facebook.svg"
                                                                         alt="facebook url"></a>
        <a v-show="event.twitter_link" :href="event.twitter_link"><img src="~assets/icons/twitter.svg"
                                                                       alt="twitter url"></a>
        <a v-show="event.instagram_link" :href="event.instagram_link"><img src="~assets/icons/instagram.svg"
                                                                           alt="instagram url"></a>
      </div>
    </div>
  </div>
</template>

<script>
  import FacebookIcon from '~/components/FacebookIcon';
  import Loader from '~/components/Loader';
  import cookie from 'js-cookie';

  export default {
    props: ['event', 'i'],
    components: {
      FacebookIcon,
      Loader
    },
    data() {
      return {
        processing: false,
        liked: false
      }
    },
    filters: {
      shortenDesc(value) {
        return value.split(" ").splice(0, 11).length >= 11 ? value.split(" ").splice(0, 11).join(" ") + '...' : value;
      },
      shorten(value) {
        //checks if words is more than 6
        return value.split(" ").splice(0, 8).length >= 6 ? value.split(" ").splice(0, 8).join(" ") + '...' : value;
      },
    },
    computed: {
      BG() {
        return this.event.background_image ? this.event.background_image : '/website-bg.png';
      },
      isAuth() {
        return this.$store.getters.isAuthenticated
      },
      user() {
        return this.$store.getters.getUser
      },
      likedEvents(){
        return cookie.get('user') ? JSON.parse(cookie.get('user')).likedEvent : [];
      }
    },
    methods: {
      likeEvent() {
        //console.log(this.event._id +t ' ' + this.user.id);
        this.processing = true;
        //console.log(this.event._id + " " + this.user.id);
        this.$axios.$post('/event/like', {
          eventId: this.event._id,
          userId: `${this.user.id}`,
        })
          .then(res => {
            this.liked = !this.liked;
            let user = JSON.parse(cookie.get('user'));
            user.likedEvent = res.event.likes;
            cookie.set('user', JSON.stringify(user));
            this.processing = false;
            //spinner off
          })
          .catch(err => {
            this.processing = false;
            console.log(err)
          })
      },
      /*just for transition*/
      loadEvent(event) {
        this.processing = true;
        setTimeout(() => {
          this.$router.push(`/event/${event}`);
          this.processing = false;
          //set milliseconds between 1000 and 2000
        }, Math.floor((Math.random() * 3) + 1) + "000")
      },
    },
    mounted() {
      //checks for liked events
      this.liked = this.likedEvents.includes(this.event._id);
    }
  }
</script>
