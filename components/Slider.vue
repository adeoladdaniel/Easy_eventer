<template>
    <div class="slider">
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: ["../assets/images/campaign.jpg", "../assets/images/slim.jpg", "../assets/images/girl2.jpg", "../assets/images/man2.jpg"],
            current: 0,
        }
    }
}
</script>
