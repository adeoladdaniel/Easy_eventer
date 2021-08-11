<template>
       <section id="card-payment-modal" :class="{show: show}">
            <div class="card-wrapper">
                <div class="close"><img @click="$emit('close-modal')" src="~/assets/icons/pay-close.svg" alt=""></div>
                <div class="payment">
                    <h2 class="title">{{event.event_name}}</h2>
                    <p class="sub">{{event.start_date | moment("dddd, MMMM Do YYYY")}}</p>
                
                    <div class="card" v-if="ticket ? ticket.price !== 0 : null">
                        <div class="tabs">
                            <div class="tab active"><img src="~assets/icons/cards.svg" alt=""></div>
                            <div class="tab"><span>easypay</span></div>
                        </div>
                    
                        <div class="details">
                            <small v-if="error">Transaction failed! Please try again. </small>
                            <div class="form-group">
                                <span class="label">Card number</span>
                                <div class="input">
                                    <div class="card-icon">
                                        <img src="~assets/icons/card-icon.svg" alt="">
                                    </div>
                                    <input type="text" placeholder="0200 xxxx xxxxx" v-model="card.cardno">
                                    <div class="card-type">
                                
                                    </div>
                                </div>
                            </div>
                        
                            <div class="bottom">
                                <div class="form-group">
                                    <span class="label">Expiry Date</span>
                                    <div class="input">
                                        <div class="card-icon">
                                            <img src="~assets/icons/ex-icon.svg" alt="">
                                        </div>
                                        <input type="text" placeholder="10/24" v-model="formatExpiry">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <span class="label">CVV</span>
                                    <div class="input">
                                        <div class="card-icon">
                                            <img src="~assets/icons/card-lock.svg" alt="">
                                        </div>
                                        <input type="text" placeholder="302" v-model="card.cvv">
                                    </div>
                                </div>
                            </div>
                        
                            <div class="form-group"  v-if="hasPin">
                                <span class="label">Pin</span>
                                <div class="input">
                                    <input type="password" v-model="pin" >
                                </div>
                            </div>
                        
                            <div class="form-group"  v-if="hasOTP">
                                <span class="label">OTP</span>
                                <div class="input">
                                    <input type="text" v-model="OTP">
                                </div>
                            </div>
                        
                        
                            <!--Buttons-->
                        
                            <div class="pay">
                                <div class="icon"><img src="~assets/icons/lock.svg" alt=""></div>
                                <span v-if="stage == 1" @click="processPayment">PAY NGN {{ ticket ? ticket.price : null}} </span>
                                <span v-else-if="stage == 2"  @click="processPinPayment">Proceed</span>
                                <span v-else @click="processOTP">Confirm</span>
                            </div>
                        </div>
                    </div>
                
                    <!--For free tickets-->
                    <div v-else class="card free">
                        <p class="desc">{{event.about_event}}</p>
                        <div class="pay">
                            <span @click="getTicket">Get ticket</span>
                        </div>
                    </div>
                    <div class="footer">
                        <p>Secure checkout with <b>easypay</b></p>
                    </div>
                </div>
            </div>
        </section>
</template>
<script>
    import axios from 'axios';

    export default {
        props: ['show', 'event', 'user', 'error', 'ticket'],
        data() {
            return {
                stage: 1,
                suggested_auth: '',
                formatExpiry: '',
                flwRef: '',
                pin: '',
                hasPin: false,
                OTP: '',
                hasOTP: false,
                card: {
                    cardno: '',
                    cvv: '',
                    expirymonth: '',
                    expiryyear: '',
                    amount: 5,
                }
            }
        },
        watch: {
            formatExpiry: function (expiry) {
                let expiryDate = expiry.split('/');
                this.card.expirymonth = expiryDate[0];
                this.card.expiryyear = expiryDate[1];
            },
        },
        methods: {
            //for free tickets
            getTicket(){
                //return development or production
                //return window.location = `http://localhost:3000/event/${this.event._id}?status=successful&ticket_id=${this.ticket._id}`
                return window.location = `https://easyevent.live/event/${this.event._id}?status=successful&ticket_id=${this.ticket._id}`
            },
            processPayment() {
                axios.post('https://geteasypayng.com/api/v1/card/chargeCardWeb', {
                    ...this.card,
                    email: 'chuks@ncktech.com',
                    phonenumber: this.user.phone,
                    firstname: this.user.fname,
                    lastname: this.user.lname,
                    user: this.user.id,
                    event_id: this.event._id,
                    ticket_id: this.ticket._id,
                })
                    .then(res => {
                        //return console.log(res.data.data.authurl);

                        const status = res.data.status;
                        const message = res.data.message;
                        const authURL = res.data.data.authurl;


                        //return console.log(status + " " + message + " " + authURL);

                        //if the card requires external verification
                        if(status === "success" && message === "V-COMP"){
                            return window.location = authURL;
                        }

                        //if the card requires internal verification
                        if(status === "success" && message === "AUTH_SUGGESTION"){
                             this.suggested_auth = res.data.data.suggested_auth;
                             this.stage = 2;
                             //console.log(res);
                             return this.hasPin = true;
                        }
                    })
                    .catch(err => console.log(err));
            },
            //process pin
            processPinPayment(){
                axios.post('https://geteasypayng.com/api/v1/card/chargeCardWeb', {
                    ...this.card,
                    email: 'chuks@ncktech.com',
                    phonenumber: this.user.phone,
                    firstname: this.user.fname,
                    lastname: this.user.lname,
                    user: this.user.id,
                    event_id: this.event._id,
                    ticket_id: this.ticket._id,
                    suggested_auth: this.suggested_auth,
                    pin: this.pin
                })
                    .then(res => {
                        //console.log(res);
                        this.stage = 3;
                        this.hasOTP = true;
                        this.flwRef = res.data.data.flwRef;
                    })
                    .catch(err => console.log(err))
            },

            //process OTP
            processOTP(){
                axios.post('https://geteasypayng.com/api/v1/card/tryResponse', {
                    otp: this.OTP,
                    transaction_reference: this.flwRef
                })
                    .then(res => {
                        const status = res.data.message.status;
                        const message = res.data.message.vbvrespmessage;

                        //console.log(status + " " + message);

                        //console.log(this.event);

                        if(status === "failed"){
                            //return this.$router.push(`/event/${this.event._id}?status=failed&message=${message}`)
                            return window.location = `https://easyevent.live/event/${this.event._id}?status=failed&message=${message}`
                        }

                        if(status === "successful"){
                            return window.location = `https://easyevent.live/event/${this.event._id}?status=successful`
                        }
                    })
                    .catch(err => console.log(err))
            }
        }
    }
</script>
