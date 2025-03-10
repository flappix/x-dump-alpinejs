import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

let style = document.createElement ('style');
style.innerText = 'pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#c9d1d9;background:#0d1117}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}';

document.head.appendChild (style);
let globalLimit = document.currentScript.getAttribute ('limit') ?? '200';
let isCollapsedGlobal = document.currentScript.hasAttribute ('collapsed');

document.addEventListener ('alpine:init', () => {
	Alpine.directive ( 'dump', ( el, {expression}, {evaluateLater, effect}) => {
		
		const evl = evaluateLater (expression);
		let isStatic = el.hasAttribute ('static');
		let limit = Number (el.getAttribute ('limit') ?? globalLimit ) + 1;
		let expr_limit = 50 + 1;
		let expr = `${expression.substring (0, expr_limit)}${expression.length > expr_limit ? '...' : ''}`
		let dump = (d) => {
			let cache = [];
			
			let type = ( typeof (d) == 'object' ? Object.prototype.toString.call(d) : typeof (d) ) + (d.length != null ? `(${d.length})` : '' );
			let ev = JSON.stringify ( 
				(d), (key, value) =>
				typeof value === "object" && value !== null ?
					cache.includes(value) ?
						'[circular reference deleted]'
					:
						cache.push (value) && value
				:
					value,
					2
			);
			
			let ev_limit = hljs.highlight ( limit > 0 ? ev.substring (0, limit) : ev,
								 {language: 'javascript'}
			).value;
			
			let staticLabel = document.createElement ('i');
			staticLabel.innerText = 'static';
			staticLabel.style.cssText = 'color: BF045E; cursor: pointer;';
			staticLabel.addEventListener ( 'click', () => evl (dump) );
			staticLabel.title = 'Update';
			
			let header =  document.createElement ('xdump_header');
			header.style.cssText = 'display: block; white-space: pre-wrap; background-color: #252525; padding: 0.2rem; color: white;"';
			header.innerHTML = `<span title="${expression}">${expr}:</span> <xdump_type style="display: inline; font-weight: bold;">${type}</xdump_type>`;
			if (isStatic) {
				header.appendChild (staticLabel);
			}
			
			let isCollapsed = el.hasAttribute ('collapsed') || isCollapsedGlobal;
			let content = document.createElement ('xdump_content');
			content.style.cssText = `display: ${isCollapsed ? 'none' : 'block'}; white-space: pre-wrap; background-color: black; color: lightgreen; padding: 0.2rem;`;
			
			content.innerHTML = ev_limit;
			if (limit > 0 && ev.length > limit) {
				let dots = document.createElement ('span');
				dots.innerHTML = '...';
				dots.style.cssText = 'cursor: pointer;';
				dots.addEventListener ( 'click', () => {
					content.innerHTML = hljs.highlight (ev, {language: 'javascript'}).value;
				});
				
				content.appendChild (dots);
			}
			
			let collapse = document.createElement ('xdump_collapse');
			collapse.style.cssText = 'display: inline-block; cursor: pointer;';
			collapse.innerHTML = ' &#x25BC;';
			collapse.addEventListener ('click', () => {
				content.style.display = content.style.display == 'block' ? 'none' : 'block';
				console.log (collapse.innerHTML ==  ' &#x25BC;');
				collapse.innerHTML = content.style.display == 'block' ? ' &#x25BC;' : ' &#9658;';
				
				//collapse.style.transform = 'rotate(0.5turn)';
				//collapse.style.transform = collapse.style.transform == '' ? 'rotate(0.75turn)' : '';
			});
			
			header.appendChild (collapse);
			
			el.innerHTML = '';
			el.style.display = 'inline-block';
			el.style.fontFamily = 'monospace';
			el.appendChild (header);
			el.appendChild (content);			
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
