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

require(['./lib/underscore', './scripts/neitui'], function(_, Neitui) {
    _ = _ || window._;
    var data;
    var jobs;

    try {
        data = JSON.parse(localStorage.data);
    } catch (e) {}

    var tplFunc = _.template($('#tpl').html());

    $('tbody').html(tplFunc(data));

    function JdLoader($link) {
        Neitui.queryJobDetails($link.attr('href'), function(err, jdHtml) {
            if (jdHtml) {
                $link.parents('tr').removeClass('jd-notloaded');
                $link.parent().html(jdHtml);
            }
        });
    }

    $(document).delegate('a.job', 'click', function(e) {
        e.preventDefault();
        new JdLoader($(this));
    }).delegate('.jd-loadall', 'click', function() {
        $('tr.jd-notloaded').each(function(idx, tr) {
            var $a = $(tr).find('a.job');
            new JdLoader($a);
        });
        $(this).parents('tr').remove();
    });
});