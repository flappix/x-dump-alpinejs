# x-dump-alpinejs
AlpineJS plugin which allows you to dump variables or expressions in the DOM.

## Features

- formatted & colored output
- typing
- resolving of circular object
- two modes: reactive & non-reactive

## Installation

Add this to your HTML header
```html
<script src="x-dump-alpinejs.min.js"></script>
```

## Usage

Add `x-dump="expression"` to any element

```html
<span x-dump="Math.abs (-2) + 43"></span>
<span x-dump="[1,2,3,4].filter ( x => x % 2 == 0)"></span>
<span x-dump="'foo' + 'bar'"></span>
```

Add `static` attribute to make dump non-reactive and let the expression stay in its initial state

```html
<body x-data="{l: [1,2,3,4]}">
	
	<!-- reflects dynamic changes -->
	<div x-dump="l"></div>
	
	<!-- will not change after "l" is modified -->
	<div x-dump="l" static></div>
	
	<button x-on:click="l.push (-1)">Add</button>
</body>
```

## Example

```html
<html>
	<head>
		<script src="x-dump-alpinejs.min.js"></script>
		<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
		<script>
			function App() {
				return {
					users: [{
						id: 0,
						name: 'Peter'
					},
					{
						id: 1,
						name: 'Lois'
					}]
				}
			}
		</script>
	</head>

	<body x-data="App()">
		
		<!-- reflects dynamic changes -->
		<div x-dump="users"></div>
		
		<!-- will not change after "users" is modified -->
		<div x-dump="users" static></div>
		
		
		<button x-on:click="users.push ({id: 2, name: 'Brian'})">Add</button>
	</body>

</html>
```
