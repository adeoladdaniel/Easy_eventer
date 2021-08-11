<template>
  <section id="signup-page">
    <transition name="fade">
      <Loader v-if="processing"></Loader>
    </transition>
    <form @submit.prevent="reset">
      <div class="content">
        <h1 class="title">Reset Password!</h1>
        <h3 class="sub">Enter your email to reset password!</h3>

        <transition name="show" enter-active-class="shake" leave-active-class="fade">
          <div class="error" v-if="error">{{error_message}}</div>
        </transition>

        <div class="form-wrapper">
          <div class="form-group">
            <span :class="{'error-shown': !$v.email}" class="label">Please enter a valid email</span>
            <input type="text" class="sec" placeholder="Email Address" v-model="email">
          </div>

          <button @click.prevent="reset" class="btn-sign-in">Send password reset email</button>
          <span class="acct">Have an account? <nuxt-link to="/login">Sign in</nuxt-link>  </span>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
  import Loader from '~/components/MainLoader';
  import {required, email} from 'vuelidate/lib/validators';
  import axios from 'axios';

  export default {
    middleware: 'guest',
    components: {
      Loader
    },
    validations: {
      email: {
        required,
        email
      }
    },
    data() {
      return {
        passwordType: 'password',
        error: false,
        error_message: '',
        processing: false,
        email: null,
      };
    },
    methods: {
      reset() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.error = true;
          this.error_message = "Please enter an email address"
        } else {
          this.error = false;
          this.processing = true;
          const body = document.querySelector("body");
          const html = document.querySelector("html");

          body.classList.add('no-scroll');
          html.classList.add('no-scroll');

          let formData = new FormData();
          formData.append("email", this.email);

          axios.post('https://easydispatch.ng/api/v1/forgot', formData)
            .then(res => {
              this.email = '';
              setTimeout(() => {
               this.processing = false;
                body.classList.remove('no-scroll');
                html.classList.remove('no-scroll');
                this.$toast.show('Successful! Check your mailbox for password reset link!',{
                  type: 'error'
                });
              }, Math.floor((Math.random() * 4))) + "000";
            })
            .catch(err => {
              this.processing = false;
              console.log('bad' + err)
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

  .form-group {
    margin-bottom: 1rem;
  }

  .error {
    color: red;
    text-align: center;
    font-size: .8rem;
    display: block;
    margin-bottom: .5rem;
  }

  .shake {
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