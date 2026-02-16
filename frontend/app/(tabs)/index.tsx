import { UseAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  const router = useRouter();
  useEffect(() => {
    console.log("Hello");
  });

  // const { userRole } = UseAuth();
  const { authState } = UseAuth();

  return (
    <>
      <SafeAreaView>
        <View>
          {/* <Text>Hello {userRole === "owner" ? `owner` : "user"}</Text> */}
          <Text>Hello {authState === "guest" ? `guest` : "user"}</Text>

          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text>Login page</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text>Signup page</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
