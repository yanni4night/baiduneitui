/**
 * Copyright (C) 2015 tieba.baidu.com
 * htmlparser.js
 *
 * changelog
 * 2015-09-22[12:24:59]:revised
 *
 * @author yinyong02@baidu.com
 * @version 0.1.0
 * @since 0.1.0
 */
define([], function() {
    function parse(html, handler) {
        var ret = null;
        try {
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = 'about:blank';
            document.body.appendChild(iframe);
            doc = iframe.contentWindow.document;
            doc.body.innerHTML = html;
            ret = handler(doc);
            iframe.parentNode.removeChild(iframe);
        } finally {
            return ret;
        }
    }

    function parseSearchConds(doc) {
        var i, j;
        var employeeItems = [];

        var filterGroups = Array.prototype.map.call($(
            '#jobFilter .filterGroups .filterGroup', doc), function(filterGroup) {
            var $spans = $(filterGroup).children('span');

            return {
                name: $spans.eq(0).text().trim(),
                key: ($spans[1].outerHTML.match(/\b\w+\('(\w+)'\,'(.*)'\)/) || [1, ''])[1],
                selects: Array.prototype.slice.call($spans, 1).map(function(span) {
                    return {
                        text: $(span).text().trim(),
                        value: (span.outerHTML.match(/\b\w+\('(\w+)'\,'(.*)'\)/) || [1, '',
                            ''
                        ])[2]
                    };
                })
            };
        });

        var jobs = Array.prototype.map.call($('.charMarkList a', doc), function(job) {
            var $job = $(job);
            return {
                name: $job.text().trim(),
                link: $job.attr('href')
            };
        });

        return {
            filterGroups: filterGroups,
            jobs: jobs
        };

    }

    function parseJobDetails(doc) {
        return $('.job-detail', doc).find('.opration').remove().end().html();
    }

    return {
        parseSearchConds: function(html) {
            return parse(html, parseSearchConds);
        },
        parseJobDetails: function(html) {
            return parse(html, parseJobDetails);
        }
    };
});