import { ActivityIndicator, Text, View } from "react-native";
import styles from "./styles";

export default function LoadingScreen() {
    return (
        <View style={styles.containerCenter}>
            <ActivityIndicator size="large" color="#4ECDC4" />
            <Text style={styles.text}>Carregando...</Text>
        </View>
    );
}
