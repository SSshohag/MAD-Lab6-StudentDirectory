// app/(tabs)/index.tsx — refactored + Week 5 graded lab task

import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, FlatList, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import SearchBar from "../../components/search-bar";
import StudentDetail from "../../components/student-detail";
import StudentItem from "../../components/student-item";
import { useStudents } from "../../context/students-context";
import { Student } from "../../data/students";
import { useDebounce } from "../../hooks/use-debounce";

export default function Index() {
  // Read students directly from the global context
  const { students, dispatch } = useStudents();

  // These stay as local state — they belong to this screen only
  const [query, setQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Change this number to configure search delay (milliseconds).
  const debounceDelay = 300;
  const debouncedQuery = useDebounce(query, debounceDelay);
  const searchRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => searchRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => students.filter(
    (s) => s.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(debouncedQuery.toLowerCase())
  ), [students, debouncedQuery]);

  const handleSelect = useCallback((student: Student) => {
    setSelectedStudent((prev) => prev?.id === student.id ? null : student);
  }, []);

  const resetDirectory = () => {
    dispatch({ type: "RESET" });
    setSelectedStudent(null);
  };

  const handleReset = () => {
    if (Platform.OS === "web") {
      if (globalThis.confirm("Restore the original student list?")) {
        resetDirectory();
      }
      return;
    }

    Alert.alert(
      "Reset Directory",
      "Restore the original student list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: resetDirectory,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Student Directory ({students.length})</Text>
        <View style={styles.actions}>
          <Pressable style={styles.addButton} onPress={handleReset}>
            <Text style={styles.addButtonText}>Reset</Text>
          </Pressable>
          {/* Navigate to the AddStudent screen — no prop passing needed */}
          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/(tabs)/add-student")}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </Pressable>
        </View>
      </View>

      <SearchBar ref={searchRef} value={query} onChangeText={setQuery} debounceDelay={debounceDelay} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentItem
            student={item}
            onPress={handleSelect}
            isSelected={selectedStudent?.id === item.id}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No students match "{query}"</Text>
          </View>
        }
      />

      {selectedStudent && (
        <StudentDetail student={selectedStudent} onRemoved={() => setSelectedStudent(null)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F0F4F8" },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#0D1F4E",
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  addButton: {
    backgroundColor: "#0D9488",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
  empty: { padding: 40, alignItems: "center" },
  emptyText: { fontSize: 14, color: "#94A3B8" },
});
