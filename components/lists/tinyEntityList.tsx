import { Entity, EntityRequest } from '@/types/types'
import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

interface TinyEntityListProps {
  entities: Entity[] | EntityRequest[]
}

const TinyEntityList: React.FC<TinyEntityListProps> = ({ entities }) => {
  return (
    <ScrollView horizontal style={styles.scrollView}>
      {entities.map((entity, index) => (
        <View key={index} style={styles.entityContainer}>
          <Text>{entity.name}</Text>
          <Text>{entity.description}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 20,
  },
  entityContainer: {
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
  },
})

export default TinyEntityList
