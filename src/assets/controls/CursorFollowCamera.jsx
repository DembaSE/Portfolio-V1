import { useThree, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function CursorFollowCamera() {
  const { camera } = useThree()
  const pointer = useRef({ x: 0, y: 0 })
  const targetPosition = useRef(new THREE.Vector3())
  const lerpedPosition = useRef(new THREE.Vector3())
  const lerpedLookAt = useRef(new THREE.Vector3())

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("pointermove", handlePointerMove)
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [])

  useFrame(() => {
    const strength = 2.5

    // Target camera position
    targetPosition.current.set(
      pointer.current.x * strength,
      pointer.current.y * strength,
      5
    )

    // Lerp camera position
    lerpedPosition.current.lerp(targetPosition.current, 0.1)
    camera.position.copy(lerpedPosition.current)

    // Dynamically adjust the lookAt target slightly based on pointer
    const targetLookAt = new THREE.Vector3(
      pointer.current.x * 1.5,
      pointer.current.y * 1.5,
      0
    )
    lerpedLookAt.current.lerp(targetLookAt, 0.1)
    camera.lookAt(lerpedLookAt.current)
  })

}
