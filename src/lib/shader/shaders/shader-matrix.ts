import { Vector2 } from 'three';

const fragmentShader = `
precision mediump float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 v_uv;

// Random function
float random(float x) {
    return fract(sin(x * 12.9898) * 43758.5453);
}

// 2D Random
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

// Value noise
float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(random(i), random(i + 1.0), u);
}

// Character function
float character(vec2 p, float character) {
    // Simple character representation using a grid
    p = floor(p * vec2(3.0, 5.0));
    float c = mod(character, 10.0);
    
    // Different patterns for different characters
    if (c < 1.0) {
        if (p.y < 1.0 || p.y > 3.0) return 0.0;
        if (p.x == 1.0) return 1.0;
    } else if (c < 2.0) {
        if (p.x == 0.0 && p.y == 2.0) return 1.0;
        if (p.x == 1.0 && p.y != 2.0) return 1.0;
        if (p.x == 2.0 && p.y == 2.0) return 1.0;
    } else if (c < 3.0) {
        if (p.y == 0.0 || p.y == 2.0 || p.y == 4.0) return 1.0;
        if (p.x == 2.0) return 1.0;
    } else if (c < 4.0) {
        if (p.y == 0.0 || p.y == 4.0) return 1.0;
        if (p.x == 0.0 && p.y == 2.0) return 1.0;
        if (p.x == 2.0) return 1.0;
    } else if (c < 5.0) {
        if (p.x == 0.0 && p.y > 2.0) return 1.0;
        if (p.y == 2.0) return 1.0;
        if (p.x == 2.0) return 1.0;
    } else if (c < 6.0) {
        if (p.y == 0.0 || p.y == 2.0 || p.y == 4.0) return 1.0;
        if (p.x == 0.0) return 1.0;
        if (p.x == 2.0 && p.y < 2.0) return 1.0;
    } else if (c < 7.0) {
        if (p.y == 0.0 || p.y == 2.0 || p.y == 4.0) return 1.0;
        if (p.x == 0.0) return 1.0;
        if (p.x == 2.0 && p.y != 2.0) return 1.0;
    } else if (c < 8.0) {
        if (p.y == 4.0) return 1.0;
        if (p.x == 2.0) return 1.0;
    } else if (c < 9.0) {
        if (p.y == 0.0 || p.y == 2.0 || p.y == 4.0) return 1.0;
        if (p.x == 0.0 || p.x == 2.0) return 1.0;
    } else {
        if (p.y == 0.0 || p.y == 2.0 || p.y == 4.0) return 1.0;
        if (p.x == 0.0 && p.y > 2.0) return 1.0;
        if (p.x == 2.0) return 1.0;
    }
    
    return 0.0;
}

void main() {
    // Adjust for aspect ratio
    vec2 uv = v_uv;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;
    
    // Grid for characters
    float cellSize = 0.04;
    vec2 cell = floor(uv / cellSize);
    vec2 cellUV = fract(uv / cellSize);
    
    // Mouse influence on cell size
    float mouseEffect = length(v_uv - u_mouse);
    cellSize *= 1.0 + 0.5 * (1.0 - smoothstep(0.0, 0.3, mouseEffect));
    
    // Rain speed based on position and random offset
    float speed = 0.5 + random(cell.x) * 0.8;
    float rainOffset = mod(u_time * speed + random(cell.x) * 10.0, 1.0);
    
    // Vertical position with wrapping
    float y = mod(cell.y + rainOffset * 20.0, 20.0);
    
    // Character value based on position
    float charValue = floor(random(cell + floor(u_time * 0.2)) * 10.0);
    
    // Fade out based on y position
    float fade = smoothstep(15.0, 0.0, y);
    
    // Render character
    float char = character(cellUV, charValue);
    
    // Matrix green color with brightness based on y position
    vec3 color = vec3(0.0, 0.8, 0.4) * char * (0.5 + fade * 0.5);
    
    // Add glow effect
    float glow = char * fade * 0.8;
    color += vec3(0.0, 0.6, 0.3) * glow;
    
    // Add subtle head brightness for falling characters
    float headGlow = smoothstep(0.8, 1.0, 1.0 - rainOffset) * char;
    color += vec3(0.8, 1.0, 0.8) * headGlow;
    
    // Dark background
    color += vec3(0.0, 0.02, 0.01);
    
    // Mouse interaction - brighten characters near mouse
    float mouseBrightness = (1.0 - smoothstep(0.0, 0.2, mouseEffect)) * 0.5;
    color += vec3(0.0, mouseBrightness, mouseBrightness * 0.5) * char;
    
    // Output final color
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

export const shaderConfigMatrix = {
	uniforms,
	vertexShader,
	fragmentShader
};
