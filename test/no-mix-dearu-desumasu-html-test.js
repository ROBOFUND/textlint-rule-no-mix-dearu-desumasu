import rule from "../src/no-mix-dearu-desumasu";
import TextLintTester from "textlint-tester";
var htmlPlugin = require("textlint-plugin-html");

var tester = new TextLintTester();
// ruleName, rule, expected[]
tester.run(
    "no-mix-dearu-desumasu-html",
    {
        plugins: [
            {
                pluginId: "html",
                plugin: htmlPlugin
            }
        ],
        rules: [
            {
                ruleId: "no-mix-dearu-desumasu",
                rule: rule
            }
        ]
    },

    {
        valid: [
            // 本文と箇条書きは別のカウント
            `
<p>今日はいい天気ですね。</p>
<ul>
 <li>今日はいい天気である。</li>
</ul>
`,
            `
<P>今日はいい天気ですね。</p>
<ul>
 <li>今日はいい天気になります。</li>
</ul>
`,
            // 見出しと箇条書きも別カウント
            `
<h1>今日はいい天気ですね</h1>
<ul>
 <li>今日はいい天気である。</li>
</ul>
`,
            `
<h1>今日はいい天気ですね</h1>
<ul>
 <li>今日はいい天気になります。</li>
</ul>
`,
            // 見出しと本文も別カウント
            `
<h1>今日はいい天気ですね</h1>
<p>
今日はいい天気である。
</p>
`,
            // 見出しと本文も別カウント
            `
<h1>今日はいい天気ですね</h1>
<div>
今日はいい天気である。
</div>
        `
        ],
        invalid: [
            // bodyでの混在
            {
                text: `<body>今日はいい天気ですね。<br>
今日はいい天気である。
</body>`,
                ext: ".html",
                errors: [
                    // 同数である場合は、"ですます"に統一するのを優先する
                    {
                        message: `本文: "である"調 と "ですます"調 が混在
=> "ですます"調 の文体に、次の "である"調 の箇所があります: "である。"
Total:
である  : 1
ですます: 1
`,
                        line: 2,
                        column: 8
                    }
                ]
            },
            // divでの混在
            {
                text: `<div>今日はいい天気ですね。<br>
今日はいい天気である。
</div>`,
                ext: ".html",
                errors: [
                    // 同数である場合は、"ですます"に統一するのを優先する
                    {
                        message: `本文: "である"調 と "ですます"調 が混在
=> "ですます"調 の文体に、次の "である"調 の箇所があります: "である。"
Total:
である  : 1
ですます: 1
`,
                        line: 2,
                        column: 8
                    }
                ]
            },
            // div>spanでの混在
            {
                text: `<div>
            <span>今日はいい天気ですね。</span>
            <br>
            <span>今日はいい天気である。</span>
            </div>`,
                ext: ".html",
                errors: [
                    // 同数である場合は、"ですます"に統一するのを優先する
                    {
                        message: `本文: "である"調 と "ですます"調 が混在
=> "ですます"調 の文体に、次の "である"調 の箇所があります: "である。"
Total:
である  : 1
ですます: 1
`,
                        line: 2,
                        column: 8
                    }
                ]
            },
            // pでの混在
            {
                text: `<p>
今日はいい天気になりますね。
</p>
<p>
今日はいい天気である。
</p>
`,
                ext: ".html",
                errors: [
                    // 同数である場合は、"ですます"に統一するのを優先する
                    {
                        message: `本文: "である"調 と "ですます"調 が混在
=> "ですます"調 の文体に、次の "である"調 の箇所があります: "である。"
Total:
である  : 1
ですます: 1
`,
                        line: 5,
                        column: 8
                    }
                ]
            }
        ]
    }
);
