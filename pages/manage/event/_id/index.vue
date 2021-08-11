<template>
  <div id="event-page">
    <div class="container">
      <div class="intro">
        <div class="left">
          <nuxt-link to="/manage"><img style="width: 20px;" src="~/assets/icons/left-arrow.svg"></nuxt-link>
          <h1 class="lead">{{event.event_name}}</h1>
          <p class="sub">{{event.start_date | moment("dddd, MMMM Do YYYY")}}</p>
        </div>
        <div class="right">
          <a v-if="isPublished" class="create-btn" @click="unpublish">Unpublish Event</a>
          <a v-else class="create-btn" @click="publish">Publish Event</a>
        </div>
      </div>

      <div class="bar">
        <p class="title">Attendees</p>

        <div class="left">
          <div class="grid">
            <img src="~assets/icons/grid.svg" alt="">
          </div>
          <div class="list">
            <img src="~assets/icons/list.svg" alt="">
          </div>
          <!--<div class="dots-wrapper">
              <div class="dots"></div>
              <div class="dots"></div>
              <div class="dots"></div>
          </div>-->
        </div>
        <div class="options-wrapper">
          <div class="option">Published events</div>
          <div class="option">Past events</div>
          <div class="option">Pending</div>
        </div>
      </div>
    </div>
    <div class="attendeees-wrapper" v-if="attendees.length >= 1">
      <div v-for="(attendee, i) in attendees" :key="i" class="attendee">
        <span class="sn">1.</span>
        <span class="dp">
                <img :src="attendee.profile_pic ? attendee.profile_pic : '/user-dark.svg'">
              </span>
        <span class="name">
                {{attendee.fullName}}
              </span>
        <span class="email"> {{attendee.email}}</span>
        <span class="phone">{{attendee.phone}}</span>
      </div>
      <div class="pagination-wrapper" style="display: none">
        <div class="left pagination"></div>
        <div class="right pagination">>></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'Manage',
    asyncData({$axios, params}) {
      return $axios.$get('/event/getEventAttendee/' + params.id)
        .then(res => {
          return {
            attendees: res.attendee,
            event: res.event,
            isPublished: res.event.publish
          }
        })
        .catch(err => console.log(err))
    },
    methods: {
      unpublish() {
        this.$axios.$post(`/event/unpublish/${this.event._id}`)
          .then(() => {
            this.isPublished = false;
            this.$toast.show('Your event has unpublished', {
              onComplete: () => this.$router.push('/manage/tickets'),
              type: 'error'
            });
          })
          .catch(err => console.log(err))
      },
      publish() {
        this.$axios.$post(`/event/publish/${this.event._id}`)
          .then(() => {
            this.isPublished = true;
            this.$toast.show('Your event has unpublished', {
              onComplete: () => this.$router.push('/manage/tickets'),
              type: 'error'
            });
          })
          .catch(err => console.log(err));
      }
    }
  }
</script>
