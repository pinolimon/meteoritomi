import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
async function cargarModelo(archivo, ancla, escala = 1) {
  var loader = new GLTFLoader();
  loader.load(archivo, function (gltf) {
    gltf.scene.scale.set(escala, escala, escala);
    ancla.group.add(gltf.scene);
  });
}

async function cargarModeloAnimado(archivo, ancla, mixers, escala = 1) {
  var loader = new GLTFLoader();
  loader.load(archivo, function (gltf) {
    const clips = gltf.animations;

    var animation = gltf.animations[0];
    if (animation) {
      var mixer = new THREE.AnimationMixer(gltf.scene);
      mixers.push(mixer);
      // const clip = THREE.AnimationClip.findByName(clips, "flamingo_flyA_");
      var action = mixer.clipAction(animation);
      action.play();
    }

    // root.matrixAutoUpdate = false;
    // root.add(model);

    // model.position.z = -100;

    gltf.scene.scale.set(escala, escala, escala);
    ancla.group.add(gltf.scene);
  });
}

export { cargarModeloAnimado, cargarModelo };
