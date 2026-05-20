import Ionicons from "@expo/vector-icons/Ionicons";
import { getAuth } from "firebase/auth";
import { Tabs, router } from "expo-router";
import Button from "@/Components/Button";
import { app } from "../../FirebaseConfig";

export default function TabsLayout() {
  const auth = getAuth(app);

  // Redirect to login if user signs out
  auth.onAuthStateChanged((user) => {
    if (!user) router.replace('/');
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#a1a6ed",
        tabBarInactiveTintColor: "#5a6a7e",
        headerStyle: { backgroundColor: '#121c2e' },
        headerShadowVisible: false,
        headerTintColor: '#e8eaf6',
        tabBarStyle: {
          backgroundColor: '#121c2e',
          borderTopColor: '#1e2d42',
          borderTopWidth: 1,
        },
        headerRight: () => (
          <Button
            label="Sair"
            theme="red"
            onPress={() => auth.signOut()}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Página Inicial",
          tabBarLabel: "Início",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="firebase-to-do"
        options={{
          headerTitle: "Tarefas",
          tabBarLabel: "Tarefas",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          headerTitle: "Sobre",
          tabBarLabel: "Sobre",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />
      {/* Hide local-to-do from tab bar but keep routing */}
      <Tabs.Screen
        name="local-to-do"
        options={{ href: null }}
      />
      {/* Hide old index from tabs */}
      <Tabs.Screen
        name="index"
        options={{ href: null }}
      />
    </Tabs>
  );
}
