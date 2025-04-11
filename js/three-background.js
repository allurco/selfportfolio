/*
   ========================================================================
   Three.js Background Animation: Rogers Sampaio Personal Portfolio
   ========================================================================
*/

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (typeof THREE === 'undefined') {
        console.error('THREE is not defined. Make sure Three.js is loaded.');
        return;
    }

    // Get the container
    const container = document.getElementById('canvas-container');
    if (!container) {
        console.error('Canvas container not found');
        return;
    }

    // Create scene
    const scene = new THREE.Scene();

    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create particles
    const PARTICLE_COUNT = 800;
    const positions = [];

    // Generate particles in patterns
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        if (i < PARTICLE_COUNT * 0.5) {
            // Spherical pattern
            const radius = Math.random() * 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            positions.push(x, y, z);
        } else {
            // Column pattern
            const columnCount = 5;
            const columnIndex = Math.floor(Math.random() * columnCount);
            const columnOffset = (columnIndex - columnCount/2) * 5;
            
            const x = columnOffset + (Math.random() - 0.5) * 2;
            const y = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 5;
            
            positions.push(x, y, z);
        }
    }

    // Create geometry
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    // Particle material
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xa47864, // Mocha Mousse (Pantone Color of the Year 2025)
        size: 0.15,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    // Create the particle system
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Particle velocities for animation
    const velocities = [];
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        velocities.push((Math.random() - 0.5) * 0.01);
    }

    // Animate particles
    function animateParticles() {
        const positions = particleSystem.geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i] * 0.5;
            positions[i+1] += velocities[i+1] * 0.5;
            positions[i+2] += velocities[i+2] * 0.5;
            
            // Boundary check
            if (Math.sqrt(positions[i]**2 + positions[i+1]**2 + positions[i+2]**2) > 15) {
                positions[i] *= 0.95;
                positions[i+1] *= 0.95;
                positions[i+2] *= 0.95;
                
                velocities[i] *= -0.7;
                velocities[i+1] *= -0.7;
                velocities[i+2] *= -0.7;
            }
        }
        
        particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Scroll effects
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY || window.pageYOffset;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.max(0, Math.min(1, scrollY / maxScroll));
        
        // Rotate based on scroll
        particleSystem.rotation.x = scrollPercentage * Math.PI * 0.5;
        camera.position.y = -scrollPercentage * 5;
        
        // Color transition
        const startColor = new THREE.Color(0xa47864); // Mocha Mousse
        const endColor = new THREE.Color(0xd88c68);   // Terracotta complement
        
        const color = startColor.clone().lerp(endColor, scrollPercentage);
        particleMaterial.color = color;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;
        
        animateParticles();
        
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
});
