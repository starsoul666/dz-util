/* eslint-disable */
let _prefixFile = '';
/**
 * upload file to alioss
 * @param {string} url fetch signature url
 * @param {object} options
 *  * file 要上传的文件
 *  * prefixPath 路径前缀
 *  * prefixFile  文件前缀 default ''
 */
export default async function uploadFileToOSS (url, options) {
  const { file, prefixPath, prefixFile } = options;
  const OSSData = await getSignature(url);
  _prefixFile = prefixFile;

  const filename = calculateObjectName(`${OSSData.dir}${prefixPath}`, file.name)

  const formData = new FormData()
  formData.append('name', file.name)
  formData.append('key', filename)
  formData.append('success_action_status', 200)
  formData.append('OSSAccessKeyId', OSSData.accessid)
  formData.append('policy', OSSData.policy)
  formData.append('Signature', OSSData.signature)
  formData.append('file', file)

  await fetch(OSSData.host, {
    method: 'POST',
    body: formData
  })
  return `https://cdn.digitalcnzz.com/${filename}`
}

function getNowDate () {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}

function getSignature (url) {
  return new Promise((resolve) => {
    // 判断签名有没有过期,根据设置的的缓存获取验签信息
    let res = JSON.parse(sessionStorage.getItem('ossInfo'))
    var timestamp = Date.parse(new Date()) / 1000
    if (res && Number(res.expire) > timestamp) {
      resolve(res)
    } else {
      fetch(url, {
        method: 'get'
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 0) {
            sessionStorage.setItem('ossInfo', JSON.stringify(res.data))
            resolve(res.data)
          }
        })
    }
  })
}
//计算一个随机的文件名称
function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

function guid () {
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

function random_guid_filename (len) {
  return _prefixFile + guid()
}

function get_suffix (filename) {
  let pos = filename.lastIndexOf('.')
  if (pos != -1) {
    return filename.substring(pos)
  }
  return ''
}

function calculateObjectName (dir, filename) {
  return dir + getNowDate() + '/' + random_guid_filename() + get_suffix(filename)
}

function base64ToFile (base64Str, fileName) {
  let arr = base64Str.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = window.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  let blob = new Blob([u8arr], { type: mime })
  blob.name = fileName
  return blob
}