export const state = () => ({
    event: null,
    events: []
});

export const getters = {
    //for getting the event that is being created
    isEditedEvent(state) {
        return state.event !== null;
    },

    getEvent(state) {
        return state.event
    },

    getEvents(state) {
        return state.events
    },

    isEventPublished(state){
        return event.publish === true
    }
};

export const mutations = {
    SET_EVENT(state, event) {
        state.event = event
    },
    SET_EVENTS(state, events) {
        state.events = events
    },
    CLEAR_EVENT(state) {
        state.event = null;
    },
    SET_EVENT_LOGO(state, icon) {
        state.event.event_icon = icon;
    },
    SET_EVENT_BG(state, bg) {
        state.event.background_image = bg;
    },
    SET_EVENT_PICTURE_1(state, pic) {
        state.event.picture_1 = pic;
    },
    SET_EVENT_PICTURE_2(state, pic) {
        state.event.picture_2 = pic;
    },
};

export const actions = {
    createEvent(context, newEvent) {
        return this.$axios.$post('/event/create', newEvent)
            .then(res => {
                context.commit('SET_EVENT', res.event);
                return res;
            })
            .catch(err => console.log(err))
    },
    updateEvent(context, event) {
        return this.$axios.$post(`/event/update/${event._id}`, event)
            .then()
            .catch(err => console.log(err))
    },
    publishEvent(context, eventID) {

    }
};