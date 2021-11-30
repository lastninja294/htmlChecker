// First Idea
let testCase = "</dIv><P    ></P></span     dfdfb ><sPAn>hfcbsd v<sPAn>";

function checkHtmlStructure(testCase) {
    console.log(`TestCase : "${testCase}"`);
    console.log(`Valid version : ${checkHTML(testCase)}`);
    function htmlToParentheses(testCase) {
        const chars = ["(", "[", "{", "}", "]", ")", "o", "y", "q", "w"];
        testCase = testCase
            .toLowerCase()
            .replace(new RegExp("[}(oyqw[ ){]", "g"), "")
            .replace(new RegExp("]", "g"), "")
            .replace(new RegExp("<div>", "gm"), "(")
            .replace(new RegExp("</div>", "gm"), ")")
            .replace(new RegExp("<span>", "gm"), "{")
            .replace(new RegExp("</span>", "gm"), "}")
            .replace(new RegExp("<h1>", "gm"), "o")
            .replace(new RegExp("</h1>", "gm"), "y")
            .replace(new RegExp("<p>", "gm"), "[")
            .replace(new RegExp("</p>", "gm"), "]")
            .replace(new RegExp("<a>", "gm"), "q")
            .replace(new RegExp("</a>", "gm"), "w")
            .split("")
            .filter((char) => {
                return chars.includes(char);
            });
        return testCase;
    }

    function checkingParentheses(txt, err) {
        let stack = [],
            newTxt = txt;
        const opened = ["(", "[", "{", "o", "q"],
            closed = [")", "]", "}", "y", "w"],
            errors = [],
            maple = new Map([
                [")", "d"],
                ["]", "p"],
                ["}", "s"],
                ["y", "h"],
                ["(", "d"],
                ["[", "p"],
                ["{", "s"],
                ["o", "h"],
                ["q", "a"],
                ["w", "a"],
            ]);
        for (let i = 0; i < txt.length; i++) {
            if (opened.includes(txt[i])) {
                stack.push(txt[i]);
            } else if (closed.includes(txt[i])) {
                if (!stack.length) {
                    err.push(...newTxt.splice(0, 1));
                    return checkingParentheses(newTxt, err);
                }
                if (closed.indexOf(txt[i]) !== opened.indexOf(stack.pop())) {
                    err.push(...newTxt.splice(i - 1, 1));
                    return checkingParentheses(newTxt, err);
                }
            }
        }
        if (err.length > 0 || stack.length > 0) {
            err.concat(stack).forEach((e) => {
                errors.push(maple.get(e) + "Asad");
            });
        }
        return [err.length === 0 && stack.length === 0 ? 1 : -1, ...errors];
    }
    return checkingParentheses(htmlToParentheses(testCase), []);
}

console.log(`Result : ${[checkHtmlStructure(testCase).join(" ")]}`);

function checkHTML(html) {
    var doc = document.createElement("div");
    doc.innerHTML = html;
    return doc.innerHTML;
}
