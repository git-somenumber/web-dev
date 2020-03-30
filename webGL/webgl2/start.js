main()

function main () {
  // Get Context Correct
  var canvas = document.getElementById('webgl2')
  var gl = canvas.getContext('webgl2')
  if (!gl) {
    console.log('No gl for you')
  }
  // Fragment Shader
  var fragSource = `#version 300 es
     
    // fragment shaders don't have a default precision so we need
    // to pick one. mediump is a good default. It means "medium precision"
    precision mediump float;
     
    // we need to declare an output for the fragment shader
    out vec4 outColor;
     
    void main() {
      // Just set the output to a constant reddish-purple
      outColor = vec4(1, 0, 1, 1);
    }
    
    `
  // Vertex Shader
  var vsSource = `#version 300 es
     
    // an attribute is an input (in) to a vertex shader.
    // It will receive data from a buffer
    in vec4 a_position;
     
    // all shaders have a main function
    void main() {
     
      // gl_Position is a special variable a vertex shader
      // is responsible for setting
      gl_Position = a_position;
    }
    
    `
  // Compile the shader and link to program
  var vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER)
  var fragmentShader = createShader(gl, fragSource, gl.FRAGMENT_SHADER)
  console.log(vertexShader)
  console.log(fragmentShader)
  var program = createProgram(gl, vertexShader, fragmentShader)
  console.log(program)

  var positionLocation = gl.getAttribLocation(program, 'a_position')

  // Create Buffer
  var buffer = gl.createBuffer()

  var positions = [
    0.2, 0.2,
    0.5, 0.5,
    1.0, 1.0
  ]

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  // var positions2 = [
  //     -0.2,-0.2,
  //     -0.5,-0.5,
  //     -1.0,-1.0
  // ];

  // var buffer2 = initBuffers(gl, positions2);

  // Create VAO
  var vao = gl.createVertexArray()

  gl.bindVertexArray(vao)

  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
  console.log(vao)
  console.log(buffer)
  // var vao2 = createVAO(gl, positionLocation, buffer2);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  gl.bindVertexArray(vao)

  // Draw
  var primitiveType = gl.TRIANGLE_STRIP
  var offset = 0
  var count = 3
  gl.drawArrays(primitiveType, offset, count)

  console.log('done')
}

function createShader (gl, shaderSource, type) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, shaderSource)
  gl.compileShader(shader)

  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    console.log(type + ', compiled')
    return shader
  } else {
    console.log('Failed to compile' + type + gl.getProgramInfoLog(shader))
    return null
  }
}

function createProgram (gl, vertexShader, fragShader) {
  var program = gl.createProgram()

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragShader)

  gl.linkProgram(program)

  var success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    // console.log(gl.getProgramInfoLog(program));
    return program
  } else {
    console.log(gl.getProgramInfoLog(program))
    return null
  }
}

function initBuffers (gl) {
  var buffer = gl.createBuffer()

  var positions = [
    0.2, 0.2,
    0.5, 0.5,
    1.0, 1.0
  ]

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  return buffer
}

function createVAO (gl, positionLocation, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  var vao = gl.createVertexArray()

  gl.bindVertexArray(vao)

  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  return vao
}
