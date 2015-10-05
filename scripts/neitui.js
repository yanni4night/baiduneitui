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
define(['./htmlparser'], function(htmlparser) {

    return {
        parseSearchConds: function(queryObj, cb) {
            if (!queryObj) {
                return cb(new Error('"queryObj" is required'));
            }

            queryObj = $.extend({
                workPlaceCode: '',
                positionType: '',
                postPubType: '',
                releaseTimeCode: 'a_n_n',
                keyWord: ''
            }, queryObj);

            $.ajax({
                url: 'http://hradmin.baidu.com/baidu/web/templet1000/index/corpwebPosition1000baidu!getPostListByConditionBaidu',
                // timeout: 2e3,
                data: queryObj,
                cache: false
            }).done(function(content) {
                var parsedNeitui = htmlparser.parseSearchConds(content || '');
                if (queryObj.keyWord) {
                    parsedNeitui.jobs = parsedNeitui.jobs.filter(function(job) {
                        return job.name.toLowerCase().indexOf(queryObj.keyWord.toLowerCase()) > -1;
                    });
                }
                cb(parsedNeitui ? null : new Error('Not found'), parsedNeitui);
            }).fail(function(jqXhr, error, errText) {
                cb(new Error(errText));
            });
        },
        /**
         * Query job details.
         * 
         * @param  {string}   url
         * @param  {Function} cb
         */
        queryJobDetails: function(url, cb) {
            $.get(url).done(function(content) {
                var parsedJobDetails = htmlparser.parseJobDetails(content || '');
                cb(parsedJobDetails ? null : new Error('Not found'), parsedJobDetails)
            }).fail(function(jqXhr, error, errText) {
                cb(new Error(errText));
            });
        }
    };
});