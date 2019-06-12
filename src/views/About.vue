<template>
  <div class="wrap">
    <topHeader/>
    <div class="contanier" ref="container">
      <!-- <div class="contanier" ref="container" :style="{width: '100%', height: divH + 'px'}"> -->
      <div class="content">
        <div class="select-option">
          <el-select @change="selectGet" v-model="form.region" placeholder="请选择库房">
            <el-option
              v-for="item in selectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="tab-page">
          <el-tabs type="border-card">
            <el-tab-pane v-for="(item,index) in roomList" :key="index" :label="item.name">
              <div class="tab-content" v-if="index == 0">
                <roomInfo></roomInfo>
              </div>
              <div class="tab-content1" v-if="index == 1">
                <div id="ThreeJS" style="position: absolute; left: 0px; top: 0px"></div>
              </div>
              <div class="tab-content" v-if="index == 2">我是房间三</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import roomInfo from "@/components/roomInfo";
import topHeader from "@/components/public/topHeader";
export default {
  data() {
    return {
      selectList: [
        {
          id: 0,
          name: "库房一"
        },
        {
          id: 1,
          name: "库房二"
        },
        {
          id: 2,
          name: "库房三"
        }
      ],
      form: {
        region: ""
      },
      roomList: [
        {
          id: 0,
          name: "东一房"
        },
        {
          id: 1,
          name: "北三房"
        },
        {
          id: 2,
          name: "南一房"
        }
      ],
      divH: 0,
      scene: null, // 场景
      camera: null, // 相机
      renderer: null, // 渲染器
      controls: null, //控制器
      tween: null,
      door: null,
      matArrayA: [], //内墙
      matArrayB: [], //外墙
      dummy: null,
      wrap: "",
      floorImg: require('./../assets/image/xinwen.png')
    };
  },
  components: {
    topHeader,
    roomInfo
  },
  watch: {},
  mounted() {
    let container = this.$refs.container;
    // console.log(container, "1----")
    this.divH = document.documentElement.clientHeight - 80;
    // console.log("------2", this.divH)
    // console.log("------//--", document.documentElement  )
    // console.log("------3", container.scrollHeight  )
    this.dummy = new THREE.Object3D(); //仿制品
    this.init();
  },
  methods: {
    selectGet() {
      console.log("111");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    init() {
      this.initScene()
      this.initCamera()
      this.initRender()
      // this.initEvent()
      this.initControls()
      this.initLight()
      this.initObject()
      this.animate()
      // this.scene = new THREE.Scene();
      // console.log("hello threejs", this.scene);
      // const SCREEN_WIDTH = window.innerWidth;
      // const SCREEN_HEIGHT = window.innerHeight;
      // const VIEW_ANGLE = 75;
      // const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
      // const NEAR = 0.1;
      // const FAR = 20000;

      // let materialArrayA = [];
      // let materialArrayB = [];
      // let this.matArrayA = []; //内墙
      // let this.matArrayB = []; //外墙
      // let dummy = new THREE.Object3D(); //仿制品
    },
    // 初始化场景
    initScene() {
      this.scene = new THREE.Scene();
    },
    // 初始化相机
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
      this.camera.position.set(0, 1000,980);
      this.camera.lookAt(this.scene.position);
      this.camera.lookAt(0, 0, 0);
      this.scene.add(this.camera);
    },
    // 初始化渲染器
    initRender() {
      if (Detector.webgl)
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
      else 
        this.renderer = new THREE.CanvasRenderer();
      //设置渲染器的大小为窗口的内宽度，也就是内容区的宽度。
      this.renderer.setSize(1000, 600);
      this.wrap = document.getElementById("ThreeJS"); //THreeJS div
      this.wrap.appendChild(this.renderer.domElement); //生成的canvas元素
      console.log(this.renderer.domElement, this.wrap, "123456==")
      this.renderer.setClearColor(0x4682b4, 1.0);
      // this.renderer.render(this.scene, this.camera);
    },
    // 事件
    initEvent() {},
    // 控制
    initControls() {
      this.controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
    },
    // 光源
    initLight() {
      // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不同
      // A start, 第二个参数是光源强度
      var directionalLight = new THREE.DirectionalLight(0xffffff, 1); //模拟远处类似太阳的光源
      directionalLight.position.set(0, 100, 0).normalize();
      this.scene.add(directionalLight);
      //A end
      var ambient = new THREE.AmbientLight(0xffffff, 1); //AmbientLight,影响整个场景的光源
      ambient.position.set(0, 0, 0);
      this.scene.add(ambient);
      //var pointlight = new THREE.PointLight(0x000000,1.5,2000);
      //scene.add(pointlight);
    },
    // 创建地板
    createFloor() {
      var loader = new THREE.TextureLoader();
      loader.load("/public/static/images/floor.jpg", function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
        var floorGeometry = new THREE.BoxGeometry(1600, 1100, 1);
        var floorMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide
        });
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -0.5;
        floor.rotation.x = Math.PI / 2;
        this.scene.add(floor);
      });

      //茶色：0x58ACFA   透明玻璃色：0XECF1F3
      var glass_material = new THREE.MeshBasicMaterial({ color: 0xecf1f3 });
      glass_material.opacity = 0.4;
      glass_material.transparent = true;

      var left_wall = this.returnWallObject(
        20,
        200,
        1100,
        0,
        this.matArrayB,
        -801,
        100,
        0
      );
      var left_cube = this.returnWallObject(
        20,
        110,
        1100,
        0,
        this.matArrayB,
        -801,
        100,
        0
      );
      this.createResultBsp(left_wall, left_cube, 1);
      this.createCubeWall(1, 110, 1100, 0, glass_material, -801, 100, 0);

      var right_wall = this.returnWallObject(
        20,
        200,
        1100,
        1,
        this.matArrayB,
        801,
        100,
        0
      );
      var right_cube = this.returnWallObject(
        20,
        110,
        1100,
        0,
        this.matArrayB,
        801,
        100,
        0
      );
      this.createResultBsp(right_wall, right_cube, 1);
      this.createCubeWall(1, 110, 1100, 0, glass_material, 801, 100, 0);
    },
    //墙上挖门，通过两个几何体生成BSP对象
    createResultBsp(bsp, less_bsp, mat) {
      switch (mat) {
        case 1:
          var material = new THREE.MeshPhongMaterial({
            color: 0x9cb2d1,
            specular: 0x9cb2d1,
            shininess: 30,
            transparent: true,
            opacity: 1
          });
          break;
        case 2:
          var material = new THREE.MeshPhongMaterial({
            color: 0xafc0ca,
            specular: 0xafc0ca,
            shininess: 30,
            transparent: true,
            opacity: 1
          });
          break;
        default:
      }

      var sphere1BSP = new ThreeBSP(bsp);
      var cube2BSP = new ThreeBSP(less_bsp); //0x9cb2d1 淡紫,0xC3C3C3 白灰 , 0xafc0ca灰
      var resultBSP = sphere1BSP.subtract(cube2BSP);
      var result = resultBSP.toMesh(material);
      result.material.flatshading = THREE.FlatShading;
      result.geometry.computeFaceNormals(); //重新计算几何体侧面法向量
      result.geometry.computeVertexNormals();
      result.material.needsUpdate = true; //更新纹理
      result.geometry.buffersNeedUpdate = true;
      result.geometry.uvsNeedUpdate = true;
      this.scene.add(result);
    },
    // 创建墙
    createCubeWall(width, height, depth, angle, material, x, y, z) {
      var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
      var cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = z;
      cube.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针
      this.scene.add(cube);
    },
    // 返回墙对象
    returnWallObject(width, height, depth, angle, material, x, y, z) {
      var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
      var cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = z;
      cube.rotation.y += angle * Math.PI;
      return cube;
    },
    createWallMaterail() {
      this.matArrayA.push(new THREE.MeshPhongMaterial({ color: 0xafc0ca })); //前  0xafc0ca :灰色
      this.matArrayA.push(new THREE.MeshPhongMaterial({ color: 0xafc0ca })); //后
      this.matArrayA.push(new THREE.MeshPhongMaterial({ color: 0xd6e4ec })); //上  0xd6e4ec： 偏白色
      this.matArrayA.push(new THREE.MeshPhongMaterial({ color: 0xd6e4ec })); //下
      this.matArrayA.push(new THREE.MeshPhongMaterial({ color: 0xafc0ca })); //左    0xafc0ca :灰色
      this.matArrayA.push(new THREE.MeshPhongMaterial({ color: 0xafc0ca })); //右

      this.matArrayB.push(new THREE.MeshPhongMaterial({ color: 0xafc0ca })); //前  0xafc0ca :灰色
      this.matArrayB.push(new THREE.MeshPhongMaterial({ color: 0x9cb2d1 })); //后  0x9cb2d1：淡紫
      this.matArrayB.push(new THREE.MeshPhongMaterial({ color: 0xd6e4ec })); //上  0xd6e4ec： 偏白色
      this.matArrayB.push(new THREE.MeshPhongMaterial({ color: 0xd6e4ec })); //下
      this.matArrayB.push(new THREE.MeshPhongMaterial({ color: 0xafc0ca })); //左   0xafc0ca :灰色
      this.matArrayB.push(new THREE.MeshPhongMaterial({ color: 0xafc0ca })); //右
    },
    createLayout() {
      // 墙面1 立方体比较长的面  左一
      this.createCubeWall(10, 200, 900, 0, this.matArrayB, -651, 100, 0);
      // 墙面2  立方体比较长的面   右一
      this.createCubeWall(10, 200, 900, 1, this.matArrayB, 651, 100, 0);
      // 墙面3 门对面的墙 立方体比较短的面
      this.createCubeWall(10, 200, 1310, 1.5, this.matArrayB, 0, 100, -451);

      // 墙面4   带门的面
      var wall = this.returnWallObject(1310, 200, 10, 0, this.matArrayB, 0, 100, 455);
      // 门框
      var door_cube = this.returnWallObject(100, 180, 10, 0, this.matArrayB, 0, 90, 455);
      this.createResultBsp(wall, door_cube, 1);

      //为墙面安装门,右门
      var loader = new THREE.TextureLoader();
      loader.load("images/door_right.png", function(texture) {
        var doorgeometry = new THREE.BoxGeometry(100, 180, 2);
        var doormaterial = new THREE.MeshBasicMaterial({
          map: texture,
          color: 0xffffff
        });
        doormaterial.opacity = 1.0;
        doormaterial.transparent = true;
        door = new THREE.Mesh(doorgeometry, doormaterial);
        door.position.set(-50, 0, 0);
        var door1 = door.clone();
        door1.position.set(50, 0, 0);
        door1.visible = false;
        this.dummy.add(door);
        this.dummy.add(door1);
        this.dummy.position.set(50, 90, 451);
        this.scene.add(this.dummy);
      });

      // 房间A:隔墙1
      this.createCubeWall(10, 200, 250, 0, this.matArrayA, -151, 100, 325);
      //房间A:隔墙2  无门
      this.createCubeWall(10, 200, 220, 0.5, this.matArrayA, -256, 100, 201);
      // 厨房：隔墙3
      this.createCubeWall(350, 200, 10, 0, this.matArrayA, 481, 100, 131);
      // 厨房：隔墙4 无门
      this.createCubeWall(10, 200, 200, 0, this.matArrayA, 301, 100, 225);
      // 房间B
      this.createCubeWall(350, 200, 10, 0, this.matArrayA, -471, 100, -50);
      //房间B  无门
      this.createCubeWall(200, 200, 10, 0.5, this.matArrayA, 0, 100, -350);
      // 房间C
      this.createCubeWall(220, 200, 10, 0, this.matArrayA, 540, 100, -50);
      //房间C 无门
      this.createCubeWall(200, 200, 10, 0.5, this.matArrayA, 250, 100, -350);
      //厕所
      var cube = this.returnWallObject(10, 200, 260, 0.5, this.matArrayA, 125, 100, -250);
      //厕所门框
      var door_cube1 = this.returnWallObject(
        10,
        160,
        80,
        0.5,
        this.matArrayA,
        155,
        90,
        -250
      );
      this.createResultBsp(cube, door_cube1, 2);

      //茶色：0x58ACFA   透明玻璃色：0XECF1F3
      var glass_material = new THREE.MeshBasicMaterial({ color: 0x58acfa });
      glass_material.opacity = 0.6;
      glass_material.transparent = true;
      this.createCubeWall(1, 180, 80, 0.5, glass_material, 155, 90, -250);
    },
    // 初始化OBJ对象
    initObject() {
      //墙纹理
      this.createWallMaterail()
      this.createFloor()
      this.createLayout()
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
      TWEEN.update();
      this.update();
    },
    update() {
      var clock = new THREE.Clock();
      var delta = clock.getDelta();
      var moveDistance = 200 * delta;
      var rotateAngle = (Math.PI / 2) * delta;
      this.controls.update();
    }
  }
};
</script>

<style scoped>
.contanier {
  /* height: calc( 100% - 80px ); */
  background: #f3f3f3;
}
.content {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.select-option {
  float: left;
}
.tab-page {
  background: #fff;
  margin-top: 60px;
  color: #333;
}
.tab-content1 {
  height: 560px;
  position: relative;
}
</style>

