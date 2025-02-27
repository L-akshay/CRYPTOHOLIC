import * as THREE from 'three';

// Mapping from container data-model attribute to our model key
const modelMapping = {
  "about-story": "story",
  "achievements": "achievements",
  "future-vision": "futureVision"
};

class AboutPageModels {
  constructor() {
    this.models = {};
    this.scenes = {};
    this.cameras = {};
    this.renderers = {};

    this.initializeModels();
    this.initializeScenes();
    this.animate();

    // Bind the scroll event for interactive animations
    document.addEventListener('scroll', () => this.handleScroll());
    // Optional: Adjust renderers on window resize
    window.addEventListener('resize', () => this.handleResize());
  }

  initializeModels() {
    // Create models for each section
    this.createStoryModel();
    this.createAchievementsModel();
    this.createFutureVisionModel();
  }

  createStoryModel() {
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x0055ff,
      metalness: 0.7,
      roughness: 0.2,
    });
    this.models.story = new THREE.Mesh(geometry, material);

    // Animate rotation continuously
    gsap.to(this.models.story.rotation, {
      y: Math.PI * 2,
      duration: 8,
      repeat: -1,
      ease: "none"
    });
  }

  createAchievementsModel() {
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
      color: 0x0055ff,
      wireframe: true
    });
    this.models.achievements = new THREE.Mesh(geometry, material);

    // Animate scaling for a pulsating effect
    gsap.to(this.models.achievements.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }

  createFutureVisionModel() {
    const geometry = new THREE.OctahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0x0055ff,
      metalness: 0.5,
      roughness: 0.5
    });
    this.models.futureVision = new THREE.Mesh(geometry, material);

    // Animate full rotation on both axes
    gsap.to(this.models.futureVision.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: "none"
    });
  }

  // Initialize Three.js scenes for each model container
  initializeScenes() {
    const containers = document.querySelectorAll('.model-container');
    containers.forEach(container => {
      const dataModel = container.getAttribute('data-model');
      const modelKey = modelMapping[dataModel];
      if (!modelKey || !this.models[modelKey]) return;

      // Create a new scene and add basic ambient light
      const scene = new THREE.Scene();
      scene.add(new THREE.AmbientLight(0xffffff, 1));

      // Create a camera suited to the container's dimensions
      const width = container.clientWidth;
      const height = container.clientHeight;
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      camera.position.z = 3;

      // Add the corresponding model to the scene
      scene.add(this.models[modelKey]);

      // Create a renderer with transparent background
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      // Save the scene, camera, and renderer using the data-model as the key
      this.scenes[dataModel] = scene;
      this.cameras[dataModel] = camera;
      this.renderers[dataModel] = renderer;
    });
  }

  // Update and render all scenes
  animate() {
    Object.keys(this.scenes).forEach(key => {
      const scene = this.scenes[key];
      const camera = this.cameras[key];
      const renderer = this.renderers[key];
      renderer.render(scene, camera);
    });
    requestAnimationFrame(this.animate.bind(this));
  }

  // Handle scroll-based rotation adjustments for all models
  handleScroll() {
    const scrollPosition = window.pageYOffset;
    Object.values(this.models).forEach(model => {
      gsap.to(model.rotation, {
        y: scrollPosition * 0.001,
        duration: 1,
        ease: "power2.out"
      });
    });
  }

  // Handle window resize to update renderer sizes and camera aspect ratios
  handleResize() {
    Object.keys(this.renderers).forEach(key => {
      const container = document.querySelector(`.model-container[data-model="${key}"]`);
      if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        const renderer = this.renderers[key];
        const camera = this.cameras[key];

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });
  }
}

// Initialize About page models
const aboutModels = new AboutPageModels();
