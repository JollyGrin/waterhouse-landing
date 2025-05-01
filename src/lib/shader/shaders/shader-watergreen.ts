import { Vector2 } from 'three';

const fragmentShader = `
precision mediump float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 v_uv;

// Classic noise functions from https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec2 mod289(vec2 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec3 mod289(vec3 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
float permute(float x) {return mod289(((x*34.0)+1.0)*x);}
vec2 permute(vec2 x) {return mod289(((x*34.0)+1.0)*x);}
vec3 permute(vec3 x) {return mod289(((x*34.0)+1.0)*x);}
vec4 permute(vec4 x) {return mod289(((x*34.0)+1.0)*x);}
float taylorInvSqrt(float r) {return 1.79284291400159 - 0.85373472095314 * r;}
vec4 taylorInvSqrt(vec4 r) {return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
    // First corner
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);

    // Other corners
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    // Permutations
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;

    // Gradients: 41 points uniformly over a line, mapped onto a diamond.
    // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt( a0*a0 + h*h );
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

    // Compute final noise value at P
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 2.0;
    float lacunarity = 2.0;
    float persistence = 0.5;
    
    for (int i = 0; i < 6; i++) {
        value += amplitude * snoise(p * frequency);
        frequency *= lacunarity;
        amplitude *= persistence;
    }
    
    return value;
}

vec3 greenGradient(float t) {
    vec3 col1 = vec3(0.0, 0.15, 0.05);
    vec3 col2 = vec3(0.1, 0.4, 0.2);
    vec3 col3 = vec3(0.2, 0.8, 0.4);
    vec3 col4 = vec3(0.6, 1.0, 0.7);
    
    if (t < 0.33) {
        return mix(col1, col2, t / 0.33);
    } else if (t < 0.66) {
        return mix(col2, col3, (t - 0.33) / 0.33);
    } else {
        return mix(col3, col4, (t - 0.66) / 0.34);
    }
}

void main() {
    // Correct aspect ratio
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    uv = uv * 2.0 - 1.0;
    uv *= aspect;
    
    // Mouse interaction
    vec2 mouse = u_mouse * 2.0 - 1.0;
    mouse.x *= aspect.x;
    
    // Calculate distance from mouse
    float mouseDist = length(uv - mouse);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.8, mouseDist);
    
    // Create liquid effect with FBM noise
    float speed = 0.2;
    vec2 p = uv;
    
    // Distort the UV coordinates based on mouse position
    float distortionAmount = 0.3 + mouseInfluence * 0.7;
    p += vec2(
        fbm(p * 0.8 + vec2(0.0, u_time * speed)) * distortionAmount,
        fbm(p * 0.8 + vec2(u_time * speed, 0.0)) * distortionAmount
    );
    
    // Create main liquid pattern
    float n1 = fbm(p * 1.0 + u_time * 0.1);
    float n2 = fbm(p * 1.5 - u_time * 0.15);
    float n3 = fbm(p * 0.5 + u_time * 0.2);
    
    // Combine noise for liquid effect
    float liquid = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    
    // Add ripple effect from mouse
    float ripple = sin(mouseDist * 10.0 - u_time * 3.0) * 0.5 + 0.5;
    liquid = mix(liquid, ripple, mouseInfluence * 0.3);
    
    // Create gradient and apply liquid distortion
    float gradientBase = (uv.y + 1.0) * 0.5;
    float gradient = gradientBase + liquid * 0.3;
    
    // Enhance border effects
    float edge = abs(liquid - 0.5) * 2.0;
    edge = pow(edge, 3.0);
    
    // Create final color
    vec3 color = greenGradient(gradient);
    
    // Add glow around mouse
    float glow = exp(-mouseDist * 5.0) * 0.5;
    color += vec3(0.2, 1.0, 0.4) * glow;
    
    // Add highlights
    color += vec3(0.8, 1.0, 0.9) * edge * 0.2;
    
    // Add bubble-like details based on mouse movement
    float bubbles = fbm(p * 5.0 + mouse * 0.5);
    bubbles = smoothstep(0.6, 0.7, bubbles) * mouseInfluence;
    color += vec3(0.4, 1.0, 0.6) * bubbles;
    
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

export const shaderConfigWaterGreen = {
	uniforms,
	vertexShader,
	fragmentShader
};
