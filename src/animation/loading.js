import * as THREE from 'three'
import Stats from 'stats.js'

let camera,
    scene,
    renderer,
    stats,
    container

let numObjects = 50,
    objects = [],
    radius = 250

let mouseX = 0,
    mouseY = 0

init()
animate()

function init() {
  
  container = document.createElement('div')
  document.body.appendChild(container)
  
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000)
  camera.position.z = 1000
  
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0xffffff, 0.0005)
  
  let geometry = new THREE.BoxGeometry(5, 5, 5)
  let material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  
  for (let i = 0; i < numObjects; i ++) {
    
    let object = new THREE.Mesh(geometry, material)
    
    object.position.x = Math.random() * (radius * 2) - radius
    object.position.y = Math.random() * (radius * 2) - radius
    object.position.z = Math.random() * (radius * 2) - radius
    
    scene.add(object)
    
    objects.push(object)
    
  }
  
  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  
  container.appendChild(renderer.domElement)
  
  stats = new Stats()
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.top = '0px'
  container.appendChild(stats.domElement)
  
  document.addEventListener('mousemove', onDocumentMouseMove, false)
  window.addEventListener('resize', onWindowResize, false)
  
}

function onDocumentMouseMove(event) {
  
  mouseX = (event.clientX - window.innerWidth / 2) * 0.5
  mouseY = (event.clientY - window.innerHeight / 2) * 0.5
  
}

function onWindowResize() {
  
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  
}

function animate() {
  
  requestAnimationFrame(animate)
  
  render()
  stats.update()
  
}

function render() {
  
  for (let i = 0; i < objects.length; i ++) {
    
    let object = objects[i]
    
    object.rotation.x += 0.005
    object.rotation.y += 0.01
    
    let scale = Math.sin(i + Date.now() * 0.001) * 0.5 + 1
    
    object.scale.set(scale, scale, scale)
    
  }
  
  camera.position.x += (mouseX - camera.position.x) * 0.05
  camera.position.y += (- mouseY - camera.position.y) * 0.05
  camera.lookAt(scene.position)
  
  renderer.render(scene, camera)
  
}
