import { createStackNavigator, createAppContainer } from "react-navigation";
// import AddACard from "./src/components/UI/AddACard";
import Training from "./src/components/UI/Training";
import AddACard from "./src/components/UI/AddACard";
import Deck from "./src/components/UI/Deck";

const AppNavigator = createStackNavigator({
  AddACard: {
    screen: AddACard
  },
  Training :{
      screen:Training
  },
  Deck:{
    screen:Deck
  }
});

const Router=createAppContainer(AppNavigator)
export default Router;