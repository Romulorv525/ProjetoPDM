import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Ionicons name="information-circle" size={64} color="#a1a6ed" />
            <Text style={styles.title}>Sobre o App</Text>
            <Text style={styles.text}>
                Este aplicativo foi desenvolvido como projeto da disciplina de
                Desenvolvimento Mobile no IFSULDEMINAS.
            </Text>
            <Text style={styles.text}>
                Utiliza React Native com Expo, Firebase Authentication e Cloud
                Firestore para armazenamento em nuvem.
            </Text>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>React Native + Firebase 🔥</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d1b2a',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    title: {
        color: '#e8eaf6',
        fontSize: 24,
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 20,
    },
    text: {
        color: '#8a9bae',
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 14,
    },
    badge: {
        marginTop: 24,
        backgroundColor: '#1a2840',
        borderColor: '#3d5afe',
        borderWidth: 1.5,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    badgeText: { color: '#a1a6ed', fontWeight: '600', fontSize: 14 },
});
