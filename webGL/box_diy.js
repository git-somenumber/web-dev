main();

function main(){
  const gl_canvas = document.getElementById('webGL');
  const gl  = gl_canvas.getContext('webgl2');
  const color_one = document.getElementById('color_one');
  const color_two = document.getElementById('color_two');
  const color_three = document.getElementById('color_three');
  const color_four = document.getElementById('color_four');

  const fs = `
  varying lowp vec4 vertColor;
  void main() {  
      gl_FragColor = vertColor;
    }
  `;
  const vs = `
  attribute vec4 vertexColor;
  attribute vec4 aVertexPosition;
  varying lowp vec4 vertColor;
  void main() {
    gl_Position = aVertexPosition;
    vertColor = vertexColor;
  }`;

  const shaders = loadShaders(gl, fs, vs);
  let Color_array = 
  [1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0,];

  var programInfo = {
    program : shaders,
    vertexShader :{
      attribute:{
        vertexPosition : gl.getAttribLocation(shaders, 'aVertexPosition'),
        varyColor : gl.getAttribLocation(shaders, 'vertexColor')
      },
      uniform:{
      }
    },
    fragmentShder:{
      attributes:{
      }
    },
  }

  let obj_attr = {
    color:Color_array
  };

  const buffers = initBuffers(gl, obj_attr);

  console.log('buffers initialised');

  draw(gl ,programInfo, buffers);

  color_one.addEventListener('change',function(event){
    let hex = event.srcElement.value;
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    console.log(
      'r:' + parseInt(result[1], 16),
      'g:' + parseInt(result[2], 16),
      'b:' + parseInt(result[3], 16)
      );
    Color_array[0] = parseInt(result[1], 16)/256;
    Color_array[1] = parseInt(result[2], 16)/256;
    Color_array[2] = parseInt(result[3], 16)/256;
    Color_array[8] = parseInt(result[1], 16)/256;
    Color_array[9] = parseInt(result[2], 16)/256;
    Color_array[10] = parseInt(result[3], 16)/256;


    obj_attr = {
      color:Color_array
    };

    console.log(Color_array);
    const buff = initBuffers(gl,obj_attr);
    draw(gl,programInfo,buff);
  });
  const color_index = {
    color_one:0,
    color_two:4,
    color_three:8,
    color_four:12
  };
  function change_color(event){
    let hex = event.srcElement.value;
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    console.log(
      'r:' + parseInt(result[1], 16),
      'g:' + parseInt(result[2], 16),
      'b:' + parseInt(result[3], 16)
      );
    const index = color_index.
    Color_array[color_index[0]] = parseInt(result[1], 16)/256;
    Color_array[1] = parseInt(result[2], 16)/256;
    Color_array[2] = parseInt(result[3], 16)/256;
  }
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

function initBuffers(gl, obj_attr){
  const vertexBuffer  = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  vertices  = [
    0.5, 0.5,
    0.5, -0.5,
    -0.5, 0.5,
    -0.5, -0.5,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const vColorsBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vColorsBuffer);

  
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(obj_attr.color),
    gl.STATIC_DRAW);

  
  return {
    verticx_B: vertexBuffer,
    varyColor : vColorsBuffer
  }
  
}

function draw(gl ,programInfo, buffers){
  gl.clearColor(0.0, 1.0, 1.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);

  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.verticx_B);
    gl.enableVertexAttribArray(programInfo.vertexShader.attribute.vertexPosition);
    gl.vertexAttribPointer(
      programInfo.vertexShader.attribute.vertexPosition,
      2,
      gl.FLOAT,
      false,0,0
    );
    
  }

  {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.varyColor);
    gl.enableVertexAttribArray(programInfo.vertexShader.attribute.varyColor);
    gl.vertexAttribPointer(
      programInfo.vertexShader.attribute.varyColor,
      4,
      gl.FLOAT,
      false,
      0,
      0
    );
    
  }

  gl.useProgram(programInfo.program);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0,4);
  console.log('done');
}