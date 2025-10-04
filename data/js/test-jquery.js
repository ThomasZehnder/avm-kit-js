var M = Object.defineProperty
  , U = Object.defineProperties;
var X = Object.getOwnPropertyDescriptors;
var y = Object.getOwnPropertySymbols;
var A = Object.prototype.hasOwnProperty
  , O = Object.prototype.propertyIsEnumerable;
var w = (e, t, n) => t in e ? M(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n
  , p = (e, t) => {
    for (var n in t || (t = {}))
        A.call(t, n) && w(e, n, t[n]);
    if (y)
        for (var n of y(t))
            O.call(t, n) && w(e, n, t[n]);
    return e
}
  , _ = (e, t) => U(e, X(t));
var T = (e, t) => {
    var n = {};
    for (var s in e)
        A.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
    if (e != null && y)
        for (var s of y(e))
            t.indexOf(s) < 0 && O.call(e, s) && (n[s] = e[s]);
    return n
}
;
import {r as S, B as b} from "./h1z6911e7hmcrgxo.js";
import {v0 as $} from "./eepqtk64rp52mo0v.js";
const x = S.createContext(void 0)
  , z = {};
x.Provider;
const Q = () => S.useContext(x) ? S.useContext(x) : z
  , I = typeof window > "u" ? global : window
  , R = "@griffel/";
function j(e, t) {
    return I[Symbol.for(R + e)] || (I[Symbol.for(R + e)] = t),
    I[Symbol.for(R + e)]
}
const v = j("DEFINITION_LOOKUP_TABLE", {})
  , g = "data-make-styles-bucket"
  , G = "data-priority"
  , E = 7
  , N = "___"
  , k = N.length + E
  , V = 0
  , W = 1;
function Y(e) {
    const t = e.length;
    if (t === E)
        return e;
    for (let n = t; n < E; n++)
        e += "0";
    return e
}
function P(e, t, n=[]) {
    return N + Y($(e + t))
}
function H(e, t) {
    let n = ""
      , s = "";
    for (const r in e) {
        const o = e[r];
        if (o === 0) {
            s += r + " ";
            continue
        }
        const i = Array.isArray(o)
          , c = t === "rtl" ? (i ? o[1] : o) + " " : (i ? o[0] : o) + " ";
        n += c,
        s += c
    }
    return [n.slice(0, -1), s.slice(0, -1)]
}
function F(e, t) {
    const n = {};
    for (const s in e) {
        const [r,o] = H(e[s], t);
        if (o === "") {
            n[s] = "";
            continue
        }
        const i = P(o, t)
          , c = i + (r === "" ? "" : " " + r);
        v[i] = [e[s], t],
        n[s] = c
    }
    return n
}
const q = {};
function Z() {
    let e = null
      , t = ""
      , n = "";
    const s = new Array(arguments.length);
    for (let l = 0; l < arguments.length; l++) {
        const m = arguments[l];
        if (typeof m == "string" && m !== "") {
            const a = m.indexOf(N);
            if (a === -1)
                t += m + " ";
            else {
                const C = m.substr(a, k);
                a > 0 && (t += m.slice(0, a)),
                n += C,
                s[l] = C
            }
        }
    }
    if (n === "")
        return t.slice(0, -1);
    const r = q[n];
    if (r !== void 0)
        return t + r;
    const o = [];
    for (let l = 0; l < arguments.length; l++) {
        const m = s[l];
        if (m) {
            const a = v[m];
            a && (o.push(a[V]),
            e = a[W])
        }
    }
    const i = Object.assign.apply(Object, [{}].concat(o))
      , [c,u] = H(i, e)
      , f = P(u, e, s)
      , d = f + " " + c;
    return q[n] = d,
    v[f] = [i, e],
    t + d
}
function J(e) {
    return Array.isArray(e) ? e : [e]
}
function ee(e, t, n, s) {
    const r = [];
    if (s[g] = t,
    s[G] = String(n),
    e)
        for (const i in s)
            e.setAttribute(i, s[i]);
    function o(i) {
        return e != null && e.sheet ? e.sheet.insertRule(i, e.sheet.cssRules.length) : r.push(i)
    }
    return {
        elementAttributes: s,
        insertRule: o,
        element: e,
        bucketName: t,
        cssRules() {
            return e != null && e.sheet ? Array.from(e.sheet.cssRules).map(i => i.cssText) : r
        }
    }
}
const te = ["r", "d", "l", "v", "w", "f", "i", "h", "a", "s", "k", "t", "m", "c"]
  , L = te.reduce( (e, t, n) => (e[t] = n,
e), {});
function ne(e, t, n) {
    return (e === "m" ? e + t : e) + n
}
function se(e, t, n, s, r={}) {
    var o, i;
    const c = e === "m"
      , u = (o = r.m) !== null && o !== void 0 ? o : "0"
      , f = (i = r.p) !== null && i !== void 0 ? i : 0
      , d = ne(e, u, f);
    if (!s.stylesheets[d]) {
        const l = t && t.createElement("style")
          , m = ee(l, e, f, Object.assign({}, s.styleElementAttributes, c && {
            media: u
        }));
        s.stylesheets[d] = m,
        t && l && t.head.insertBefore(l, re(t, n, e, s, r))
    }
    return s.stylesheets[d]
}
function oe(e, t, n) {
    var s, r;
    const o = t + ((s = n.m) !== null && s !== void 0 ? s : "")
      , i = e.getAttribute(g) + ((r = e.media) !== null && r !== void 0 ? r : "");
    return o === i
}
function re(e, t, n, s, r={}) {
    var o, i;
    const c = L[n]
      , u = (o = r.m) !== null && o !== void 0 ? o : ""
      , f = (i = r.p) !== null && i !== void 0 ? i : 0;
    let d = h => c - L[h.getAttribute(g)]
      , l = e.head.querySelectorAll("[".concat(g, "]"));
    if (n === "m") {
        const h = e.head.querySelectorAll("[".concat(g, '="').concat(n, '"]'));
        h.length && (l = h,
        d = K => s.compareMediaQueries(u, K.media))
    }
    const m = h => oe(h, n, r) ? f - Number(h.getAttribute("data-priority")) : d(h)
      , a = l.length;
    let C = a - 1;
    for (; C >= 0; ) {
        const h = l.item(C);
        if (m(h) > 0)
            return h.nextSibling;
        C--
    }
    return a > 0 ? l.item(0) : t ? t.nextSibling : null
}
function B(e, t) {
    try {
        e.insertRule(t)
    } catch (n) {}
}
let ie = 0;
const ce = (e, t) => e < t ? -1 : e > t ? 1 : 0;
function le(e=typeof document > "u" ? void 0 : document, t={}) {
    const {classNameHashSalt: n, unstable_filterCSSRule: s, insertionPoint: r, styleElementAttributes: o, compareMediaQueries: i=ce} = t
      , c = {
        classNameHashSalt: n,
        insertionCache: {},
        stylesheets: {},
        styleElementAttributes: Object.freeze(o),
        compareMediaQueries: i,
        id: "d".concat(ie++),
        insertCSSRules(u) {
            for (const f in u) {
                const d = u[f];
                for (let l = 0, m = d.length; l < m; l++) {
                    const [a,C] = J(d[l])
                      , h = se(f, e, r || null, c, C);
                    c.insertionCache[a] || (c.insertionCache[a] = f,
                    s ? s(a) && B(h, a) : B(h, a))
                }
            }
        }
    };
    return c
}
const ue = () => {
    const e = {};
    return function(n, s) {
        e[n.id] === void 0 && (n.insertCSSRules(s),
        e[n.id] = !0)
    }
}
;
function ae(e, t, n=ue) {
    const s = n();
    let r = null
      , o = null;
    function i(c) {
        const {dir: u, renderer: f} = c
          , d = u === "ltr";
        return d ? r === null && (r = F(e, u)) : o === null && (o = F(e, u)),
        s(f, t),
        d ? r : o
    }
    return i
}
function fe() {
    return typeof window < "u" && !!(window.document && window.document.createElement)
}
const D = b.useInsertionEffect ? b.useInsertionEffect : void 0
  , de = () => {
    const e = {};
    return function(n, s) {
        if (D && fe()) {
            D( () => {
                n.insertCSSRules(s)
            }
            , [n, s]);
            return
        }
        e[n.id] === void 0 && (n.insertCSSRules(s),
        e[n.id] = !0)
    }
}
  , me = S.createContext(le());
function he() {
    return S.useContext(me)
}
const Se = S.createContext("ltr");
function Ce() {
    return S.useContext(Se)
}
function ge(e, t) {
    const n = ae(e, t, de);
    return function() {
        const r = Ce()
          , o = he();
        return n({
            dir: r,
            renderer: o
        })
    }
}
const ye = ge({
    root: {
        mc9l5x: "f1w7gpdv",
        Bg96gwp: "fez10in",
        ycbfsm: "fg4l7m0"
    },
    rtl: {
        Bz10aip: "f13rod7r"
    }
}, {
    d: [".f1w7gpdv{display:inline;}", ".fez10in{line-height:0;}", ".f13rod7r{-webkit-transform:scaleX(-1);-moz-transform:scaleX(-1);-ms-transform:scaleX(-1);transform:scaleX(-1);}"],
    t: ["@media (forced-colors: active){.fg4l7m0{forced-color-adjust:auto;}}"]
})
  , pe = (e, t) => {
    const u = e
      , {title: n, primaryFill: s="currentColor"} = u
      , r = T(u, ["title", "primaryFill"])
      , o = _(p({}, r), {
        title: void 0,
        fill: s
    })
      , i = ye()
      , c = Q();
    return o.className = Z(i.root, (t == null ? void 0 : t.flipInRtl) && (c == null ? void 0 : c.textDirection) === "rtl" && i.rtl, o.className),
    n && (o["aria-label"] = n),
    !o["aria-label"] && !o["aria-labelledby"] ? o["aria-hidden"] = !0 : o.role = "img",
    o
}
  , xe = (e, t, n, s) => {
    const r = t === "1em" ? "20" : t
      , o = S.forwardRef( (i, c) => {
        const u = _(p({}, pe(i, {
            flipInRtl: s == null ? void 0 : s.flipInRtl
        })), {
            ref: c,
            width: t,
            height: t,
            viewBox: "0 0 ".concat(r, " ").concat(r),
            xmlns: "http://www.w3.org/2000/svg"
        });
        return S.createElement("svg", u, ...n.map(f => S.createElement("path", {
            d: f,
            fill: u.fill
        })))
    }
    );
    return o.displayName = e,
    o
}
;
export {xe as c};
//# sourceMappingURL=n33pty12ygz8z3n6.js.map
