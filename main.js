import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { createCanvasTexture, createLight, createPicFlow, createRctGrass, createPicCircle, createCircleLine, createPersonMesh, createBox, createSphere, createCylinder, createBufferGeometry, printLocal } from './utils'

/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene()

scene.add(createBox()) //网格模型添加到场景中

scene.add(createSphere())

scene.add(createCylinder()) //

scene.add(createBufferGeometry()) //点对象添加到场景

scene.add(createPersonMesh())

printLocal(scene)

scene.add(createCircleLine()) //线条对象添加到场景中

createPicCircle(scene)

scene.add(createRctGrass()) //网格模型添加到场景中
const { meshFlow, texturePng } = createPicFlow()
scene.add(meshFlow) //网格模型添加到场景中
createLight(scene)

scene.add(createCanvasTexture())

/**
 * 相机设置
 */
var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度
var k = width / height //窗口宽高比
var s = 200 //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
camera.position.set(200, 300, 200) //设置相机位置
camera.lookAt(scene.position) //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height) //设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1) //设置背景颜色
document.getElementById('app').appendChild(renderer.domElement) //body元素中插入canvas对象

let T0 = new Date() //上次时间
function render() {
  let T1 = new Date() //本次时间
  let t = T1 - T0 //时间差
  T0 = T1 //把本次时间赋值给上次时间
  requestAnimationFrame(render)
  //执行渲染操作   指定场景、相机作为参数
  renderer.render(scene, camera)
  // mesh.rotateY(0.001 * t) //旋转角速度0.001弧度每毫秒
  texturePng.offset.x -= 0.06
}
render()
new OrbitControls(camera, renderer.domElement) //创建控件对象
// controls.addEventListener('change', render) //监听鼠标、键盘事件

// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axisHelper = new THREE.AxesHelper(500)
scene.add(axisHelper)
