// Components
import MainMap from "views/MainMap";
import Itinerary from "views/Itinerary";
import Profile from "views/Profile";
import ProfileEdit from "views/Profile/ProfileEdit";
import TripHistory from "views/TripHistory";
import TripSummary from "views/TripSummary";
// Styling
import { Place, Timeline, GridOn, Map } from "@material-ui/icons";

const routes = [
  {
    path: "explore",
    name: "Explore",
    icon: Place,
    component: MainMap,
    layout: "/",
  },
  {
    path: "itinerary",
    name: "Itinerary",
    icon: GridOn,
    component: Itinerary,
    layout: "/",
  },
  {
    path: "summary",
    name: "Summary",
    icon: Map,
    component: TripSummary,
    layout: "/",
  },
  {
    path: "profile/edit",
    name: "Edit Profile",
    component: ProfileEdit,
    layout: "/",
    redirect: true,
  },
  {
    path: "profile",
    name: "Profile",
    component: Profile,
    layout: "/",
    redirect: true,
  },
  {
    path: "history/trips/:tripId",
    name: "Trip Summary",
    component: TripSummary,
    layout: "/",
    redirect: true,
  },
  {
    path: "history",
    name: "Trips History",
    component: TripHistory,
    layout: "/",
    redirect: true,
  },
];
export default routes;
