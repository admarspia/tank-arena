import * as THREE from "three";
const { Vector2, Vector3, Spherical } = THREE;

export default class ThirdPersonCamera {
  constructor(camera, target, options = {}) {
    this.camera = camera;
    this.target = target;

    this.distance = options.distance || 5;
    this.height = options.height || 5;
    this.sensitivity = options.sensitivity || 0.1;

    this.cameraDirection = new Spherical(
      this.distance,
      THREE.MathUtils.degToRad(70),     
      Math.PI
      );

    this.orbit = this.cameraDirection.clone();
    this.buttonDown = -1;
    this.mouse = new Vector2();
    this.lastMouse = new Vector2();

    this.minPolar = THREE.MathUtils.degToRad(80);
    this.maxPolar = THREE.MathUtils.degToRad(88);

    window.addEventListener("mousedown", (e) => {
      this.buttonDown = e.button;
      this.mouse.set(e.pageX, e.pageY);
      this.orbit.copy(this.cameraDirection);
      this.lastMouse.set(0, 0);
    });

    window.addEventListener("mousemove", (e) => {
      if (this.buttonDown >= 0) {
        const dx = (e.pageX - this.mouse.x) / (window.innerWidth / 2);
        const dy = (this.mouse.y - e.pageY) / (window.innerHeight / 2);

        this.cameraDirection.set(
          this.distance,
          THREE.MathUtils.clamp(
            this.orbit.phi + dy * 2,
            this.minPolar,
            this.maxPolar
          ),
          this.orbit.theta - dx * 2
        );

        this.lastMouse.set(dx, dy);
      }
    });

    window.addEventListener("mouseup", () => (this.buttonDown = -1));

    window.addEventListener("wheel", (e) => {
      this.distance = THREE.MathUtils.clamp(
        this.distance + Math.sign(e.deltaY),
        2,
        8
      );
    });
  }

  update(delta) {
    const camPos = new Vector3().setFromSpherical(this.cameraDirection);
    camPos.applyQuaternion(this.target.mesh.quaternion);
    camPos.multiplyScalar(this.distance);
    camPos.add(this.target.mesh.position);
    camPos.y += this.height;

    this.camera.position.lerp(camPos, 0.1);
    this.camera.lookAt(
      this.target.mesh.position.clone().add(new Vector3(0, 2, 0))
    );
  }
}

