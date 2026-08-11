globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/routes-KRfyl1aF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d6-A7BAGkE5OrPgx3CtNQ+Sq/Vz6KM\"",
		"mtime": "2026-08-10T23:57:53.332Z",
		"size": 470,
		"path": "../public/assets/routes-KRfyl1aF.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-10T23:36:07.718Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ae-hLVBrSrDdpIw3Xl0dJPRkupPepQ\"",
		"mtime": "2026-08-10T23:20:55.439Z",
		"size": 174,
		"path": "../public/robots.txt"
	},
	"/assets/index-Dhmsvw7-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"53915-8mWv8VQdPB3aQTJ4kH2znNp96m8\"",
		"mtime": "2026-08-10T23:57:53.332Z",
		"size": 342293,
		"path": "../public/assets/index-Dhmsvw7-.js"
	},
	"/site/index.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"5c87-JFosfJeN4sVTmZDpgdIlw3KPd7A\"",
		"mtime": "2026-08-10T23:19:48.080Z",
		"size": 23687,
		"path": "../public/site/index.html"
	},
	"/assets/styles-BmFWVKnq.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1160a-yknjonR5k4G0xOxHyC5fzoBCyCQ\"",
		"mtime": "2026-08-10T23:57:53.333Z",
		"size": 71178,
		"path": "../public/assets/styles-BmFWVKnq.css"
	},
	"/site/README.md": {
		"type": "text/markdown; charset=utf-8",
		"etag": "\"2707-IQF30Qm084YST7uUt5squAAngpk\"",
		"mtime": "2026-08-10T23:20:17.417Z",
		"size": 9991,
		"path": "../public/site/README.md"
	},
	"/site/assets/bancada.jpg": {
		"type": "image/jpeg",
		"etag": "\"f4c2-l3ovVXWwtgaoNvvjxWe7mOUnaUk\"",
		"mtime": "2026-08-10T23:17:44.132Z",
		"size": 62658,
		"path": "../public/site/assets/bancada.jpg"
	},
	"/site/assets/escada.jpg": {
		"type": "image/jpeg",
		"etag": "\"c767-THoq4Td2MZy/b6pa+CQX2UvJ4Ic\"",
		"mtime": "2026-08-10T23:17:44.205Z",
		"size": 51047,
		"path": "../public/site/assets/escada.jpg"
	},
	"/site/assets/granito.jpg": {
		"type": "image/jpeg",
		"etag": "\"1006d-v+BSsunYlcln3El9KKukTwUB+pU\"",
		"mtime": "2026-08-10T23:17:48.577Z",
		"size": 65645,
		"path": "../public/site/assets/granito.jpg"
	},
	"/site/assets/marmore.jpg": {
		"type": "image/jpeg",
		"etag": "\"68e6-2nLA29r3Tjv1xQeQCLkSDF0aXw4\"",
		"mtime": "2026-08-10T23:17:52.908Z",
		"size": 26854,
		"path": "../public/site/assets/marmore.jpg"
	},
	"/site/assets/hero.jpg": {
		"type": "image/jpeg",
		"etag": "\"2a20d-JuMaOmHEMdXVukzC7y2njX6VgnQ\"",
		"mtime": "2026-08-10T23:17:52.263Z",
		"size": 172557,
		"path": "../public/site/assets/hero.jpg"
	},
	"/site/assets/quartzo.jpg": {
		"type": "image/jpeg",
		"etag": "\"ecdc-UqyRd9/r8c1oM3/fyqWB8qaGuIQ\"",
		"mtime": "2026-08-10T23:17:59.380Z",
		"size": 60636,
		"path": "../public/site/assets/quartzo.jpg"
	},
	"/site/assets/pia.jpg": {
		"type": "image/jpeg",
		"etag": "\"13903-csTfuXDGw6HfywQrqwvmJXzXnAU\"",
		"mtime": "2026-08-10T23:17:56.443Z",
		"size": 80131,
		"path": "../public/site/assets/pia.jpg"
	},
	"/site/assets/revestimento.jpg": {
		"type": "image/jpeg",
		"etag": "\"30a95-TG5qc3Gyghicruu7ITCirFnfGxY\"",
		"mtime": "2026-08-10T23:17:59.754Z",
		"size": 199317,
		"path": "../public/site/assets/revestimento.jpg"
	},
	"/site/css/style.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"6d29-airAaQq0a4gSZyheduWHUuscSvw\"",
		"mtime": "2026-08-10T23:19:10.353Z",
		"size": 27945,
		"path": "../public/site/css/style.css"
	},
	"/site/js/script.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f9d-Wxn54d9JYwvWK78hzBhWU0eCVxI\"",
		"mtime": "2026-08-10T23:19:27.791Z",
		"size": 32669,
		"path": "../public/site/js/script.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_XOlKxN = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_XOlKxN
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
