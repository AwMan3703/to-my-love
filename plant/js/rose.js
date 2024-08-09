let mouseDown = 0;
document.body.onmousedown = function() {
	++mouseDown;
}
document.body.onmouseup = function() {
	--mouseDown;
}

const canvas = document.getElementById("rose-canvas");
const gl = canvas.getContext("webgl2");

if (!gl) {
	throw "WebGL 2 not supported or cannot initialize.";
}

function createShader(gl, sourceCode, type) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, sourceCode);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		const info = gl.getShaderInfoLog(shader);
		throw `Could not compile WebGL shader. \n\n${info}`;
	}
	return shader;
}

const vertexShaderSource = `#version 300 es
in vec4 position;
void main() {
  gl_Position = position;
}`;

const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

out vec4 fragColor;

const int max_iterations = 128;
const float stop_threshold = 0.01;
const float grad_step = 0.01;
const float clip_far = 10.0;

const float PI = 3.14159265359;
const float PI2 = 6.28318530718;
const float DEG_TO_RAD = PI / 180.0;

mat3 rotationXY(vec2 angle) {
    vec2 c = cos(angle);
    vec2 s = sin(angle);
    
    return mat3(
        c.y      ,  0.0, -s.y,
        s.y * s.x,  c.x,  c.y * s.x,
        s.y * c.x, -s.x,  c.y * c.x
    );
}

float opI(float d1, float d2) {
    return max(d1, d2);
}

float opU(float d1, float d2) {
    return min(d1, d2);
}

float opS(float d1, float d2) {
    return max(-d1, d2);
}

float sdPetal(vec3 p, float s) {
    p = p * vec3(0.8, 1.5, 0.8) + vec3(0.1, 0.0, 0.0);
    vec2 q = vec2(length(p.xz), p.y);
    
    float lower = length(q) - 1.0;
    lower = opS(length(q) - 0.97, lower);
    lower = opI(lower, q.y);
    
    float upper = length((q - vec2(s, 0)) * vec2(1, 1)) + 1.0 - s;
    upper = opS(upper, length((q - vec2(s, 0)) * vec2(1, 1)) + 0.97 - s);
    upper = opI(upper, -q.y);
    upper = opI(upper, q.x - 2.0);
    
    float region = length(p - vec3(1.0, 0.0, 0.0)) - 1.0;

    return opI(opU(upper, lower), region);
}

float map(vec3 p) {
    float d = 1000.0, s = 2.0;
    mat3 r = rotationXY(vec2(0.1, PI2 * 0.618034));
    r = r * mat3(1.08,0.0,0.0 ,0.0,0.995,0.0, 0.0,0.0,1.08);
    for (int i = 0; i < 21; i++) {
        d = opU(d, sdPetal(p, s));
        p = r * p;
        p += vec3(0.0, -0.02, 0.0);
        s *= 1.05;
    }
    return d;
}

vec3 gradient(vec3 pos) {
    const vec3 dx = vec3(grad_step, 0.0, 0.0);
    const vec3 dy = vec3(0.0, grad_step, 0.0);
    const vec3 dz = vec3(0.0, 0.0, grad_step);
    return normalize(
        vec3(
            map(pos + dx) - map(pos - dx),
            map(pos + dy) - map(pos - dy),
            map(pos + dz) - map(pos - dz)
        )
    );
}

float ray_marching(vec3 origin, vec3 dir, float start, float end) {
    float depth = start;
    for (int i = 0; i < max_iterations; i++) {
        float dist = map(origin + dir * depth);
        if (dist < stop_threshold) {
            return depth;
        }
        depth += dist * 0.3;
        if (depth >= end) {
            return end;
        }
    }
    return end;
}

const vec3 light_pos = vec3(20.0, 50.0, 20.0);

vec3 shading(vec3 v, vec3 n, vec3 eye) {
    vec3 ev = normalize(v - eye);
    vec3 mat_color = vec3(0.65, 0.0, 0.0);
 
    vec3 vl = normalize(light_pos - v);

    float diffuse = dot(vl, n) * 0.5 + 0.5;
    vec3 h = normalize(vl - ev);
    float rim = pow(1.0 - max(dot(n, -ev), 0.0), 2.0) * 0.15;
    float ao = clamp(v.y * 0.5 + 0.5, 0.0, 1.0);
    return (mat_color * diffuse + rim) * ao;
}

vec3 ray_dir(float fov, vec2 size, vec2 pos) {
    vec2 xy = pos - size * 0.5;

    float cot_half_fov = tan((90.0 - fov * 0.5) * DEG_TO_RAD);
    float z = size.y * 0.5 * cot_half_fov;
    
    return normalize(vec3(xy, -z));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec3 dir = ray_dir(45.0, iResolution.xy, fragCoord.xy);
    vec3 eye = vec3(0.0, 0.0, 5.0);

    mat3 rot = rotationXY(vec2(-1.0, 1.0));
    if (iMouse.x > 0.0)
        rot = rotationXY(iMouse.yx / iResolution.yx * vec2(PI, -2.0 * PI) + vec2(PI * -0.5, PI));
    
    dir = rot * dir;
    eye = rot * eye;
    
    float depth = ray_marching(eye, dir, 0.0, clip_far);
    vec3 pos = eye + dir * depth;
    vec3 c;
    if (depth >= clip_far) {
        discard;  // Discard background pixels
    } else {
        vec3 n = gradient(pos);
        c = shading(pos, n, eye);
    }
    
    float r = 1.2 - length((fragCoord.xy / iResolution.xy) - 0.5) * 1.0;
    fragColor = vec4(c * r, 1.0);
}

void main() {
    mainImage(fragColor, gl_FragCoord.xy);
}
`;

const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
const fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
	const info = gl.getProgramInfoLog(shaderProgram);
	throw `Could not compile WebGL program. \n\n${info}`;
}

gl.useProgram(shaderProgram);

const positions = new Float32Array([
	-1.0, -1.0,
	1.0, -1.0,
	-1.0,  1.0,
	-1.0,  1.0,
	1.0, -1.0,
	1.0,  1.0,
]);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(shaderProgram, "position");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES, 0, 6);

const timeLocation = gl.getUniformLocation(shaderProgram, "iTime");
const mouseLocation = gl.getUniformLocation(shaderProgram, "iMouse");
const resolutionLocation = gl.getUniformLocation(shaderProgram, "iResolution");

let startTime = Date.now();
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener("mousemove", (event) => {
	mouseX = event.clientX;
	mouseY = event.clientY;
});

function render() {
	let currentTime = (Date.now() - startTime) / 1000;
	gl.uniform1f(timeLocation, currentTime);

	if (mouseDown) {
		gl.uniform2f(mouseLocation, mouseX, canvas.height - mouseY);
	}

	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

	gl.drawArrays(gl.TRIANGLES, 0, 6);

	requestAnimationFrame(render);
}

render();
