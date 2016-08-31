!function() {
    var body = document.querySelector('body');
    var selects = document.querySelectorAll('select');

    var len = selects.length;

    for(var i = 0; i < len; i++) {

        var select = new Epicker();
        select.body = body;
        // 获取默认值类型 value or text
        select.type = 'text';
        // 创建自定义select
        select.create(selects[i]);
        // 隐藏源select
        selects[i].style.display = 'none';
    }

    // 新增dete
    var dateTestEle = document.getElementById('dateTest');
    var datePicker = new Epicker();
    datePicker.body = body;
    datePicker.create(dateTestEle);
    // 隐藏源select
    // datePicker.style.display = 'none';
}()