/**
 * 分片加载数据
 *
 * 该函数通过递归方式，逐步从源列表中加载数据到目标列表中它使用了`requestAnimationFrame`来在浏览器的重绘之间执行加载操作，
 * 从而提高性能和用户体验通过设置步长（step）和最大递归深度（maxDepth），可以控制加载的速率和防止无限递归
 *
 * @param sourceList 源数据列表，类型为任意
 * @param list 目标列表，数据将被加载到这个列表中，类型为任意
 * @param index 当前加载的索引，默认为0
 * @param step 每次加载的步长，默认为56
 * @param maxDepth 最大递归深度，默认为1000，用于防止无限递归
 */
export const sliceLoad = <T>(
  sourceList: T[],
  list: T[],
  index: number = 0,
  step: number = 56,
  maxDepth: number = 1000, // 添加递归深度限制
) => {
  // 边界条件检查
  if (index < 0 || step <= 0) {
    console.error('Invalid index or step value');
    return;
  }

  // 异常处理
  if (!Array.isArray(sourceList) || !Array.isArray(list)) {
    console.error('Invalid input type');
    return;
  }

  // 递归深度限制
  if (maxDepth <= 0) {
    console.error('Maximum recursion depth exceeded');
    return;
  }

  if (sourceList.length <= list.length) return;

  const startIdx = index * step;
  const endIdx = Math.min(startIdx + step, sourceList.length); // 避免超出数组长度

  const userListSlice = sourceList.slice(startIdx, endIdx);
  list.push(...userListSlice);

  window.requestAnimationFrame(() =>
    sliceLoad(sourceList, list, index + 1, step, maxDepth - 1),
  );
};
