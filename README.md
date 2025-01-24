# x-dump-alpinejs
AlpineJS plugin which allows you to dump variables or expressions in the DOM.

## Installation

Add this to your HTML header
```html
<script src="https://github.com/flappix/x-dump-alpinejs/dist/main.js"></script>
```

## Usage

```html
<html>
	<head>
		<script src="https://github.com/flappix/x-dump-alpinejs/dist/main.js"></script>
		<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
		<script>
			function App() {
				return {
					a: {a: 1},
					b: {b: 2},
				}
			}
		</script>
	</head>

	<body x-data="App()">
		<div x-dump=""></div>
	</body>

</html>
```
