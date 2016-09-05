!function() {
    var body = document.querySelector('body');
    var selects = document.querySelectorAll('select');

    var len = selects.length;

    for(var i = 0; i < len; i++) {

        var select = new Epicker({
            'className'     : 'select',
            'parentEle'     : body,
            'ele'           : selects[i],
        });
        // 隐藏源select
        selects[i].style.display = 'none';
    }

    // 
    // 通过ID选择指定元素
    // 
    // var dateTestEle = document.getElementById('dateTest');
    
    /**
     * @param 参数含义注释;
     * @class 定义class替换默认值 select ;
     * @addClass 添加class样式名;
     * @parent 增加到父类默认值为body;
     * @ele 当前选择的元素;
     * @type 获取选择元素的值 value 或者是文本 text ;
     * @separator 分隔符默认值为'';
     * @size 显示列默认值为3，其余的滚动显示;
     * @min 最小值
     * @max 最大值
     */

    // var datePicker = new Epicker({
    //     'className'     : 'select',
    //     'addClassName'  : 'date',
    //     'parentEle'     : body,
    //     'ele'           : dateTestEle,
    //     'min'           : '20110101',
    //     'max'           : '20201231',
    // });
    // 隐藏源select，这个后期可以添加配置项，是否隐藏原元素，是否把当前当前自定义选择器选择的元素赋值给原元素，然后用于表单提交，还没研究其它代码，暂时按照自己的思路走
    // dateTestEle.style.display = 'none';

    /**
     * 前面问题还没解决完，尝试了一下地区联动选择，直接就卡注了，问题还是问题。日期选择时应该就是联动的，我想的是后面再优化于是就是把天数写死了，问题也就延续到了这里。
     * 如果日期的问题解决了，几乎地区的问题也同样就解决了。
     */
    // var areaPicker = new Epicker({
    //     'className'     : 'select',
    //     'parentEle'     : body,
    //     'ele'           : document.getElementById('areaTest')
    // });

}()