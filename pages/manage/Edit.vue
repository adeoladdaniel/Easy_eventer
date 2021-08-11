<template>
  <section class="container" id="create-page">
    <div class="intro">
      <div class="mobile">
        <a class="save-btn" @click.prevent="updateEvent"><img src="~assets/icons/save.svg"></a>
        <a class="btn" @click.prevent="editWebsite">Edit Website</a>
      </div>
      <div class="info">
        <div class="left">
          <nuxt-link to="/manage"><img style="width: 20px;" src="~/assets/icons/left-arrow.svg"></nuxt-link>
          <h3 class="title desktop">{{ event.event_name }}</h3>
          <h3 class="title">Update event</h3>
          <p class="sub">Update your event</p>
        </div>
        <div class="right">
          <a class="btn save" @click.prevent="updateEvent">Update event</a>
          <a class="btn" @click.prevent="editWebsite">Edit Website</a>
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
                        @click="selectLocation(loc)">{{loc.name}}</span>
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
                          minute-step="15"
                          type="time" use12-hour
                          input-class="select"
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
            <p class="sub"> Add more ticket types </p>
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
                <input type="text" placeholder="Eg. Premium ticket" v-model="ticket_type.name"
                       :class="{disabled: i < originalTicketLength}">
              </div>
              <div class="form-group">
                <span class="label">Ticket Price</span>
                <input type="number" v-model.number="ticket_type.price" :class="{disabled: i < originalTicketLength}">
              </div>
              <div class="form-group">
                <span class="label">Ticket Description</span>
                <input type="text" v-model="ticket_type.description" :class="{disabled: i < originalTicketLength}">
              </div>
            </div>
            
            <!--When an updating the event, it renders the event available tickets-->
            <!--<div class="ticket-row" v-for="(ticket_type, i) in event.tickets" :key="i">
                <div class="form-group">
                    <span class="label">Ticket Name</span>
                    <input type="text" placeholder="Eg. Premium ticket" v-model="ticket_type.name" disabled>
                </div>
                <div class="form-group">
                    <span class="label">Ticket Price</span>
                    <input type="number" v-model.number="ticket_type.price" disabled>
                </div>
                <div class="form-group">
                    <span class="label">Ticket Description</span>
                    <input type="text" v-model="ticket_type.description" disabled>
                </div>
            </div>-->
          </div>
        </div>
        
        <!--<div class="uploads-wrapper">

            <div v-for="(image, i) in event.images" class="image">
                <img class="close" src="~/assets/icons/pay-close.svg" @click="removeImage(i)">
                &lt;!&ndash;<img :src="image[i].URL.createObjectURL(image)">&ndash;&gt;
            </div>

            <div class="upload">
                <img src="~/assets/icons/upload.svg" alt="">
                <input type="file" multiple style="display: none" ref="images" @change="imageHandler">
                <span> Select one or more images </span>
                <a class="select" @click="$refs.images.click()">Select file</a>
            </div>

        </div>-->
        
        
        <p class="yay">
          Yay! You're almost there.
        </p>
        
        <div class="mobile bottom">
          <a class="save-btn" @click="updateEvent"><img src="~assets/icons/save.svg"></a>
          <a class="btn" @click.prevent="editWebsite">Edit Website</a>
        </div>
        
        <div class="proceed">
          <a class="btn save" @click="updateEvent"><img src="~/assets/icons/save.svg" alt=""></a>
          <a class="btn" @click.prevent="editWebsite">Edit Website</a>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
    export default {
        name: "Create",
        layout: "Manage",
        middleware: 'validate',
        data(){
            return{
                states: []
            }
        },
        asyncData({$axios, route, store}) {
            return $axios.$get(`event/findone/${route.query.id}`)
                .then(res => {
                    //console.log(res);
                    /*if(res.event.easy_id !== store.getters.getUser.id){
                        route.push('/manage');
                    }*/
                    
                    return {
                        sellTicket: true,
                        privateEvent: false,
                        showCategory: false,
                        selectedCategoryName: null,
                        ticketTypeNo: null,
                        categories: [],
                        showFilteredLocation: false,
                        userEnteredLocation: res.event.location,
                        filteredLocation: [],
                        originalTicketLength: null,
                        event: {...res.event},
                    }
                })
                .catch(res => console.log(res))
        },
        watch: {
            userEnteredLocation(val) {
                //this.showFilteredLocation ? === true;
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
                this.event.location = location.name;
                //set timeout cos watch property switches on showFilteredLocation asynchronously
                setTimeout(() => {
                    this.showFilteredLocation = false;
                }, 100);
            },
            updateCategoryName() {
                return this.selectedCategoryName = this.categories.filter(category => category._id === this.event.category)[0].category_name;
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
                if (this.event.tickets.length > this.originalTicketLength) {
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
            //post event and proceed to website view
            editWebsite() {
                this.$store.dispatch('event/updateEvent', {...this.event})
                    .then((res) => {
                        //alert('success');
                        this.$router.push('/manage/website/' + this.event._id);
                    })
                    .catch(err => console.log(err + "error"))
            },
            //update edited event
            updateEvent() {
                this.$store.dispatch('event/updateEvent', {...this.event})
                    .then(() => {
                        this.$toast.show('Your event was updated succesfully!',{
                            type: 'error'
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
                    //console.log(categories);
                    this.categories = categories;
                    this.updateCategoryName();
                })
                .catch(err => console.log(err));

            //set event type switch
            this.privateEvent = this.event.event_type === 'private';

            //define originalticket length as a constant
            this.originalTicketLength = this.event.tickets.length;
    
            //get states
            this.$axios.$get('/event/returnState')
                .then(res => this.states = res)
                .catch(err=>console.log(err))
        }
    }
</script>

<style scoped>
  .disabled {
    pointer-events: none;
  }
</style>
