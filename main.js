import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import {
  createAudioGroup,
  createPositionalAudio,
  createBCAudio,
  createAnimation,
  createRain,
  createTree,
  createSixImg,
  createVideoTextrue,
  createCanvasPic,
  createCanvasTexture,
  createLight,
  createPicFlow,
  createRctGrass,
  createPicCircle,
  createCircleLine,
  createPersonMesh,
  createBox,
  createSphere,
  createCylinder,
  createBufferGeometry,
  printLocal
} from './utils'

/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)

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
scene.add(createCanvasPic())
scene.add(createVideoTextrue())
scene.add(createSixImg())
createTree(scene)
const rainGroup = createRain()
scene.add(rainGroup)
const { group, mixer } = createAnimation()
scene.add(group)
const analyser = createPositionalAudio(scene, camera)
const audioGroup = createAudioGroup()
scene.add(audioGroup)
// 创建背景音乐
// createBCAudio()

/**
 * 相机设置
 */
var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度
var k = width / height //窗口宽高比
var s = 200 //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
camera.position.set(200, 300, 200) //设置相机位置
camera.position.set(292, 109, 268) //设置相机位置

camera.lookAt(scene.position) //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height) //设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1) //设置背景颜色
document.getElementById('app').appendChild(renderer.domElement) //body元素中插入canvas对象
var clock = new THREE.Clock()
let T0 = new Date() //上次时间
function render() {
  let T1 = new Date() //本次时间
  let t = T1 - T0 //时间差
  T0 = T1 //把本次时间赋值给上次时间
  // 每次渲染都会更新雨滴的位置，进而产生动画效果
  rainGroup.children.forEach(sprite => {
    // 雨滴的y坐标每次减1
    sprite.position.y -= 1
    if (sprite.position.y < -120) {
      // 如果雨滴落到地面，重置y，从新下落
      sprite.position.y = 200
    }
  })
  requestAnimationFrame(render)
  //执行渲染操作   指定场景、相机作为参数
  renderer.render(scene, camera)
  // mesh.rotateY(0.001 * t) //旋转角速度0.001弧度每毫秒
  texturePng.offset.x -= 0.06
  mixer.update(clock.getDelta())
  if (analyser) {
    // 获得频率数据N个
    var arr = analyser.getFrequencyData()
    // console.log(arr)
    // console.log(arr);
    // 遍历组对象，每个网格子对象设置一个对应的频率数据
    audioGroup.children.forEach((elem, index) => {
      elem.scale.y = arr[index] / 80
      elem.material.color.r = arr[index] / 200
    })
  }
}
render()
new OrbitControls(camera, renderer.domElement) //创建控件对象
// controls.addEventListener('change', render) //监听鼠标、键盘事件

// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axisHelper = new THREE.AxesHelper(500)
scene.add(axisHelper)

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix()
}
