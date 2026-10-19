---
title: "How I measure what my AI gateway costs"
description: "How I check that GateBolt Gateway works, and measure what it costs, by running the same tasks with and without it."
date: "2026-10-19"
series: "Does GateBolt Gateway get in the way?"
order: 1
draft: false
tags:
  - gatebolt
  - testing
  - benchmark
  - security
  - ai-agents
---

This post is about how I test [**GateBolt Gateway**](https://gatebolt.com). It covers the method, which stays the same from run to run. Each run, with its own LLM and set of tests, gets [its own post](/series/does-gatebolt-gateway-get-in-the-way/).

## What the gateway does

The gateway sits between Claude Code and Anthropic. It gives Claude an extra tool for declaring a plan, and asks Claude to use it first: the files, commands, tools and websites it will use. The gateway has two levels:

- **Record**: everything is logged against the plan, nothing is blocked.
- **Enforce**: anything outside the plan is refused.

## What I want to find out

1. **Does it work?** Is everything logged, and is anything outside the plan refused?
2. **What does it cost?** Do tasks take longer, use more tokens, or fail more often?

## How

I run the same tasks three ways: **Direct** (no gateway, the baseline), **Record** and **Enforce**. Each task runs in Claude Code, in a fresh Docker container, in [my lab](/series/a-lab-for-breaking-things/).

Claude Code runs on my own subscription, signed in with a token from `claude setup-token`. So any cost I report is an estimate, not a bill.

## Keeping it fair

Any difference should come from the gateway, nothing else:

- **Same setup.** Same LLM, Claude Code version, containers and tasks.
- **Nothing custom.** Claude Code and Harbor run with their standard settings. If Claude Code behaves differently behind the gateway, that's part of what the gateway costs, so I measure it rather than hide it.
- **Mixed order.** The three ways take turns, so a slow network hits them equally.
- **Usage limits aren't failures.** The run waits and tries again.
