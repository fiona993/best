export default (Vue) => {
    Vue.directive("getThis", (el) => {
        el.onclick = function () {
            alert("OK");
        }
    })
    Vue.directive("fileUpload", (el, binding, vnode, oldVnode) => {
        //console.log(binding.value)//拿到了组件传过来的参数fn: "fileUpload"
        //multiple: false
        //console.log(vnode.context.fileUpload)//当前组件里面的一个方法,函数类型this
        // fileUpload(url) {
        //     this.url = ........;
        //   }
        var data = binding.value;
        createNode(data);
        function createNode(data) {
            //创建节点
            var node = document.createElement('input');
            node.type = 'file';
            node.accept = 'image/jpeg, image/png, image/jpg';
            node.multiple = data.multiple ? 'mutiple' : "";
            node.style.display = "none";
            el.prepend(node);
            el.onclick = function () {
                el.children[0].click()
            }
        }

        var inputFile = el.children[0];//选中 input表单
        //  console.log(inputFile)
        inputFile.onchange = function (event) {//当file文件表单内容发生变化
            var event = event || window.event;// 在事件对象下面去求  file文件对象
            var file = event.target.files[0];
            var fn = data.fn; //fileUpload函数
            vnode.context[fn](window.URL.createObjectURL(file))
            //window.URL.createObjectURL    

            // 可以用于在浏览器上预览本地图片或者视频
        }
    })
}