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

    float t = u_time * 0.3;

    float wave1 = sin(uv.x * 3.5 + t);
    float wave2 = cos(uv.y * 4.5 - t * 0.8);
    float wave3 = sin((uv.x + uv.y) * 3.0 + t);

    float pattern =
        (wave1 + wave2 + wave3) / 3.0;

    float mouseGlow =
        exp(-distance(uv, mouse) * 4.0);

    vec3 dark =
        vec3(0.008, 0.025, 0.035);

    vec3 teal =
        vec3(0.0, 0.30, 0.27);

    vec3 cyan =
        vec3(0.0, 0.80, 0.70);

    vec3 color =
        mix(
            dark,
            teal,
            pattern * 0.18 + 0.45
        );

    color =
        mix(
            color,
            cyan,
            mouseGlow * 0.35
        );

    gl_FragColor =
        vec4(color, 1.0);
}