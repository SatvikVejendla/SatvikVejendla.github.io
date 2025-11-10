import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import gsap from 'gsap'

export default function CameraController({ target }) {
  const { camera } = useThree()

  useEffect(() => {
    gsap.to(camera.position, {
      x: target[0],
      y: target[1],
      z: target[2],
      duration: 2,
      ease: 'power2.inOut'
    })
  }, [target])

  return null
}