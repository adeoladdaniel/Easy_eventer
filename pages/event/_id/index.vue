<template>
  <section id="website">
      <transition name="fade">
          <Loader v-if="processing"></Loader>
      </transition>
      
    <transition name="fade">
      <CardPayment v-if="showPayment"
                   @close-modal="toggle('close')"
                   :event="event"
                   :user="user"
                   :error="errorPayment"
                   :ticket="ticket"
      ></CardPayment>
    </transition>
    
    <transition name="fade">
      <CardPaymentSuccess
          v-if="showSuccess"
          @close-success="toggle('close-success')"
          :ticket="paidTicket"
      ></CardPaymentSuccess>
    </transition>
    
    <div class="webview">
      <div class="bg-image" :style="bG">
        <div class="bg-content">
          <div class="logo-wrapper">
            <div class="event-logo">
              <img v-if="logo" :src="logo" alt="event logo" class="event-logo">
            </div>
          </div>
          <h1 class="title">{{event.event_name}}</h1>
          <h3 class="time">{{event.start_date | moment("dddd, MMMM Do YYYY")}}</h3>
        </div>
      </div>
      
      <div class="desktop-title container">
        <h3>{{event.event_name}}</h3>
        <!--<a v-if="isAuth" class="get-ticket" @click="activateTab('tickets')">Get Ticket</a>-->
        <a v-if="isAuth" class="get-ticket" @click="toggle('show', event.tickets[0])">Get Ticket</a>
        <a v-else class="get-ticket" @click="redirect">Sign up</a>
      </div>
      
      <div class="body">
        <!--For desktop button-->
        <div class="desktop-details">
          <div class="detail">
            <img src="~/assets/icons/manage/calendar.svg">
            <div class="info">
              <p class="time">Date & Time</p>
              <p class="actual-time" v-if=" event.start_date ===  event.end_date">
                {{event.end_date | moment("dddd, MMMM Do YYYY")}}
                <br>
                {{event.start_time | moment('LT')}} - {{event.end_time | moment('LT')}}
              </p>
              <p class="actual-time" v-else>
                {{ event.start_date | moment("dddd, MMMM Do YYYY") }}
                <br>
                {{event.end_date | moment("dddd, MMMM Do YYYY")}}
                <br>
                {{event.start_time | moment('LT')}} - {{event.end_time | moment('LT')}}
              </p>
            </div>
          </div>
          
          <div class="detail">
            <img src="~/assets/icons/manage/location.svg">
            <div class="info">
              <p class="time">Location</p>
              <p class="actual-time">{{event.location}}</p>
            </div>
          </div>
          
          <div class="detail">
            <img src="~/assets/icons/manage/location.svg">
            <div class="info">
              <p class="time">Address</p>
              <p class="actual-time">{{event.address}}</p>
            </div>
          </div>
          
          
          <div class="guests" style="display: none">
            <p>Attendees</p>
            <div class="attendees">
              <div class="attendee">
                <img src="~assets/images/dp.jpg" alt="attendee">
              </div>
              <div class="attendee">
                <img src="~assets/images/dp.jpg" alt="attendee">
              </div>
              <div class="attendee">
                <img src="~assets/images/dp.jpg" alt="attendee">
              </div>
              <div class="attendee count">
                <p>+240</p>
              </div>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="about">
            <div class="title-wrapper">
              <p class="title">{{ event.event_name }}</p>
            </div>
            
            <div class="tabs">
              <span class="tab" :class="{active: activeTab === 'about'}" @click="activateTab('about')"> About </span>
              <span class="tab" :class="{active: activeTab === 'tickets'}"
                    @click="activateTab('tickets')"> Tickets </span>
              <span class="tab" :class="{active: activeTab === 'connect'}"
                    @click="activateTab('connect')"> Connect </span>
            </div>
            <!-- <p v-if="isAbout" class="about-event">{{ event.about_event }}</p>-->
            
            <div v-show="activeTab === 'about'" class="about-event">
              
              <p class="about">
                {{event.about_event}}
              </p>
              
              <div class="details">
                <div class="detail">
                  <img src="~/assets/icons/manage/calendar.svg">
                  <div class="info">
                    <p class="time">Date & Time</p>
                    <p class="actual-time" v-if="event.start_date === event.end_date">
                      {{event.end_date | moment("dddd, MMMM Do YYYY")}}
                      <br>
                      {{event.start_time | moment('LT')}} - {{event.end_time | moment('LT')}}
                    </p>
                    <p v-else>
                      {{ event.start_date | moment("dddd, MMMM Do YYYY") }}
                      <br>
                      {{event.end_date | moment("dddd, MMMM Do YYYY")}}
                      <br>
                      {{event.start_time | moment('LT')}} - {{event.end_time | moment('LT')}}
                    </p>
                  </div>
                </div>
                
                <div class="detail">
                  <img src="~/assets/icons/manage/location.svg">
                  <div class="info">
                    <p class="time">Location</p>
                    <p class="actual-time">{{event.location}}</p>
                  </div>
                </div>
                
                <div class="detail">
                  <img src="~/assets/icons/manage/location.svg">
                  <div class="info">
                    <p class="time">Address</p>
                    <p class="actual-time">{{event.address}}</p>
                  </div>
                </div>
                
                
                <div class="guests" style="display: none">
                  <p>Attendees</p>
                  <div class="attendees">
                    <div class="attendee">
                      <img src="~assets/images/dp.jpg" alt="attendee">
                    </div>
                    <div class="attendee">
                      <img src="~assets/images/dp.jpg" alt="attendee">
                    </div>
                    <div class="attendee">
                      <img src="~assets/images/dp.jpg" alt="attendee">
                    </div>
                    <div class="attendee count">
                      <p>+240</p>
                    </div>
                  </div>
                </div>
              </div>
            
            </div>
            
            <div v-show="activeTab === 'tickets'" class="tickets-wrapper">
              
              <div v-for="ticket in event.tickets" class="ticket" :key="ticket._id">
                <h3 class="ticket-name"> {{ticket.name}} </h3>
                
                <p class="description"> {{ticket.description }} </p>
                
                
                <span v-if="isAuth" class="price">{{ ticket.price ? '₦' + ticket.price : 'FREE' }} <img
                    src="~/assets/icons/ticket-arrow.svg" alt="" @click="toggle('show', ticket)"></span>
  
                <span v-else class="price">{{ ticket.price ? '₦' + ticket.price : 'FREE' }} <img
                    src="~/assets/icons/ticket-arrow.svg" alt="" @click="redirect"></span>
              </div>
            </div>
            
            <div v-show="activeTab === 'connect'" class="connect" v-if="event.picture_1 || event.picture_1">
              <div class="image-wrapper">
                <div class="image">
                  <img :src="event.picture_1">
                </div>
                <div class="image">
                  <img :src="event.picture_2">
                </div>
              </div>
              
              <div class="youtube">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dmqWuUeA5Ug" frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
              </div>
              
              <div class="socials-wrapper" v-show="event.facebook_link || event.instagram_link || event.twitter_link">
                <span>Follow us on:</span>
                <div class="socials">
                  <div class="social">
                    <a :href="event.facebook_link ? event.facebook_link : null"> <img
                        src="~/assets/icons/social-facebook.svg"></a>
                  </div>
                  <div class="social">
                    <a :href="event.instagram_link ? event.instagram_link : null"> <img
                        src="~/assets/icons/social-instagram.svg"></a>
                  </div>
                  <div class="social">
                    <a :href="event.twitter_link ? event.twitter_link : null"> <img
                        src="~/assets/icons/social-twitter.svg"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
      
      <div class="get-wrapper">
        <!--<a  class="get-ticket" @click="activateTab('tickets')"> Get ticket </a>-->
        <a v-if="isAuth" class="get-ticket" @click="toggle('show', event.tickets[0])"> Get ticket </a>
        <a v-else class="get-ticket" @click="redirect"> Sign up </a>
      </div>
      <div class="footer">
        <p>&copy; 2019. All rights reserved event website </p>
        
        <p>Created with <span style="color: red">love</span> using easyevent </p>
      </div>
    </div>
  </section>
