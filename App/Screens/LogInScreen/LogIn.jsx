import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Color from "../Utils/Color";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
WebBrowser.maybeCompleteAuthSession();

export default function LogIn() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("./../../../assets/images/login.png")}
        style={styles.logInImage}
      />
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 20,
            color: Color.WHITE,
            margin: 20,
            textAlign: "center",
          }}
        >
          Let's Find{" "}
          <Text style={{ fontWeight: "bold" }}>
            Professional Cleaning And Repair
          </Text>{" "}
          Service
        </Text>
        <Text style={{ fontSize: 15, color: Color.WHITE, textAlign: "center" }}>
          Best App to find services near you which deliver you a professional
          service
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logInImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Color.BLACK,
    borderRadius: 15,
  },
  subContainer: {
    width: "100%",
    height: "70%",
    backgroundColor: Color.PRIMERY,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
  },
  button: {
    padding: 15,
    backgroundColor: Color.WHITE,
    borderRadius: 99,
    marginTop: 30,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    color: Color.PRIMERY,
  },
});
