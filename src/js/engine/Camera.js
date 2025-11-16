import * as THREE from "three";

const { Vector2, Vector3, Spherical, MathUtils } = THREE;

export default class ThirdPersonCamera {
    constructor(camera, target, options = {}) {
        this.camera = camera;
        this.target = target;

        this.distance = options.distance || 5;
        this.height = options.height || 3;
        this.smoothness = options.smoothness || 0.1;
        this.sensitivity = options.sensitivity || 0.1;

        this.cameraDirection = new Spherical(
            this.distance,
            MathUtils.degToRad(85),  
            Math.PI
        );

        this.orbit = this.cameraDirection.clone();

        this.mouse = new Vector2();
        this.lastMouse = new Vector2();

        this.buttonDown = -1;

        this.minPolar = MathUtils.degToRad(80);
        this.maxPolar = MathUtils.degToRad(90);

        this._rotateWithTarget();
        this._addMouseEvents();
    }

    _addMouseEvents() {
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
                    MathUtils.clamp(
                        this.orbit.phi + dy * 2,
                        this.minPolar,
                        this.maxPolar
                    ),
                    this.orbit.theta - dx * 2
                );

                this.lastMouse.set(dx, dy);
            }
        });

        window.addEventListener("mouseup", () => {
            this.buttonDown = -1;
        });

        window.addEventListener("wheel", (e) => {
            this.distance = MathUtils.clamp(
                this.distance + Math.sign(e.deltaY),
                2,
                20
            );
            this.cameraDirection.radius = this.distance;
        });
    }

    _rotateWithTarget() {
        const s = this.cameraDirection.clone();
        s.theta += this.target.mesh.rotation.y;

        const camPos = new Vector3().setFromSpherical(s);
        camPos.add(this.target.mesh.position);
        camPos.y += this.height;

        this.camera.position.copy(camPos);
        this.camera.lookAt(
            this.target.mesh.position.clone().add(new Vector3(0, 1, 0))
        );
    }

    update(delta) {
        const s = this.cameraDirection.clone();
        s.theta += this.target.mesh.rotation.y;

        s.phi = MathUtils.clamp(s.phi, this.minPolar, this.maxPolar);

        const camPos = new Vector3().setFromSpherical(s)
            .add(this.target.mesh.position);
        camPos.y += this.height;

        this.camera.position.lerp(camPos, this.smoothness);
        this.camera.lookAt(
            this.target.mesh.position.clone().add(new Vector3(0, 1, 0))
        );
    }
}

