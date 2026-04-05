#!/usr/bin/env python3
"""Regenerate feed.xml from data/log.json. Run from repo root:
   python3 scripts/generate_feed.py
"""
from __future__ import annotations

import json
import re
import xml.sax.saxutils as xml_esc
from datetime import datetime, timezone
from email.utils import format_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "data" / "log.json"
OUT_PATH = ROOT / "feed.xml"

SITE = "https://eltonchang1.github.io"
LOG_URL = f"{SITE}/log.html"


def rfc822_date(iso_date: str) -> str:
    dt = datetime.strptime(iso_date, "%Y-%m-%d").replace(
        hour=12, minute=0, second=0, tzinfo=timezone.utc
    )
    return format_datetime(dt, usegmt=True)


def plain_excerpt(body: str, max_len: int = 400) -> str:
    t = re.sub(r"\s+", " ", (body or "").strip())
    if len(t) > max_len:
        t = t[: max_len - 1] + "…"
    return t


def main() -> None:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    entries = sorted(
        data.get("entries", []),
        key=lambda e: e.get("date") or "",
        reverse=True,
    )

    channel_title = "Elton Chang — Build log"
    channel_desc = (
        "Short updates on software engineering, data science, and machine learning work."
    )

    items_xml = []
    for e in entries:
        date = e.get("date") or ""
        title = e.get("title") or date
        body = e.get("body") or ""
        link = f"{LOG_URL}#log-entry-{date}"
        guid = f"{SITE}/log/entry/{date}"
        desc = plain_excerpt(body)
        items_xml.append(
            f"""    <item>
      <title>{xml_esc.escape(title)}</title>
      <link>{xml_esc.escape(link)}</link>
      <guid isPermaLink="false">{xml_esc.escape(guid)}</guid>
      <pubDate>{xml_esc.escape(rfc822_date(date))}</pubDate>
      <description>{xml_esc.escape(desc)}</description>
    </item>"""
        )

    last_build = (
        rfc822_date(entries[0]["date"])
        if entries
        else format_datetime(datetime.now(timezone.utc), usegmt=True)
    )

    rss = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{xml_esc.escape(channel_title)}</title>
    <link>{LOG_URL}</link>
    <description>{xml_esc.escape(channel_desc)}</description>
    <language>en-us</language>
    <lastBuildDate>{xml_esc.escape(last_build)}</lastBuildDate>
    <atom:link href="{SITE}/feed.xml" rel="self" type="application/rss+xml"/>
{chr(10).join(items_xml)}
  </channel>
</rss>
"""

    OUT_PATH.write_text(rss, encoding="utf-8")
    print(f"Wrote {OUT_PATH} ({len(entries)} items)")


if __name__ == "__main__":
    main()
