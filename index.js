//   {
//     "imports": {
// "three": "https://unpkg.com/three@0.147.0/build/three.module.js",
// "three/addons/": "https://unpkg.com/three@0.147.0/examples/jsm/",
// "mindar-image-three":"https://cdn.jsdelivr.net/npm/mind-ar@1.2.0/dist/mindar-image-three.prod.js"
//     }
//   }
import * as THREE from "three";
import { MindARThree } from "mindar-image-three";
import { cargarModelo, cargarModeloAnimado } from "./CargarModelo.js";

let mixers = [];
var clock = new THREE.Clock();

const mindarThree = new MindARThree({
  container: document.querySelector("#container"),
  imageTargetSrc: "./targets/targets.mind", //nombre del archivo
});
const { renderer, scene, camera } = mindarThree;

let iluminador = new THREE.PMREMGenerator(renderer);
iluminador.compileEquirectangularShader();
new THREE.TextureLoader().load("./hdr/fondoRedu.png", function (texture) {
  var texturaCielo = iluminador.fromEquirectangular(texture);
  scene.environment = texturaCielo.texture;
  texture.dispose();
  iluminador.dispose();
});

//--------Aqui agregamos la cantidad necesaria de anclas
const ancla1 = mindarThree.addAnchor(0);
const ancla2 = mindarThree.addAnchor(1);

//----- Cargamos los modelos
cargarModelo("./modelo/modeloMeteorito_lowPoly.glb", ancla1, 0.1);
cargarModelo("./modelo/modeloMeteorito_lowPoly.glb", ancla2, 0.1);

const start = async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    if (mixers.length > 0) {
      for (let i = 0; i < mixers.length; i++) {
        mixers[i].update(clock.getDelta());
      }
    }
    renderer.render(scene, camera);
  });
};
start();
