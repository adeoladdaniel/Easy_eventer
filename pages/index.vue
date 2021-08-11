<template>
  <section id="home">
    <transition name="fade">
      <Loader v-if="processing"></Loader>
    </transition>



    <!-- <div class="hero"> -->
      <!-- <div class="hero-content"> -->

<div class="homer_d">
        <div class="header_d">
        <h1>find event  <br/>near you</h1>
        <p>The best way to host an events, <br/> sell event tickets.</p>

        <img class="imager" src="~assets/icons/_52CD8CF3-B2FD-48AD-9C97-F578A403D841_preview.svg"/>
            <!-- <img class="landing_mobile_d" src="~assets/icons/Bitmap.svg"/> -->



            <div class="searcher">
                  <form class="searcher_form">
                       <img class="searcher_icon_i" src="~assets/icons/searchericoni.svg"/>

                      <input class="searcher_input" type="text" placeholder="Find events near you">

                        <img class="searcher_icon"   src="~assets/icons/Path_6243.svg"/>

                        <img class="searcher_icon_ii" src="~assets/icons/searchericon.svg"/>

                        <input class="searcher_input" placeholder="Location"/>

                        <img class="searcher_icon_iii"   src="~assets/icons/Path_5275.svg"/>

                        <button class="search_but_d"> Search</button>



                  </form>
            </div>



        </div>

        </div>

        <div class="tab"> 
            <span>All</span>
            <span>Party</span>
            <span>Seminar</span>
            <span>Club</span>
            <span>Workshop</span>
            <span>Free</span>


        </div>

        <div><Cards/></div>


        <!-- <p class="lead">Live Differently</p>
        <p class="sub">Be different. Live different. Be easy</p> -->
        <!-- <div class="filter">
          <div class="form-group">
            <span class="label">Find Event</span>
            <input type="text" placeholder="Enter title" v-model="search.title">
          </div> -->
          <!-- <div class="form-group states">
            <span class="label">Location</span>
            <input type="text" placeholder="eg. Lagos" v-model="userEnteredLocation">
            <transition name="fade">
              <div v-if="showFilteredLocation" class="states-wrapper">
                  <span v-for="(loc,i) in filteredLocation" class="state" :key="i"
                        @click="selectLocation(loc)">{{loc.name}}</span>
              </div>
            </transition>
          </div> -->
          <!-- <div class="form-group">
            <span class="label">Happening</span>
            <div class="happening-wrapper">
              <div class="top">
                <div class="happening" :class="{active: selectedDate}" @click="showDate = !showDate"> {{
                  selectedDate ? selectedDate : 'Select Date'}}
                </div>
                <div class="search" style="cursor: pointer" @click="searchEvent">
                  <img src="~assets/icons/search.svg" @click="searchEvent">
                </div>
              </div>
              <div class="happening-options-wrapper" :class="{show: showDate}">
                <div class="happening-options" @click="selectDate('Tomorrow')"> Tomorrow</div>
                <div class="happening-options" @click="selectDate('Next Week')"> Next Week</div>
                <div class="happening-options" @click="selectDate('Next Month')"> Next Month</div>
                <div class="happening-options" @click="selectDate('Next Year')"> Next Year</div>
              </div>
            </div>
          </div> -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </div> -->
    <!-- <div class="container">
      <nav class="header" >
        <h3 class="title">Event Suggestions</h3>
        <div class="filters-wrapper">
          <p class="filter" :class="{active: showCategories}" @click="showCategories = !showCategories">
            Categories</p>
        </div>
      </nav>
    </div> -->

    <div class="container" >
      <!-- v-if="events.length > 0" -->
      <div class="category-holder" :class="{show: showCategories}">
            <span @click="selectedCategory(category.id)" v-for="category in categories" :key="category.id"
                  class="category"
                  :class="{selected: category.show}">
              {{category.name}}
            </span>
      </div>
      <transition-group name="list-item" tag="div" class="event-wrapper">
        <Event v-for="(event, i) in events" :i="i"
               :key="event._id" :event="event"
        >
        </Event>
      </transition-group>

      <div class="paginationz">
        <a v-show="!caughtUp" @click="seeMoreEvents" class="se-more">
          See more
        </a>
      </div>
    </div>

    <!-- <div class="urbn-wrapper">
   <a href="https://easyevent.live/event/5dcc59f4c4c38a7149774a09">
     <div class="ubrn">
       <div class="img-wrapper">
         <img src="~/assets/icons/urbn.svg">
       </div>
       <div class="details">
         <h3>
           URBAN-WEAR, <br>
           EXHIBITIONS & FOOD
         </h3>
         <p class="date">SUNDAY 1ST DECEMBER, 2019 12:00PM</p>
       </div>
       <span class="get-ticket">
           Get Ticket
         <img src="~/assets/icons/get-arrow.svg">
       </span>
     </div>
   </a>
 </div>-->


    <div class="action">
      <div class="inner">
        <div>
          <p>Planning to host an event?</p>
          <h3>Create one here.</h3>
        </div>

        <nuxt-link class="action" to="/manage/create" v-if="isAuth">
          <img src="~assets/icons/action.svg" alt="create an event">
        </nuxt-link>
        <nuxt-link v-else class="action" to="/login">
          <img src="~assets/icons/action.svg" alt="create an event">
        </nuxt-link>
      </div>
    </div>

    <div class="get-started container">
      <div class="left">
        <h3>Create your events in 5 minutes</h3>
        <p>Create a beautiful event page with built-in payment processing, data collection, and support.</p>
        <a href="#" class="started">Get started</a>
      </div>
      <div class="get-started-img">
        <img src="~/assets/images/get-started.svg">
      </div>
    </div>

    <div class="features container">
      <div class="feature">
        <div class="feature-img">
          <img src="~/assets/images/organizers.svg" alt="">
        </div>
        <h4 class="intro">Silk smooth experience</h4>
        <p class="sub">for Organizers and users</p>
      </div>
      <div class="feature">
        <div class="feature-img">
          <img src="~/assets/images/payment.svg">
        </div>
        <h4 class="intro">Easy payments and payment processing</h4>
        <p class="sub">allows event goers pay hitch-free online</p>
      </div>

      <div class="feature">
        <div class="feature-img">
          <img src="~assets/images/free-tickets.svg" alt="">
        </div>
        <h4 class="intro">With us free is free</h4>
        <p class="sub">no hidden charges on free events</p>
      </div>

      
    </div>

    <div class="experience container">
      <div class="text">
        <h1 class="head">Unique live experiences for everyone</h1>
        
      </div>
    </div>
  </section>
