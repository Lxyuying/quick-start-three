import * as THREE from 'three'

// 立方体网格模型
export const createBox = () => {
  var geometry1 = new THREE.BoxGeometry(100, 100, 100)
  var material1 = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    opacity: 0.7,
    transparent: true
  }) //材质对象Material
  var mesh1 = new THREE.Mesh(geometry1, material1) //网格模型对象Mesh
  return mesh1
}
// 球体网格模型
export const createSphere = () => {
  var geometry2 = new THREE.SphereGeometry(60, 40, 40)
  var material2 = new THREE.MeshLambertMaterial({
    color: 0xff00ff
  })
  material2.opacity = 0.5
  material2.transparent = true
  var mesh2 = new THREE.Mesh(geometry2, material2) //网格模型对象Mesh
  mesh2.translateY(120) //球体网格模型沿Y轴正方向平移120
  return mesh2
}
// 圆柱网格模型
export const createCylinder = () => {
  var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25)
  var material3 = new THREE.MeshLambertMaterial({
    color: 0x0000ff
    // 添加高光效果
    // specular: 0x4488ee,
    // shininess: 12
  })
  var mesh3 = new THREE.Mesh(geometry3, material3) //网格模型对象Mesh
  // mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
  mesh3.position.set(120, 0, 0) //设置mesh3模型对象的xyz坐标为120,0,0
  return mesh3
}

export const createBufferGeometry = () => {
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
    vertexColors: colors //THREE.VertexColors, //以顶点颜色为准
    // size: 10.0 //点对象像素尺寸
  })
  // 点渲染模式  点模型对象Points
  var points = new THREE.Mesh(geometry, material) //点模型对象
  points.position.set(-180, 0, 0) //设置mesh3模型对象的xyz坐标为120,0,0
  return points
}
// 头部网格模型和组
export const createPersonMesh = () => {
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
  return personGroup
}

export const printLocal = scene => {
  var geometry = new THREE.BufferGeometry() //声明一个几何体对象Geometry
  //材质对象
  var material = new THREE.LineBasicMaterial({
    color: 0x000000
  })
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
}

export const createCircleLine = () => {
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
  return line
}

export const createPicCircle = scene => {
  // 纹理贴图映射到一个球体上
  var geometry = new THREE.SphereGeometry(60, 25, 25) //球体
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
  var textureLoader = new THREE.TextureLoader()
  // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
  textureLoader.load('Earth.png', function (texture) {
    var material = new THREE.MeshLambertMaterial({
      // color: 0x0000ff,
      // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
      map: texture //设置颜色贴图属性值
    }) //材质对象Material
    var mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
    mesh.position.set(0, 300, 0)
    scene.add(mesh) //网格模型添加到场景中

    //纹理贴图加载成功后，调用渲染函数执行渲染操作
    // render();
  })
}

export const createRctGrass = () => {
  /**
   * 创建一个地面
   */
  var geometry8 = new THREE.PlaneGeometry(1000, 1000) //矩形平面
  // 加载树纹理贴图
  var texture = new THREE.TextureLoader().load('grass.jpg')
  // 设置阵列
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  // uv两个方向纹理重复数量
  texture.repeat.set(10, 10)
  var material8 = new THREE.MeshLambertMaterial({
    map: texture
  })
  var mesh = new THREE.Mesh(geometry8, material8) //网格模型对象Mesh
  mesh.position.set(0, -120.0)
  mesh.rotateX(-Math.PI / 2)
  return mesh
}

export const createPicFlow = () => {
  /**
   * 创建一个设置重复纹理的管道
   */
  var curve = new THREE.CatmullRomCurve3([new THREE.Vector3(-80, -40, 0), new THREE.Vector3(-70, 40, 0), new THREE.Vector3(70, 40, 0), new THREE.Vector3(80, -40, 0)])
  var tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.6, 50, false)
  var textureLoader2 = new THREE.TextureLoader()
  var texturePng = textureLoader2.load('flowLine.png')
  // 设置阵列模式为 RepeatWrapping
  texturePng.wrapS = THREE.RepeatWrapping
  texturePng.wrapT = THREE.RepeatWrapping
  // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
  //等价texture.repeat= new THREE.Vector2(20,1)
  texturePng.repeat.x = 20
  var tubeMaterial = new THREE.MeshPhongMaterial({
    map: texturePng,
    transparent: true
  })
  var meshFlow = new THREE.Mesh(tubeGeometry, tubeMaterial) //网格模型对象Mesh
  meshFlow.position.set(200, 200)
  return { meshFlow, texturePng }
}

