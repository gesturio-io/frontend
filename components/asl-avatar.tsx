"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei"
import type * as THREE from "three"

// In a real app, you would have different animations for each sign
const signAnimations: Record<string, string> = {
  Hello: "Wave",
  "Thank You": "ThankYou",
  Please: "Please",
  Yes: "Nod",
  No: "Shake",
}

interface ASLAvatarProps {
  word: string
  cameraAngle: "front" | "pov"
}

function Avatar({ word, cameraAngle }: { word: string; cameraAngle: "front" | "pov" }) {
  // In a real app, you would load a proper avatar model with sign animations
  // For this example, we'll use the duck model as a placeholder
  const { scene, animations } = useGLTF("/assets/3d/duck.glb")
  const group = useRef<THREE.Group>(null)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // In a real implementation, you would play the appropriate animation for the sign
    // For now, we'll just rotate the duck as a placeholder
    const timeout = setTimeout(() => {
      if (group.current) {
        group.current.rotation.y += Math.PI / 4
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [word])

  return (
    <group ref={group}>
      <primitive object={scene} scale={2} position={[0, -1, 0]} />
    </group>
  )
}

export default function ASLAvatar({ word, cameraAngle }: ASLAvatarProps) {
  return (
    <div id="asl-avatar" className="h-full w-full">
      <Canvas
        camera={{
          position: cameraAngle === "front" ? [0, 0, 5] : [0, 1, -2],
          fov: 50,
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <Avatar word={word} cameraAngle={cameraAngle} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          // Make controls less sensitive on mobile
          rotateSpeed={0.5}
          // Disable auto-rotation to save resources on mobile
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}