</template>

<script>
  import 'vue-moment';
  import Navbar from "~/components/Navbar";
  import Event from "~/components/Event";
  import {mapGetters} from 'vuex';
  import Loader from '~/components/MainLoader';
  import Cards from "../components/Cards.vue"

  export default {
    name: "home",
    components: {
      Navbar,
      Event,
      Loader,
      Cards
    },
    data() {
      return {
        showPriceFilter: false,
        showMPriceFilter: false,
        showCategories: false,
        showFilteredLocation: false,
        processing: false,
        filteredLocation: [],
        userEnteredLocation: '',
        userLikedEvents: null,
        search: {
          title: '',
          date: null
        },
        states: [],
        caughtUp: false,
        showDate: false,
        selectedDate: null,
        categories: []
      }
    },
    //to get events
    asyncData({$axios}) {
      return $axios.$post(`/event/queryevent`, {
        page: 0,
        limit: 8
      })
        .then(res => {
          return {
            events: res.events,
            totalEvents: res.total,
            noOfEvents: res.pageSize,
            page: res.page,
            limit: res.pageSize
          };
        })
        .catch(res => console.log(res))
    },

    computed: {
      isAuth() {
        return this.$store.getters.isAuthenticated
      },
      user() {
        return this.$store.getters.getUser
      },
    },
    watch: {
      userEnteredLocation(val) {
        if (this.userEnteredLocation.length <= 0) {
          this.showFilteredLocation = false;
          this.filteredLocation = [];
        } else {
          this.filteredLocation = this.states.filter(state => {
            return state.name.includes(this.toUpperCase(val))
          });
          this.showFilteredLocation = this.filteredLocation.length > 0;
        }
      }
    },
    methods: {
      toUpperCase(val) {
        return val.charAt(0).toUpperCase() + val.slice(1);
      },
      selectLocation(location) {
        this.userEnteredLocation = location.name;
        //set timeout cos watch property switches on showFilteredLocation asynchronously
        setTimeout(() => {
          this.showFilteredLocation = false;
        }, 100);
      },
      seeMoreEvents() {
        this.page = this.page + 1;
        this.$axios.$post(`/event/queryevent`, {
          page: this.page,
          limit: this.limit
        })
          .then(res => {
            //console.log(res);
            this.events.push(...res.events);

            //checks if all events are exhausted
            this.noOfEvents = this.noOfEvents + this.limit;
            if (this.noOfEvents > this.totalEvents) {
              this.caughtUp = true;
            }
          })
          .catch(err => console.log(err))
      },
      selectDate(date) {
        this.selectedDate = date;
        this.showDate = false;
        switch (date) {
          case "Tomorrow":
            this.search.date = new Date(this.$moment().add(1, 'd').format('LLLL'));
            break;
          case "Next Week":
            this.search.date = new Date(this.$moment().add(7, 'd').format('LLLL'));
            break;
          case "Next Month":
            this.search.date = new Date(this.$moment().add(1, 'M').format('LLLL'));
            break;
          case "Next Year":
            this.search.date = new Date(this.$moment().add(1, 'y').format('LLLL'));
        }
      },
      searchEvent() {
        this.processing = true;

        const body = document.querySelector("body");
        const html = document.querySelector("html");


        body.classList.add('no-scroll');
        html.classList.add('no-scroll');

        this.$axios.$post('/event/search', {
          event_name: this.search.title,
          location: this.userEnteredLocation,
          start_date: this.search.date
        })
          .then(res => {
            if (res.error !== true) {
              if (res.event.length >= 1) {
                body.classList.remove('no-scroll');
                html.classList.remove('no-scroll');
                this.$store.commit('event/SET_EVENTS', {...res.event});
                this.$router.push(`/results?q=${this.search.title}&location=${this.userEnteredLocation}&date=${this.search.date}`);
                this.processing = false;
              } else {
                setTimeout(() => {
                  body.classList.remove('no-scroll');
                  html.classList.remove('no-scroll');
                  this.processing = false;
                  this.$toast.show(`No event found for '${this.search.title}'`, {
                    type: 'error'
                  });
                  //set milliseconds between 1000 and 2000
                }, Math.floor((Math.random() * 3) + 1) + "000")
              }
            }
          })
          .catch(err => {
            body.classList.remove('no-scroll');
            html.classList.remove('no-scroll');
            this.processing = false;
            this.$toast.show(`No event found for '${this.search.title}'`, {
              type: 'error'
            });
          })
      },
      selectedCategory(id) {
        this.categories.map(category => {
          category.id === id ? category.show = true : category.show = false
        });

        this.$axios.$get('/event/getEventByCategory/' + id)
          .then(res => {
            if (res.error === true) {
              return console.log(res.error)
            }

            this.events = res.events;
          })
          .catch(err => console.log(err));
      },
    },
    //checks if event is all caught up!
    mounted() {
      if (this.totalEvents === this.limit) {
        this.caughtUp = true;
      }

      //get events category
      this.$axios.get('/category/getall')
        .then(({data}) => {
          data.categories.map(category => {
            return this.categories.push({
              id: category._id,
              name: category.category_name,
              show: category.show
            })
          })
        })
        .catch(err => console.log(err));

      //get states
      this.$axios.$get('/event/returnState')
        .then(res => this.states = res)
        .catch(err => console.log(err));

      //get user liked events
      //make request to get array of liked id
      if(this.isAuth){
        this.$axios.$get('/event/userlikes/' + this.user.id)
          .then(res => {
            //this.userLikedEvents = res.likes;
            this.$store.commit('SET_USER_LIKED', res.likes);
            //console.log(res.likes);
          })
          .catch(err => console.log(err))
      }
    },
  };
