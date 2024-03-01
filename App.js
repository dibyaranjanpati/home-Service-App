import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LogIn from "./App/Screens/LogInScreen/LogIn";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import TabNavigation from "./App/Navigation/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey="pk_test_cmVndWxhci1kdWNrLTE4LmNsZXJrLmFjY291bnRzLmRldiQ"
    >
      <View style={styles.container}>
        {/* signin component */}
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        {/* signOut components */}
        <SignedOut>
          <LogIn />
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 25,
  },
});
