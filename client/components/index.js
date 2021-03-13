/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {Login} from './user/login'
export {Signup} from './user/signup'
export {default as Navbar} from './navbar'
export {default as Home} from './rooms/home'
export {default as EditProfile} from './user/edit-profile'
export {default as UserProfile} from './user/profile'
export {default as Search} from './rooms/search'
export {default as Settings} from './user/settings'
export {default as MyRooms} from './user/myrooms'
export {default as Room} from './rooms/room'
export {default as NewRoom} from './rooms/newroom'
export {default as CreateVideoRoom} from './rooms/createvideoroom'
export {default as VideoRoom} from './rooms/videoroom'
