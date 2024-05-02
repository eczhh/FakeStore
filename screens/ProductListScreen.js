import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductListScreen = ({ route }) => {
  const { category } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();

    navigation.setOptions({
      headerShown: false,
    });

    return () => {
      navigation.setOptions({
        headerShown: true,
      });
    };
  }, [category, navigation]);

  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetailScreen', { productId });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleProductPress(item.id)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        marginBottom: 12,
        padding: 12,
      }}
    >
      <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 8, borderWidth: 2, borderColor: '#CCCCCC', marginRight: 12 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>{item.title}</Text>
        <Text style={{ fontSize: 14, color: '#888888' }}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingTop: 10 }}>
      <View style={{ backgroundColor: '#3498db', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' }}>{category}</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        onPress={handleBackPress}
        style={{ backgroundColor: '#3498db', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginBottom: 16 }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductListScreen;
