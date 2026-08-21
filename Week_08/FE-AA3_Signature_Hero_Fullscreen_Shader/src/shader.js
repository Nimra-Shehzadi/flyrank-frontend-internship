const canvas = document.getElementById("shaderCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("WebGL is not supported in this browser.");
}

const vertexShaderSource = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  float aspect = u_resolution.x / u_resolution.y;
  uv.x *= aspect;

  vec2 mouse = u_mouse / u_resolution.xy;
  mouse.x *= aspect;

  float time = u_time * 0.15;

  float wave1 = sin(uv.x * 4.0 + time);
  float wave2 = sin(uv.y * 5.0 - time * 1.2);
  float wave3 = sin((uv.x + uv.y) * 6.0 + time);

  float glow = (wave1 + wave2 + wave3) / 3.0;

  float mouseDistance = distance(uv, mouse);
  float mouseGlow = exp(-mouseDistance * 5.0);

  vec3 deepBlue = vec3(0.01, 0.05, 0.09);
  vec3 teal = vec3(0.02, 0.55, 0.48);
  vec3 cyan = vec3(0.0, 0.85, 0.85);

  vec3 color = mix(deepBlue, teal, glow * 0.35 + 0.35);
  color = mix(color, cyan, mouseGlow * 0.45);

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(vertexSource, fragmentSource) {
  const vertexShader = createShader(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource);

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }

  return program;
}

const program = createProgram(
  vertexShaderSource,
  fragmentShaderSource
);

gl.useProgram(program);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1
  ]),
  gl.STATIC_DRAW
);

const positionLocation = gl.getAttribLocation(
  program,
  "a_position"
);

gl.enableVertexAttribArray(positionLocation);

gl.vertexAttribPointer(
  positionLocation,
  2,
  gl.FLOAT,
  false,
  0,
  0
);

const timeLocation = gl.getUniformLocation(
  program,
  "u_time"
);

const resolutionLocation = gl.getUniformLocation(
  program,
  "u_resolution"
);

const mouseLocation = gl.getUniformLocation(
  program,
  "u_mouse"
);

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = canvas.height - event.clientY;
});

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", resize);

resize();

function render(time) {
  gl.uniform1f(timeLocation, time * 0.001);

  gl.uniform2f(
    resolutionLocation,
    canvas.width,
    canvas.height
  );

  gl.uniform2f(
    mouseLocation,
    mouseX,
    mouseY
  );

  gl.drawArrays(
    gl.TRIANGLES,
    0,
    6
  );

  requestAnimationFrame(render);
}

requestAnimationFrame(render);