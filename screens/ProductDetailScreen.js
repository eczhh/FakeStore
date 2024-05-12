import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cartSlice'; // Assuming this is the correct path to your cart slice

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();

    navigation.setOptions({
      headerShown: false,
    });

    return () => {
      navigation.setOptions({
        headerShown: true,
      });
    };
  }, [productId, navigation]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToCartPress = () => {
    if (product) {
      dispatch(cartActions.addToCart(product)); // Dispatch addToCart action with product data
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFFFFF', padding: 20 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={!loading}
    >
      <View style={{ backgroundColor: '#3498db', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' }}>Product Details</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : product ? (
        <>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
            {product.title}
          </Text>
          {product.image && (
            <Image source={{ uri: product.image }} style={{ width: '100%', height: 300, resizeMode: 'cover', marginBottom: 20, borderRadius: 10 }} />
          )}
          <Text style={{ fontSize: 20, marginBottom: 10, color: '#007BFF', textAlign: 'center' }}>
            Price: ${product.price.toFixed(2)}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 20, color: '#001d3d', textAlign: 'center' }}>
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </Text>
          <View style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 5 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Description</Text>
            <ScrollView style={{ maxHeight: 150 }}>
              <Text style={{ fontSize: 16 }}>{product.description}</Text>
            </ScrollView>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            <TouchableOpacity
              style={{ padding: 10, borderRadius: 5, minWidth: 150, alignItems: 'center', backgroundColor: '#3498db' }}
              onPress={handleBackPress}
            >
              <Ionicons name="arrow-back" size={16} color="#FFFFFF" />
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginLeft: 5 }}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10, borderRadius: 5, minWidth: 150, alignItems: 'center', backgroundColor: '#2ecc71' }}
              onPress={handleAddToCartPress}
            >
              <Ionicons name="cart" size={16} color="#FFFFFF" />
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginLeft: 5 }}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : error ? (
        <Text style={{ fontSize: 16, color: 'red', textAlign: 'center' }}>{error}</Text>
      ) : (
        <Text style={{ fontSize: 16, color: 'red', textAlign: 'center' }}>Product not found</Text>
      )}
    </ScrollView>
  );
};

export default ProductDetailScreen;
