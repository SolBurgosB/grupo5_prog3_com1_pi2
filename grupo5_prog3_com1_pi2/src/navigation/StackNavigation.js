import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import HomeMenu from "../components/HomeMenu";

const Stack = createNativeStackNavigator()

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeMenu"
        component={HomeMenu}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}