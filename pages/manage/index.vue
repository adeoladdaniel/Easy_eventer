<template>
  <div id="homepage">
    <div class="container">
      <div class="intro">
        <div class="left">
          <h1 class="lead">Manage Events</h1>
          <p class="sub">Manage your events</p>
        </div>
        <div class="right">
          <nuxt-link to="/manage/create" class="create-btn">Create Event</nuxt-link>
        </div>
      </div>
      
      <div class="bar">
        
        <Spinner v-if="processing"></Spinner>
        <p v-else class="title">{{ title }}</p>
        
        <div class="left">
          <div class="grid" :class="{selected : displayGrid}" @click="displayType('grid')">
            <img src="~assets/icons/grid.svg" alt="">
          </div>
          <div class="list" :class="{selected : !displayGrid}" @click="displayType('list')">
            <img src="~assets/icons/list.svg" alt="">
          </div>
          <div class="dots-wrapper" @click="showOptions = ! showOptions">
            <div class="dots"></div>
            <div class="dots"></div>
            <div class="dots"></div>
          </div>
        </div>
        <div class="options-wrapper" :class="{show : showOptions}">
          <div class="option" @click="allEvents">All events</div>
          <div class="option" @click="getLiked">Liked events</div>
          <div class="option" @click="getPublished">Published events</div>
          <div class="option" @click="getUnPublished">Unpublished events</div>
        </div>
      </div>
      
      <transition-group name="fade" tag="div" v-if="events.length >= 1" class="event-wrapper"
                        :class="{block : ! displayGrid}">
        <Event v-for="event in events" :key="event._id" :event="event"></Event>
      </transition-group>
      
      <div v-else class="no-event">
        <div class="content">
          <img src="~/assets/images/not_found.svg" alt="">
          <h3>We can't find any event</h3>
          <p>{{ title === 'All events' ? 'Simply tap on the button to create one' : title }}</p>
          <nuxt-link v-if="title === 'All events'" to="/manage/create" class="create-btn">Create Event</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Event from '~/components/manage/Event';
    import Spinner from '~/components/Spinner';

    export default {
        name: "index",
        layout: 'Manage',
        components: {
            Event,
            Spinner
        },
        asyncData({$axios, store}) {
            return $axios.$get('/event/getEventByUser/' + store.getters.getUser.apiKey)
                .then(res => {
                    //console.log(res);
                    return {
                        events: res.events
                    }
                })
        },
        computed: {
            user() {
                return this.$store.getters.getUser
            }
        },
        data() {
            return {
                showOptions: false,
                displayGrid: false,
                title: 'All events',
                processing: false
            }
        },
        methods: {
            displayType(type) {
                this.displayGrid = type === 'grid';
            },
            getLiked() {
                //checks if like event was clicked on liked events list
                if (this.title === 'Liked events') {
                    return this.showOptions = false;
                }
                this.showOptions = false;
                this.processing = true;
                //change title
                this.title = 'Liked events';
                this.$axios.$get('/event/userProfile/' + this.user.id)
                    .then(res => {
                        console.log(res);
                        if (res.error !== false) {
                            return
                        }

                        if (res.message.likes_counter >= 1) {
                            this.processing = false;
                            this.events = res.message.likes;
                        } else{
                            this.processing = false;
                        }
                    })
                    .catch(err => console.log(err))
            },
            allEvents() {
                //checks if all events was clicked on all events list
                if (this.title === 'All events') {
                    return this.showOptions = false;
                }

                this.showOptions = false;
                this.processing = true;
                this.title = 'All events';
                this.$axios.$get('/event/getEventByUser/' + this.user.apiKey)
                    .then(res => {
                        //return console.log(res);
                        if (res.error !== false) {
                            return
                        }

                        if (res.events.length >= 1) {
                            //return alert('event found');
                            this.processing = false;
                            this.events = res.events;
                        } else{
                            this.processing = false;
                        }
                    })
                    .catch(err => console.log(err))
            },
            getPublished() {
                if (this.title === 'Published events') {
                    return this.showOptions = false;
                }

                this.showOptions = false;
                this.processing = true;
                this.title = 'Published events';
                this.$axios.$get('/event/getEventByUser/' + this.user.apiKey)
                    .then(res => {
                        //return console.log(res);
                        //console.log('got data');
                        //let events_;
                        if (res.error !== false) {
                            return
                        }

                        if (res.events.length >= 1) {
                            this.processing = false;
                            let events_ = res.events.filter(event => event.publish === true);
                            if (events_.length >= 1) {
                                this.events = events_;
                            } else {
                                this.processing = false;
                                this.events = [];
                            }
                        } else {
                            this.processing = false;
                            this.events = [];
                        }
                    })
                    .catch(err => console.log(err))
            },
            getUnPublished() {
                if (this.title === 'Unpublished events') {
                    return this.showOptions = false;
                }
    
                this.showOptions = false;
                this.processing = true;
                this.title = 'Unpublished events';
                this.$axios.$get('/event/getEventByUser/' + this.user.apiKey)
                    .then(res => {
                        if (res.error !== false) {
                            return
                        }
            
                        if (res.events.length >= 1) {
                            this.processing = false;
                            let events_ = res.events.filter(event => event.publish === false);
                            if (events_.length >= 1) {
                                this.events = events_;
                            } else {
                                this.processing = false;
                                this.events = [];
                            }
                        } else {
                            this.processing = false;
                            this.events = []
                        }
                    })
                    .catch(err => console.log(err))
            }
        },
        mounted() {
            this.$store.commit('event/CLEAR_EVENT');
        },
    }
</script>
