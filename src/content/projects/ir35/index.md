---
title: "MCP IR35 Server"
description: "UK IR35 contract analysis as an MCP server, with rich UI widgets."
date: "2026-05-01"
repoURL: "https://github.com/superlayzer/mcp-ir35-server"
---

A self-contained [MCP](https://modelcontextprotocol.io) server that lets UK contractors paste a contract and get a defensible IR35 risk assessment. It analyses substitution, mutuality of obligation, and control against HMRC's Employment Status Manual and the relevant case law (Ready Mixed Concrete, Autoclenz, Pimlico Plumbers, PGMOL, Atholl House, and others).

All reference data is baked in — no third-party API calls. Rich UI widgets are built on the [MCP ext-apps protocol](https://github.com/superlayzer/ext-apps).

## Tools

- `lookup_case_law` — Search a corpus of UK employment-status cases (1968–2024)
- `analyze_contract` — Score a contract for IR35 risk and flag problematic clauses with case-law citations
- `suggest_clause_rewrite` — Generate an IR35-safer rewrite of a problematic clause
- `cest_check` — CEST-style 15-question assessment with per-factor scoring
- `generate_sds` — Build a Status Determination Statement document for off-payroll working

> Not legal advice. IR35 status is fact-specific and depends on contract terms _and_ working practices. For binding determinations, consult a qualified tax adviser or solicitor.
