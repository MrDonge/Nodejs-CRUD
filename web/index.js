

$(() => {
    initPagination()
    getData()
    initBtn()
})

// 用户存储更新数据需要的 id
let recordId = ''

// ajax util
function ajax(type = "GET", url, data = {}, success) {
    const BASE_URI = 'http://localhost:8080/record'
    $.ajax({
        method: type,
        url: BASE_URI + url,
        data,
        // contentType: "application/json",
        success: function (data) {
            success && success(data)
        },
        error: function (err) {
            if (err && err.message) {
                alert(e.message)
            }
        }
    })
}


function delRecordById(id) {
    ajax('GET', '/delete', { recordId: id }, function (res) {
        if (res.code == 0) {
            alert('删除成功')
            getData()
        }
    })
}
function findRecordById(id) {
    recordId = id
    ajax('GET', '/findOne', { id }, function (res) {
        $('#name1').val(res.data.name)
        $('#age1').val(res.data.age)
        $('#gender1').val(res.data.gender)
        $('#remark1').val(res.data.remark)
    })
}


function getData(page = 1, limit = 10) {
    const name = $('#search-name').val()

    ajax('POST', '/find', { name, page, limit }, function (res) {
        if (res.code == 0) {
            const records = res.result

            let dataStr = ""
            if (records.length) {
                records.map(item => {
                    dataStr += `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                        <td>${item.gender == '1' ? '男' : '女'}</td>
                        <td>${item.remark}</td>
                        <td>
                            <button type="button" onclick="delRecordById('${item._id}')" class="btn btn-link" style="padding:0">删除</button>
                            <button type="button" onclick="findRecordById('${item._id}')" class="btn btn-link" style="padding:0"  data-toggle="modal" data-target="#exampleModal1"
                    data-whatever="@getbootstrap1">编辑</button>
                        </td>
                    </tr>
                `
                    // return dataStr
                })
            } else {
                dataStr = `<tr><td colspan="5">暂无数据</td></tr>`
            }
            $('#table-data tbody').html(dataStr)
        }
    })
}

function initPagination() {
    $('#pagination li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        const page = $(this).text()
        // const limit = 10;
        getData(page)
    })
}

function initBtn() {
    $('#create').on('click', function () {
        const name = $('#name').val()
        const age = $('#age').val()
        const gender = $('#gender option:selected').val()
        const remark = $('#remark').val()
        const data = { name, age, gender, remark }
        ajax('POST', '/create', data, function (res) {
            if (res.code == 0) {
                alert('添加成功')
            } else {
                alert(res.message)
            }
            $('#close').click()
            getData()
            $('#name').val('')
            $('#age').val('')
            $('#gender option:selected').val('1')
            $('#remark').val('')
        })
    })
    $("#search").on('click', function () {
        getData()
    })
    $('#search-name').on('keydown', function (e) {
        if (e.keyCode == 13) {
            getData()
            // 阻止默认事件
            e.preventDefault()
        }
    })

    $('#update').on('click', function () {
        const name = $('#name1').val()
        const age = $('#age1').val()
        const gender = $('#gender1 option:selected').val()
        const remark = $('#remark1').val()
        const data = { name, age, gender, remark }
        ajax('POST', '/update', { id: recordId, record: data }, function (res) {
            if (res.code == 0) {
                alert('更新成功')
                getData
            }
            $('#close1').click()
            getData()
            $('#name1').val('')
            $('#age1').val('')
            $('#gender1 option:selected').val('1')
            $('#remark1').val('')
        })
    })
}
