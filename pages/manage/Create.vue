<template>
  <section class="container" id="create-page">
    <Loader v-if="processing"></Loader>
    <div class="intro">
      <div class="mobile">
        <a class="save-btn" @click="saveEvent"><img src="~assets/icons/save.svg"></a>
        <a class="btn" @click.prevent="postEvent">Publish</a>
      </div>
      <div class="info">
        <div class="left">
          <nuxt-link to="/manage"><img style="width: 20px;" src="~/assets/icons/left-arrow.svg"></nuxt-link>
          <h3 class="title desktop">Create your free event</h3>
          <h3 class="title">Create event</h3>
          <p class="sub">Create your event in less than 5 mins</p>
        </div>
        <div class="right">
          <a class="btn save" @click="saveEvent"><img src="~/assets/icons/save.svg" alt=""></a>
          <a class="btn" @click.prevent="postEvent">Publish</a>
        </div>
      </div>
    </div>
    <form>
      <div class="form">
        <div class="top">
          <div class="left">
            <div class="form-group">
              <input type="text" placeholder="Title of your event" v-model="event.event_name">
            </div>
            
            <div class="form-group cat">
              <div class="category" @click="showCategory = !showCategory">
                {{ selectedCategoryName ? selectedCategoryName : 'Select Category' }}
              </div>
              <transition name="fade">
                <div class="category-options-wrapper" v-show="showCategory">
                  <div v-for="category in categories" class="category-options"
                       @click="selectCategory({id: category._id, name: category.category_name})">
                    {{category.category_name}}
                  </div>
                </div>
              </transition>
              <!--<input type="text" placeholder="Category" v-model="event.category" class="select">-->
            </div>
            
            
            <div class="form-group states">
              <input type="text" placeholder="Location. eg. Lagos" v-model="userEnteredLocation">
              <transition name="fade">
                <div v-if="showFilteredLocation" class="states-wrapper">
                  <span v-for="(loc,i) in filteredLocation" class="state" :key="i"
                        @click="selectLocation(loc)">{{loc}}</span>
                </div>
              </transition>
            </div>
            
            <div class="form-group">
              <input type="text" placeholder="Address" v-model="event.address">
            </div>
          </div>
          <div class="right">
            <div class="form-group text desktop">
                            <textarea v-model="event.about_event" class="desc"
                                      placeholder="Describe your event"></textarea>
            </div>
            <div class="right-bottom">
              <div class="form-group">
                <datetime style="cursor: pointer" v-model="event.start_date" placeholder="Start date"
                          class="input theme-blue"
                          type="date"
                          input-class="select"
                          use12-hour
                ></datetime>
              </div>
              <div class="form-group">
                <datetime style="cursor: pointer" v-model="event.start_time" placeholder="Start time"
                          class="input theme-blue"
                          type="time" use12-hour
                          input-class="select"
                          minute-step="15"
                ></datetime>
              </div>
              <div class="form-group">
                <datetime style="cursor: pointer" v-model="event.end_date" placeholder="End date"
                          class="input theme-blue"
                          type="date"
                          input-class="select"></datetime>
              </div>
              <div class="form-group">
                <datetime style="cursor: pointer" v-model="event.end_time" placeholder="End time"
                          class="input theme-blue"
                          minute-step="15"
                          type="time" use12-hour
                          input-class="select"></datetime>
              </div>
            </div>
          </div>
          <div class="form-group text mobile">
            <textarea v-model="event.about_event" class="desc" placeholder="Describe your event"></textarea>
          </div>
        </div>
        <div class="bottom">
          <div class="tickets">
            <p class="heading">Create event ticket</p>
            
            <div class="question">
              <p> What kind of event is this? </p>
              <div class="answer">
                             <span class="option" :class="{selected: !privateEvent}"
                                   @click="togglePrivateType('public')">Public</span>
                <span class="option" :class="{selected: privateEvent}"
                      @click="togglePrivateType('private')">Private</span>
              </div>
            </div>
            
            <div class="question">
              <p> How many people are you expecting </p>
              <div class="expectation">
                <span class="minus" @click="minus"> - </span>
                <input class="display" v-model="event.number_of_attendees">
                <span class="add" @click="add"> + </span>
              </div>
            </div>
          </div>
          <div class="connect">
            <p class="heading">Connect</p>
            <p class="sub">Upload your Social contact here</p>
            <div class="form-group">
              <input type="text" placeholder="YouTube embedded link" v-model="event.youtube_link">
            </div>
            <div class="form-group">
              <input type="text" placeholder="Instagram page link" v-model="event.instagram_link">
            </div>
            <div class="form-group">
              <input type="text" placeholder="Facebook page link" v-model="event.facebook_link">
            </div>
            <div class="form-group">
              <input type="text" placeholder="Twitter page link" v-model="event.twitter_link">
            </div>
          </div>
        </div>
        
        <div class="pricing" v-show="sellTicket">
          <div class="top">
            <p class="sub"> Choose other ticket types <small>*Tickets cannot be edited after creation</small></p>
            <div class="expectation">
              <span class="minus" @click="removeTicketType"> - </span>
              <input v-if="ticketTypeNo" class="display" :value="ticketTypeNo" disabled>
              <input v-else class="display" :value="event.tickets.length" disabled>
              <span class="add" @click="addTicketType"> + </span>
            </div>
          </div>
          
          <div class="ticket-row-wrapper">
            <!--When creating a ticket, it shows just one ticket type-->
            <div class="ticket-row" v-for="(ticket_type, i) in event.tickets" :key="i">
              <div class="form-group">
                <span class="label">Ticket Name</span>
                <input type="text" placeholder="Eg. Premium ticket" v-model="ticket_type.name">
              </div>
              <div class="form-group">
                <span class="label">Ticket Price</span>
                <input type="number" v-model.number="ticket_type.price">
              </div>
              <div class="form-group">
                <span class="label">Ticket Description</span>
                <input type="text" v-model="ticket_type.description">
              </div>
            </div>
          </div>
        </div>
        
        <p class="yay">
          Yay! You're almost there.
        </p>
        
        <div class="mobile bottom">
          <a class="save-btn" @click="saveEvent"><img src="~assets/icons/save.svg"></a>
          <a class="btn" @click.prevent="postEvent">Publish</a>
        </div>
        
        <div class="proceed">
          <a class="btn save" @click="saveEvent"><img src="~/assets/icons/save.svg" alt=""></a>
          <a class="btn" @click.prevent="postEvent">Publish</a>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Loader from '~/components/MainLoader';

    export default {
        name: "Create",
        layout: "Manage",
        /*fetch({$axios, route, store}) {
            if (process.client) {
                return null;
            }

            return $axios.$get(`event/findone/${route.query.id}`)
                .then(res => {
                    //console.log(res)
                    store.commit('event/SET_EVENT', {...res.event})
                })
                .catch(res => console.log(res))
        },*/
        components:{
            Loader
        },
        data() {
            return {
                sellTicket: true,
                privateEvent: false,
                showCategory: false,
                selectedCategoryName: null,
                ticketTypeNo: null,
                categories: [],
                processing: false,
                showFilteredLocation: false,
                userEnteredLocation: '',
                filteredLocation: [],
                states: ['Lagos', 'Abuja', 'Markurdi', 'Ogun', 'Kaduna', 'Katsina', 'Ondo', 'Anambra'],
                event: {
                    easy_id: this.$store.getters.getUser.id,
                    easy_apikey: this.$store.getters.getUser.apiKey,
                    event_name: '',
                    category: '',
                    location: '',
                    address: '',
                    start_time: '',
                    start_date: '',
                    end_date: '',
                    end_time: '',
                    about_event: '',
                    facebook_link: '',
                    twitter_link: '',
                    instagram_link: '',
                    youtube_link: '',
                    selling_ticket_status: 1,
                    event_type: 'public',
                    number_of_attendees: 1,
                    tickets: [{
                        name: '',
                        price: '',
                        description: ''
                    }],
                },
            }
        },
        watch: {
            userEnteredLocation(val) {
                //this.showFilteredLocation ? === true;
                if (this.userEnteredLocation.length <= 0) {
                    this.showFilteredLocation = false;
                    this.filteredLocation = [];
                } else {
                    this.filteredLocation = this.states.filter(state => {
                        return state.includes(this.toUpperCase(val))
                    });
                    this.showFilteredLocation = true;
                }
            }
        },
        methods: {
            toUpperCase(val) {
                return val.charAt(0).toUpperCase() + val.slice(1);
            },
            selectLocation(location) {
                this.userEnteredLocation = location;
                this.event.location = location;
                //set timeout cos watch property switches on showFilteredLocation asynchronously
                setTimeout(() => {
                    this.showFilteredLocation = false;
                }, 100);
            },
            add() {
                this.event.number_of_attendees = parseInt(this.event.number_of_attendees) + 1;
            },
            minus() {
                if (this.event.number_of_attendees > 1) {
                    this.event.number_of_attendees -= 1
                }
            },
            addTicketType() {
                this.event.tickets.push({
                    name: '',
                    price: '',
                    description: ''
                })
            },
            removeTicketType() {
                if (this.event.tickets.length > 1) {
                    this.event.tickets.pop()
                }
            },
            //toggle event type
            togglePrivateType(status) {
                //for css
                this.privateEvent = status === "private";

                //for event data
                this.event.event_type = status === "private" ? 'private' : 'public';
            },

            //save event only
            saveEvent() {
                this.processing = true;
         
                    this.$store.dispatch('event/createEvent', {...this.event})
                        .then(res => {
                            this.processing = false;
                            this.$toast.show('Your event was saved successfully!',{
                                type: 'error'
                            });
                        })
                        .catch(err => console.log(err))
               
            },

            //post event and proceed to website view
            postEvent() {
                //dispatch an action to persist data
                //return console.log(this.event)
                this.processing = true;
                
                this.$store.dispatch('event/createEvent', {...this.event})
                    .then((res) => {
                        //push to website view
                        if (res.error === true) {
                            this.$toast.show('An error occured. Please try again', {
                                type: 'error',
                            });
                        }
                        
                        this.processing = false;
                        
                        //show notification
                        this.$toast.show('Event saved. redirecting to website', {
                            onComplete: () => {
                                this.$router.push('/manage/website/'  + res.event._id)
                            },
                            type: 'error',
                        });
                    })
                    .catch(err => console.log(err))
            },
            selectCategory(cat) {
                this.showCategory = false;
                this.selectedCategoryName = cat.name;
                this.event.category = cat.id;
            }
        },
        mounted() {
            this.$axios.$get('/category/getAll')
                .then(({categories}) => {
                    console.log(categories);
                    this.categories = categories;
                })
                .catch(err => console.log(err));
        }
    }
</script>

<style scoped>

</style>
