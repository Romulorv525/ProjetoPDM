import Button from "@/Components/Button";
import DropdownFirestore from "@/Components/DropdownFirestore";
import ModalMenu from "@/Components/ModalMenu";
import { StyleSheet, View } from "react-native";
import ImageViewer from "../../Components/ImageViewer";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { db } from "../../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const placeholderImage = require("../../assets/images/icon.png");

const colorOptions = [
    { label: 'Rosa', value: '#edb8d4' },
    { label: 'Azul', value: '#a5c9f4' },
    { label: 'Verde', value: '#d1fcd8' },
    { label: 'Branco', value: '#fffeff' },
    { label: 'Cinza', value: '#c8c8c8' },
];

export default function HomeScreen() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const backgroundColor = useSharedValue("#a5c9f4");

    const animatedStyles = useAnimatedStyle(() => ({
        backgroundColor: withTiming(backgroundColor.value, { duration: 400 }),
    }));

    const loadColor = async () => {
        try {
            const snap = await getDoc(doc(db, 'settings', 'SelectedColor'));
            if (snap.exists()) {
                backgroundColor.value = snap.data().value;
            }
        } catch (e) {
            console.log('Erro ao ler cor:', e);
        }
    };

    useEffect(() => {
        loadColor();
    }, []);

    const pickImageAsync = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert("Você não selecionou nenhuma imagem :(");
        }
    };

    return (
        <Animated.View style={[styles.container, animatedStyles]}>
            <Animated.View style={[styles.imageContainer, animatedStyles]}>
                <ImageViewer imgSource={selectedImage || placeholderImage} />
            </Animated.View>
            <View style={styles.footerContainer}>
                <Button onPress={pickImageAsync} label="Escolha uma foto" theme="primary" />
                <Button onPress={() => setIsModalVisible(true)} label="Alterar cor de fundo" />
            </View>
            <ModalMenu isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
                <View style={styles.dropdownWrapper}>
                    <DropdownFirestore
                        data={colorOptions}
                        docPath="settings/SelectedColor"
                        onChoose={loadColor}
                    />
                </View>
            </ModalMenu>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    imageContainer: { flex: 1, justifyContent: "center", alignItems: "center", width: "100%" },
    footerContainer: { flex: 1 / 3, alignItems: "center", gap: 10 },
    dropdownWrapper: { padding: 20 },
});
