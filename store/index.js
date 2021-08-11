import cookie from 'js-cookie';

export const state = () => ({
  user: null,
  likedEvents: null
});

export const getters = {
  getUser(state){
    return state.user.user;
  },

  isLoadedLikedPost(state){
    if(state.likedEvents){
      return state.likedEvents.length >= 1;
    }
  },
  //to check if user is authenticated
  isAuthenticated(state){
    return state.user !== null;
  }
};

export const mutations = {
  SET_USER(state, user){
    this.state.user = user;
    cookie.set('user', user);
    //console.log(user);
  },

  UNSET_USER(state){
    cookie.remove('user');
    state.user = null;
  },

  SET_USER_LIKED(state, events){
    state.likedEvents = events
  }
};

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    //get the user each time the page is refreshed from cookie
    if(req.headers.cookie){
      const user = req.headers.cookie.split(';').find( key => key.trim().startsWith('user='));
      if(!user){
        return ;
      }
      //console.log(user);
      commit('SET_USER', JSON.parse(decodeURIComponent(user.split('=')[1])));
    }
  }
};