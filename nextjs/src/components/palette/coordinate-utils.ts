// 获取图片在容器中的缩放和偏移（object-contain）
export function getImageContainRect(
  image: HTMLImageElement,
  container: HTMLDivElement,
) {
  const containerRect = container.getBoundingClientRect();
  const imgNaturalWidth = image.naturalWidth;
  const imgNaturalHeight = image.naturalHeight;
  const containerWidth = containerRect.width;
  const containerHeight = containerRect.height;

  const imgAspect = imgNaturalWidth / imgNaturalHeight;
  const containerAspect = containerWidth / containerHeight;

  let renderWidth = containerWidth;
  let renderHeight = containerHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (imgAspect > containerAspect) {
    // 图片宽度撑满容器，高度居中
    renderWidth = containerWidth;
    renderHeight = containerWidth / imgAspect;
    offsetY = (containerHeight - renderHeight) / 2;
  } else {
    // 图片高度撑满容器，宽度居中
    renderHeight = containerHeight;
    renderWidth = containerHeight * imgAspect;
    offsetX = (containerWidth - renderWidth) / 2;
  }

  return {
    renderWidth,
    renderHeight,
    offsetX,
    offsetY,
  };
}

// 显示坐标转标准化坐标（支持object-contain）
export const getNormalizedPosition = (
  image: HTMLImageElement | null,
  displayX: number,
  displayY: number,
  container?: HTMLDivElement | null,
) => {
  if (!image) return { x: displayX, y: displayY };

  if (!container) {
    // fallback: old logic
    const rect = image.getBoundingClientRect();
    const aspectRatio = image.naturalHeight / image.naturalWidth;
    return {
      x: (displayX / rect.width) * 384,
      y: (displayY / (rect.width * aspectRatio)) * 384,
    };
  }

  const { renderWidth, renderHeight, offsetX, offsetY } = getImageContainRect(
    image,
    container,
  );

  // 转换为图片内坐标
  const imgX = displayX - offsetX;
  const imgY = displayY - offsetY;

  // 超出图片区域则返回边界
  const safeX = Math.max(0, Math.min(imgX, renderWidth));
  const safeY = Math.max(0, Math.min(imgY, renderHeight));

  // 映射到标准化坐标
  return {
    x: (safeX / renderWidth) * 384,
    y: (safeY / renderHeight) * 384,
  };
};

// 计算颜色点在容器中的实际显示位置
export const calculateColorPointPosition = (
  imageElement: HTMLImageElement,
  canvasX: number,
  canvasY: number,
  container?: HTMLDivElement | null,
) => {
  // 先将canvas像素坐标映射到图片natural尺寸
  const imgX = canvasX;
  const imgY = canvasY;

  // 再映射到容器坐标（假设图片object-contain填充container）
  let displayX = imgX;
  let displayY = imgY;

  if (container) {
    const { renderWidth, renderHeight, offsetX, offsetY } = getImageContainRect(
      imageElement,
      container,
    );
    displayX = offsetX + (imgX / imageElement.naturalWidth) * renderWidth;
    displayY = offsetY + (imgY / imageElement.naturalHeight) * renderHeight;
  }

  // 转换为标准化坐标
  const normalizedPos = getNormalizedPosition(
    imageElement,
    displayX,
    displayY,
    container,
  );

  return normalizedPos;
};
