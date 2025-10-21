import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import './style.css'
import * as dat from 'lil-gui'


/**
 * Base
*/
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * Debug
*/
const gui = new dat.GUI()

/**
 * Object
*/
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// gui.add(mesh.position, 'y')
gui.add(mesh.position, 'y', - 10, 10, 0.01)
// gui.add(mesh.position, 'x')
gui.add(mesh.position, 'x').min(- 10).max(10).step(0.01)

gui
.add(mesh.position, 'z')
.min(- 10)
.max(10)
.step(0.01)

gui.add(mesh, 'visible')
gui.add(material, 'wireframe')


const parameters = {
    color: 0xff0000
}
gui.addColor(parameters, 'color')
.onChange(()=>{
    material.color.set(parameters.color)
})

const spinner = {
    color: 0xff0000,
spin: () =>
{
gsap.to(mesh.rotation, { duration: .5, y: mesh.rotation.y + Math.PI *
2 })
}
}
gui.add(spinner, 'spin')


//DEBUG TOGGLE = 'h'
window.addEventListener('keydown', (event) =>{
    if(event.key === 'h'){
        if(gui._hidden){
            gui.show()
        }else{
            gui.hide()
        }
    }
})

//TEST KUNG PWEDE
// gui.add(camera.position, 'fov',1,180).onChange(()=>{
//     camera.updateProjectionMatrix()
// })


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
