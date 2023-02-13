import React, { useContext } from 'react'
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'

export const ProtectedScreen = () => {


  const {user, token, logOut} = useContext(AuthContext)


  return (
    <View style={ styles.container }>
        <StatusBar
          backgroundColor='white'
          barStyle='dark-content'
        />
        <Text style={ styles.title }>Protected Screen</Text>
        <Button
          title='logout'
          color={"#5856D6"}
          onPress={ logOut }
        />
        <Text>
          { JSON.stringify(user, null, 5)}
        </Text>
        <Text>{token}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  }
})
