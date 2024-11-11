function Vector3(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector3.prototype.mag = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

Vector3.prototype.distance = function(vec) {
    if (vec instanceof Vector3)
        return Math.sqrt((this.x - vec.x) * (this.x - vec.x) + (this.y - vec.y) * (this.y - vec.y) + (this.z - vec.z) * (this.z - vec.z));
}

Vector3.prototype.add = function(vec) {
    if (vec instanceof Vector3) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
    }
    return this;
}

Vector3.prototype.subtract = function(vec) {
    if (vec instanceof Vector3) {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
    }
    return this;
}

Vector3.prototype.multiply = function(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
}

Vector3.prototype.divide = function(n) {
    if (n != 0) {
        this.multiply(1 / n);
    }
    return this;
}

Vector3.prototype.clone = function() {
    return new Vector3(this.x, this.y, this.z);
}

Vector3.prototype.normalize = function() {
    this.divide(this.mag());
    return this;
}

Vector3.cross = function(vec1, vec2) {
    if (vec1 instanceof Vector3 && vec2 instanceof Vector3) {
        var x = vec1.y * vec2.z - vec1.z * vec2.y;
        var y = vec1.z * vec2.x - vec1.x * vec2.z;
        var z = vec1.x * vec2.y - vec1.y * vec2.x;
        return new Vector3(x, y, z);
    }
}

Vector3.dot = function(vec1, vec2) {
    if (vec1 instanceof Vector3 && vec2 instanceof Vector3) {
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    }
}

function Matrix3() {
    this.data = [];
    for (var i = 0; i < 9; i++) {
        this.data[i] = 0;
    }
}

Matrix3.prototype.setIdentity = function() {
    this.data[0 + 0 * 3] = 1;
    this.data[1 + 1 * 3] = 1;
    this.data[2 + 2 * 3] = 1;
}

Matrix3.prototype.multiplyVector = function(vec) {
    if (vec instanceof Vector3) {
        var x = this.data[0 + 0 * 3] * vec.x + this.data[1 + 0 * 3] * vec.y + this.data[2 + 0 * 3] * vec.z;
        var y = this.data[0 + 1 * 3] * vec.x + this.data[1 + 1 * 3] * vec.y + this.data[2 + 1 * 3] * vec.z;
        var z = this.data[0 + 2 * 3] * vec.x + this.data[1 + 2 * 3] * vec.y + this.data[2 + 2 * 3] * vec.z;
        
        return new Vector3(x, y, z);
    }
}

Matrix3.prototype.multiplyMatrix = function(mat) {
    if (mat instanceof Matrix3) {
        var result = new Matrix3();
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 3; x++) {
                var sum = 0;
                for (var e = 0; e < 3; e++) {
                    sum += this.data[y + e * 3] * mat.data[e + x * 3];
                }
                result.data[y + x * 3] = sum;
            }
        }
        return result;
    }
}

Matrix3.rotate = function(angle, x, y, z) {
    var result = new Matrix3();
    result.setIdentity();
    
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var omc = 1 - cos;
    
    result.data[0 + 0 * 3] = x * omc + cos;
    result.data[0 + 1 * 3] = y * x * omc + z * sin;
    result.data[0 + 2 * 3] = x * z * omc - y * sin;
    
    result.data[1 + 0 * 3] = x * y * omc - z * sin;
    result.data[1 + 1 * 3] = y * omc + cos;
    result.data[1 + 2 * 3] = y * z * omc + x * sin;
    
    result.data[2 + 0 * 3] = x * z * omc + y * sin;
    result.data[2 + 1 * 3] = y * z * omc - x * sin;
    result.data[2 + 2 * 3] = z * omc + cos;
    
    return result;
}

function Triangle(pos1, pos2, pos3, scale) {
  this.pos1 = pos1.normalize().multiply(scale);
  this.pos2 = pos2.normalize().multiply(scale);
  this.pos3 = pos3.normalize().multiply(scale);
  this.scale = scale;

  var v1 = this.pos1.clone().subtract(this.pos2);
  var v2 = this.pos3.clone().subtract(this.pos2);

  this.avg = this.pos1.clone().add(this.pos2).add(this.pos3).divide(3);

  this.normal = Vector3.cross(v2, v1);
  this.normal.normalize();
}

