import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { db } from '../FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

type Props = {
    data: { label: string; value: string }[];
    /** Firestore document path like "settings/SelectedColor" */
    docPath: string;
    onChoose?: () => void;
};

/**
 * Dropdown que persiste o valor escolhido no Firestore.
 * Substitui o DropdownComponent original que usava SQLite.
 */
export default function DropdownFirestore({ data, docPath, onChoose }: Props) {
    const [value, setValue] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);

    const saveToFirestore = async (val: string) => {
        try {
            const [col, docId] = docPath.split('/');
            await setDoc(doc(db, col, docId), { value: val }, { merge: true });
        } catch (e) {
            console.error('Erro ao salvar cor no Firestore:', e);
        }
    };

    return (
        <View style={styles.container}>
            {(value || isFocus) && (
                <Text style={[styles.label, isFocus && { color: '#a1a6ed' }]}>
                    Cor de fundo
                </Text>
            )}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#a1a6ed' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Selecione uma cor' : '…'}
                searchPlaceholder="Buscar cor"
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                    saveToFirestore(item.value);
                    if (onChoose) onChoose();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#1a2840', padding: 16, borderRadius: 12 },
    label: {
        position: 'absolute',
        backgroundColor: '#1a2840',
        left: 22,
        top: 6,
        zIndex: 999,
        paddingHorizontal: 6,
        fontSize: 12,
        color: '#8a9bae',
    },
    dropdown: {
        height: 52,
        borderColor: '#2d4a6e',
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: '#0d1b2a',
    },
    placeholderStyle: { fontSize: 16, color: '#5a6a7e' },
    selectedTextStyle: { fontSize: 16, color: '#e8eaf6' },
    iconStyle: { width: 20, height: 20, tintColor: '#a1a6ed' },
    inputSearchStyle: { height: 40, fontSize: 15, color: '#e8eaf6', backgroundColor: '#0d1b2a' },
});
