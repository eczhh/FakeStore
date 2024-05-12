import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const CartIcon = ({ color, size }) => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <View style={styles.container}>
      <Ionicons name="cart" color={color} size={size} />
      {totalQuantity > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalQuantity}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CartIcon;
