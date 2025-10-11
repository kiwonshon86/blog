import { allPosts } from "@/lib/content";

export async function GET() {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const items = allPosts.map(p => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${base}/posts/${p.slug}</link>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.description ? `<description><![CDATA[${p.description}]]></description>` : ""}
    </item>
  `).join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"><channel>
    <title>My Blog</title>
    <link>${base}</link>
    ${items}
  </channel></rss>`;

    return new Response(xml, { headers: { "Content-Type": "application/rss+xml" } });
}
