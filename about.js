// Initialize and manage 3D models for the About page
import * as THREE from 'three';

class AboutPageModels {
    constructor() {
        this.models = {};
        this.initializeModels();
    }

    initializeModels() {
        // Story Model
        this.createStoryModel();
        // Achievements Model
        this.createAchievementsModel();
        // Future Vision Model
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
        
        // Animation
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
        
        // Animation
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
        
        // Animation
        gsap.to(this.models.futureVision.rotation, {
            x: Math.PI * 2,
            y: Math.PI * 2,
            duration: 10,
            repeat: -1,
            ease: "none"
        });
    }

    // Handle scroll animations
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
}

// Initialize
const aboutModels = new AboutPageModels();
document.addEventListener('scroll', () => aboutModels.handleScroll());