import React, { useContext, useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { ProductsContext } from '../context/ProductsContext'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { AuthContext } from '../context/AuthContext';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'>{};

export const ProductsScreen = ({navigation}:Props) => {

  const [isRefreshing, setIsRefreshing] = useState(false)
  const { products, loadProducts } = useContext(ProductsContext)

  const { logOut} = useContext(AuthContext)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{display:'flex', flexDirection:'row', width:170}}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flex:1}}
            onPress={ () => navigation.navigate('ProductScreen', {}) }
          >
            <Text>Agregar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flex:1}}
            onPress={ logOut }
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
        
      )
    })
    
  }, [])
  

  const loadProductsFromBackend = async() => {
    setIsRefreshing(true);
    await loadProducts()
    setIsRefreshing(false);

  }

  return (
    <View style={{flex: 1, marginHorizontal: 10 }}>
        <StatusBar
              backgroundColor='white'
              barStyle='dark-content'
            />
        <FlatList
          data={ products }
          keyExtractor={ (p) => p._id }
          renderItem={ ({item}) => (
            <TouchableOpacity
              activeOpacity={ 0.8 }
              onPress={
                () => navigation.navigate('ProductScreen', {
                  id: item._id,
                  name: item.nombre
                })
              }
            >
              <Text style={styles.productName}>{item.nombre}</Text>
            </TouchableOpacity>
          )}

          ItemSeparatorComponent={() => (
            <View style={ styles.itemSeparator }/>
          )}

          refreshControl={
            <RefreshControl
              refreshing={ isRefreshing }
              onRefresh={ loadProductsFromBackend }
            />
          }
        />
    </View>
  )
}

const styles = StyleSheet.create({
  productName: {
    fontSize: 20
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: 'rgba(0,0,0,0.1)'
  }
})