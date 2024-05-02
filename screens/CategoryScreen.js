import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoryScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('ProductListScreen', { category });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCategoryPress(item)}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
      }}
    >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
        </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', padding: 20 }}>
      <View style={{ backgroundColor: '#3498db', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' }}>Categories</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </View>
  );
};

export default CategoryScreen;
