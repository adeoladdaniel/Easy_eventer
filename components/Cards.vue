<template>
    <div>
        <div class="card_section">
            

                    <!-- -->

                    <div class="event_card_d">
                        <img src="~assets/icons/Bitmap.svg"/> 
                        <h3>Easy Event Opening <br> Launch party</h3>
                        <br/>
                        <p>The basic of the legendary language</p>
                        <br>
                        <p class="date"> Fri, Apr 3, 8:30 AM</p>
                        <div class="tag">
                            Free
                        </div>
                        <img class="lover" src="~assets/icons/lover.svg"/> 

                    </div>
                      <div class="event_card_d">
                        <img src="~assets/icons/Bitmap.svg"/> 
                        <h3>Easy Event Opening <br> Launch party</h3>
                        <br/>
                        <p>The basic of the legendary language</p>
                        <br>
                        <p class="date"> Fri, Apr 3, 8:30 AM</p>
                        <div class="tag">
                            Free
                        </div>
                        <img class="lover" src="~assets/icons/lover.svg"/> 

                    </div>
                      <div class="event_card_d">
                        <img src="~assets/icons/Bitmap.svg"/> 
                        <h3>Easy Event Opening <br> Launch party</h3>
                        <br/>
                        <p>The basic of the legendary language</p>
                        <br>
                        <p class="date"> Fri, Apr 3, 8:30 AM</p>
                        <div class="tag">
                            Free
                        </div>
                        <img class="lover" src="~assets/icons/lover.svg"/> 

                    </div>
                      <div class="event_card_d">
                        <img src="~assets/icons/Bitmap.svg"/> 
                        <h3>Easy Event Opening <br> Launch party</h3>
                        <br/>
                        <p>The basic of the legendary language</p>
                        <br>
                        <p class="date"> Fri, Apr 3, 8:30 AM</p>
                        <div class="tag">
                            Free
                        </div>
                        <img class="lover" src="~assets/icons/lover.svg"/> 

                    </div>
        
      

    
        </div>
    </div>
</template>



<style lang="scss" >


.event_card_d{
    padding: 1rem 1rem 0rem 1rem;
    background: white;
    height: 20rem;
    border-radius: 5px;
    box-shadow: #c7c7c7 0px -1px 16px -2px;
    img:first-child{
        padding-bottom: 1rem;
    }

    p{
        font-size: 12px;
    }
}

.card_section{

        display: flex;
    justify-content: space-evenly;
    padding-top: 4rem;
}


.date{
    color:red;
    font-size: 10px;
}
.tag{
        position: relative;
    bottom: 17.5rem;
    background: red;
    width: 3rem;
    color: white;
    left: 1rem;
    text-align: center;
    padding: 3rem 0rem 0rem 0rem;
}
.lover{
        position: relative;
    bottom: 24.3rem;
    color: white;
    left: 13.5rem;
    text-align: center;
    width: 11%;
    padding: 3rem 0rem 0rem 0rem;
}


@media screen and (max-width: 600px) {
.card_section{

    display: grid;
    justify-content: stretch;
    padding-top: 7rem;
    grid-gap:30px;
}

.logo {
    width: 86%;
    padding: 0rem;
}

.card{
height: 100% !important;

.tag{
    bottom: 26.3rem;
}

   img{
       width: 100%;
   }

p{
    padding: 1rem;

}
span{
    padding: 1rem;
}

padding: 0rem;
}



.landing_img {
display: none;
}

.loc_icon{
    display: none;
}
.loc_icon_i{
    display: none;
}
.search_but{
    display: none;
}

.location_input{
    display: none;
}
.path{
    display: none;
}
.search-box{
    margin: 4rem 0rem 2rem 3rem !important;
    padding: 2rem 0rem 2rem 5rem !important;
}

.header{
     h1 {
    padding: 19rem 1rem 1rem 3rem !important;
    font-weight: bold;
    font-size: 3rem; 
}
p {
    padding: 1rem 1rem 1rem 3rem !important;
}


}
}
</style>