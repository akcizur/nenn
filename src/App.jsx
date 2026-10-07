import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function App() {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#0b1020')

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 1.5, 5)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: '#7c9cff', roughness: 0.5 })
    )
    scene.add(cube)

    const ambient = new THREE.AmbientLight('#ffffff', 1.2)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight('#ffffff', 1.5)
    dirLight.position.set(3, 5, 5)
    scene.add(dirLight)

    mountRef.current.appendChild(renderer.domElement)

    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="page">
      <div ref={mountRef} className="scene" />

      <div className="overlay">
        <p className="eyebrow">Vite + React + Three.js</p>
        <h1>Nenn</h1>
        <p>GitHub Pages-ready 3D web app</p>
      </div>
    </div>
  )
}
