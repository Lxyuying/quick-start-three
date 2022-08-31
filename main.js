import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene()
// 立方体网格模型
var geometry1 = new THREE.BoxGeometry(100, 100, 100)
var material1 = new THREE.MeshLambertMaterial({
  color: 0xff0000,
  opacity: 0.7,
  transparent: true
}) //材质对象Material
var mesh1 = new THREE.Mesh(geometry1, material1) //网格模型对象Mesh
scene.add(mesh1) //网格模型添加到场景中

// 球体网格模型
var geometry2 = new THREE.SphereGeometry(60, 40, 40)
var material2 = new THREE.MeshLambertMaterial({
  color: 0xff00ff
})
material2.opacity = 0.5
material2.transparent = true
var mesh2 = new THREE.Mesh(geometry2, material2) //网格模型对象Mesh
mesh2.translateY(120) //球体网格模型沿Y轴正方向平移120
scene.add(mesh2)

// 圆柱网格模型
var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25)
var material3 = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
  // 添加高光效果
  specular: 0x4488ee,
  shininess: 12
})
var mesh3 = new THREE.Mesh(geometry3, material3) //网格模型对象Mesh
// mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
mesh3.position.set(120, 0, 0) //设置mesh3模型对象的xyz坐标为120,0,0
scene.add(mesh3) //

// 自定义几何体
var geometry = new THREE.BufferGeometry() //声明一个空几何体对象
//类型数组创建顶点位置position数据
var vertices = new Float32Array([
  0,
  0,
  0, //顶点1坐标
  80,
  0,
  0, //顶点2坐标
  80,
  80,
  0, //顶点3坐标
  0,
  80,
  0 //顶点4坐标
])
// Uint16Array类型数组创建顶点索引数据
var indexes = new Uint16Array([
  // 0对应第1个顶点位置数据、第1个顶点法向量数据
  // 1对应第2个顶点位置数据、第2个顶点法向量数据
  // 索引值3个为一组，表示一个三角形的3个顶点
  0, 1, 2, 0, 2, 3
])
// 索引数据赋值给几何体的index属性
geometry.index = new THREE.BufferAttribute(indexes, 1) //1个为一组
// 创建属性缓冲区对象
var attribue = new THREE.BufferAttribute(vertices, 3) //3个为一组
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = attribue
var normals = new Float32Array([
  0,
  0,
  1, //顶点1法向量
  0,
  0,
  1, //顶点2法向量
  0,
  0,
  1, //顶点3法向量
  0,
  0,
  1 //顶点4法向量
])
// 设置几何体attributes属性的位置normal属性
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3) //3个为一组,表示一个顶点的xyz坐标// 设置几何体attributes属性的位置position属性
geometry.attributes.position = attribue
//类型数组创建顶点颜色color数据
var colors = new Float32Array([
  1,
  0,
  0, //顶点1颜色
  0,
  1,
  0, //顶点2颜色
  0,
  0,
  1, //顶点3颜色

  1,
  1,
  0, //顶点4颜色
  0,
  1,
  1, //顶点5颜色
  1,
  0,
  1 //顶点6颜色
])
// 设置几何体attributes属性的颜色color属性
geometry.attributes.color = new THREE.BufferAttribute(colors, 3) //3个为一组,表示一个顶点的颜色数据RGB
//材质对象
var material = new THREE.MeshBasicMaterial({
  // 使用顶点颜色数据渲染模型，不需要再定义color属性
  // color: 0xff0000,
  vertexColors: colors, //THREE.VertexColors, //以顶点颜色为准
  size: 10.0 //点对象像素尺寸
})
// 点渲染模式  点模型对象Points
var points = new THREE.Mesh(geometry, material) //点模型对象
points.position.set(-180, 0, 0) //设置mesh3模型对象的xyz坐标为120,0,0
scene.add(points) //点对象添加到场景