/**
 * 光源设置
 */
export const createLight = scene => {
  //点光源
  var point = new THREE.PointLight(0xffffff)
  point.position.set(400, 200, 300) //点光源位置
  // point.geometry.scale(1, 1, -1)
  scene.add(point) //点光源添加到场景中
  // 点光源2  位置和point关于原点对称
  var point2 = new THREE.PointLight(0xffffff)
  point2.position.set(-400, 800, -300) //点光源位置
  scene.add(point2) //点光源添加到场景中
  var point3 = new THREE.PointLight(0xffffff)
  point3.position.set(-400, 200, 300) //点光源位置

  scene.add(point3) //点光源添加到场景中
  var point4 = new THREE.PointLight(0xffffff)
  point4.position.set(400, -300, 300) //点光源位置
  scene.add(point4) //点光源添加到场景中
  //环境光
  var ambient = new THREE.AmbientLight(0x444444)
  scene.add(ambient)
}

/**
 * 创建一个canvas对象，并绘制一些轮廓
 */
export const createCanvasTexture = () => {
  var canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 128
  var c = canvas.getContext('2d')
  // 矩形区域填充背景
  c.fillStyle = '#ff00ff'
  c.fillRect(0, 0, 512, 128)
  c.beginPath()
  // 文字
  c.beginPath()
  c.translate(256, 64)
  c.fillStyle = '#000000' //文本填充颜色
  c.font = 'bold 48px 宋体' //字体样式设置
  c.textBaseline = 'middle' //文本与fillText定义的纵坐标
  c.textAlign = 'center' //文本居中(以fillText定义的横坐标)
  c.fillText('廖星宇-three.js-test', 0, 0)
  // canvas画布对象作为CanvasTexture的参数重建一个纹理对象
  // canvas画布可以理解为一张图片
  var texture = new THREE.CanvasTexture(canvas)
  //打印纹理对象的image属性
  // console.log(texture.image);
  //矩形平面
  var geometry = new THREE.PlaneGeometry(128, 32)

  var material = new THREE.MeshPhongMaterial({
    map: texture // 设置纹理贴图
  })
  // 创建一个矩形平面网模型，Canvas画布作为矩形网格模型的纹理贴图
  var mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(-200, 200, 0)
  return mesh
}

export const createCanvasPic = () => {
  var canvas = document.createElement('canvas')
  var texture = new THREE.CanvasTexture(canvas)
  var geometry = new THREE.PlaneGeometry(128, 128)
  var ctx = canvas.getContext('2d')
  var Image = document.createElement('img')

  Image.onload = function () {
    var bg = ctx.createPattern(Image, 'no-repeat')
    console.log(bg)
    texture.needsUpdate = true
  }
  Image.src = 'Earth.png'
  var texture = new THREE.CanvasTexture(canvas)
  var material = new THREE.MeshPhongMaterial({
    map: texture // 设置纹理贴图
  })
  var mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(-200, -80, 0)
  return mesh
}

export const createVideoTextrue = () => {
  // 创建video对象
  let video = document.createElement('video')
  video.src = 'xiaohei.mp4' // 设置视频地址
  video.autoplay = 'autoplay' //要设置播放
  video.loop = true
  // video对象作为VideoTexture参数创建纹理对象
  var texture = new THREE.VideoTexture(video)
  var geometry = new THREE.PlaneGeometry(108, 71) //矩形平面
  var material = new THREE.MeshPhongMaterial({
    map: texture // 设置纹理贴图
  }) //材质对象Material
  var mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
  mesh.position.set(200, 400, 0)
  return mesh
}

