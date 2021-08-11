<template>
  <section id="home" class="result">
    <transition name="fade">
      <Loader v-if="processing"></Loader>
    </transition>
    
    <div class="container">
      <nav class="header">
        <h3 class="title">Event result for {{$route.query.q}}</h3>
      </nav>
    </div>
    
    <div class="container">
      <transition-group name="list-item" tag="div" class="event-wrapper">
        <Event v-for="(event, i) in events" :i="i" :key="event._id" :event="event"></Event>
      </transition-group>
    </div>
    
  </section>
</template>

<script>
    import 'vue-moment';
    import Navbar from "~/components/Navbar";
    import Event from "~/components/Event";
    import {mapGetters} from 'vuex';
    import Loader from '~/components/MainLoader';

    
    export default {
        name: "home",
        components: {
            Navbar,
            Event,
            Loader
        },
        fetch({$axios, route}) {
            if (process.client) {
                return null;
            }
            
            //console.log(route.query.q + route.query.location + route.query.date);
            return $axios.$post('/event/search', {
                event_name: route.query.q,
                location: '',
                start_date: route.query.date
            })
                .then(res => {
                    //console.log(res);
                    if(res.length >= 1){
                        this.$store.commit('event/SET_EVENTS', {...res.event});
                    } else{
                        return this.$route.push('/');
                    }
                })
                .catch(() => this.$route.push('/'));
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
        computed: {
            isAuth() {
                return this.$store.getters.isAuthenticated
            },
            user() {
                return this.$store.getters.getUser
            },
            ...mapGetters({
                events: 'event/getEvents'
            })
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
            }
        }
    }
</script>

<style lang="scss">

</style>
