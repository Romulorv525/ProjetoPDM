import Button from "@/Components/Button";
import { db } from "../../FirebaseConfig";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: number;
}

export default function FirebaseToDo() {
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, (snap) => {
            const data: Task[] = snap.docs.map((d) => ({
                id: d.id,
                ...(d.data() as Omit<Task, "id">),
            }));
            setTasks(data);
            setLoading(false);
        });
        return unsub;
    }, []);

    const addTask = async () => {
        if (!title.trim()) return;
        await addDoc(collection(db, "tasks"), {
            title: title.trim(),
            completed: false,
            createdAt: Date.now(),
        });
        setTitle("");
    };

    const toggleCompleted = async (task: Task) => {
        await updateDoc(doc(db, "tasks", task.id), { completed: !task.completed });
    };

    const deleteTask = async (id: string) => {
        await deleteDoc(doc(db, "tasks", id));
    };

    const saveEdit = async () => {
        if (!editingId || !editingText.trim()) return;
        await updateDoc(doc(db, "tasks", editingId), { title: editingText.trim() });
        setEditingId(null);
        setEditingText("");
    };

    const formatDate = (ts: number) => new Date(ts).toLocaleString("pt-BR");

    const completedCount = tasks.filter((t) => t.completed).length;

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#a1a6ed" />
                <Text style={styles.loadingText}>Carregando tarefas…</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            {/* Summary */}
            <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>
                    {completedCount}/{tasks.length} concluídas
                </Text>
            </View>

            {/* Input */}
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="Nova tarefa…"
                    placeholderTextColor="#5a6a7e"
                    value={title}
                    onChangeText={setTitle}
                    onSubmitEditing={addTask}
                    returnKeyType="done"
                />
                <TouchableOpacity style={styles.addBtn} onPress={addTask}>
                    <Ionicons name="add" size={26} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 32 }}
                renderItem={({ item }) => {
                    const isEditing = editingId === item.id;
                    return (
                        <View style={[styles.card, item.completed && styles.cardDone]}>
                            {isEditing ? (
                                <View>
                                    <TextInput
                                        value={editingText}
                                        onChangeText={setEditingText}
                                        style={styles.editInput}
                                        autoFocus
                                    />
                                    <View style={styles.actionRow}>
                                        <Button onPress={saveEdit} theme="green" label="Salvar" />
                                        <Button
                                            onPress={() => { setEditingId(null); setEditingText(""); }}
                                            theme="red"
                                            label="Cancelar"
                                        />
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.taskRow}>
                                    {/* Checkbox */}
                                    <TouchableOpacity
                                        style={[styles.checkbox, item.completed && styles.checkboxDone]}
                                        onPress={() => toggleCompleted(item)}
                                        activeOpacity={0.7}
                                    >
                                        {item.completed && (
                                            <Ionicons name="checkmark" size={16} color="#fff" />
                                        )}
                                    </TouchableOpacity>

                                    {/* Text */}
                                    <View style={styles.taskInfo}>
                                        <Text style={[styles.taskTitle, item.completed && styles.taskTitleDone]}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.taskDate}>{formatDate(item.createdAt)}</Text>
                                    </View>

                                    {/* Actions */}
                                    <View style={styles.iconActions}>
                                        <TouchableOpacity
                                            style={styles.iconBtn}
                                            onPress={() => { setEditingId(item.id); setEditingText(item.title); }}
                                        >
                                            <Ionicons name="pencil" size={18} color="#a1a6ed" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.iconBtn}
                                            onPress={() => deleteTask(item.id)}
                                        >
                                            <Ionicons name="trash" size={18} color="#f74d4d" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    );
                }}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="checkmark-done-circle-outline" size={64} color="#2d4a6e" />
                        <Text style={styles.emptyText}>Nenhuma tarefa ainda.</Text>
                        <Text style={styles.emptySubText}>Adicione uma acima!</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#0d1b2a', padding: 16 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0d1b2a' },
    loadingText: { color: '#a1a6ed', marginTop: 12, fontSize: 15 },

    summaryRow: { marginBottom: 12 },
    summaryText: { color: '#5a6a7e', fontSize: 13 },

    inputRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
    input: {
        flex: 1,
        backgroundColor: '#1a2840',
        borderColor: '#2d4a6e',
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 13,
        fontSize: 15,
        color: '#e8eaf6',
    },
    addBtn: {
        backgroundColor: '#3d5afe',
        borderRadius: 12,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        backgroundColor: '#1a2840',
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#3d5afe',
    },
    cardDone: {
        borderLeftColor: '#3dba6e',
        opacity: 0.75,
    },

    taskRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#3d5afe',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    checkboxDone: {
        backgroundColor: '#3dba6e',
        borderColor: '#3dba6e',
    },

    taskInfo: { flex: 1 },
    taskTitle: { color: '#e8eaf6', fontSize: 15, fontWeight: '500' },
    taskTitleDone: { textDecorationLine: 'line-through', color: '#5a6a7e' },
    taskDate: { color: '#3d5270', fontSize: 12, marginTop: 3 },

    iconActions: { flexDirection: 'row', gap: 6 },
    iconBtn: {
        padding: 6,
        borderRadius: 8,
        backgroundColor: '#0d1b2a',
    },

    editInput: {
        backgroundColor: '#0d1b2a',
        borderColor: '#2d4a6e',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: '#e8eaf6',
        fontSize: 15,
        marginBottom: 10,
    },
    actionRow: { flexDirection: 'row', gap: 10 },

    emptyContainer: { alignItems: 'center', marginTop: 60 },
    emptyText: { color: '#3d5270', fontSize: 18, fontWeight: '600', marginTop: 16 },
    emptySubText: { color: '#3d5270', fontSize: 14, marginTop: 4 },
});
