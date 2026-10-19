---
title: "Three machines, one key, nobody watching"
description: "The three virtual machines where I test GateBolt Gateway, why the login key lives on its own machine, and how the tests run for hours with nobody watching."
date: "2026-10-19"
series: "Putting my AI gateway to the test"
order: 2
draft: false
tags:
  - gatebolt
  - testing
  - homelab
  - proxmox
  - security
---

These are the machines I test [**GateBolt Gateway**](https://gatebolt.com) on, following the [method in the last post](/blog/how-i-test-gatebolt-gateway/).

This is how I'm setting up the lab. I'll update this post after the first run, with anything that changed.

## The machines

The lab is [my sandbox](/blog/a-sandbox-for-my-experiments/): a small Proxmox server with 16 GB of memory, on its own 4G network. It runs three virtual machines.

![The lab. My laptop logs in to control, and control logs in to bench and gatebolt, all three virtual machines on one Proxmox server. On bench, the untrusted task containers send their requests to Claude either through the gateway on gatebolt, for Record and Enforce, or straight to Anthropic, for Direct. The gateway checks each key with GateBolt.](./lab.svg)

- **gatebolt** (5 GB) runs [GateBolt](https://gatebolt.com) and the gateway, deployed with [Dokploy](https://dokploy.com). The gateway asks GateBolt whether each key is valid, and at which level.
- **bench** (8 GB) runs the tests: Docker, the test harness and the task containers.
- **control** (1 GB) is how I get in. It holds the only login key to the other two.

That leaves about 1.5 GB, just enough for Proxmox itself. If the machines used that too, Linux would start killing programs, maybe the test run itself.

Dokploy builds GateBolt and the gateway from the branch I want to test, for now `main`. I build before a run starts and switch off automatic deploys while it runs, so every task is tested against the same version.

## Why a separate control machine

I log in to control from my laptop, and from there to the other two. Only control can log in to gatebolt and bench.

- **bench holds no key to gatebolt.** If an agent took over bench, it couldn't log in to gatebolt. It could only talk to the gateway, like the tests do.
- **Nothing untrusted runs on control.** No tasks, no agents, no transcripts. It's the cleanest machine, so it holds the keys.
- **Its key needs a passphrase,** and my laptop's own keys never reach it.

## Why virtual machines, not containers

All three machines are virtual machines. Proxmox could also run them as containers, which are lighter, but a container shares the Proxmox server's kernel. A flaw in that kernel could let someone break out onto the server, and from there reach every machine. A virtual machine has its own kernel, which is a much harder wall.

- **bench** runs the untrusted agents, so it needs that wall most.
- **control** holds the keys, so it gets the same wall, even though nothing untrusted runs on it. It only needs 1 GB.
- **gatebolt** keeps the gateway apart from the agents it's watching.

## Running with nobody watching

Once a run starts, I'm not part of it. Stepping in is a last resort.

It handles most problems itself:

- **A task fails or times out.** That's a result. The next task starts.
- **Something breaks before Claude starts.** It waits 10 minutes and tries again. After three failed attempts, it skips the task.
- **The subscription hits its usage limit.** It waits for the reset, then runs the same task again.
- **The gateway can't be reached.** It tries again every 5 minutes.
- **The disk fills up.** Each task's image is deleted when the task is done, and unused files are cleared if space runs low.

It stops only when waiting won't help: a token or key is rejected, the gateway is down for over an hour, three tasks in a row won't start, or the disk is still full after clearing space. When it stops or finishes, it sends a notification to my phone, and after I fix the problem it carries on where it left off.

A few other things keep a long run steady:

- **It doesn't need my laptop.** The run lives on bench.
- **No surprise updates.** Automatic updates are off, because they can restart Docker mid-run.
- **Clocks in sync.** bench and gatebolt keep the same time, so their logs line up.
