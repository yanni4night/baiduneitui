/**
 * Copyright (C) 2015 tieba.baidu.com
 * neitui.js
 *
 * changelog
 * 2015-09-25[18:08:51]:revised
 *
 * @author yinyong02@baidu.com
 * @version 0.1.0
 * @since 0.1.0
 */
define(['./htmlparser'], function (htmlparser) {

    return {
        query: function (queryObj, cb) {
            if (!queryObj) {
                return cb(new Error('"queryObj" is required'));
            }

            queryObj = $.extend(queryObj, {
                workPlaceCode: '',
                positionType: '',
                postPubType: '',
                releaseTimeCode: 'a_n_n'
            });

            $.ajax({
                url: 'http://hradmin.baidu.com/baidu/web/templet1000/index/corpwebPosition1000baidu!getPostListByConditionBaidu',
                timeout: 2e3,
                data: queryObj,
                cache: false
            }).done(function (content) {
                var parsedNeitui = htmlparser.parse(content || '');

                cb(parsedNeitui ? null : new Error('Not found'), parsedNeitui);
            }).fail(function (jqXhr, error, errText) {
                cb(new Error(errText));
            });
        }
    };
});