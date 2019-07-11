import { createStackNavigator, createAppContainer } from "react-navigation";
// import AddACard from "./src/components/UI/AddACard";
import Training from "./src/components/UI/Training";
import AddACard from "./src/components/UI/AddACard";

const AppNavigator = createStackNavigator({
  AddACard: {
    screen: AddACard
  },
  Training :{
      screen:Training
  }
});

const Router=createAppContainer(AppNavigator)
export default Router;