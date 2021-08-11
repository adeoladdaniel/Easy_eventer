<template>
    <section id="card-payment-success-modal" :class="{show: show}">
        <div class="card-wrapper">
            <div class="close"><img  @click="$emit('close-success')" src="~/assets/icons/pay-close.svg" alt=""></div>

            <div class="success">
                <div class="image">
                    <img src="~/assets/icons/success-icon.svg">
                </div>
                
                <h3>Your ticket is processed succesfully!</h3>

                <p v-if="ticket">Amount <br> <b> {{ ticket.price !==0 ? 'NGN' + ticket.price : 'FREE'}}</b></p>

                <nuxt-link v-if="isAuth" :to="ticketURL" class="save-card"> View ticket </nuxt-link>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props: ['show', 'ticket'],
        computed:{
            isAuth(){
                return this.$store.getters.isAuthenticated
            },
            ticketURL(){
                return this.ticket ? `/manage/tickets?ticket=${this.ticket._id}` : '';
            }
        }
    }
</script>
