<template>
    <section>
        <transition name="fade">
        <EventCreateSuccess v-if="showPublished"></EventCreateSuccess>
        </transition>
        
        <section class="container" id="website-page">
            <div class="intro">
                <p>Review your website before publishing</p>
                <div class="mobile">
                    <!--<a class="save-btn"><img src="~assets/icons/save.svg"></a>-->
                    <a class="btn" @click.prevent="publishEvent">Publish</a>
                </div>

                <div class="right">
                    <a  class="btn save" @click.prevent="later">Continue later</a>
                    <a v-if="!event.publish" class="btn" @click.prevent="publishEvent">Publish event</a>
                    <a v-else class="btn" @click.prevent="unpublishEvent">Unpublish event</a>
                </div>
            </div>

            <div class="webview">
                <div class="bg-image" :style="srcBG">
                    <!--<Loader class="picture_2"></Loader>-->
                    <div class="label" @click="$refs.bg.click()">
                        <img src="~/assets/icons/edit.svg">
                        <input type="file" @change="addBG" ref="bg" style="display: none">
                    </div>
                    <div class="bg-content">
                        <Loader v-show="isUploadingBG"></Loader>
                        <div class="logo-wrapper">
                            <Loader v-show="isUploadingLogo"></Loader>
                            <div v-if="!event.event_icon" class="logo" style="cursor: pointer" @click="$refs.logo.click()"> +
                                Add logo
                            </div>
                            <div v-else class="event-logo" @click="$refs.logo.click()">
                                <img style="cursor: pointer" :src="event.event_icon" alt="event logo" class="event-logo" ref="eventLogo">
                            </div>
                            <input type="file" @change="addLogo" ref="logo" style="display: none">
                        </div>
                        <h1 class="title">{{event.event_name}}</h1>
                        <h3 class="time">{{ event.start_date | moment("dddd, MMMM Do YYYY") }}</h3>
                        <a class="get-ticket">Get Ticket</a>
                    </div>
                </div>

                <div class="desktop-title container">
                    <h3>{{event.event_name}}</h3>
                    <!--<a v-if="isAuth" class="get-ticket" @click="activateTab('tickets')">Get Ticket</a>-->
                    <a v-if="isAuth" class="get-ticket" @click="toggle('show', event.tickets[0])">Get Ticket</a>
                    <nuxt-link v-else class="get-ticket" to="/login" >Login to get ticket</nuxt-link>
                </div>

                <div class="body">
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

                        <div class="guests">
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
                                <span class="tab" :class="{active: activeTab === 'tickets'}" @click="activateTab('tickets')"> Tickets </span>
                                <span class="tab" :class="{active: activeTab === 'connect'}" @click="activateTab('connect')"> Connect </span>
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
                                            <p class="actual-time">
                                                {{ event.start_date | moment("dddd, MMMM Do YYYY") }}
                                                <br>
                                                {{event.end_date | moment("dddd, MMMM Do YYYY")}}
                                                <br>
                                                {{event.start_time | moment('LT')}} - {{event.end_time | moment('LT')}} daily
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

                            <div v-show="activeTab === 'tickets'"  class="tickets-wrapper">
                                <div v-for="ticket in event.tickets" class="ticket" :key="ticket._id">
                                    <h3 class="ticket-name"> {{ ticket.name}} </h3>

                                    <p class="description"> {{ ticket.description }} </p>

                                    <span class="price">₦{{ ticket.price }} <img src="~/assets/icons/ticket-arrow.svg"></span>
                                </div>
                            </div>

                            <div v-show="activeTab === 'connect'" class="connect">
                                <div class="image-wrapper">
                                    <div class="image">
                                        <Loader v-show="isUploadingP1"></Loader>
                                        <img v-if="event.picture_1" :src="event.picture_1"  @click="$refs.pic1.click()">
                                        <img v-else src="~/assets/images/img-holder.svg"  @click="$refs.pic1.click()">
                                        <input type="file" @change="addPic1" ref="pic1" style="display: none">
                                    </div>

                                    <div class="image">
                                        <Loader v-show="isUploadingP2"></Loader>
                                        <img v-if="event.picture_2" :src="event.picture_2" @click="$refs.pic2.click()">
                                        <img v-else src="~/assets/images/img-holder.svg"  @click="$refs.pic2.click()">
                                        <input type="file" @change="addPic2" ref="pic2" style="display: none">
                                    </div>
                                </div>

                                <div class="youtube" style="display: none">
                                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dmqWuUeA5Ug" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>

                                <div class="socials-wrapper">
                                    <span>Follow us on:</span>
                                    <div class="socials">
                                        <div class="social">
                                            <a href="#"> <img src="~/assets/icons/social-facebook.svg"></a>
                                        </div>
                                        <div class="social">
                                            <a href="#"> <img src="~/assets/icons/social-instagram.svg"></a>
                                        </div>
                                        <div class="social">
                                            <a href="#"> <img src="~/assets/icons/social-twitter.svg"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                </div>

                <div class="footer">
                    <p>&copy; 2019. All rights reserved event website </p>

                    <p>Created with <span style="color: red">love</span> using  easyevent </p>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex';
    import EventCreateSuccess from '~/components/EventCreateSuccess';
    import Loader from '~/components/Loader';

    export default {
        name: "Website",
        layout: "Manage",
        components:{
            EventCreateSuccess,
            Loader
        },
        data(){
            return{
                isUploadingP1: false,
                isUploadingP2: false,
                isUploadingBG: false,
                isUploadingLogo: false,
                isAbout: true,
                showPublished: false,
                hasBG: false,
                picture_1: null,
                picture_2: null,
                hasPicture1: false,
                hasPicture2: false,
                activeTab: 'about',
            }
        },
        asyncData({$axios, route}) {
            return $axios.$get(`event/findone/${route.params.id}`)
                .then(res => {
                    //console.log(res.event);
                    return {
                        event: {...res.event},
                        srcBG: res.event.background_image ? { backgroundImage: `url('${res.event.background_image}')` } : { backgroundImage: "url('/website-bg.png')"},
                    }
                })
                .catch(res => console.log(res));
        },
        methods: {
            //for continue later
            later(){
                this.$router.push('/manage')
            },
            addLogo(e) {
                //checks if image is loaded
                if (e.target.files[0] !== undefined) {
                    this.event_icon = URL.createObjectURL(e.target.files[0]);
                    this.isUploadingLogo = true;
                }

                //appends image to the form
                const formData = new FormData();
                formData.append("file", e.target.files[0]);
                formData.append("eventid", this.event._id);

                //posts to the endpoint
                this.$axios.$post('/event/uploadicon', formData)
                    .then(res => {
                        this.event.event_icon = res.image;
                        this.isUploadingLogo = false;
                    })
                    .catch(err => console.log(err))
            },
            addBG(e){
                //console.log('changed');
                if (e.target.files[0] !== undefined) {
                    this.srcBG = { backgroundImage: `url('${URL.createObjectURL(e.target.files[0])}')`};
                }

                this.isUploadingBG = true;

                const formData = new FormData();
                formData.append("file", e.target.files[0]);
                formData.append("eventid", this.event._id);

                //posts to the endpoint and sets the event icon in vuex
                this.$axios.$post('/event/changeBackgroundImage', formData)
                    .then(res => {
                        //console.log(res);
                        //this.$store.commit('event/SET_EVENT_BG', res.image);
                        this.srcBG = {backgroundImage: `url('${this.event.background_image}')`};
                        this.isUploadingBG = false;
                    })
                    .catch(err => console.log(err))
            },
            addPic1(e){
                if (e.target.files[0] !== undefined) {
                    this.event.picture_1 = URL.createObjectURL(e.target.files[0]);
                }
                this.isUploadingP1 = true;

                const formData = new FormData();
                formData.append("file", e.target.files[0]);
                formData.append("eventid", this.event._id);

                //posts to the endpoint and sets the event icon in vuex
                this.$axios.$post('/event/uploadEventExtraImages1', formData)
                    .then(res => {
                            this.event.picture_1 = res.image;
                            this.isUploadingP1 = false;
                    })
                    .catch(err => console.log(err))
            },
            addPic2(e){
                if (e.target.files[0] !== undefined) {
                    this.event.picture_2 = URL.createObjectURL(e.target.files[0]);
                }

                this.isUploadingP2 = true;


                const formData = new FormData();
                formData.append("file", e.target.files[0]);
                formData.append("eventid", this.event._id);

                //posts to the endpoint and sets the event icon in vuex
                this.$axios.$post('/event/uploadEventExtraImages2', formData)
                    .then(res => {
                        this.event.picture_2 = res.image;
                        this.isUploadingP2 = false;
                    })
                    .catch(err => console.log(err))
            },
            publishEvent() {
                this.$axios.$post(`/event/publish/${this.event._id}`)
                    .then(() => this.toggleSuccessEvent())
                    .catch(err => console.log(err))
            },
            unpublishEvent() {
                this.$axios.$post(`/event/unpublish/${this.event._id}`)
                    .then(() => alert('event succesfully unpublished'))
                    .catch(err => console.log(err))
            },
            toggleSuccessEvent(){
                const body = document.querySelector("body");
                body.classList.add('no-scroll');
                this.showPublished = true;
                setTimeout(()=> {
                    body.classList.remove('no-scroll');
                    this.$router.push('/event/' +  this.$route.params.id);
                },3000)
            },
            activateTab(tab){
                this.activeTab = tab;
            },
        },
    }
</script>
