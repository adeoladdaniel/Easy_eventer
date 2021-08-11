export default function(context){
    //checks if owner of event is editing/updating the event
    console.log(context.store.getters.getUser.id);

    console.log(context.res);


    if(!context.store.getters.isAuthenticated){
        console.log('hello from validate');
        //context.redirect('/login');
    }
}