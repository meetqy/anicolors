const generatorData = async (event) => {
  const { data, where } = event.params;
  const { field } = data;

  if (data.data && data.content) return;
  if (!where.id) return;

  const blog = await strapi.db.query("api::blog.blog").findOne({
    where: { id: where.id },
    populate: {
      palettes: true,
    },
  });

  data.data = blog.palettes.map((item) => {
    const value = getNestedValue(item, field);

    return value;
  });
};

export default {
  async beforeCreate(event) {
    await generatorData(event);
  },

  async beforeUpdate(event) {
    await generatorData(event);
  },
};

/**
 * 根据给定的路径字符串从对象中获取嵌套的值。
 *
 * @param {object} obj - 要从中获取值的对象。
 * @param {string} path - 点分隔的路径字符串（例如 "a.b.c"）。
 * @returns {any | undefined} 路径指定的值，如果路径不存在则返回 undefined。
 */
function getNestedValue(obj, path) {
  // 1. 验证输入
  if (typeof obj !== "object" || obj === null) {
    console.warn("Input 'obj' must be a non-null object.");
    return undefined;
  }
  if (typeof path !== "string" || path.trim() === "") {
    console.warn("Input 'path' must be a non-empty string.");
    return undefined;
  }

  // 2. 将路径字符串拆分为键数组
  const keys = path.split(".");

  // 3. 遍历键来访问嵌套属性
  let current = obj;
  for (const key of keys) {
    // 检查当前值是否为 null/undefined 或不是对象，
    // 或者当前对象不包含下一个键。
    if (current === null || typeof current !== "object" || !(key in current)) {
      return undefined; // 路径中断，或者键不存在
    }
    current = current[key];
  }

  // 4. 返回最终获取的值
  return current;
}
