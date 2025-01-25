# x-dump-alpinejs
AlpineJS plugin which allows you to dump variables or expressions in the DOM.

**[See in action ](https://flappix.github.io/x-dump-alpinejs/)**

![screenshot](https://raw.githubusercontent.com/flappix/x-dump-alpinejs/refs/heads/main/screenshot1.png)

## Features

- formatted & colored output
- typing
- resolving of circular object
- two modes: reactive & non-reactive
- configurable character limitation
- collapse

## Installation

Download [x-dump-alpinejs.min.js](https://raw.githubusercontent.com/flappix/x-dump-alpinejs/refs/heads/main/dist/x-dump-alpinejs.min.js) and add it to your HTML header
```html
<script src="x-dump-alpinejs.min.js"></script>
```

## Usage

### x-dump
Add `x-dump="expression"` to any element

```html
<span x-dump="Math.abs (-2) + 43"></span>
<span x-dump="[1,2,3,4].filter ( x => x % 2 == 0)"></span>
<span x-dump="'foo' + 'bar'"></span>
```

### static
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

The header of the dump will contain a label "static". By clicking on it the dump refreshs to the most recent state.

### limit

By default the dump is limited to 200 characters.
To overwrite this setting globally use the `limit` attribute in the script tag.
```html
<script src="x-dump-alpinejs.min.js" limit="500"></script>
```

You can also use `limit` attribute on individual elements.

```html
<div x-dump="Array.from(Array(100).keys())" limit="50"></div>
```

Use `limit="-1"` to print everything.
```html
<script src="x-dump-alpinejs.min.js" limit="-1"></script>
... or
<div x-dump="Array.from(Array(100).keys())" limit="-1"></div>
```

## Example

```html
<html>
	<head>
		<script src="x-dump-alpinejs.min.js"></script>
		<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
	</head>

	<body x-data="{l: [1,2,3,4]}">
		
		<span x-dump="Math.abs (-2) + 43"></span>
		<span x-dump="[1,2,3,4].filter ( x => x % 2 == 0)"></span>
		<span x-dump="'foo' + 'bar'"></span>
		
		<!-- reflects dynamic changes -->
		<div x-dump="l"></div>
		
		<!-- will not change after "users" is modified -->
		<div x-dump="l" static></div>
		
		<button x-on:click="l.push (-1)">Add</button>
		
		<div x-dump="Array.from(Array(100).keys())" limit="50"></div>
		<div x-dump="Array.from(Array(100).keys())" limit="-1"></div>
	</body>

</html>
```
