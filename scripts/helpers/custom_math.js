import * as THREE from 'three';
import * as CMESH from './custom_meshes.js';

// Set Planet Orbit Position
// Deprecated Function
/*
export function setRotation(planet,time, speed,secondary,radius) {
    const initialPlanetAngle = planet.angle;
    let planet_angle = initialPlanetAngle;

    planet_angle += time/1000 * speed;
    const planet_x = radius * Math.cos(planet_angle) + secondary.mesh.position.x;
    const planet_y = radius * Math.sin(planet_angle) + secondary.mesh.position.y;
    planet.setPosition([planet_x,planet_y,0]);
}*/

// AU to Meters
// Scale 1:100
export function auMeter(AU) {
    return AU*1000.00;
}

// Degree to Radians
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Calculate Elliptical Orbit Position of Planet
function ellipticalOrbit(smajor_axis,eccentricity,orbital_planet,central_body) {
    // Planet angle in relative to central body axis.
    const planetAngle = Math.atan2(orbital_planet.position.y - central_body.position.y,
        orbital_planet.position.x - central_body.position.x);
    
    // PerihelionAngle in relative to x axis
    const perihelionAngle = 0;

    // Perihelion Angle
    const perihelion_angle = planetAngle - perihelionAngle;

    // Elliptical Orbit Equation
    const r = smajor_axis * (1 - eccentricity^2) / (1 + eccentricity * Math.cos(perihelion_angle))
    return r
}

// orbitX
// Returns the x value of orbital_planet at specific time  and central body.
// orbital_planet, central_body, time -> double
export function orbitX(orbital_planet,central_body,speed) {
    orbital_planet.angle += (1/60)*speed;
    const sMajor_Axis = orbital_planet.kp[0];
    const eccentricity = orbital_planet.kp[1];
    return ellipticalOrbit(sMajor_Axis,eccentricity,orbital_planet,central_body)*Math.cos(orbital_planet.angle)+central_body.position.x;
}

// orbitX
// Returns the y value of orbital_planet at specific time and central body.
// orbital_planet, central_body, time -> double
export function orbitY(orbital_planet,central_body,speed) {
    orbital_planet.angle += (1/60)*speed;
    const sMajor_Axis = orbital_planet.kp[0];
    const eccentricity = orbital_planet.kp[1];
    return ellipticalOrbit(sMajor_Axis,eccentricity,orbital_planet,central_body)*Math.sin(orbital_planet.angle)+central_body.position.y;
}

// orbitX
// Returns the x,y value of orbital_planet at specific time and central body and at given speed multiplier.
// orbital_planet, central_body, time -> double
export function orbitPlanet(orbital_planet,central_planet,speed) {
    orbital_planet.position.x = orbitX(orbital_planet,central_planet,speed);
    orbital_planet.position.y = orbitY(orbital_planet,central_planet,speed);
}

// Not Working
/*
export function orbit(orbital_planet,central_body,time) {
    orbital_planet.angle += (time/time)/60;
    return new THREE.Vector3(ellipticalOrbit(orbital_planet.smajor_axis,orbital_planet.eccentricity,orbital_planet,central_body)*Math.cos(orbital_planet.angle)+central_body.position.x,ellipticalOrbit(orbital_planet.smajor_axis,orbital_planet.eccentricity,orbital_planet,central_body)*Math.sin(orbital_planet.angle)+central_body.position.y,0);
}*/


