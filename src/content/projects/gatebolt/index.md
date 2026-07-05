---
title: "GateBolt"
description: "A preflight approval and provenance layer for AI coding agents."
date: "2026-07-04"
demoURL: "https://gatebolt.com"
---

GateBolt is a preflight approval and provenance layer for AI coding agents. Before an agent touches code, it submits its **plan** to GateBolt, where a deterministic policy engine evaluates the planned files and task against company policy and returns `approved`, `requires_review`, or `blocked` — along with a risk level, reasons, required approvers, and an audit trail.

It doesn't write code, run the agent, or scan PRs after the fact. Its value is the layer *before* code changes: agent identity, planned scope, policy decisioning, human approval, and provenance.