export const createSixImg = () => {
  var geometry = new THREE.BoxGeometry(10000, 10000, 10000) //立方体

  var loader = new THREE.CubeTextureLoader()
  // 所有贴图在同一目录下，可以使用该方法设置共用路径
  // loader.setPath('环境贴图/')
  // 立方体纹理加载器返回立方体纹理对象CubeTexture
  var CubeTexture = loader.load(['4_l.jpg', '4_r.jpg', '4_u.jpg', '4_d.jpg', '4_b.jpg', '4_f.jpg'].reverse())
  //材质对象Material
  var material = new THREE.MeshPhongMaterial({
    //网格模型设置颜色，网格模型颜色和环境贴图会进行融合计算
    // color:0xff0000,
    envMap: CubeTexture //设置环境贴图
  })
  // console.log(CubeTexture.image)
  var mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
  // mesh.material.specular.set(0xffffff) // 高光反射颜色
  // mesh.material.shininess = 1000 // 高光高亮程度，默认30
  mesh.geometry.scale(1, 1, -1)
  return mesh
}

export const createTree = scene => {
  /**
   * 精灵创建树林效果
   */
  // 加载树纹理贴图
  var textureTree = new THREE.TextureLoader().load('tree.png')
  // 批量创建表示一个树的精灵模型
  for (let i = 0; i < 100; i++) {
    var spriteMaterial = new THREE.SpriteMaterial({
      map: textureTree //设置精灵纹理贴图
    })
    // 创建精灵模型对象
    var sprite = new THREE.Sprite(spriteMaterial)
    scene.add(sprite)
    // 控制精灵大小,
    sprite.scale.set(100, 100, 1) //// 只需要设置x、y两个分量就可以
    var k1 = Math.random() - 0.5
    var k2 = Math.random() - 0.5
    // 设置精灵模型位置，在xoz平面上随机分布
    sprite.position.set(1000 * k1, -70, 1000 * k2)
  }
}

/**
 * 精灵创建下雨效果
 */
export const createRain = () => {
  var textureTree = new THREE.TextureLoader().load('rain.png')
  // 批量创建表示雨滴的精灵模型
  var group = new THREE.Group()
  for (let i = 0; i < 400; i++) {
    var spriteMaterial = new THREE.SpriteMaterial({
      map: textureTree //设置精灵纹理贴图
    })
    // 创建精灵模型对象
    var sprite = new THREE.Sprite(spriteMaterial)
    sprite.scale.set(8, 10, 1) //// 只需要设置x、y两个分量就可以
    var k1 = Math.random() - 0.5
    var k2 = Math.random() - 0.5
    var k3 = Math.random() - 0.5
    // 设置精灵模型位置，在整个空间上上随机分布
    sprite.position.set(1000 * k1, 1000 * k3, 1000 * k2)
    group.add(sprite)
  }
  return group
}

/**
 * 编辑帧动画数据
 */
export const createAnimation = () => {
  var geometry1 = new THREE.BoxGeometry(1000, 100, 100)
  var material1 = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    opacity: 0.7,
    transparent: true
  }) //材质对象Material
  var mesh1 = new THREE.Mesh(geometry1, material1) //网格模型对象Mesh

  var geometry2 = new THREE.SphereGeometry(60, 40, 40)
  var material2 = new THREE.MeshLambertMaterial({
    color: 0xff00ff
  })
  // material2.opacity = 0.5
  material2.transparent = true
  var mesh2 = new THREE.Mesh(geometry2, material2) //网格模型对象Mesh
  mesh2.translateX(-120) //球体网格模型沿Y轴正方向平移120
  // mesh1.translateX(120) //球体网格模型沿Y轴正方向平移120

  mesh1.name = 'Box' //网格模型1命名

  mesh2.name = 'Sphere' //网格模型2命名
  var group = new THREE.Group()
  group.add(mesh1) //网格模型添加到组中
  group.add(mesh2) //网格模型添加到组中
  group.position.set(100, 100, 100)
  /**
   * 编辑group子对象网格模型mesh1和mesh2的帧动画数据
   */
  // 创建名为Box对象的关键帧数据
  var times = [0, 10] //关键帧时间数组，离散的时间点序列
  var values = [0, 0, 0, 150, 0, 0] //与时间点对应的值组成的数组
  // 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
  var posTrack = new THREE.KeyframeTrack('Box.position', times, values)
  // 创建颜色关键帧对象：10时刻对应颜色1, 0, 0   20时刻对应颜色0, 0, 1
  var colorKF = new THREE.KeyframeTrack('Box.material.color', [10, 20], [1, 0, 0, 0, 0, 1])
  // 创建名为Sphere对象的关键帧数据  从0~20时间段，尺寸scale缩放3倍
  var scaleTrack = new THREE.KeyframeTrack('Sphere.scale', [0, 20], [1, 1, 1, 3, 3, 3])

  // duration决定了默认的播放时间，一般取所有帧动画的最大时间
  // duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
  var duration = 20
  // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
  var clip = new THREE.AnimationClip('default', duration, [posTrack, colorKF, scaleTrack])

  /**
   * 播放编辑好的关键帧数据
   */
  // group作为混合器的参数，可以播放group中所有子对象的帧动画
  var mixer = new THREE.AnimationMixer(group)
  // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
  var AnimationAction = mixer.clipAction(clip)
  //通过操作Action设置播放方式
  AnimationAction.timeScale = 20 //默认1，可以调节播放速度
  // AnimationAction.loop = THREE.LoopOnce; //不循环播放
  AnimationAction.play() //开始播放
  return { group, mixer }
}

