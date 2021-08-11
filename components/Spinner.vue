<template>
    <div class="lds-ripple">
        <div></div>
        <div></div>
    </div>
</template>

<style>
    .lds-ripple {
        display: flex;
        justify-content: center;
        align-content: center;
        position: relative;
        width: 30px;
        height: 30px;
    }
    .lds-ripple div {
        position: absolute;
        border: 4px solid #fff;
        opacity: 1;
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
        0% {
            opacity: 1;
        }
        100% {
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
    
    @media screen and (min-width: 992px)   {
        .lds-ripple{
            width: 50px;
            height: 50px;
        }
    }
</style>