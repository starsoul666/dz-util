
/**
 * 从response header中获取key的value值
 * @param {Map} headers 
 * @param {string} key 
 */
export function getHeader (headers, key) {
  const serializeKey = key.replace(/\b(\w)/g, function (m) {
    return m.toUpperCase();
  });
  return headers.get(key) || headers.get(serializeKey);
}

/**
 * 下载方法
 * @param {*} url 接口地址
 * @param {*} fileName 文件名
 */
export const downloadFileFromUrl = (url, fileName) => {
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', fileName);
  a.click();
};

/**
 * 下载文件
 * @param {Blob} blob 文件blob对象
 * @param {string} fileName 文件名
 */
export function downloadFileFromBlob (blob, fileName) {
  const aLink = document.createElement('a');
  document.body.appendChild(aLink);
  aLink.style.display = 'none';
  aLink.href = window.URL.createObjectURL(blob);
  aLink.setAttribute('download', fileName);
  aLink.click();
  document.body.removeChild(aLink);
}

/**
 * list to map
 * @param {Array} list 
 * @param {string} keyType 'string' | 'number'
 * @param {string} key default 'code'
 * @param {string} value default 'val'
 */
export function listToMap (list = [], key = 'code', value = 'val') {
  const tmp = {};
  list.forEach(item => {
    tmp[item[key]] = item[value];
  });
  return tmp;
}

/**
 * dict to map
 * @param {Array} list 
 * @param {string} keyType 'string' | 'number'
 */
export function dictToMap (list = [], type = "string") {
  const tmp = {};
  list.forEach(item => {
    const key = type === "string" ? item['code'] : Number(item['code']);
    tmp[key] = item['val'];
  });
  return tmp;
}

