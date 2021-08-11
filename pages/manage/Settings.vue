<template>
  <section id="settings-page">

    <div class="intro container">
      <h1 class="title">Set up your account</h1>
      <p>Welcome to your account settings and customization</p>
    </div>

    <nav class="tabs">
      <div class="wrapper">
          <span class="tab-item active ">
          <span class="img-holder">
            <img src="~/assets/icons/manage/account.svg">
          </span>
          <span>Account</span>
        </span>

        <span class="tab-item ">
          <span class="img-holder">
            <img src="~/assets/icons/manage/profile.svg">
          </span>
          <span>Profile</span>
        </span>
      </div>
    </nav>

    <section v-if="1 === 1" class="account">
      <div class="sub">
        <p>You are on the BASIC ACCOUNT</p>
        <p>Please upgrade to enjoy more features and customizations</p>
        <Alert>Get a discount whenever you pay with <b>easy</b>pay</Alert>
      </div>

      <div class="packages container">
        <div class="package active">
          <p class="ratings"><img src="~/assets/icons/manage/star.svg" alt=""></p>
          <div class="type">
            <p>Basic Plan</p>
            <p class="price">Free</p>
          </div>
          <ul class="list">
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
          </ul>
          <a href="#" class="btn-proceed">Active</a>
        </div>

        <div class="package">
          <p class="ratings">
            <img src="~/assets/icons/manage/star.svg" alt="">
            <img src="~/assets/icons/manage/star.svg" alt="">
          </p>
          <div class="type">
            <p>Classic Plan</p>
            <p class="price">$100 / year</p>
          </div>
          <ul class="list">
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
          </ul>
          <a href="#" class="btn-proceed">Get Started</a>
        </div>
        <div class="package">
          <p class="ratings">
            <img src="~/assets/icons/manage/star.svg" alt="">
            <img src="~/assets/icons/manage/star.svg" alt="">
            <img src="~/assets/icons/manage/star.svg" alt="">
          </p>
          <div class="type">
            <p>Premium Plan</p>
            <p class="price">$200 / year</p>
          </div>
          <ul class="list">
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
            <li>Lorem ipsum dolor.</li>
          </ul>
          <a href="#" class="btn-proceed">Get Started</a>
        </div>
      </div>
    </section>

    <section v-else class="profile container">
      <div class="tabs">
        <span class="tab">Personal details </span>
        <span class="tab  ">Credentials </span>
        <span class="tab active">Billing</span>
      </div>

      <div class="wrapper">

        <div v-if="1 === 2" class="personal">
          <div class="form">
            <div class="form-group">
              <span class="label">Upload your logo</span>
              <input type="text" placeholder="1028 1909 2938 3893">
            </div>
            <div class="form-group">
              <span class="label">Organiser name</span>
              <input type="text">
            </div>
            <div class="form-group">
              <span class="label">Facebook account url</span>
              <input type="text" placeholder="/">
            </div>
            <div class="form-group">
              <span class="label">Twitter account url</span>
              <input type="text">
            </div>
            <div class="form-group">
              <span class="label">About organizer</span>
              <textarea rows="5"></textarea>
            </div>
            <div class="privacy">
              <p class="warning"> Read terms of ticket sales and additional info</p>
              <p>By proceeding, you agree to our <a href="#"> terms and conditions</a>, and acknowledge that i have read
                the
                <a href="#">privacy policy</a></p>
            </div>
            <a href="#" class="btn-proceed"> Update my account </a>
          </div>
        </div>

        <div v-if="1 === 2" class="credentials">
          <div class="form">
            <div class="form-group">
              <span class="label">Easy Account Email</span>
              <input type="text">
            </div>
            <div class="form-group">
              <span class="label">Current password</span>
              <input type="text">
            </div>
            <div class="form-group">
              <span class="label">New Password</span>
              <input type="text">
            </div>
            <div class="form-group">
              <span class="label">Confirm New Password</span>
              <input type="text">
            </div>

            <div class="privacy">
              <p class="warning"> Read terms of ticket sales and additional info</p>
              <p>By proceeding, you agree to our <a href="#"> terms and conditions</a>, and acknowledge that i have read
                the
                <a href="#">privacy policy</a></p>
            </div>
            <a href="#" class="btn-proceed"> Update my account </a>
          </div>
        </div>

        <div v-if="1 === 1" class="billing">
          <div class="info">
            <p>Please note we charge for the following </p>
            <ul>
              <li><span>QRCODE SCANNER APP </span></li>
              <li><span>ACCOUNT UPGRADE</span></li>
            </ul>
          </div>
          <div class="form">
            <div class="form-group">
              <span class="label">Credit or Debit Number</span>
              <input type="text" placeholder="1028 1909 2938 3893">
            </div>
            <div class="form-group">
              <span class="label">Billing Address</span>
              <input type="text">
            </div>
            <div class="form-group">
              <span class="label">Exp. Date</span>
              <input type="text" placeholder="/">
            </div>
            <div class="form-group">
              <span class="label">CCV</span>
              <input type="text">
            </div>
            <div class="privacy">
              <p class="warning"> Read terms of ticket sales and additional info</p>
              <p>By proceeding, you agree to our <a href="#"> terms and conditions</a>, and acknowledge that i have read
                the
                <a href="#">privacy policy</a></p>
            </div>
            <a href="#" class="btn-proceed"> Update my Card </a>
          </div>
        </div>


      </div>

    </section>

  </section>
</template>

<script>
  import Alert from '~/components/manage/base/alert'
  export default {
    name: "Settings",
    layout: 'Manage',
    components:{
      Alert
    }
  }
</script>

<style scoped>

</style>
