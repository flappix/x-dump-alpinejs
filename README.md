# x-dump-alpinejs
AlpineJS plugin which allows you to dump variables or expressions in the DOM.

## Installation

Add this to your HTML header
```html
<script src="x-dump-alpinejs.min.js"></script>
```

## Usage

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

## Features

- formatted & colored output
- resolving of circular object
