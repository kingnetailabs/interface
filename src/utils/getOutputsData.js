// 用于ai生成模块获取请求结果
export function getImagesFromOutputs(data, keys) {
  // 验证输入
  if (!data || !data.data || !data.data.outputs || !Array.isArray(keys)) {
    throw new Error("Invalid input data or keys");
  }

  // 用于存储结果的数组
  const results = [];

  // 遍历每个 key
  for (const key of keys) {
    // 检查 outputs 中是否存在该 key
    if (
      data.data.outputs[key] &&
      Array.isArray(data.data.outputs[key].images)
    ) {
      // 获取 images 数组的第一个元素（如果存在）
      const firstImage = data.data.outputs[key].images[0];
      if (firstImage) {
        results.push(firstImage);
      }
    }

    if (data.data.outputs[key] && Array.isArray(data.data.outputs[key].gifs)) {
      // 获取 gifs 数组的第一个元素（如果存在）
      const firstImage = data.data.outputs[key].gifs[0];
      if (firstImage) {
        results.push(firstImage);
      }
    }

    if (data.data.outputs[key] && Array.isArray(data.data.outputs[key].text)) {
      // 获取 text 数组的第一个元素（如果存在）
      const firstImage = data.data.outputs[key].text[0];
      if (firstImage) {
        results.push({
          text: firstImage,
        });
      }
    }
  }

  return results;
}

// 根据url判断是img还是video
export function isImageOrVideo(url) {
  // 提取文件扩展名
  const extension = url.split(".").pop().toLowerCase();

  // 定义图片和视频的文件扩展名数组
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "mkv", "flv"];

  // 检查文件扩展名是否在图片或视频的数组中
  if (imageExtensions.includes(extension)) {
    return "image";
  } else if (videoExtensions.includes(extension)) {
    return "video";
  } else {
    return "unknown"; // 如果扩展名不在任何数组中，则返回'unknown'
  }
}

// 局部重绘，查找图片名称
export function removeFileExtension(filename) {
  // 查找最后一个点的位置
  const lastDotIndex = filename.lastIndexOf(".");

  // 如果找不到点，说明没有后缀，直接返回原文件名
  if (lastDotIndex === -1) {
    return filename;
  }

  // 提取点之前的部分作为没有后缀的文件名
  const nameWithoutExtension = filename.slice(0, lastDotIndex);

  return nameWithoutExtension;
}

// 生成图  types查找label
export function findParentLabels(options, promptStrategy) {
  for (const option of options) {
    for (const child of option.children || []) {
      if (child.param && child.param.prompt_strategy === promptStrategy) {
        return [option.label, child.label].join("/");
      }
      // 如果 child 还有 children（虽然在这个例子中没有，但为了一般性考虑）
      const deeperLabels = findParentLabels(
        child.children || [],
        promptStrategy
      );
      if (deeperLabels) {
        return [option.label, ...deeperLabels.split("/")].join("/");
      }
    }
  }
  return null;
}

// 定义一个函数来查找匹配的 label
export function findLabel(data, keyName, value) {
  for (const item of data) {
    if (item.param[keyName] === value) {
      return item.label;
    }
  }
  return null; // 如果没有找到匹配的，返回 null
}

// 根据宽高查找尺寸比例
export function findLabelBySize(width, height, options) {
  for (const option of options) {
    if (option.param.width === width && option.param.height === height) {
      return option.label;
    }
  }
  return null; // 如果没有找到匹配的，返回 null
}