</template>

<script>
    import CardPayment from '~/components/CardPayment';
    import CardPaymentSuccess from '~/components/CardPaymentSuccess';
    import Loader from '~/components/MainLoader';

    export default {
        name: "index",
        components: {
            CardPayment,
            CardPaymentSuccess,
            Loader
        },
        data() {
            return {
                isAbout: true,
                showPayment: false,
                errorPayment: false,
                showSuccess: false,
                processing: false,
                ticket: null,
                PaidTicket: null,
            }
        },
        computed: {
            bG() {
                return this.event.background_image ? {backgroundImage: `url('${this.event.background_image}')`} : {backgroundImage: `url('/website-bg.png')`}
            },
            logo() {
                return this.event.event_icon ? this.event.event_icon : null
            },
            user() {
                return this.$store.getters.getUser
            },
            isAuth() {
                return this.$store.getters.isAuthenticated
            }
        },
        asyncData({$axios, params}) {
            return $axios.$get(`event/findone/${params.id}`)
                .then(res => {
                    console.log(res.event);
                    return {
                        event: {...res.event},
                        activeTab: 'about'
                    }
                })
                .catch(res => console.log(res))
        },
        methods: {
            //when not loged in
            redirect(){
                this.processing = true;
                const body = document.querySelector("body");
                const html = document.querySelector("html");
    
    
                body.classList.add('no-scroll');
                html.classList.add('no-scroll');
                
                setTimeout(()=> {
                    body.classList.remove('no-scroll');
                    html.classList.remove('no-scroll');
                    this.processing = false;
                    this.$router.push('/signup');
                }, 1000)
            },
            toggle(type, ticket = null) {
                const body = document.querySelector("body");
                const html = document.querySelector("html");
                switch (type) {
                    case 'show':
                        this.showPayment = true;
                        body.classList.add('no-scroll');
                        html.classList.add('no-scroll');
                        this.ticket = ticket;
                        break;
                    case 'close':
                        this.showPayment = false;
                        body.classList.remove('no-scroll');
                        html.classList.remove('no-scroll');
                        break;

                    case 'close-success':
                        this.showSuccess = false;
                        body.classList.remove('no-scroll');
                        html.classList.remove('no-scroll');
                        break;

                    default:
                    //console.log(type);
                    //body.classList.add('no-scroll');
                }
            },
            activateTab(tab) {
                this.activeTab = tab;
            },
        },
        mounted() {
            //checks on successful payment
            if (this.$route.query.status === 'successful') {
                //const status = this.$CryptoJS.SHA256.decrypt(this.$route.query.status, this.$route.query.ref);
                //return console.log('hell yea');
                //return console.log(this.$route.query.ticketref);
                //call attend event API and display ticket on success
                this.$axios.$post('/event/attend', {
                    obtainedTicket: this.$route.query.ticket_id,
                    _id: this.$route.params.id,
                    attendee_id: this.user.id
                })
                    .then(res => {
                        //console.log(res);
                        if(res.error !== true){
                            this.paidTicket = res.ticket;
                            this.showSuccess = true;
                        }
                    })
                    .catch(err => {
                          this.$toast.show('You have already gotten this ticket.',{
                              onComplete: () => this.$router.push('/manage/tickets'),
                              type: 'error'
                          });
                    });
            } else if (this.$route.query.status && this.$route.query.status === 'failed') {
                this.showPayment = true;
                this.errorPayment = true;
            }
            
            //sets the event the guest/user is trying to get before signup/login
            localStorage.setItem('event_id', this.event._id);
        }
    }
</script>

<style>

</style>