import lrz from "lrz";
const compress = (file) => {
    try {
      let ratio = 1;
      const { size } = file;
      //图片大于1M就压缩，否则不压缩
      if (size !== undefined && size > 1048576) {
        //将大于1M的图片，压缩后大致使图片大小保持在1M左右
        ratio = 1048576 / size + "";
        ratio = parseFloat(ratio).toFixed(2);
        console.log("开始压缩", ratio);
        return lrz(file, { quality: ratio })
          .then((rst) => {
            //数字越小，压缩率越高
            console.log(rst);
            return backPromise(rst);
          })
          .catch(() => {
            console.log("压缩失败");
            return false;
          });
      } else {
        console.log("没压缩");
        return true;
      }
    } catch (e) {}
  };



  const backPromise = (res) => {
    return new Promise(function (resolve, reject) {
      if (res instanceof Object) {
        //将压缩后的base64字符串转换为文件对象
  
        let file = dataURLtoFile(res.base64, res.origin.name);
        console.log("base64tofile", file);
  
        //需要给文件对象一个唯一的uid属性否则将会报错
        Object.assign(file, { uid: file.lastModified });
        resolve(file);
        console.log("成功");
      } else {
        reject("压缩失败");
      }
    });
  };



  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(",");
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    //转换成file对象
    return new File([u8arr], filename, { type: mime });
    //转换成成blob对象
    //return new Blob([u8arr],{type:mime});
  };
export default  compress; 
//   export default {compress,dataURLtoFile,backPromise}; 