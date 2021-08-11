<template>
  <section id="signup-page">
    <transition name="fade">
      <Loader v-if="processing"></Loader>
    </transition>
    <form @submit.prevent="register">
      <div class="content">
        <h1 class="title">Create your free account!</h1>
        <h3 class="sub">One account for all easy services!</h3>
  
        <transition name="show" enter-active-class="shake" leave-active-class="fade">
          <div class="error" v-if="error">{{error_message}}</div>
        </transition>
        <div class="form-wrapper">
          <div class="form-group">
            <span :class="{'error-shown': !$v.fullName.minLength}" class="label">Full name please</span>
            <input type="text" class="sec" placeholder="Full Name" v-model="fullName" @blur="$v.fullName.$touch()">
          </div>
          
          <div class="form-group">
            <span :class="{'error-shown': !$v.email.email}" class="label">Please enter a valid email</span>
            <input type="text" class="sec" placeholder="Email" v-model="email">
          </div>
          <div class="form-group">
            <span :class="{'error-shown': !$v.phone.minLength}" class="label">Phone number must contain 11 digits</span>
            <input type="text" class="sec" placeholder="phone" v-model="phone">
          </div>
          <div class="form-group password">
            <input class="sec" placeholder="Enter your password" :type="passwordType" v-model="password">
            <div class="holder">
              <img src="~assets/icons/eye.svg" @click="showPassword">
            </div>
          </div>
          
          <!--<div class="form-group">
            <input type="text" class="sec" placeholder="Enter your password" v-model="user.c_password">
          </div>-->
          <div class="terms">
          <span>By proceeding, I agree to easyevent <a href="#">Terms of use</a> and
            acknowledge that I have read the <a href="#">Privacy Policy</a></span>
          </div>
          <button class="btn-sign-in" @click.prevent="register"> SIGN UP</button>
          <span class="acct">Don't have an account? <nuxt-link to="/login">SIGN IN</nuxt-link>  </span>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
    import Loader from '~/components/MainLoader';
    import axios from "axios";
    import {required, minLength, between, email} from 'vuelidate/lib/validators';

    export default {
        middleware: 'guest',
        components: {
            Loader
        },
        data() {
            return {
                passwordType: 'password',
                processing: false,
                error: false,
                error_message: 'Something went wrong.. Please try again later',
                fullName: '',
                fname: '',
                lname: '',
                email: '',
                phone: '',
                password: ''
            };
        },
        validations: {
            fullName: {
                required,
                minLength: minLength(4)
            },
            email: {
                required,
                email
            },
            phone: {
                required,
                minLength: minLength(11)
            },
            password: {
                required
            }
        },
        watch: {
            fullName(val) {
                let names = val.split(' ');
                this.fname = names[0];
                this.lname = names[names.length - 1]
            }
        },
        methods: {
            showPassword() {
                this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
            },
            register() {
                this.$v.$touch();
                //setTimeout(()=> this)
                if (this.$v.$invalid) {
                    this.error = true;
                    this.error_message = "Kindly review the form for errors"
                } else {
                    //return alert('all good');
                    this.error = false;
                    this.processing = true;

                    const body = document.querySelector("body");
                    const html = document.querySelector("html");


                    body.classList.add('no-scroll');
                    html.classList.add('no-scroll');

                    let formData = new FormData();
                    formData.append("fname", this.fname);
                    formData.append("lname", this.lname);
                    formData.append("email", this.email);
                    formData.append("phone", this.phone);
                    formData.append("password", this.password);
                    //return console.log(this.fname +' ' + this.lname + ' '+ this.email+ ' ' + this.phone + " "+ this.password);


                    axios.post('https://easydispatch.ng/api/v1/register_merchant', formData)
                        .then(() => {


                          //logs in with Ola's endpoint to initiate full user and liked events data
                          this.$axios.$post('/event/login', {email: this.email, password: this.password})
                            .then(res => {
                              if (res.user.error) {
                                //use a notification
                                //console.log(res.message);
                                this.error = true;
                                this.error_message = 'Invalid credentials';
                                this.user.password = null;
                                this.processing = false;
                                body.classList.remove('no-scroll');
                                html.classList.remove('no-scroll');
                                return;
                              }

                              setTimeout(() => {
                                this.$store.commit('SET_USER', res);
                                body.classList.remove('no-scroll');
                                html.classList.remove('no-scroll');
                                this.processing = false;
                                //checks if user already checked out an event before login
                                if (localStorage.getItem('event_id')) {
                                  this.$router.push(`/event/${localStorage.getItem('event_id')}`);
                                  localStorage.removeItem('event_id');
                                } else {
                                  this.$router.push('/manage/tickets');
                                  localStorage.removeItem('event_id');
                                }
                              }, Math.floor((Math.random() * 4))) + "000";
                            })


                            /*if (data.error) {
                                this.error = true;
                                this.error_message = data.message;
                                this.processing = false;
                                body.classList.remove('no-scroll');
                                html.classList.remove('no-scroll');
                            } else {
                                setTimeout(() => {
                                    this.processing = false;
                                  //to set the user with updated state from Ola
                                    this.$store.commit('SET_USER', {user: {...data}, likedEvent: []});
                                    body.classList.remove('no-scroll');
                                    html.classList.remove('no-scroll');
                                    //checks if user already checks out an event before signup
                                    if (localStorage.getItem('event_id')) {
                                        this.$router.push(`/event/${localStorage.getItem('event_id')}`);
                                        localStorage.removeItem('event_id');
                                    } else {
                                        this.$router.push('/manage/tickets');
                                    }
                                }, Math.floor((Math.random() * 3))) + "000";
                            }*/
                        })
                        .catch(err => {
                            this.error = true;
                            this.processing = false;
                            body.classList.remove('no-scroll');
                            html.classList.remove('no-scroll');
                            console.log(err)
                        });
                }
            },
        }
    };
</script>

<style scoped>
  small {
    color: red;
  }

  .error {
    color: red;
    text-align: center;
    font-size: .8rem;
    display: block;
    margin-bottom: .5rem;
  }

  .shake{
    animation: shake 0.3s both;
  }
  @keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  
    20%, 80% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
  
    40%, 100% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
  }

  .fade {
    animation: fade 0.2s both;
  }
  
  @keyframes fade {
    from {
      opacity: 1;
    }
  
    to {
      opacity: 0;
    }
  }


  .label {
    font-size: .8rem;
    color: red;
    opacity: 0;
    transition: opacity .3s ease;
  }
  
  span.label.error-shown {
    opacity: 1;
    transition: opacity .3s ease;
  }
</style>
