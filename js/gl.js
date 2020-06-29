var SEPARATION = 100, AMOUNTX = 100, AMOUNTY = 100, CAMOFFSETY = window.innerHeight / 3;

var container, contentContainer;
var camera, scene, renderer;

let particles, count = 0;

let mouseX = 0, mouseY = 0, scrollY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function initGl() {

  container = document.body;
  contentContainer = document.getElementById('content');

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;
  camera.position.y = CAMOFFSETY;

  scene = new THREE.Scene();

  //

  var numParticles = AMOUNTX * AMOUNTY;

  var positions = new Float32Array( numParticles * 3 );
  var scales = new Float32Array( numParticles );

  var i = 0, j = 0;

  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

      positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
      positions[ i + 1 ] = 0; // y
      positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z

      scales[ j ] = 1;

      i += 3;
      j ++;
    }
  }

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );

  var material = new THREE.ShaderMaterial( {

    uniforms: {
      color: { value: new THREE.Color( 0xffffff ) },
    },
    vertexShader: document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent

  } );


  particles = new THREE.Points( geometry, material );
  scene.add( particles );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor(0x050505);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  document.addEventListener('scroll', onDocumentScroll, false);

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove(event) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart(event) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

function onDocumentTouchMove(event) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

function onDocumentScroll(event) {
  scrollY = window.scrollY
}

function animate() {

  requestAnimationFrame( animate );

  render();

}

function render() {

  camera.position.x = ( - mouseX ) * .05;
  camera.position.y += ( - scrollY - camera.position.y + CAMOFFSETY + mouseY / 3 ) * .025;
  camera.lookAt( scene.position );

  var positions = particles.geometry.attributes.position.array;
  var scales = particles.geometry.attributes.scale.array;

  var i = 0, j = 0;

  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

      positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
              ( Math.sin( ( iy + count ) * 0.5 ) * 50 );

      scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 8 +
              ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 8;

      i += 3;
      j ++;

    }

  }

  particles.geometry.attributes.position.needsUpdate = true;
  particles.geometry.attributes.scale.needsUpdate = true;

  renderer.render( scene, camera );

  count += 0.1;

}

initGl();
animate();
