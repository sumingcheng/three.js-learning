<template>
  <div ref="mount"></div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const mount = ref(null);

onMounted(() => {
  // 创建一个场景
  const scene = new THREE.Scene();

  // 创建一个具有透视效果的摄像机
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

  // 创建一个渲染器并设置其大小
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 将渲染器的输出（此处是canvas元素）插入你希望的容器
  mount.value.appendChild(renderer.domElement);

  // 创建一个球体几何体：参数分别对应半径、水平分段数、垂直分段数
  const geometry = new THREE.SphereGeometry(1, 32, 32);

  // 加载纹理
  const texture = new THREE.TextureLoader().load('/land_ocean_ice_8192.png');

  // 使用纹理创建材质
  const material = new THREE.MeshBasicMaterial({map: texture});

  // 使用几何体和材质创建网格（物体）
  const earth = new THREE.Mesh(geometry, material);

  // 添加物体到场景中
  scene.add(earth);

  // 添加一个点光源，参数分别对应颜色、强度
  const light = new THREE.PointLight(0xffffff, 1);

  // 设置光源的位置
  light.position.set(5, 5, 5);

  // 将光源添加到场景中
  scene.add(light);

  // 设置摄像机位置
  camera.position.z = 3;

  // 创建轨道控制器，使得我们可以通过鼠标来旋转、缩放和平移场景
  const controls = new OrbitControls(camera, renderer.domElement);

  // 添加一个标记，当用户操作时设为true，用户停止操作时设为false
  let isUserInteracting = false;

  // 监听change事件，当用户操作控制器时触发
  controls.addEventListener('start', function () {
    isUserInteracting = true;
  });

  // 监听end事件，当用户停止操作控制器时触发
  controls.addEventListener('end', function () {
    isUserInteracting = false;
  });

  // 动画
  const animate = function () {
    requestAnimationFrame(animate);

    // 更新控制器
    controls.update();

    // 如果用户没有操作，让地球旋转
    if (!isUserInteracting) {
      earth.rotation.y += 0.001;
    }

    // 渲染场景，使用指定的摄像机作为观察点
    renderer.render(scene, camera);
  };

  animate();
});

</script>

<style scoped lang="less">
</style>
