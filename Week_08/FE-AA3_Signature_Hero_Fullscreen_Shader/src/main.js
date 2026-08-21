import "./style.css";
import shaderSource from "./shaders/hero.frag?raw";

const canvas = document.querySelector("#shaderCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  document.body.innerHTML =
    "<h1>WebGL is not supported in this browser.</h1>";
  throw new Error("WebGL not supported");
}

const vertexSource = `
attribute vec2 a_position;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

function createShader(type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    throw new Error("Shader compilation failed");
  }

  return shader;
}

const vertexShader = createShader(
  gl.VERTEX_SHADER,
  vertexSource
);

const fragmentShader = createShader(
  gl.FRAGMENT_SHADER,
  shaderSource
);

const program = gl.createProgram();

gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error(gl.getProgramInfoLog(program));
  throw new Error("Program linking failed");
}

gl.useProgram(program);

const vertices = new Float32Array([
  -1, -1,
   1, -1,
  -1,  1,

  -1,  1,
   1, -1,
   1,  1
]);

const buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  vertices,
  gl.STATIC_DRAW
);

const positionLocation =
  gl.getAttribLocation(program, "a_position");

gl.enableVertexAttribArray(positionLocation);

gl.vertexAttribPointer(
  positionLocation,
  2,
  gl.FLOAT,
  false,
  0,
  0
);

const timeLocation =
  gl.getUniformLocation(program, "u_time");

const resolutionLocation =
  gl.getUniformLocation(program, "u_resolution");

const mouseLocation =
  gl.getUniformLocation(program, "u_mouse");

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();

  mouseX = (event.clientX - rect.left) *
    (canvas.width / rect.width);

  mouseY = (rect.bottom - event.clientY) *
    (canvas.height / rect.height);
});

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  gl.viewport(
    0,
    0,
    canvas.width,
    canvas.height
  );
}

window.addEventListener("resize", resize);

resize();

let running = true;
let animationFrame;

function render(time) {
  if (!running) return;

  gl.uniform1f(
    timeLocation,
    time * 0.001
  );

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

  animationFrame =
    requestAnimationFrame(render);
}

document.addEventListener(
  "visibilitychange",
  () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(animationFrame);
    } else {
      running = true;
      animationFrame =
        requestAnimationFrame(render);
    }
  }
);

requestAnimationFrame(render);