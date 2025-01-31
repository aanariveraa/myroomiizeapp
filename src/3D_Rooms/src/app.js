import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function SuiteViewer() {
  const [modelPath, setModelPath] = useState('');
  const loader = useRef(new GLTFLoader());

  const loadModel = (path) => {
    setModelPath(path);
  };

  const Model = () => {
    const [model, setModel] = useState(null);

    React.useEffect(() => {
      if (modelPath) {
        loader.current.load(modelPath, (gltf) => {
          setModel(gltf.scene);
        });
      }
    }, [modelPath]);

    if (!model) return null;
    return <primitive object={model} />;
  };

  return (
    <div>
      <div className="buttons">
        <button onClick={() => loadModel('/models/suite1.glb')}>Suite 1</button>
        <button onClick={() => loadModel('/models/suite2.glb')}>Suite 2</button>
        <button onClick={() => loadModel('/models/suite3.glb')}>Suite 3</button>
      </div>

      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default SuiteViewer;