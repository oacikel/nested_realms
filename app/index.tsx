// app/index.tsx
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { View, Button } from 'react-native'
import { navigateToCreateNewWorld } from '@/redux/slices/navigationSlice'
import { paths } from '@/constants/pathNames'
import { useEffect } from 'react'
import { requestExistingWorlds } from '@/redux/slices/worldSlice'
import { getAllWorlds } from '@/redux/selectors/worldSelectors'
import WorldList from '@/components/lists/worldList'

export default function HomePage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const worlds = useSelector(getAllWorlds)

  useEffect(() => {
    dispatch(requestExistingWorlds())
  }, [])

  const handleNewWorldButtonClick = () => {
    dispatch(navigateToCreateNewWorld())
    router.push(paths.createWorld)
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
      }}
    >
      <WorldList worlds={worlds} />
      <Button title="Create A New World" onPress={handleNewWorldButtonClick} />
    </View>
  )
}
