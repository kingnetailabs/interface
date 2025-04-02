export async function base64ToBuffer(base64) {
  let buff = await (await fetch(base64)).arrayBuffer();
  return buff;
}

export async function base64ToBlob(base64) {
  let blob = await (await fetch(base64)).blob();
  return blob;
}