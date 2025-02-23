import * as THREE from 'three';

class DomainModels {
    constructor() {
        this.models = {};
        this.initializeModels();
    }

    initializeModels() {
        // Create models for each domain
        this.createBlockchainModel();
        this.createAIModel();
        this.createMetaverseModel();
    }

    createBlockchainModel() {
        // Create a chain-like structure
        const group = new THREE.Group();
        
        for(let i = 0; i < 5; i++) {
            const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
            const material = new THREE.MeshStandardMaterial({
                color: 0x0055ff,
                metalness: 0.7,
                roughness: 0.2
            });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.x = i * 1.2;
            group.add(cube);

            // Add connecting lines
            if(i < 4) {
                const lineGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.2);
                const lineMaterial = new THREE.MeshBasicMaterial({color: 0x0055ff});
                const line = new THREE.Mesh(lineGeometry, lineMaterial);
                line.position.x = i * 1.2 + 0.6;
                line.rotation.z = Math.PI / 2;
                group.add(line);
            }
        }

        this.models.blockchain = group;
        
        // Animation
        gsap.to(group.rotation, {
            y: Math.PI * 2,
            duration: 10,
            repeat: -1,
            ease: "none"
        });
    }

    createAIModel() {
        // Create a neural network visualization
        const group = new THREE.Group();
        
        // Create nodes
        const layers = [3, 4, 3];
        const nodeGeometry = new THREE.SphereGeometry(0.2);
        const nodeMaterial = new THREE.MeshStandardMaterial({
            color: 0x0055ff,
            metalness: 0.5
        });

        layers.forEach((count, layerIndex) => {
            for(let i = 0; i < count; i++) {
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
                node.position.x = (layerIndex - 1) * 2;
                node.position.y = (i - (count-1)/2) * 1;
                group.add(node);

                // Add connections to next layer
                if(layerIndex < layers.length - 1) {
                    for(let j = 0; j < layers[layerIndex + 1]; j++) {
                        const lineGeometry = new THREE.BufferGeometry();
                        const lineMaterial = new THREE.LineBasicMaterial({color: 0x0033cc});
                        
                        const points = [];
                        points.push(node.position);
                        points.push(new THREE.Vector3(
                            node.position.x + 2,
                            (j - (layers[layerIndex + 1]-1)/2) * 1,
                            0
                        ));
                        
                        lineGeometry.setFromPoints(points);
                        const line = new THREE.Line(lineGeometry, lineMaterial);
                        group.add(line);
                    }
                }
            }
        });

        this.models.ai = group;
        
        // Animation
        gsap.to(group.rotation, {
            y: Math.PI / 2,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }

    createMetaverseModel() {
        // Create a virtual world representation
        const group = new THREE.Group();
        
        // Create central sphere
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0x0055ff,
            metalness: 0.8,
            roughness: 0.2,
            wireframe: true
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        group.add(sphere);

        // Add orbiting objects
        for(let i = 0; i < 3; i++) {
            const orbitGroup = new THREE.Group();
            
            const orbitGeometry = new THREE.TorusGeometry(2 + i * 0.5, 0.02, 16, 100);
            const orbitMaterial = new THREE.MeshBasicMaterial({color: 0x003366});
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbitGroup.add(orbit);
            
            const objectGeometry = new THREE.OctahedronGeometry(0.2);
            const objectMaterial = new THREE.MeshStandardMaterial({
                color: 0x0055ff,
                metalness: 0.6
            });
            const object = new THREE.Mesh(objectGeometry, objectMaterial);
            object.position.x = 2 + i * 0.5;
            orbitGroup.add(object);
            
            orbitGroup.rotation.x = i * Math.PI / 4;
            group.add(orbitGroup);
            
            // Animation
            gsap.to(orbitGroup.rotation, {
                y: Math.PI * 2,
                duration: 5 + i * 2,
                repeat: -1,
                ease: "none"
            });
        }

        this.models.metaverse = group;
        
        // Main group animation
        gsap.to(group.rotation, {
            y: Math.PI * 2,
            duration: 15,
            repeat: -1,
            ease: "none"
        });
    }

    // Handle scroll animations
    handleScroll() {
        const scrollPosition = window.pageYOffset;
        Object.values(this.models).forEach(model => {
            gsap.to(model.rotation, {
                x: scrollPosition * 0.001,
                duration: 1,
                ease: "power2.out"
            });
        });
    }
}

// Initialize
const domainModels = new DomainModels();
document.addEventListener('scroll', () => domainModels.handleScroll());