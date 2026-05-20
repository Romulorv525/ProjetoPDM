import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    label: string;
    theme?: "primary" | "green" | "red";
    onPress?: () => void;
}

export default function Button({ label, theme, onPress }: Props) {
    if (theme === "primary") {
        return (
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, styles.primaryButton]} onPress={onPress}>
                    <Ionicons name="image-outline" size={18} color="#fff" style={styles.buttonIcon} />
                    <Text style={[styles.buttonLabel, { color: "#fff" }]}>{label}</Text>
                </Pressable>
            </View>
        );
    }

    if (theme === "green") {
        return (
            <View style={styles.smallButtonContainer}>
                <Pressable style={[styles.button, styles.greenButton]} onPress={onPress}>
                    <Text style={[styles.buttonLabel, { color: "#fff" }]}>{label}</Text>
                </Pressable>
            </View>
        );
    }

    if (theme === "red") {
        return (
            <View style={styles.smallButtonContainer}>
                <Pressable style={[styles.button, styles.redButton]} onPress={onPress}>
                    <Text style={[styles.buttonLabel, { color: "#fff" }]}>{label}</Text>
                </Pressable>
            </View>
        );
    }

    // Default / secondary
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.defaultButton]} onPress={onPress}>
                <Text style={[styles.buttonLabel, { color: "#a1a6ed" }]}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 300,
        height: 54,
        alignItems: "center",
        justifyContent: "center",
    },
    smallButtonContainer: {
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        borderRadius: 12,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    primaryButton: { backgroundColor: "#3d5afe" },
    defaultButton: { backgroundColor: "transparent", borderWidth: 1.5, borderColor: "#3d5afe" },
    greenButton: { backgroundColor: "#2e7d52", paddingHorizontal: 16 },
    redButton: { backgroundColor: "#b71c1c", paddingHorizontal: 16 },
    buttonLabel: { fontSize: 15, fontWeight: "600" },
    buttonIcon: { paddingRight: 8 },
});
