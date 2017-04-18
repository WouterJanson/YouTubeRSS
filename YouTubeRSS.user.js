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
var playlistButtonCSS = 'font: 12px "YouTube Noto", Roboto, arial, sans-serif; font-weight: 500; background: #f8f8f8; color: #333; border: solid 1px #d3d3d3; display: inline-block; padding: 5.5px 10px; height: 15px; vertical-align: middle; border-radius: 2px; box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05); text-decoration: none;';

// Watches Title elements
waitForKeyElements("#watch7-headline", videoPageRSS);
waitForKeyElements("#c4-primary-header-contents", channelPageRSS);

// Add RSS button on video page
function videoPageRSS () {
    var channelId = $('meta[itemprop="channelId"]').attr('content');
    if (typeof channelId === 'undefined') {
        return;
    }
    $('#watch7-subscription-container').append("<a style='" + buttonCSS + "'href='https://www.youtube.com/feeds/videos.xml?channel_id=" + channelId + "'>RSS Feed</a>");
}

// Add RSS button on channel page
function channelPageRSS () {
    var channelId = $('meta[itemprop="channelId"]').attr('content');
    if (typeof channelId === 'undefined') {
        return;
    }
    $('.primary-header-actions').prepend("<a style='" + buttonCSS + "float: right;" + "'href='https://www.youtube.com/feeds/videos.xml?channel_id=" + channelId + "'>RSS Feed</a>");
}

// Add RSS button on playlist page
function playlistPageRSS () {
    var playlistId = getParameterByName('list');
    if (typeof playlistId === 'undefined') {
        return;
    }
    $('.playlist-actions').append("<a style='" + playlistButtonCSS + "'href='https://www.youtube.com/feeds/videos.xml?playlist_id=" + playlistId + "'>RSS Feed</a>");
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
