import * as THREE from 'three';

// Create Grid
export class Grid {
    constructor(size, factor,scene) {
        this.lineArrayZ = [];
        for (let i = -size * 10; i <= size * 10; i += 10 / factor) {
            const point = [];
            point.push(new THREE.Vector3(i, 0, -size * 10));
            point.push(new THREE.Vector3(i, 0, size * 10));

            const geometryLine = new THREE.BufferGeometry().setFromPoints(point);
            const materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff });
            const line = new THREE.Line(geometryLine, materialLine);
            scene.add(line);
            this.lineArrayZ.push(line);
        }

        this.lineArrayX = [];
        for (let i = -size * 10; i <= size * 10; i += 10 / factor) {
            const point = [];
            point.push(new THREE.Vector3(-size * 10, 0, i));
            point.push(new THREE.Vector3(size * 10, 0, i));

            const geometryLine = new THREE.BufferGeometry().setFromPoints(point);
            const materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff });
            const line = new THREE.Line(geometryLine, materialLine);
            scene.add(line);
            this.lineArrayX.push(line);
        }
    }

    rotateZ(rotation) {
        for (let x in this.lineArrayX) {
            this.lineArrayX[x].rotateZ(rotation*(Math.PI / 180));
        }
        for (let x in this.lineArrayZ) {
            this.lineArrayZ[x].rotateZ(rotation*(Math.PI / 180));
        }
    }

    rotateX(rotation) {
        for (let x in this.lineArrayX) {
            this.lineArrayX[x].rotateX(rotation*(Math.PI / 180));
        }
        for (let x in this.lineArrayZ) {
            this.lineArrayZ[x].rotateX(rotation*(Math.PI / 180));
        }
    }
}

// SpaceObject Class
// Name, Mass, Size(radius), Color, Initial_Angle (radians), Keplerian_Parameters[0,0,0,0,0]
export class SpaceObject {
    constructor(sName,mass,radius, color, initial_angle, k_Parameters) {
        this.name = sName;
        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.angle = initial_angle;
        this.kp = k_Parameters;

        this.material = new THREE.MeshBasicMaterial({ color: color });
        this.geometry = new THREE.SphereGeometry(radius, 7, 6);
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.position = this.mesh.position;
    }

    setPosition(position) {
        this.mesh.position.set(position[0], position[1], position[2]);
    }
}