Triangle.prototype.draw = function(perspectiveFactor, light, ctx) {
  var proj1 = (this.pos1.z + perspectiveFactor) / perspectiveFactor;
  var proj2 = (this.pos2.z + perspectiveFactor) / perspectiveFactor;
  var proj3 = (this.pos3.z + perspectiveFactor) / perspectiveFactor;

  var brightness = Math.floor(Vector3.dot(this.normal, light) * 40 + 40);
  var color = "hsl(0, 0%, " + brightness + "%)";

  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.lineTo(this.pos1.x / proj1, this.pos1.y / proj1);
  ctx.lineTo(this.pos2.x / proj2, this.pos2.y / proj2);
  ctx.lineTo(this.pos3.x / proj3, this.pos3.y / proj3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

Triangle.prototype.rotate = function(x, y, z) {
  var rotX = Matrix3.rotate(x, 1, 0, 0);
  var rotY = Matrix3.rotate(y, 0, 1, 0);
  var rotZ = Matrix3.rotate(z, 0, 0, 1);

  var rot = rotZ.multiplyMatrix(rotY.multiplyMatrix(rotX));
  this.pos1 = rot.multiplyVector(this.pos1);
  this.pos2 = rot.multiplyVector(this.pos2);
  this.pos3 = rot.multiplyVector(this.pos3);

  this.avg = this.pos1.clone().add(this.pos2).add(this.pos3).divide(3);

  var v1 = this.pos1.clone().subtract(this.pos2);
  var v2 = this.pos3.clone().subtract(this.pos2);

  this.normal = Vector3.cross(v2, v1);
  this.normal.normalize();
};

Triangle.prototype.subdivide = function() {
  var v12 = new Vector3(0, 0, 0);
  var v23 = new Vector3(0, 0, 0);
  var v31 = new Vector3(0, 0, 0);

  var prop = ["x", "y", "z"]

  for (var i = 0; i < 3; i++) {
    var p = prop[i];
    v12[p] = this.pos1[p] + this.pos2[p];
    v23[p] = this.pos2[p] + this.pos3[p];
    v31[p] = this.pos3[p] + this.pos1[p];
  }

  v12.normalize().multiply(this.scale);
  v23.normalize().multiply(this.scale);
  v31.normalize().multiply(this.scale);

  return [
    new Triangle(this.pos1, v12, v31, this.scale),
    new Triangle(this.pos2, v23, v12, this.scale),
    new Triangle(this.pos3, v31, v23, this.scale),
    new Triangle(v12, v23, v31, this.scale)
  ];
};

var icosahedron = new function() {
  var c, ctx;
  var size = 500;
  var perspectiveFactor = 400;
  var triangles = [];
  var scale = 150;
  var light = new Vector3(1, 1, 1).normalize();

  // Mouse control variables
  var mousePos = { x: 0, y: 0 };
  var lastMousePos = { x: 0, y: 0 };
  var isMouseDown = false;
  var rotationSpeed = 0.003; // Adjust this to control rotation sensitivity

  // Same vertices and indices as before...
  var X = 0.525731112119133606;
  var Z = 0.85065080835203993;

  vertices = [
      [-X, 0.0, Z], [X, 0.0, Z], [-X, 0.0, -Z], [X, 0.0, -Z],
      [0.0, Z, X], [0.0, Z, -X], [0.0, -Z, X], [0.0, -Z, -X],
      [Z, X, 0.0], [-Z, X, 0.0], [Z, -X, 0.0], [-Z, -X, 0.0]
  ];

  indices = [
      [0, 4, 1], [0, 9, 4], [9, 5, 4], [4, 5, 8], [4, 8, 1],
      [8, 10, 1], [8, 3, 10], [5, 3, 8], [5, 2, 3], [2, 7, 3],
      [7, 10, 3], [7, 6, 10], [7, 11, 6], [11, 0, 6], [0, 1, 6],
      [6, 1, 10], [9, 0, 11], [9, 11, 2], [9, 2, 5], [7, 2, 11]
  ];

  function initMouseControls() {
      c.addEventListener('mousedown', function(e) {
          isMouseDown = true;
          lastMousePos.x = e.clientX;
          lastMousePos.y = e.clientY;
      });

      c.addEventListener('mousemove', function(e) {
          if (isMouseDown) {
              mousePos.x = e.clientX;
              mousePos.y = e.clientY;
          }
      });

      c.addEventListener('mouseup', function() {
          isMouseDown = false;
      });

      c.addEventListener('mouseleave', function() {
          isMouseDown = false;
      });
  }

  function main() {
      c = document.getElementById("canvas");
      c.width = size;
      c.height = size;
      ctx = c.getContext("2d");

      ctx.translate(size / 2, size / 2);

      // Initialize triangles
      for (var i = 0; i < indices.length; i++) {
          var ind = indices[i];
          triangles.push(new Triangle(
              new Vector3(vertices[ind[0]][0], vertices[ind[0]][1], vertices[ind[0]][2]),
              new Vector3(vertices[ind[1]][0], vertices[ind[1]][1], vertices[ind[1]][2]),
              new Vector3(vertices[ind[2]][0], vertices[ind[2]][1], vertices[ind[2]][2]),
              scale
          ));
      }

      initMouseControls();
      loop();
  }

  function update() {
      if (isMouseDown) {
          var deltaX = mousePos.x - lastMousePos.x;
          var deltaY = mousePos.y - lastMousePos.y;

          for (var i = 0; i < triangles.length; i++) {
              triangles[i].rotate(
                  deltaY * rotationSpeed, // X rotation (vertical mouse movement)
                  deltaX * rotationSpeed, // Y rotation (horizontal mouse movement)
                  0                       // No Z rotation
              );
          }

          lastMousePos.x = mousePos.x;
          lastMousePos.y = mousePos.y;
      }

      triangles.sort(function(a, b) {
          return b.avg.z - a.avg.z;
      });
  }

  function render() {
      ctx.clearRect(-size / 2, -size / 2, size, size);

      for (var i = 0; i < triangles.length; i++) {
          triangles[i].draw(perspectiveFactor, light, ctx);
      }
  }

  function loop() {
      update();
      render();
      requestAnimationFrame(loop);
  }

  this.subdivide = function() {
      var newTriangles = [];
      for (var i = 0; i < triangles.length; i++) {
          newTriangles = newTriangles.concat(triangles[i].subdivide());
      }
      triangles = newTriangles;
      console.log(triangles.length);
  }

  main();
}