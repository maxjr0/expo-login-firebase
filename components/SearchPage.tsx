import React, { useState, useEffect } from 'react';
import { TextInput, FlatList, View, Text, Image, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/ConfigFirebase';

interface Matiere {
    id: string;
    nom: string;
    type_dechet: string;
    description: string;
    imageUrl: string;
}

const SearchPage: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [matieres, setMatieres] = useState<Matiere[]>([]);

    useEffect(() => {
        if (searchText.length > 0) {
            searchMatieres(searchText);
        } else {
            setMatieres([]);
        }
    }, [searchText]);

    const searchMatieres = async (searchText: string) => {
        try {
            const q = query(collection(db, "Matieres"), where("nom", ">=", searchText), where("nom", "<=", searchText + '\uf8ff'));
            const querySnapshot = await getDocs(q);
            const results: Matiere[] = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() } as Matiere);
            });
            setMatieres(results);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const renderItem = ({ item }: { item: Matiere }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
            <View>
                <Text style={styles.name}>{item.nom}</Text>
                <Text style={styles.type}>{item.type_dechet}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search"
                value={searchText}
                onChangeText={text => setSearchText(text)}
            />
            <FlatList
                data={matieres}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    type: {
        color: '#666',
    },
    description: {
        color: '#999',
        marginTop: 4,
    },
});

export default SearchPage;
