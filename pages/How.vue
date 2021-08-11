<template>
    <section id="how">
        <div class="hero">
            <div class="content">
                <h1 class="intro">The best live experiences for work, play and everything in-between</h1>
                <nuxt-link to="/manage/create" class="create">Get started</nuxt-link>
                <div class="hover bob">
                    <img src="~/assets/images/how-arrow-down.svg">
                </div>
            </div>
        </div>

        <div class="card container">
            <p>Host festival and conventions to pop-up
                dinners and photography classes, transform your
                vision into an experience people will love.
            </p>
        </div>

        <div class="get-started container">
            <div class="left">
                <h3>Create your event in 5 minutes.</h3>
                <p>Create a beautiful event page with built-in payment processing, data collection, and support.</p>
                <nuxt-link to="/manage/create" class="started">Create event</nuxt-link>
            </div>
            <div class="get-started-img">
                <img src="~/assets/images/get-started.svg">
            </div>
        </div>

        <div class="features container">

            <div class="feature">
                <div class="feature-img">
                    <img src="~/assets/images/organizers.svg" alt="">
                </div>
                <h4 class="intro"> Silk-Smooth experience</h4>
                <p class="sub">for Organizers and users</p>
            </div>
            <div class="feature">
                <div class="feature-img">
                    <img src="~/assets/images/payment.svg">
                </div>
                <h4 class="intro">Easy Payments and payment processing</h4>
                <p class="sub">allows event goers pay hitch-free online</p>
            </div>

            <div class="feature">
                <div class="feature-img">
                    <img src="~assets/images/free-tickets.svg" alt="">
                </div>
                <h4 class="intro">With us free is free</h4>
                <p class="sub">no hidden charges on free events</p>
            </div>

            
        </div>

        <div class="control">

        </div>

        <div class="elevate container">
            <h3> Elevate your brand </h3>

            <p>
                Promote your unique brand with beautifully designed
                pages that enable easy discovery and ticket purchasing.
            </p>
        </div>


        <div class="account container">
            <div class="image">
                <h3>create an account</h3>

                <p>Give your event goers a great experience with simple, secure checkout and rapid check-in through our
                    mobile apps and a full suite of on-site equipment, staffing, and logistics.
                </p>
            </div>
            <div class="setup-wrapper">
                <div class="setup">
                    <div class="img-wr">
                        <img src="~/assets/images/create.svg">
                    </div>
                    <span class="create"> Create an account </span>
                </div>

                <div class="setup right">
                    <span class="create"> search for events  </span>
                    <div class="img-wr">
                        <img src="~/assets/images/search.svg">
                    </div>

                </div>

                <div class="setup">
                    <div class="img-wr">
                        <img src="~/assets/images/register.svg">
                    </div>
                    <span class="create"> Register for events </span>
                </div>

                <div class="setup right">
                    <span class="create"> <span style="visibility: hidden">You can </span> Checkout </span>
                    <div class="img-wr">
                        <img src="~/assets/images/checkout.svg">
                    </div>
                </div>
            </div>
        </div>


        <div class="billing container">
            <h3>Billing and payment</h3>
            <p>drive up revenue, take advantage of our promotional tools
            </p>
        </div>

        <div class="bill-process">
            <div class="bill">
                <div class="bill-img">
                    <img src="~/assets/images/bill-search.svg">
                </div>
                <h4>Find events and register</h4>
                <p>find events near you</p>
            </div>
            <div class="bill">
                <div class="bill-img">
                    <img src="~/assets/images/bill-card.svg">
                </div>
                <h4>Select Payments methods</h4>
                <p>make payments for the event</p>
            </div>


            <div class="bill">
                <div class="bill-img">
                    <img src="~/assets/images/bill-qr.svg">
                </div>
                <h4>Make payments</h4>
                <p>enjoy discounts when you use easypay QR Sacn</p>
            </div>
        </div>

        <div class="why-wrapper container">
            <h3>Why use easyevent</h3>
            <ul style="margin-top: 15px" class="ul_list">
                <li>User friendly.</li>
                <li>Helps you manage your event on the go.</li>
                <li>No overly long fields to fill.</li>
                <li>Fast and easy payment processing.</li>
            </ul>
        </div>

        <div class="create-card container">
            <h3>Get started with easyevent</h3>
            <nuxt-link to="/manage/create" class="create">Create event</nuxt-link>
        </div>
    </section>
</template>

<script>
    import 'vue-moment';
    import Navbar from "~/components/Navbar";
    import Event from "~/components/Event";
    import {mapGetters} from 'vuex';

    export default {
        name: "home",
        components: {
            Navbar,
            Event
        },
        data() {
            return {
                showPriceFilter: false,
                showMPriceFilter: false,
                showCategories: false,
                caughtUp: false,
                showDate: false,
                selectedDate: null,
                categories: []
            }
        },
        asyncData({$axios}) {
            return $axios.$post(`/event/queryevent`, {
                page: 0,
                limit: 8
            })
                .then(res => {
                    return {
                        events: res.events,
                        totalEvents: res.total,
                        noOfEvents: res.pageSize,
                        page: res.page,
                        limit: res.pageSize
                    };
                })
                .catch(res => console.log(res))
        },
        computed: {
            isAuth() {
                return this.$store.getters.isAuthenticated
            }
        },
        methods: {
            seeMoreEvents() {
                this.page = this.page + 1;
                this.$axios.$post(`/event/queryevent`, {
                    page: this.page,
                    limit: this.limit
                })
                    .then(res => {
                        //console.log(res);
                        this.events.push(...res.events);

                        //checks if all events are exhausted
                        this.noOfEvents = this.noOfEvents + this.limit;
                        if (this.noOfEvents > this.totalEvents) {
                            this.caughtUp = true;
                        }
                    })
                    .catch(err => console.log(err))
            },
            selectDate(date) {
                this.selectedDate = date;
                this.showDate = false;
            },
            selectedCategory(id) {
                this.categories.map(category => {
                    category.id === id ? category.show = true : category.show = false
                });

                this.$axios.$get('/event/getEventByCategory/' + id)
                    .then(res => {
                        if (res.error === true) {
                            return console.log(res.error)
                        }

                        this.events = res.events;
                    })
                    .catch(err => console.log(err));
            },
        },
        //checks if event is all caught up!
        mounted() {
            if (this.totalEvents === this.limit) {
                this.caughtUp = true;
            }

            //get events category
            this.$axios.get('/category/getall')
                .then(({data}) => {
                    data.categories.map(category => {
                        return this.categories.push({
                            id: category._id,
                            name: category.category_name,
                            show: category.show
                        })
                    })
                })
                .catch(err => console.log(err));
        }
    };
</script>

<style lang="css">
@media screen and (max-width: 480px) {
  .ul_list {
    margin-left:80px;
  }
}
@media (min-width: 481px) and (max-width: 999px) {
     .ul_list {
         margin-left: 180px;
  }
}
@media screen and (min-width: 999px) {
  .ul_list {
    margin-left: 280px;
  }
}

</style>