// 头部网格模型和组
var headMesh = sphereMesh(10, 0, 0, 0)
headMesh.name = '脑壳'
var leftEyeMesh = sphereMesh(1, 8, 5, 4)
leftEyeMesh.name = '左眼'
var rightEyeMesh = sphereMesh(1, 8, 5, -4)
rightEyeMesh.name = '右眼'
var headGroup = new THREE.Group()
headGroup.name = '头部'
headGroup.add(headMesh, leftEyeMesh, rightEyeMesh)
// 身体网格模型和组
var neckMesh = cylinderMesh(3, 10, 0, -15, 0)
neckMesh.name = '脖子'
var bodyMesh = cylinderMesh(14, 30, 0, -35, 0)
bodyMesh.name = '腹部'
var leftLegMesh = cylinderMesh(4, 60, 0, -80, -7)
leftLegMesh.name = '左腿'
var rightLegMesh = cylinderMesh(4, 60, 0, -80, 7)
rightLegMesh.name = '右腿'
var legGroup = new THREE.Group()
legGroup.name = '腿'
legGroup.add(leftLegMesh, rightLegMesh)
var bodyGroup = new THREE.Group()
bodyGroup.name = '身体'
bodyGroup.add(neckMesh, bodyMesh, legGroup)
// 人Group
var personGroup = new THREE.Group()
personGroup.name = '人'
personGroup.add(headGroup, bodyGroup)
// personGroup.translateY(150)
personGroup.translateZ(150)
scene.add(personGroup)

// 球体网格模型创建函数
function sphereMesh(R, x, y, z) {
  var geometry = new THREE.SphereGeometry(R, 25, 25) //球体几何体
  var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  }) //材质对象Material
  var mesh = new THREE.Mesh(geometry, material) // 创建网格模型对象
  mesh.position.set(x, y, z)
  return mesh
}
// 圆柱体网格模型创建函数
function cylinderMesh(R, h, x, y, z) {
  var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25) //球体几何体
  var material = new THREE.MeshPhongMaterial({
    color: 0x0000ff
  }) //材质对象Material
  var mesh = new THREE.Mesh(geometry, material) // 创建网格模型对象
  mesh.position.set(x, y, z)
  return mesh
}
// 建立世界坐标系概念
var mesh = new THREE.Mesh(geometry, material)
// mesh的本地坐标设置为(50, 0, 0)
mesh.position.set(50, 0, 0)
var group = new THREE.Group()
// group本地坐标设置和mesh一样设置为(50, 0, 0)
// mesh父对象设置position会影响得到mesh的世界坐标
group.position.set(150, 0, 0)
group.add(mesh)
scene.add(group)

// .position属性获得本地坐标
console.log('本地坐标', mesh.position)

// getWorldPosition()方法获得世界坐标
//该语句默认在threejs渲染的过程中执行,如果渲染之前想获得世界矩阵属性、世界位置属性等属性，需要通过代码更新
scene.updateMatrixWorld(true)
var worldPosition = new THREE.Vector3()
mesh.getWorldPosition(worldPosition)
console.log('世界坐标', worldPosition)

var geometry = new THREE.BufferGeometry() //声明一个几何体对象Geometry
//参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
var arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI)
//getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
var points = arc.getPoints(50) //分段数50，返回51个顶点
// setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
geometry.setFromPoints(points)
//材质对象
var material = new THREE.LineBasicMaterial({
  color: 0x000000
})
//线条模型对象
var line = new THREE.Line(geometry, material)
scene.add(line) //线条对象添加到场景中
/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff)
point.position.set(400, 200, 300) //点光源位置
scene.add(point) //点光源添加到场景中
// 点光源2  位置和point关于原点对称
var point2 = new THREE.PointLight(0xffffff)
point2.position.set(-400, -200, -300) //点光源位置
scene.add(point2) //点光源添加到场景中
//环境光
var ambient = new THREE.AmbientLight(0x444444)
scene.add(ambient)
// console.log(scene)
// console.log(scene.children)
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
}
render()
new OrbitControls(camera, renderer.domElement) //创建控件对象
// controls.addEventListener('change', render) //监听鼠标、键盘事件

// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axisHelper = new THREE.AxesHelper(500)
scene.add(axisHelper)
