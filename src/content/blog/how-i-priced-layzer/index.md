---
title: "How I priced Layzer at £8/month"
description: "Why I landed on £8 for Layzer Pro — and the credit system that makes it survivable."
date: "2026-05-12"
tags:
  - pricing
  - layzer
---

Pricing was the part I really didn't want to think about. I'm a developer — I'd much rather build the thing than sit there agonising over the number. But pricing compounds more than almost anything else, so I forced myself to do the work.

The market's already settled around $20/month — ChatGPT Plus, Claude Pro, all of them. That's a real anchor.

T3 Chat — an AI chat app running at $8/month — showed the price point can work, but only with care. Its founder Theo Browne has [been open about what happened](https://x.com/theo/status/1887000229922353524) — he picked the price before adding Claude, and ended up with individual users costing him over $200 on $8 plans. The fix wasn't to raise the price. It was to add proper limits.

I'd been reading _Priceless_ by William Poundstone. If you're pricing anything, read it. People don't evaluate prices on a perfectly smooth scale. They bucket them. £9.99 feels like £10. £7.99 feels like it belongs in a lower bracket. That last digit does more work than you'd expect.

The maths worked at several price points. The question was which one felt right.

£10 was the top end for me. Once you cross into double digits, it feels meaningfully more expensive, even if the difference is tiny. £5 felt too cheap. Not because the maths didn't work, but because the signal felt wrong. If I want people to take [Layzer](https://layzer.ai) seriously, charging less than a pint makes it sound like I don't believe in it.

That left £6 to £9. £7.99 felt a bit too clever, a bit too obviously like a marketing trick. £8.00 felt cleaner. Deliberate. Above the bargain zone, below the point where people start flinching.

What makes £8 survivable is the credit system:

| Tier | Credits | Refills     | Standard models | Premium models |
| ---- | ------- | ----------- | --------------- | -------------- |
| Free | 500     | every day   | ~10–15 messages | not available  |
| Pro  | 200,000 | every month | ~4,000 messages | ~150 messages  |

A quick note on how I got there. I worked out the averages assuming a typical message is around 2,000 input tokens (your prompt plus a bit of chat history) and 500 tokens out. That's enough for a normal back-and-forth — long conversations cost more, short follow-ups cost much less. Costs come straight from each provider's published per-token rates.

| Model             | Tier     | Credits per message |
| ----------------- | -------- | ------------------- |
| GPT-5 Nano        | Standard | ~30                 |
| Llama 4 Scout     | Standard | ~31                 |
| DeepSeek V4 Flash | Standard | ~42                 |
| Claude Sonnet 4.6 | Premium  | ~1,350              |

Free is a taster — most people will hit the daily cap, and that's by design. Pro is where Layzer actually lives. The users who would have cost me $200 a month on a flat-rate plan can't get there, because the credits run out first.

Two tiers, Free and Pro. I'll add more when I have a reason to.

Will it hold forever? Probably not. I expect power users will push it, costs will creep, and I'll probably need a higher tier within six months. But I keep coming back to the same idea: you don't raise the base price unless you really have to. You add a tier above it.

So £8 it is.

---

[Try Layzer at layzer.ai →](https://layzer.ai)
