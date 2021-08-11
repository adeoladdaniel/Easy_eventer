<template>
    <section id="card-payment-success-modal" :class="{show : show}">
        <div class="card-wrapper">
            <div class="close"><img src="~/assets/icons/pay-close.svg" alt="" style="display: none"></div>

            <div class="success">
                <div class="image">
                    <img src="~/assets/icons/circle-success-icon.svg">
                </div>
                
                <h3>Your event has been published! </h3>
                
                <p>Web address <br> <b>https://easyevent.com/event/1029202inbccbj8</b></p>

                <a href="" class="save-card"> Loading your website </a>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        props: ['show']
    }
</script>
