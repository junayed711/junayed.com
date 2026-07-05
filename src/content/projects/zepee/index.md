---
title: "Zepee"
description: "Turn any website into launch videos and retina screenshots — automatically."
date: "2026-06-06"
demoURL: "https://zepee.com"
---

Zepee turns any website into polished launch videos and retina screenshots — no screen recording or editing required. It crawls your site, records real browser sessions with [rrweb](https://github.com/rrweb-io/rrweb), and exports MP4 videos and screenshots ready for Product Hunt, social, or a landing page.

The pipeline runs in four steps — **study** the site (optionally using an LLM to plan the best shots), **plan** a human-editable `zepee.yaml`, **record** with Puppeteer, and **export** with ffmpeg. It ships as a visual Electron desktop app and a scriptable CLI, both driving the same config.

Try it at [zepee.com](https://zepee.com).
