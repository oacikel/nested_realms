import { convertToEntityLite } from '@/app/utils/entityUtils'
import { paths } from '@/constants/pathNames'
import { setEntityLiteOfInterest } from '@/redux/slices/entitiesSlice'
import { router } from 'expo-router'
import React from 'react'
import { useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid2'
import {
  Entity,
  EntityListType,
  EntityLite,
  EntityRequest,
} from '@/types/types'
import { Box } from '@mui/system'
import TinyEntityItem from './tinyEntityItem'
import { ScrollView } from 'react-native'

interface TinyEntityListProps {
  entities: Entity[] | EntityLite[]
  listType?: EntityListType
}

const TinyEntityList: React.FC<TinyEntityListProps> = ({
  entities,
  listType = 'selections',
}) => {
  const dispatch = useDispatch()

  const handleEntityButtonPress = (entity: Entity) => {
    const entityLite = convertToEntityLite(entity)
    dispatch(setEntityLiteOfInterest(entityLite))
    router.push(paths.entityDetail)
  }

  const data = entities
  return (
    <ScrollView>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          direction={listType === 'selections' ? 'row' : 'column'}
          container
          spacing={1}
        >
          {data.map((item, index) => (
            <Grid size={{ xs: 'auto', md: 'auto' }}>
              <TinyEntityItem
                listType={listType}
                entity={item as Entity | EntityRequest}
                index={index - 1}
                onPress={() => handleEntityButtonPress(item as Entity)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ScrollView>
  )
}

export default TinyEntityList
