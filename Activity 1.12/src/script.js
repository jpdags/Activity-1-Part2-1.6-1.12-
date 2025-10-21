import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
const gui = new dat.GUI()
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')


/**
 * Fonts
*/
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        
    
        material.color = new THREE.Color('#abaaff')
        
        const textGeometry = new TextGeometry(
            'TERRAPRISM',
            {
                font: font,
                size: .5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
        
        for(let i = 0; i < 100; i++)
            {
                const cube = new THREE.Mesh(cubeGeometry, material)
            cube.position.x = (Math.random() - 0.5) * 10
            cube.position.y = (Math.random() - 0.5) * 10
            cube.position.z = (Math.random() - 0.5) * 10
            cube.rotation.x = Math.random() * Math.PI
            cube.rotation.y = Math.random() * Math.PI
            const scale = Math.random() 
            cube.scale.set(scale, scale, scale)
            
            scene.add(cube)
        }
        const sphereGeometry = new THREE.SphereGeometry(0.3, 0.4, 0.4)
        
        for(let i = 0; i < 150; i++)
            {
                const shpere = new THREE.Mesh(sphereGeometry, material)
                shpere.position.x = (Math.random() - 0.5) * 10
                shpere.position.y = (Math.random() - 0.5) * 10
                shpere.position.z = (Math.random() - 0.5) * 10
                shpere.rotation.x = Math.random() * Math.PI
                shpere.rotation.y = Math.random() * Math.PI
                const scale = Math.random() 
                shpere.scale.set(scale, scale, scale)
                
                scene.add(shpere)
            }
        }
    )

    
    
    /**
     * Sizes
    */
   const sizes = {
       width: window.innerWidth,
       height: window.innerHeight
    }
    
    window.addEventListener('resize', () =>
        {
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
            
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()
            
            renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
*/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()