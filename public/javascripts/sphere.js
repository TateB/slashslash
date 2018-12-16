var canvas = document.getElementById("canvas");

window.onresize = resizeCanvas;
resizeCanvas();

var scene = new Scene(canvas);

render();

function render() {
    requestAnimationFrame(render);
    scene.update();
}

function resizeCanvas() {
    var canvas = document.getElementById("canvas");
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    if(scene)
        scene.onWindowResize();
}

function Scene(canvas) {  
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    // used to move the light
    var time = 0;

    var width = canvas.width;
    var height = canvas.height;
  
    var scene = new THREE.Scene();
    scene.background = new THREE.Color("#1e1e1e");

    var light = buildLights(scene);
    var camera = buildCamera(width, height);
    var renderer = buildRender(width, height);
    var mesh = addObjects(scene);

    function buildLights(scene) {      
        var light = new THREE.SpotLight("#fff", 0.2);
        light.position.y = 150;
        light.position.x = -50;

        light.angle = 75;

        light.decacy = 0.4;
        light.penumbra = 1;

        light.shadow.camera.near = 10;
        light.shadow.camera.far = 1000;
        light.shadow.camera.fov = 30;

        scene.add(light);

        return light;
    }

    function buildCamera(width, height) {
        var aspectRatio = width / height;
        var fieldOfView = 60;
        var nearPlane = 10;
        var farPlane = 500; 
        var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.z = 100;

        return camera;
    }

    function buildRender(width, height) {
        var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        var DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true; 

        return renderer;
    }
  
    function addObjects(scene) {
        var geometry = new THREE.SphereGeometry(30, 64, 64);        
        var material = new THREE.MeshStandardMaterial({ color: "#fff", roughness: 0.2});
        
        // these images are loaded as data uri. Just copy and paste the string contained in "image.src" in your browser's url bar to see the image.
        // environment map used to fake the reflex 

        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        return mesh;
    }
  
    this.update = function() {
        renderer.render(scene, camera);
    };

    this.onWindowResize = function() {
        var canvas = document.getElementById("canvas");
        var width = document.body.clientWidth;
        var height = document.body.clientHeight;
        canvas.width = width;
        canvas.height = height;

        camera = buildCamera(width, height);
        
        renderer.setSize(width, height);
    }
}

var exNum = 0;

function addCounter() {
    exNum++;
    console.log(exNum);
    if(exNum==30) {
        window.location.href = "https://google.com";
    }
};

console.log("//");
console.log("SLASH");
console.log("SLASH.");