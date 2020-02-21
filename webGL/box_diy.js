main();

function main(){
    const gl_canvas = document.getElementById('webGL');
    const gl  = gl_canvas.getContext('webgl');

    const fs = `
    uniform lowp vec4 color;
    void main() {  
        gl_FragColor = color;
      }
    `;
    const vs = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }`;

    const shaders = loadShaders(gl, fs, vs);

    var programInfo = {
      program : shaders,
      vertexShader :{
        attribute:{
          vertexPosition : gl.getAttribLocation(shaders, 'aVertexPosition')
        },
        uniform:{
          color : gl.getUniformLocation(shaders, 'color')
        }
      },
      fragmentShder:{
        attributes:{
        }
      }

    }

    const buffers = initBuffers(gl);

    console.log('buffers initialised');

    draw(gl ,programInfo, buffers);
}

function loadShaders(gl, fs, vs){
    let vs_shader = gl.createShader(gl.VERTEX_SHADER);
    let fs_shader = gl.createShader(gl.FRAGMENT_SHADER);

    const shaderProgram = gl.createProgram();

    gl.shaderSource(vs_shader, vs);
    gl.shaderSource(fs_shader, fs);

    gl.compileShader(vs_shader);
    gl.compileShader(fs_shader);

    if (!gl.getShaderParameter(vs_shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the vs shaders: ' + gl.getShaderInfoLog(vs_shader));
      gl.deleteShader(vs_shader);
      return null;
    }

    if (!gl.getShaderParameter(fs_shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the fs shaders: ' + gl.getShaderInfoLog(fs_shader));
      gl.deleteShader(fs_shader);
      return null;
    }



    gl.attachShader(shaderProgram, vs_shader);
    gl.attachShader(shaderProgram, fs_shader);
    gl.linkProgram(shaderProgram);

    console.log('loaded shaders')
    return shaderProgram;
}

function initBuffers(gl){
  const vertexBuffer  = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  vertices  = [
    0.5, 0.5,
    0.5, -0.5,
    -0.5, 0.5,
    -0.5, -0.5,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,  colorBuffer);

  color = [
    1.0,0.0,1.0,0.0
  ]

  gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(color), gl.STATIC_DRAW);
  return {
    verticx_B: vertexBuffer,
    vertex_color: colorBuffer
  }

}

function draw(gl ,programInfo, buffers){
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);

  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.verticx_B);
    gl.vertexAttribPointer(
      programInfo.vertexShader.vertexPosition,
      2,
      gl.FLOAT,
      false,0,0
    );
    gl.enableVertexAttribArray(programInfo.vertexShader.vertexPosition);
    
  }

  gl.useProgram(programInfo.program);

  {
    gl.uniform4fv(programInfo.vertexShader.uniform.color,
      [1.0,0.5,1.0,1.0]
    );

  }




  gl.useProgram(programInfo.program);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0,4)
  console.log('done');
}