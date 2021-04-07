// Components
import MainMap from "views/MainMap";
import Itinerary from "views/Itinerary";
import UserProfile from "views/Profile/UserProfile";
import ReviewList from "views/Profile/ReviewList";
import TripHistory from "views/TripHistory";
import Routes from "views/Routes";
import TripSummary from "views/TripSummary";
// Styling
import { Place, Timeline, Map, DateRange } from "@material-ui/icons";

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
    icon: DateRange,
    component: Itinerary,
    layout: "/",
  },
  {
    path: "routes",
    name: "Routes",
    icon: Timeline,
    component: Routes,
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
    path: "history/trips/:tripId",
    name: "Trip Summary",
    component: TripSummary,
    layout: "/",
    redirect: true,
  },
  {
    path: "profile",
    name: "Profile",
    component: UserProfile,
    layout: "/",
    redirect: true,
  },
  {
    path: "trips-history",
    name: "Trips",
    component: TripHistory,
    layout: "/",
    redirect: true,
  },
  {
    path: "reviews",
    name: "Reviews",
    component: ReviewList,
    layout: "/",
    redirect: true,
  },
];
export default routes;
