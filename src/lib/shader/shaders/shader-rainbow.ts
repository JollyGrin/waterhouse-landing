import { Vector2 } from 'three';

const fragmentShader = `
precision mediump float;
#define GLSLIFY 1

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 v_uv;

// Helper function to create a smooth rainbow gradient
vec3 rainbowGradient(float t) {
    return 0.5 + 0.5 * cos(6.28318 * (vec3(0.0, 0.333, 0.666) + t));
}

// Helper function to create a flowing pattern
float flowPattern(vec2 uv, float time) {
    return sin(uv.x * 10.0 + time) * 0.5 + 0.5;
}

// Helper function to create a gentle displacement effect based on mouse position
vec2 gentleDisplacement(vec2 uv, vec2 mouse) {
    float dist = length(uv - mouse);
    return uv + 0.05 * sin(uv.xy * 10.0 + dist * 10.0 + u_time);
}

void main() {
    vec2 uv = v_uv;
    uv.x *= u_resolution.x / u_resolution.y;

    // Apply gentle displacement based on mouse position
    uv = gentleDisplacement(uv, u_mouse);

    // Create a flowing pattern
    float pattern = flowPattern(uv, u_time);

    // Create a smooth rainbow gradient
    vec3 color = rainbowGradient(pattern);

    // Output the final color
    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
}
`;

const vertexShader = `
	varying vec2 v_uv;
	
	void main() {
		v_uv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}`;

const uniforms = {
	u_time: { value: 0 },
	u_mouse: { value: new Vector2(0.5, 0.5) },
	u_resolution: { value: new Vector2(1, 1) }
};

export const shaderConfigRainbow = {
	uniforms,
	vertexShader,
	fragmentShader
};
