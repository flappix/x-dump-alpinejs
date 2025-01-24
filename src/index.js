import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

let style = document.createElement ('style');
//style.innerText = 'pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#24292e;background:#fff}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background-color:#f0fff4}.hljs-deletion{color:#b31d28;background-color:#ffeef0}';
//style.innerText = '';
style.innerText = 'pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#c9d1d9;background:#0d1117}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}';

document.head.appendChild (style);

document.addEventListener ('alpine:init', () => {
	Alpine.directive ( 'dump', ( el, {expression}, {evaluateLater, effect}) => {
		const evl = evaluateLater (expression);
		let isStatic = el.hasAttribute ('static');
		let limit = Number (el.getAttribute ('limit') ?? '200') + 1;
		let expr_limit = 50 + 1;
		let expr = `${expression.substring (0, expr_limit)}${expression.length > expr_limit ? '...' : ''}`
		let dump = (d) => {
			let cache = [];
			
				//let type = Array.isArray (d) ? 'array' : typeof (d);
				let type = typeof (d) == 'object' ? Object.prototype.toString.call(d) : typeof (d);
				let ev = JSON.stringify ( 
					(d), (key, value) =>
					typeof value === "object" && value !== null ?
						cache.includes(value) ?
							undefined // Duplicate reference found, discard key
						:
							cache.push (value) && value // Store value in our collection
					:
						value,
						2
				);

				ev = hljs.highlight ( limit > 0 ? ev.substring (0, limit) : ev,
									 {language: 'javascript'}
				).value + (limit > 0 && ev.length > limit ? '...' : '');
				
				el.style.display = 'inline-block'
				el.innerHTML = `
					<div style="font-family: monospace;">
						<div style="white-space: pre-wrap; background-color: #252525; padding: 0.2rem; color: white;">${expr}: <span style="font-weight: bold;">${type}</span> ${isStatic ? '<i style="color: #BF045E;">static</i>' : ''}</div>
						<div style="white-space: pre-wrap; background-color: black; color: lightgreen; padding: 0.2rem;">${ev}</div>
					</div>`;
		};
		
		
		if ( !isStatic )
		{
			effect ( () => {
				evl (dump)
			})
		}
		else {
			evl (dump);
		}
    });
});
