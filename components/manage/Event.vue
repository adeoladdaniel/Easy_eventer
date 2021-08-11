<template>
        <div class="event" >
            <div class="top">
                <div class="image-wrapper" @click="loadEvent(event)">
                    <div class="image">
                        <Loader v-if="processing" class="loader"></Loader>
                        <img :src="BG" alt="my awesome event background">
                    </div>
                </div>
                <div class="boost-wrapper">
                    <div class="boost">
                        <img style="width: 20px; height: 20px" src="~assets/icons/like.svg">
                        <span>{{event.likecounter}}</span>
                    </div>
                    <div class="setting" @click="editEvent(event)" v-if="event.easy_id === user.id">
                        <img src="~assets/icons/setting.svg" alt="">
                    </div>
                </div>
            </div>

            <div class="bottom">
                <div class="desktop-boost-wrapper" v-if="event.easy_id === user.id">
                    <div class="boost">
                        <img src="~assets/icons/like.svg">
                        <span>{{event.likecounter}}</span>
                    </div>
                    <div class="setting"  @click="editEvent(event)">
                        <img src="~assets/icons/setting.svg" alt="">
                    </div>
                </div>
                <h3 class="title" @click="loadEvent(event)">{{event.event_name}}</h3>
                <div class="sub">
                    <span>Location</span>
                    <p>{{event.location}}</p>
                </div>
                <div class="sub">
                    <span>Date</span>
                    <p>{{ event.start_date | moment("dddd, MMMM Do YYYY") }}</p>
                </div>


                <div class="misc">
                    <div class="attendees">
                        <span>Attendees</span>
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
                    <div class="share">
                        <img src="~assets/icons/share.svg">
                        <small>{{ 'https://easyevent.live/event/' + event._id}}</small>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import Loader from '~/components/Loader';
    
    
    export default {
        name: "Event",
        components:{
            Loader
        },
        data(){
            return{
                processing: false
            }
        },
        props: {
            event: {
                required: true,
                type: Object
            }
        },
        methods:{
            //to load event proper
            loadEvent(event){
                this.processing = true;
                
                setTimeout(()=>{
                    this.processing = false;
                    if(this.user.id !== this.event.easy_id){
                        return this.$router.push('/event/'+ event._id);
                    }
                    this.$router.push('/manage/event/'+ event._id);
                    //set milliseconds between 1000 and 2000
                }, Math.floor((Math.random() * 3) + 1) + "000")
            },

            //to edit event
            editEvent(event){
                this.$router.push('/manage/edit?id='+ event._id);
            }
        },
        computed:{
            /**
             * @return {string}
             */
            BG(){
                return this.event.background_image ? this.event.background_image : '/website-bg.png';
            },
            user(){
                return this.$store.getters.getUser;
            }
        },
    }
</script>

<style scoped>

</style>