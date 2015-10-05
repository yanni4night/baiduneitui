/**
 * Copyright (C) 2015 tieba.baidu.com
 * popup.js
 *
 * changelog
 * 2015-09-22[12:23:47]:revised
 *
 * @author yinyong02@baidu.com
 * @version 0.1.0
 * @since 0.1.0
 */
require(['./scripts/neitui', './lib/underscore'], function(Neitui, _) {
    _ = _ || window._;

    var tplFunc = _.template($('#tpl').html());


    var query = function(isIntial) {
        var queriesArray = $('form').serializeArray();
        var queryObj = {};

        for (var i = queriesArray.length - 1; i >= 0; i--) {
            queryObj[queriesArray[i].name] = queriesArray[i].value;
        }

        Neitui.query(queryObj, function(err, data) {
            console.log(err, data);
            $('.selects').html(err ? '<div class="alert alert-danger" role="alert">加载失败，请检查网络或重试</div>' : tplFunc(data));
            if (!isIntial) {
                localStorage.data = JSON.stringify(data);
                chrome.tabs.create({
                    url: 'result.html'
                }, function(tab) {
                    // alert(tab.tabId);
                    /*chrome.tabs.sendMessage(tab.tabId, {
                        data: data
                    });*/
                });
            }
        });
    };

    $(document).delegate('form', 'submit', function(e) {
        e.preventDefault();
        query();
    });

    query(true);
});