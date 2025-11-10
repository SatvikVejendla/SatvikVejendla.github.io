import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'

export default function FactoryScene({ currentAnim }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/factory.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (!actions) return

    // Stop all running animations
    Object.values(actions).forEach(action => action.stop())

    // Play the one we want
    if (actions[currentAnim]) {
      actions[currentAnim].reset().fadeIn(0.5).play()
    }
  }, [currentAnim, actions])

  return <primitive ref={group} object={scene} />
}
