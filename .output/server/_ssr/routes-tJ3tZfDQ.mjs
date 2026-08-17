import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-tJ3tZfDQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* A rota "/" apenas encaminha para o site estático em /site/index.html
* (HTML5 + CSS3 + JavaScript puro, sem framework).
*/
function Index() {
	(0, import_react.useEffect)(() => {
		window.location.replace("/site/index.html");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-muted-foreground",
			children: [
				"Abrindo o site da Granipox…",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "underline",
					href: "/site/index.html",
					children: "clique aqui"
				})
			]
		})
	});
}
//#endregion
export { Index as component };