export const createBCAudio = () => {
  // 非位置音频可用于不考虑位置的背景音乐
  // 创建一个监听者
  var listener = new THREE.AudioListener()
  // camera.add( listener );
  // 创建一个非位置音频对象  用来控制播放
  var audio = new THREE.Audio(listener)
  // 创建一个音频加载器对象
  var audioLoader = new THREE.AudioLoader()
  // 加载音频文件，返回一个音频缓冲区对象作为回调函数参数
  audioLoader.load('Sunrise.mp3', function (AudioBuffer) {
    // console.log(AudioBuffer)
    // 音频缓冲区对象关联到音频对象audio
    audio.setBuffer(AudioBuffer)
    audio.setLoop(true) //是否循环
    audio.setVolume(0.5) //音量
    // 播放缓冲区中的音频数据
    audio.play() //play播放、stop停止、pause暂停
  })
}

export const createPositionalAudio = (scene, camera) => {
  var analyser = null // 声明一个分析器变量
  var geometry = new THREE.BoxGeometry(100, 100, 100)
  var material = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    opacity: 0.7,
    transparent: true
  }) //材质对象Material
  // 用来定位音源的网格模型
  var audioMesh = new THREE.Mesh(geometry, material)
  // 设置网格模型的位置，相当于设置音源的位置
  audioMesh.position.set(0, 0, 300)
  scene.add(audioMesh)

  // 创建一个虚拟的监听者
  var listener = new THREE.AudioListener()
  // 监听者绑定到相机对象
  camera.add(listener)
  // 创建一个位置音频对象,监听者作为参数,音频和监听者关联。
  var PosAudio = new THREE.PositionalAudio(listener)
  //音源绑定到一个网格模型上
  audioMesh.add(PosAudio)
  // 创建一个音频加载器
  var audioLoader = new THREE.AudioLoader()
  // 加载音频文件，返回一个音频缓冲区对象作为回调函数参数
  audioLoader.load('Bye Cinderella.mp3', function (AudioBuffer) {
    // console.log(buffer);
    // 音频缓冲区对象关联到音频对象audio
    PosAudio.setBuffer(AudioBuffer)
    PosAudio.setVolume(0.9) //音量
    PosAudio.setRefDistance(200) //参数值越大,声音越大
    PosAudio.play() //播放
    // 音频分析器和音频绑定，可以实时采集音频时域数据进行快速傅里叶变换
  })
  analyser = new THREE.AudioAnalyser(PosAudio)
  return analyser
}

/**
 * 创建多个网格模型组成的组对象
 */

export const createAudioGroup = () => {
  /**
   * 创建多个网格模型组成的组对象
   */
  var group = new THREE.Group()
  let N = 128 //控制音频分析器返回频率数据数量
  for (let i = 0; i < N / 2; i++) {
    var box = new THREE.BoxGeometry(10, 100, 10) //创建一个立方体几何对象
    var material = new THREE.MeshPhongMaterial({
      color: 0x0000ff
    }) //材质对象
    var mesh = new THREE.Mesh(box, material) //网格模型对象
    // 长方体间隔20，整体居中
    mesh.position.set(20 * i - (N / 2) * 10, 600, 0)
    group.add(mesh)
  }
  return group
}
