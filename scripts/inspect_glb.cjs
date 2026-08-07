const fs = require('fs');

const buffer = fs.readFileSync('public/HumanBody.glb');
// In GLB, header is 12 bytes. Chunk 0 is JSON.
const jsonLength = buffer.readUInt32LE(12);
const jsonChunk = buffer.slice(20, 20 + jsonLength).toString('utf8');
try {
  const gltf = JSON.parse(jsonChunk);
  console.log('Asset info:', gltf.asset);
  console.log('Meshes:', gltf.meshes?.map(m => m.name));
  console.log('Materials:', gltf.materials);
  console.log('Textures count:', gltf.textures?.length || 0);
  console.log('Images count:', gltf.images?.length || 0);
} catch (err) {
  console.error(err);
}
