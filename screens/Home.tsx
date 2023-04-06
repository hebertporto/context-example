import { useUserSettings } from "@app/context/UserSettings/UserSettingsContext";

const HomeScreen = () => {
  const user = useUserSettings();
  return (
    <View>
      <Text>Home</Text>
      <Text>{user.state.unitSystem}</Text>
    </View>
  );
};

export { HomeScreen };
