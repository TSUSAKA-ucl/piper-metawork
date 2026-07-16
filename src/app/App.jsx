"use client";
import * as React from 'react';
import AFRAME from 'aframe';
import '@ucl-nuee/robot-loader/robotRegistry.js';
import '@ucl-nuee/robot-loader/robotLoader.js';
import '@ucl-nuee/robot-loader/stillObjects.js';
import '@ucl-nuee/robot-loader/ikWorker.js';
import '@ucl-nuee/robot-loader/jointMoveTo.js';
import '@ucl-nuee/robot-loader/reflectWorkerJoints.js';
import '@ucl-nuee/robot-loader/reflectJointLimits.js';
import '@ucl-nuee/robot-loader/reflectCollision.js';
import '@ucl-nuee/robot-loader/armMotionUI.js';
import '@ucl-nuee/robot-loader/vrControllerThumbMenu.js';
import '@ucl-nuee/robot-loader/axesFrame.js';
import '@ucl-nuee/robot-loader/attachToAnother.js';
import '@ucl-nuee/robot-loader/baseMover.js';
import '@ucl-nuee/robot-loader/ChangeOpacity.js';
import '@ucl-nuee/robot-loader/fingerCloser.js';
import '@ucl-nuee/robot-loader/ignoreCollision.js';
import '@ucl-nuee/ik-cd-worker/IkWorkerParamsComponents.js';
import '@ucl-nuee/metawork-aframe';

function toSchema (obj, separator='; ') {
  if (typeof obj !== 'object' || obj === null) {
    return String(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map((v) => toSchema(v, ',')).join(', ');
  }
  return Object.entries(obj)
    .map(([key, value]) => `${key}: `+toSchema(value,','))
    .join(separator);
};

const deg90 = Math.PI/2;
const deg80 = 80.0/180*Math.PI;
const deg45 = Math.PI/4;
const deg22 = Math.PI/8;
const deg10 = 10.0/180*Math.PI;
const sin15 = Math.sin(Math.PI/12);
const cos15 = Math.cos(Math.PI/12);

function App() {
  const menuSchemaR = toSchema({items: ['right-piper',
                                        'right-piper',
                                        'left-piper',
                                        'ray'],
                                laser: false});
  const menuSchemaL = toSchema({items: ['right-piper',
                                        'left-piper',
                                        'left-piper',
                                        'ray'],
                                laser: false});
  return (
    <a-scene xr-mode-ui="XRMode: xr"
      cd-worker-log-timing="timing: true"
      cd-worker-log-collision="logCollision: true"
    >
      <a-entity camera position="-0.5 1.2 1.2"
      		wasd-controls="acceleration: 20; fly: true"
                look-controls></a-entity>
      <a-entity id="robot-registry"
                robot-registry >
        <a-entity right-controller
                  laser-controls="hand: right"
                  thumbstick-menu={menuSchemaR}
                  target-selector="id: right-piper"
                  event-distributor
                  visible="false">
          <a-entity a-axes-frame="length: 0.1" />
        </a-entity>
        <a-entity left-controller
                  laser-controls="hand: left"
                  thumbstick-menu={menuSchemaL}
                  target-selector="id: left-piper"
                  event-distributor
                  visible="false">
          <a-entity a-axes-frame="length: 0.1" />
        </a-entity>
      </a-entity>
      <a-plane id="right-piper"
               position="0.2 1 -1" rotation="-90 0 90"
               width="0.04" height="0.04" color="blue"
               robot-loader="model: piper"
               ik-worker="-0.40, 1.57, -1.57, 0, 0.79, 0"
               reflect-collision="color: yellow"
               exact_solution="exact: false"
               reflect-joint-limits
               joint-limit-keep-moving-mask="mask: 0, 0, 0, 1, 1, 1"
               arm-motion-ui
               metawork-publisher={"codeType: PiPER-control-LIU;"+
                                   "topicExt: right/joint;"+
                                   "model: PiPER-control-LIU;"+
                                   /* "triggerStateComponent: arm-motion-ui;"+ */
                                   /* "triggerStatePropertiy: triggerdownState;"+ */
                                   "publishPerTick: 10"}
	       >
      </a-plane>
      <a-plane id="left-piper"
               position="-0.2 1 -1" rotation="-90 0 90"
               width="0.04" height="0.04" color="blue"
               robot-loader="model: piper"
               ik-worker="-0.20, 1.57, -0.79, 0, 0.79, 0"
               reflect-collision="color: yellow"
               exact_solution="exact: false"
               reflect-joint-limits
               joint-limit-keep-moving-mask="mask: 0, 0, 0, 1, 1, 1"
               arm-motion-ui
	       >
      </a-plane>
      <a-entity id="table1"
               position="0.0 1 -0.8" rotation="-90 0 -90"
               still-objects="model: table"
               ik-worker
               ignore-collision__r="other:right-piper; data: 0/0"
               ignore-collision__l="other:left-piper; data: 0/0"
      >
      </a-entity>
    </a-scene>
  );
}
export default App;
