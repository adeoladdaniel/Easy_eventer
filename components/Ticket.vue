<template>
    <section id="ticket-modal" :class="{show:show}">
        <div class="card-wrapper">
            <div class="close"><img @click="$emit('close-ticket')" src="~/assets/icons/pay-close.svg" alt=""></div>
            <div class="ticket">
                <div class="top">
                    <div>
                    <div class="section">
                        <span class="label">Ticket Reference</span>
                        <h3>{{ticket ? ticket.ticket_reference : null}}</h3>
                    </div>
                    <div class="section">
                        <span class="label">Ticket Type</span>
                        <p>FREE</p>
                    </div>
                    </div>
                    <div class="action"><img src="~/assets/icons/download-icon.svg" alt=""></div>
                </div>
                <div class="bottom">
                    <div class="event-title">
                        <span class="label">Event Ticket</span>
                        <h2 class="title">
                            {{ ticket ? ticket.event_id.event_name: null}}
                        </h2>
                    </div>
                    <div class="description">
                        <span class="label">Description</span>
                        <p class="desc">
                            {{ticket ? ticket.event_id.about_event : null}}
                        </p>
                    </div>
                    <div class="full-name">
                        <span class="label">Full Name</span>
                        <h3>{{user ? user.fname + ' ' + user.lname : null}}</h3>
                    </div>
                    <div class="grid">
                        <div class="extra">
                            <div class="name">
                                <span class="label">Location</span>
                                <p>{{ticket ? ticket.event_id.location : null}}</p>
                            </div>
                            <div class="name">
                                <span class="label">Date</span>
                                <p>{{  ticket.event_id.start_date | moment("dddd, MMMM Do YYYY") }}</p>
                            </div>
                        </div>
                        <div class="barcode">
                            <qrcode v-if="ticket" :value="qrValue" tag="img"></qrcode>
                        </div>
                    </div>
                </div>
            </div>

            <div class="big-ticket" ref="ticket">
                    <div class="left">
                        <div class="form-group">
                            <span class="label">Full Name</span>
                            <h3>{{user.fname + ' ' + user.lname}}</h3>
                        </div>
                        <div class="form-group ref">
                            <span class="label">Ticket Reference</span>
                            <p>{{ticket ? ticket.ticket_reference : null}}</p>
                        </div>
                        <div class="form-group">
                            <span class="label">Ticket type</span>
                            <h3>free</h3>
                        </div>
                        <div class="barcode">
                            <qrcode v-if="ticket" :value="qrValue" tag="img" ></qrcode>
                        </div>
                    </div>
                    <div class="right">
                        <div class="form-group">
                            <span class="label">Event Ticket</span>
                            <h1>{{ ticket ? ticket.event_id.event_name : null}}</h1>
                        </div>

                        <div class="form-group">
                            <span class="label">Description</span>
                            <p class="desc">{{  ticket ? ticket.event_id.about_event : null}}
                            </p>
                        </div>
                        <div class="form-group name">
                            <span class="label">Full Name</span>
                            <h1 class="name">{{ user.fname + ' ' + user.lname }}</h1>
                        </div>
                        <div class="misc">
                            <div class="form-group">
                                <span class="label">Location</span>
                                <p>{{  ticket ? ticket.event_id.location : null }}</p>
                            </div>
                            <div class="form-group">
                                <span class="label">Date</span>
                                <p>{{  ticket.event_id.start_date | moment("dddd, MMMM Do YYYY") }}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </section>
</template>

<script>
    /*import jsPDF from 'jspdf';
    import html2canvas from 'html2canvas';*/
    
    export default {
        props: ['show', 'ticket', 'user'],
        computed: {
            qrValue(){
                return this.ticket ? this.ticket.event_id._id +"#"+ this.ticket._id : null;
            },
        },
        methods:{
            /*print(){
                //alert('printed')
                const doc = new jsPDF();
                html2canvas(document.querySelector('.big-ticket')).then(function(canvas) {
                    //document.body.appendChild(canvas);
                    //console.log(canvas);
                    doc.html(canvas, () =>{
                        doc.save('ticket.pdf');
                        //console.log('got here 2');
                    });
                });
    
               /!* const doc = new jsPDF();
                console.log('got here');
                html2canvas(document.querySelector('.big-ticket')).then((canvas) => {
                    doc.html(canvas,() =>{
                        doc.save('ticket.pdf');
                        console.log('got here 2');
                    });
                });
                console.log('got here 3');*!/
                
                
               /!*html2canvas($("#canvas"), {
                    onrendered: function(canvas) {
                        var imgData = canvas.toDataURL(
                            'image/png');
                        var doc = new jsPDF('p', 'mm');
                        doc.addImage(imgData, 'PNG', 10, 10);
                        doc.save('sample-file.pdf');
                    }
                });*!/
    
                /!*$('#cmd').click(function () {
                    var doc = new jsPDF();
                    doc.addHTML($('#content')[0], 15, 15, {
                        'background': '#fff',
                    }, function() {
                        doc.save('sample-file.pdf');
                    });
                });*!/
            }*/
        }
    }
</script>