</script>

<style lang="scss">


.imager{
  position: absolute;
  right: 0;
  top: 5rem;
}
.searcher{
  position: absolute;
    background: red;
    width: 80%;
    padding: 2rem;
    background: white;
    display: flex;
    margin: 8rem 5.9rem;
}

.searcher_input{
  background: transparent !important;
  width: 15rem !important;
  border: none;
  outline: none;

}
.searcher_form{
  display: flex;
}
.searcher_icon{
         padding: 0rem 6rem 0rem 2rem;
}
.searcher_icon_i{
 padding: 0rem 0rem 0rem 3rem;
}
.searcher_icon_ii{
  padding: 0rem 2rem;
}
.searcher_icon_iii{
  margin: 0rem -5rem;
}
.header_d{

  

     font-family: 'Inter', sans-serif;
    h1{
        padding: 10rem 1rem 1rem 6rem;
    font-weight: 900;
        font-size: 4rem;
    }
    p{
        padding: 2rem 1rem 1rem 6rem;

    }
}
.search_but_d{
    padding: 1rem 3rem;
    border: none;
    margin: 0rem 1rem;
    position: absolute;
    right: 2rem;
    background: red;
    color: white;
    border-radius: 5px;
    
}
.homer_d{
      margin-bottom: 15rem;
}
.tab{
  text-align: center;
    padding-top: 4rem;
    span{
      padding-left: 0.8rem;
    padding-right: 0.9rem;
    color: rgb(90, 90, 90);
    }

    span:first-child {
  color: black;
}
}
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;600&display=swap');
*{
    font-family: 'Inter', sans-serif;
}


</style>

