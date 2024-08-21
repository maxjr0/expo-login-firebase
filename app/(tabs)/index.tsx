import React from 'react';
import SearchPage from '@/components/SearchPage';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <SearchPage />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
