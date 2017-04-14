// ==UserScript==
// @name           YouTubeRSS
// @namespace      https://wouterjanson.nl/
// @version        0.1
// @description    Easily get the RSS feed of a YouTube Channel
// @author         Wouter Janson
// @copyright      2017 Wouter Janson
// @license        MIT License
// @match          https://www.youtube.com/*
// @grant          none
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// Button CSS
var buttonCSS = "padding: 0 6px; color: #737373; font-size: 11px; text-align: center; margin-left: -2px; border: 1px solid #ccc; background-color: #fafafa; vertical-align: middle; border-radius: 0 2px 2px 0; height: 22px; line-height: 24px; display: inline-block;";

// Watches Title elements
waitForKeyElements("#watch7-headline", videoPageRSS);
waitForKeyElements("#c4-primary-header-contents", channelPageRSS);

// Add RSS button on video page
function videoPageRSS () {
    var channelId = $('meta[itemprop="channelId"]').attr('content');
    $('#watch7-subscription-container').append("<a style='" + buttonCSS + "'href='https://www.youtube.com/feeds/videos.xml?channel_id=" + channelId + "'>RSS Feed</a>");
}

// Add RSS button on channel page
function channelPageRSS () {
    var channelId = $('meta[itemprop="channelId"]').attr('content');
    $('.primary-header-actions').prepend("<a style='" + buttonCSS + "float: right;" + "'href='https://www.youtube.com/feeds/videos.xml?channel_id=" + channelId + "'>RSS Feed</a>");
}
