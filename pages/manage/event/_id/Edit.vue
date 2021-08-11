<template>
  <section class="container" id="create-page">
    <div class="intro">
      <div class="mobile">
        <a href="#" class="save-btn"><img src="~assets/icons/save.svg"></a>
        <a class="btn" v-if="isEditedEvent" @click.prevent="updateEvent">Update</a>
        <a v-else class="btn" @click.prevent="postEvent">Publish</a>
      </div>
      <div class="info">
        <div class="left">
          <h3 class="title desktop">Create your free event</h3>
          <h3 class="title">Create event</h3>
          <p class="sub">Create your event in less than 5 mins</p>
        </div>
        <div class="right">
          <a href="#" class="btn save">Save event</a>
          <a href="#" class="btn" v-if="isEditedEvent" @click.prevent="updateEvent">Update event</a>
          <a v-else href="#" class="btn" @click.prevent="postEvent">Publish event</a>
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
            <div class="form-group">
              <input type="text" placeholder="Category" v-model="event.category" class="select">
            </div>
            <div class="form-group">
              <input type="text" placeholder="Event Location. eg. Lagos" v-model="event.location">
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
          <p class="heading">Create event ticket</p>
          <div class="question">
            <p>Will you be selling tickets for this event? </p>
            <div class="answer">
              <span class="option" :class="{selected: sellTicket}" @click="toggleTicket('yes')">yes</span>

              <span class="option" :class="{selected: !sellTicket}" @click="toggleTicket('no')">No</span>
            </div>
            <div class="form-group ticket" :class="{no: !sellTicket}">
              <input type="text" class="price" placeholder="Price ">
            </div>
          </div>

          <div class="question">
            <p> What kind of event is this? </p>
            <div class="answer">
                            <span class="option" :class="{selected: privateEvent}"
                                  @click="togglePrivateType('private')">Private</span>
              <span class="option" :class="{selected: !privateEvent}"
                    @click="togglePrivateType('public')">Public</span>
            </div>
          </div>

          <p class="yay">
            Yay! You're almost there.
          </p>

          <div class="mobile bottom">
            <a href="#" class="save-btn"><img src="~assets/icons/save.svg"></a>
            <a class="btn" v-if="isEditedEvent" @click.prevent="updateEvent">Update</a>
            <a v-else class="btn" @click.prevent="postEvent">Publish</a>
          </div>

          <div class="proceed">
            <a href="#" class="btn" v-if="isEditedEvent" @click.prevent="updateEvent">Update event</a>
            <a href="#" v-else class="btn" @click.prevent="postEvent">Publish event</a>
            <a href="#" class="btn save">Save event</a>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    layout: "Manage",
    data() {
      return {
        sellTicket: true,
        privateEvent: true,
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
          event_id: '',
          amount: 10,
          selling_ticket_status: null,
          selling_ticket_remarks: null,
          event_country: 'Nigeria'
        }
      }
    },
    computed: {
      ...mapGetters({
        isEditedEvent: 'event/isEditedEvent',
        event: 'event/getEvent'
      })
    },
    methods: {
      toggleTicket(status) {
        //for css
        this.sellTicket = status === "yes";

        //for event data
        this.event.selling_ticket_status = status === "yes" ? 1 : 0;
      },
      togglePrivateType(status) {
        //for css
        this.privateEvent = status === "private";

        //for event data
        this.event.selling_ticket_remarks = status === "private" ? 1 : 0;
      },
      postEvent() {
        //dispatch an action to persist data
        this.$store.dispatch('event/createEvent', {...this.event})
                .then((res) => {
                  //push to website view
                  if (res.error !== false) {
                    console.log(res.error)
                  }
                  this.event = {};
                  this.$router.push('/manage/website/' + res.event._id);
                })
                .catch(err => console.log(err))
      },
      updateEvent() {
        this.$store.dispatch('event/updateEvent', {...this.event})
                .then(() => {
                  //push to wesite view
                  this.event = {};

                  this.$router.push('/manage/website/');
                })
                .catch(err => console.log(err))
      }
    },
    mounted() {
      if (this.isEditedEvent) {
        //copy the contents of the stored event to event variable
        this.event = {...this.getEvent}
      }
    }
  }
</script>

<style scoped>

</style>
