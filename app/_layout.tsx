import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack >
    <Stack.Screen name="index" options={{ title: "Smart Nutri" }}></Stack.Screen>
    <Stack.Screen name="dietDetail" options={{ title: "Dieta gerada" }}></Stack.Screen>
  </Stack>;
}
