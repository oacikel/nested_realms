// /app/worlds/[worldId].tsx
import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useSelector } from 'react-redux'
import { getWorldById } from '@/redux/selectors/worldSelectors'
import { RootState } from '@/redux/store'

const WorldDetail = () => {
  const { worldId } = useLocalSearchParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Using the selector to get the world by id from the Redux store
  const world = useSelector((state: RootState) =>
    getWorldById(state, worldId as string),
  )

  useEffect(() => {
    console.log('World:', worldId)
    if (!worldId) return

    if (!world) {
      setLoading(true)
      setError('Loading world details...')
    } else {
      setLoading(false)
      setError(null)
    }
  }, [worldId, world])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!world) {
    return <div>World not found.</div>
  }

  return (
    <div>
      <h1>{world.name}</h1>
      <p>{world.description}</p>
      <p>Created At: {new Date(world.createdAt).toLocaleDateString()}</p>
      <h3>Entities:</h3>
      {world.entityIds && world.entityIds.length > 0 ? (
        <ul>
          {world.entityIds.map((idNamePair) => (
            <li key={idNamePair.id}>{idNamePair.name}</li>
          ))}
        </ul>
      ) : (
        <p>No entities found for this world.</p>
      )}
    </div>
  )
}

export default WorldDetail
