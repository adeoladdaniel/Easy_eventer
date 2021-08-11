<template>
  <section id="signup-page">
    <transition name="fade">
      <Loader v-if="processing"></Loader>
    </transition>
    <form @submit.prevent="signIn">
      <div class="content">
        <h1 class="title">Welcome Back!</h1>
        <h3 class="sub">Enter your email and password let's begin!</h3>
    
          <transition name="show" enter-active-class="shake" leave-active-class="fade">
              <div class="error" v-if="error">{{error_message}}</div>
          </transition>
          
        <div class="form-wrapper">
          <div class="form-group">
              <span :class="{'error-shown': !$v.user.email.email}" class="label">Please enter a valid email</span>
              <input type="text" class="sec" placeholder="Email Address" v-model="user.email">
          </div>
          <div class="form-group password">
            <input :type="passwordType" class="sec" placeholder="Enter your password"
                   v-model="user.password">
            <div class="holder">
              <img src="~assets/icons/eye.svg" @click="showPassword">
            </div>
          </div>
          <div class="forgot">
           <span class="acct"> <nuxt-link to="/forgot">Forgot Password?</nuxt-link> </span>
          </div>
          <button @click.prevent="signIn" class="btn-sign-in"> Sign In</button>
          <span class="acct">Don't have an account? <nuxt-link to="/signup">SIGN UP</nuxt-link>  </span>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
    import Loader from '~/components/MainLoader';
    import {required, email} from 'vuelidate/lib/validators';

    export default {
        middleware: 'guest',
        components: {
            Loader
        },
        validations: {
            user: {
                email:{
                    required,
                    email
                }
            }
        },
        data() {
            return {
                passwordType: 'password',
                error: false,
                error_message: '',
                processing: false,
                user: {
                    email: null,
                    password: null,
                },
            };
        },
        methods: {
            showPassword() {
                this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
            },
            signIn() {
                this.$v.$touch();
                if(this.$v.$invalid){
                    this.error = true;
                    this.error_message = "Kindly review the form for proper values"
                } else {
                    this.error = false;
                    this.processing = true;
                    const body = document.querySelector("body");
                    const html = document.querySelector("html");
        
                    body.classList.add('no-scroll');
                    html.classList.add('no-scroll');
                    
                    this.$axios.$post('/event/login', this.user)
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
                                //checks if user already checked out an event before login
                                if (localStorage.getItem('event_id')) {
                                    this.$router.push(`/event/${localStorage.getItem('event_id')}`);
                                    localStorage.removeItem('event_id');
                                } else {
                                    this.$router.push('/manage/tickets');
                                }
                            }, Math.floor((Math.random() * 4))) + "000";
                        })
                }
            }
        }
    };
</script>

<style scoped>
    small {
        color: red;
    }
    .form-group{
      margin-bottom: 1rem;
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