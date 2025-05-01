import { Vector2 } from 'three';

const fragmentShader = `
precision mediump float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 v_uv;

// Random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Function to get a random digit (0-9)
float getDigit(vec2 st) {
    float r = random(st);
    return floor(r * 10.0);
}

// Function to draw a digit
float drawDigit(vec2 uv, float digit) {
    // Define a grid for the digit segments
    float size = 0.6;
    vec2 pos = (uv - 0.5) / size + 0.5;
    
    if (pos.x < 0.0 || pos.x > 1.0 || pos.y < 0.0 || pos.y > 1.0) return 0.0;
    
    // Simple digit rendering using distance fields
    vec2 center = vec2(0.5);
    float d = length(pos - center) - 0.3;
    
    // Different shapes for different digits
    if (digit < 3.0) {
        // Digits 0-2: circle with varying thickness
        d = length(pos - center) - (0.25 + digit * 0.05);
    } else if (digit < 6.0) {
        // Digits 3-5: square with varying size
        vec2 q = abs(pos - center) - (0.2 + (digit - 3.0) * 0.03);
        d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
    } else {
        // Digits 6-9: different shapes
        float angle = atan(pos.y - center.y, pos.x - center.x);
        float r = length(pos - center);
        float sides = 3.0 + floor(digit - 6.0);
        d = r - 0.25 - 0.1 * cos(sides * angle);
    }
    
    return smoothstep(0.05, 0.03, d);
}

void main() {
    // Correct aspect ratio
    vec2 uv = v_uv;
    float aspectRatio = u_resolution.x / u_resolution.y;
    uv.x *= aspectRatio;
    
    // Grid size (number of cells)
    float gridSize = 25.0;
    
    // Scale grid based on mouse position
    vec2 mousePos = u_mouse;
    mousePos.x *= aspectRatio;
    float distToMouse = length(uv - mousePos);
    float scaleFactor = 1.0 + 0.5 * smoothstep(0.3, 0.0, distToMouse);
    
    // Apply scaling around mouse
    vec2 scaledUV = uv + (uv - mousePos) * (1.0 - 1.0/scaleFactor);
    
    // Calculate grid cell
    vec2 cell = floor(scaledUV * gridSize);
    vec2 cellUV = fract(scaledUV * gridSize);
    
    // Add floating effect (different for each cell)
    float floatSpeed = 0.5;
    float floatAmount = 0.03;
    vec2 offset = vec2(
        sin(u_time * floatSpeed + random(cell) * 6.28) * floatAmount,
        cos(u_time * floatSpeed + random(cell + 1.0) * 6.28) * floatAmount
    );
    
    cellUV += offset;
    
    // Get digit for this cell
    float digit = getDigit(cell);
    
    // Draw the digit
    float digitMask = drawDigit(cellUV, digit);
    
    // Background color (dark)
    vec3 bgColor = vec3(0.05, 0.07, 0.1);
    
    // Terminal green text color with slight variation
    vec3 textColor = vec3(0.8, 0.95, 0.8) * (0.8 + 0.2 * random(cell + u_time * 0.01));
    
    // Apply a subtle glow based on mouse proximity
    float glow = smoothstep(0.5, 0.0, distToMouse) * 0.5;
    textColor += vec3(0.1, 0.3, 0.1) * glow;
    
    // Final color
    vec3 color = mix(bgColor, textColor, digitMask);
    
    // Add subtle scanlines
    color *= 0.9 + 0.1 * sin(uv.y * u_resolution.y * 0.5);
    
    // Add vignette
    float vignette = smoothstep(1.0, 0.3, length((v_uv - 0.5) * 1.5));
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
    
    #include <colorspace_fragment>
	}`;

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

export const shaderConfigMdr = {
	uniforms,
	vertexShader,
	fragmentShader
};
