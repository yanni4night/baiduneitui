/**
 * Copyright (C) 2014 yanni4night.com
 * result.js
 *
 * changelog
 * 2015-10-05[17:55:48]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
//chrome.runtime.onMessage.addListener(function(data) {
    //$('body').html('<pre>' + (localStorage.data) + '</pre>');;
//});

require(['./lib/underscore'],function(_){
    _=_||window._;
    var data = JSON.parse(localStorage.data||'');
    var jobs;

    var tplFunc=_.template($('#tpl').html());
    
    if(!data || !Array.isArray(jobs = data.jobs) || !jobs.length){
        // todo:show error
        return;
    }

$('tbody').html(tplFunc(data));

});