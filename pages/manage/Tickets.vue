<template>
    <div id="ticket-page">
        <transition name="fade">
            <Loader v-if="show"></Loader>
        </transition>
        
        <Ticket v-if="tickets" @close-ticket="toggle('close-ticket')" :show="showTicket" :ticket="currentlyViewedTicket" :user="user"></Ticket>

        <div class="container">
            <div class="intro">
                <div class="left">
                    <nuxt-link to="/manage"><img style="width: 20px;" src="~/assets/icons/left-arrow.svg"></nuxt-link>
                    <h1 class="lead">Your tickets</h1>
                    <p class="sub">View all your tickets</p>
                </div>
                <div class="right" style="display: none">
                    <nuxt-link to="/manage/create" class="create-btn">Create Event</nuxt-link>
                </div>
            </div>

            <div v-if="tickets" class="tickets-wrapper">
                <div v-for="ticket in tickets" :key="ticket._id" class="ticket" :class="{used : used(ticket.event_id.start_date)}" @click="toggle('open-ticket', ticket)">
                    <div class="top">
                        <div>
                            <h3 class="title">{{ticket.event_id.event_name}}</h3>
                            <div class="actions">
                                <img src="~/assets/icons/download-icon.svg">
                                <img src="" alt="">
                            </div>
                        </div>
                        <p class="desc">{{ticket.event_id.about_event.split(" ").splice(0, 10).join(" ") + '...'}}
                        </p>
                    </div>
                    <div class="bottom">
                        <div class="name">
                            <span class="label">Full Name</span>
                            <h3>{{user.fname + ' ' + user.lname}}</h3>
                        </div>
                        <div class="grid">
                            <div class="extra">
                                <div class="name">
                                    <span class="label">Location</span>
                                    <p>{{ticket.event_id.location}}</p>
                                </div>
                                <div class="name">
                                    <span class="label">Date</span>
                                    <p>{{ticket.event_id.start_date | moment("dddd, MMMM Do YYYY")}}</p>
                                </div>
                            </div>
                            <div class="barcode">
                                <qrcode v-if="ticket" :value="`${ticket.event_id._id}#${ticket._id}`" :options="{width: 70, height: 70}" tag="img" ></qrcode>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-for="ticket in tickets" :key="ticket._id" class="big-ticket"  :class="{used : used(ticket.event_id.start_date)}"  @click="toggle('open-ticket', ticket)">
                    <div class="left">
                        <div class="form-group">
                            <span class="label">Full Name</span>
                            <h3>{{ user.fname + ' ' + user.lname }}</h3>
                        </div>
                        <div class="form-group ref">
                            <span class="label">Ticket Reference</span>
                            <p>{{ticket.ticket_reference}}</p>
                        </div>
                        <div class="form-group">
                            <span class="label">Ticket type</span>
                            <h3>{{ticket.ticket_type}}</h3>
                        </div>
                        <div class="barcode">
                            <qrcode v-if="ticket" :value="`${ticket.event_id._id}#${ticket._id}`" :options="{width: 70, height: 70}" tag="img" ></qrcode>
                        </div>
                    </div>
                    <div class="right">
                        <div class="form-group">
                            <span class="label">Event Ticket</span>
                            <h1>{{ ticket.event_id.event_name }}</h1>
                        </div>

                        <div class="form-group">
                            <span class="label">Description</span>
                            <p class="desc"> {{ ticket.event_id.about_event}}
                            </p>
                        </div>
                        <div class="form-group name">
                            <span class="label">Full Name</span>
                            <h1 class="name">{{ user.fname + ' ' + user.lname }}</h1>
                        </div>
                        <div class="misc">
                            <div class="form-group">
                                <span class="label">Location</span>
                                <p>{{ ticket.event_id.location }}</p>
                            </div>
                            <div class="form-group">
                                <span class="label">Date</span>
                                <p>{{ticket.event_id.start_date | moment("dddd, MMMM Do YYYY")}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
                No Ticket found
            </div>
        </div>
    </div>
</template>

<script>
    import Ticket from "~/components/Ticket";
    import Loader from "~/components/MainLoader";

    export default {
        layout: "Manage",
        components: {
            Ticket,
            Loader
        },
        data(){
            return{
                show: false
            }
        },
        computed:{
            user(){
                return this.$store.getters.getUser;
            },
        },
        
        asyncData({$axios, store}) {
            return $axios.$get('/event/ticket/allUserTicket/' + store.getters.getUser.id)
                .then(res => {
                    console.log(res);
                    return {
                        showTicket: false,
                        tickets: res.ticket,
                        currentlyViewedTicket: res.ticket ? res.ticket[0] : null
                    }
                })
                .catch(err => console.log(err))
        },
        methods: {
            toggle(type, ticket) {
                const body = document.querySelector("body");
                const html = document.querySelector("html");
                switch (type) {
                    case 'close-ticket':
                        this.showTicket = false;
                        body.classList.remove('no-scroll');
                        html.classList.remove('no-scroll');
                        //removes query from url
                        let query = Object.assign({}, this.$route.query);
                        delete query.ticket;
                        this.$router.replace({query});
                        break;
                    case 'open-ticket':
                        this.showTicket = true;
                        this.currentlyViewedTicket = ticket;

                        body.classList.add('no-scroll');
                        html.classList.add('no-scroll');
                        break;
                    default:
                        break;
                }
            },
            used(date){
                //gets today in ISO format
                const today = new Date().toISOString();

                //checks if start date of event is older than today
                if( date < today){
                    return true
                }
            }
        },
        mounted() {
            //get ticket from url when available
        
            if (this.$route.query.ticket) {
                this.show = true;

                const body = document.querySelector("body");
                const html = document.querySelector("html");

                body.classList.add('no-scroll');
                html.classList.add('no-scroll');
                
                this.$axios.$get('/event/ticket/getTicket/'+this.$route.query.ticket)
                    .then(res => {
                        //console.log(res.ticket);
                        body.classList.remove('no-scroll');
                        html.classList.remove('no-scroll');
                        this.show =false;
                        this.currentlyViewedTicket = res.ticket;
                        this.toggle('open-ticket');
                    })
                    .catch(err => console.log(err));
            }
        }
    }
</script>
