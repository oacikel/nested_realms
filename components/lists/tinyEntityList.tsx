import React from 'react'
import Grid from '@mui/material/Grid2'
import { Entity, EntityLite, EntityRequest } from '@/types/types'
import TinyEntityItem from './tinyEntityItem'
import { Box } from '@mui/system'

interface TinyEntityListProps {
  firstView?: React.ReactNode
  entities: (Entity | EntityRequest)[]
  onEntityPress?: (entity: Entity | EntityRequest | EntityLite) => void
}

const TinyEntityList: React.FC<TinyEntityListProps> = ({
  firstView,
  entities,
  onEntityPress,
}) => {
  const data = firstView ? [firstView, ...entities] : entities
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {data.map((item, index) => (
          <Grid size={{ xs: 'auto', md: 'auto' }}>
            {index === 0 && firstView ? (
              firstView
            ) : (
              <TinyEntityItem
                entity={item as Entity | EntityRequest}
                index={index - 1}
                onPress={() =>
                  onEntityPress &&
                  onEntityPress(item as Entity | EntityRequest | EntityLite)
                }
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default TinyEntityList
