# 工具库

## 常用方法

```javascript
# useage
import {getHeader, xxx} from '@starsoul/util';
```

### getHeader - 从 ResponseHeader 获取值

```javascript
/**
 * 从response header中获取key的value值
 * @param {ResponseHeader} headers
 * @param {string} key
 */
getHeader(headers, key)
```

### downloadFileFromUrl - url 方式下载文件

```javascript
/**
 * 下载方法
 * @param {string} url 接口地址
 * @param {string} fileName 文件名
 */
downloadFileFromUrl(url, fileName)
```

### downloadFileFromBlob - blob 方式下载文件

```javascript
/**
 * 下载文件
 * @param {Blob} blob 文件blob对象
 * @param {string} fileName 文件名
 */
downloadFileFromUrl(url, fileName)
```

### uploadFileToOSS - 上传文件到 OSS

```javascript
import {uploadFileToOSS} from '@starsoul/util'
const fileUrl = await uploadFileToOSS('获取签名地址',{
  file: File,
  prefixPath: string; //路径前缀
  prefixFile: string; //文件名前缀 default ''
})
```

## storage

```javascript
# useage
import {storage} from '@starsoul/util'
```

- getItem(key:string)
- setItem(key:string, value:any)
- clearItem(key:string)
- clearAll()
