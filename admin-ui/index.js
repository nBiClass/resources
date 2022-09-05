var table = layui.table, form = layui.form, $ = layui.jquery, modelDivIndex = '';

/**
 * 添加按钮处理
 * @param url
 * @param title
 */
function add(url, title = false, width = false, height = false) {
    width = width ? width : '100%';
    height = height ? height : '100%';
    title = title ? title : '新增';
    modelDivIndex = layer.open({
        title: title,
        type: 2,
        content: url,
        area: [width, height],
        skin: 'layui-layer-rim',
        success: function (layero, index) {
            setTimeout(function () {
                layer.tips('close', '.layui-layer-setwin .layui-layer-close', {tips: 3});
            }, 500)
        }
    })

    if (!width) {
        layer.full(modelDivIndex);
        $(window).resize(function () {
            layer.full(modelDivIndex);
        })
    }
}

/**
 * 修改
 * @param url
 * @param data 数据，Obj|Array
 * @param title
 */
function edit(url, data, title = false, width = false, height = false) {
    width = width ? width : '100%';
    height = height ? height : '100%';
    modelDivIndex = layer.open({
        title: title ? title : '修改',
        type: 2,
        content: url + '?' + makeUrl(data),
        area: [width, height],
        skin: 'layui-layer-rim',
        success: function (layero, index) {
            setTimeout(function () {
                layer.tips('close', '.layui-layer-setwin .layui-layer-close', {tips: 3});
            }, 500)
        }
    })
    if (!width) {
        layer.full(modelDivIndex);
        $(window).resize(function () {
            layer.full(modelDivIndex);
        })
    }
}

//删除数据
function del(url, data, callback = false, lang) {
    if (lang == '2' || lang == 'en-us') {
        var confirm = 'Are you sure to delete the selected data?';
        var loadStr = 'Deleting, please wait...';
        var btn1 = 'YES';
        var btn2 = 'NO';
    } else {
        var confirm = '确定删除选中<span style="color: red;font-weight: bold">  1 </span>条信息？';
        var loadStr = '删除中，请稍候。。。';
        var btn1 = '确认';
        var btn2 = '取消';
    }
    layer.confirm(confirm, {
        icon: 3,
        title: false,
        btn: [btn1, btn2,]
    }, function (index) {
        var index = layer.msg(loadStr, {icon: 16, time: false, shade: 0.8});
        $.post(url, data, function (res) {
            layer.close(index);
            if (res.code == 200 || res.code == 204) {
                table.reload('id', {
                    page: {curr: 1}
                });
                // table.reload('id', {
                //     page: {curr: 1},
                //     where: {}
                // });
                layer.msg(res.msg);
            } else {
                layer.alert(res.msg, {icon: 5});
            }
            if(callback){
                callback(res);
            }
        }, 'json');
    })
}

/**
 * 详情
 * @param url
 * @param data
 */
function look(url, data, title = false, width = false, height = false) {
    width = width ? width : '100%';
    height = height ? height : '100%';
    modelDivIndex = layer.open({
        title: title ? title : '查看',
        type: 2,
        content: url + '?' + makeUrl(data),
        area: [width, height],
        skin: 'layui-layer-rim',
        success: function (layero, index) {
            setTimeout(function () {
                layer.tips('close', '.layui-layer-setwin .layui-layer-close', {tips: 3});
            }, 500)
        }
    })
    if (!width) {
        layer.full(modelDivIndex);
        $(window).resize(function () {
            layer.full(modelDivIndex);
        })
    }
}


//监听筛选提交
form.on('submit(search-submit)', function (data) {
    var index = layer.msg('Loading。。。', {icon: 16, time: false, shade: 0.1});
    table.reload('id', {
        where: data.field,
        page: {
            curr: 1 //重新从第 1 页开始
        },
        done: function (res, curr, count) {
            layer.close(index);
        }
    });
    return false;
});
//监听筛选重置
form.on('submit(search-clear)', function (data) {
    $('#search-form')[0].reset();
    var index = layer.msg('Loading。。。', {icon: 16, time: false, shade: 0.1});
    table.reload('id', {
        where: {},
        done: function (res, curr, count) {
            layer.close(index);
        }
    });
    return false;
});

//触发排序事件
table.on('sort(table)', function (obj) {
    table.reload('id', {
        initSort: obj,
        where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
            sortName: obj.field,
            sortOrder: obj.type
        }
    });

})

/**
 * 将对象转为字符串，格式为URL GET参数方式,每个参数值最大250字符
 * @param data
 * @returns {string}
 */
function makeUrl(data) {
    // console.log(data);
    var url = '';
    for (index in data) {
        var str = String(data[index]);
        var newstr = str.replace(/<[^>]*>/g, '');
        newstr = newstr.replace(/(\\s|&|\?)/g, '');
        newstr = newstr.slice(0, 250);
        url += index + '=' + newstr + '&';
    }
    return url;
}

