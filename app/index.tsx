import { router } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth } from '../FirebaseConfig';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        if (!email.trim() || !password.trim()) {
            alert('Preencha e-mail e senha.');
            return;
        }
        setLoading(true);
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            if (user) router.replace('/(tabs)/home');
        } catch (error: any) {
            alert('Falha ao logar: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        if (!email.trim() || !password.trim()) {
            alert('Preencha e-mail e senha.');
            return;
        }
        setLoading(true);
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            if (user) router.replace('/(tabs)/home');
        } catch (error: any) {
            alert('Falha ao criar conta: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.card}>
                    <Text style={styles.logo}>📋</Text>
                    <Text style={styles.title}>Minhas Tarefas</Text>
                    <Text style={styles.subtitle}>Entre ou crie uma conta</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        placeholderTextColor="#8a9bae"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor="#8a9bae"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={[styles.btn, styles.btnPrimary, loading && styles.btnDisabled]}
                        onPress={signIn}
                        disabled={loading}
                    >
                        <Text style={styles.btnText}>{loading ? 'Entrando…' : 'Entrar'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn, styles.btnSecondary, loading && styles.btnDisabled]}
                        onPress={signUp}
                        disabled={loading}
                    >
                        <Text style={[styles.btnText, styles.btnTextSecondary]}>
                            {loading ? '…' : 'Criar conta'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#121c2e' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    card: {
        width: '100%',
        maxWidth: 380,
        backgroundColor: '#1a2840',
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    logo: { fontSize: 48, marginBottom: 8 },
    title: { fontSize: 26, fontWeight: '700', color: '#e8eaf6', marginBottom: 4 },
    subtitle: { fontSize: 14, color: '#8a9bae', marginBottom: 28 },
    input: {
        width: '100%',
        backgroundColor: '#0d1b2a',
        borderColor: '#2d4a6e',
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical: 14,
        fontSize: 16,
        color: '#e8eaf6',
        marginBottom: 14,
    },
    btn: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 6,
    },
    btnPrimary: { backgroundColor: '#3d5afe' },
    btnSecondary: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#3d5afe' },
    btnDisabled: { opacity: 0.5 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    btnTextSecondary: { color: '#a1a6ed' },
});
