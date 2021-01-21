/**
 * This is a simple example for creating icon bundles for Iconify components.
 *
 * It bundles only icons from Iconify icon sets.
 * For bundling custom icons see other code examples in documentation.
 */
const fs = require('fs');

// Installation: npm install --save-dev @iconify/json-tools @iconify/json
const { Collection } = require('@iconify/json-tools');

// Iconify component (this changes import statement in generated file)
// Available options: 'react', 'react-with-api', 'vue' (for Vue 3), 'vue2'
const component = 'react-with-api';

// File to save bundle to
const target = __dirname + '/icons-bundle.js';

// Icons to bundle, array
let icons = [
	'fxemoji:banana',
	'noto-v1:red-apple',
	'fxemoji:tomato',
	'twemoji:potato',
	'twemoji:carrot',
	'noto:watermelon',
	'noto-v1:pineapple',
	'twemoji:melon',
	'fxemoji:grapes',
	'twemoji:dog',
	'fxemoji:cow',
	'noto:black-cat',
	'twemoji:pig',
	'noto:horse',
	'fxemoji:sheep',
	'emojione:bird',
	'twemoji:rabbit',
	'emojione:chicken'
];

// Organize icons by prefix
icons = organizeIconsList(icons);

// Load icons data
let output = getImport(component) + '\n\n';
Object.keys(icons).forEach((prefix) => {
	const iconsList = icons[prefix];

	// Load icon set
	const collection = new Collection(prefix);
	if (!collection.loadIconifyCollection(prefix)) {
		throw new Error(
			`Icons with prefix "${prefix}" do not exist in Iconify. Update @iconify/json?`
		);
	}

	// Make sure all icons exist
	iconsList.forEach((name) => {
		if (!collection.iconExists(name)) {
			// Uncomment next line to throw error if an icon does not exist
			// throw new Error(`Could not find icon: "${prefix}:${name}"`);
			console.error(`Could not find icon: "${prefix}:${name}"`);
		}
	});

	// Get data for all icons as string
	output += collection.scriptify({
		icons: iconsList,
		callback: 'addCollection',
		optimize: true,
	});
});

// Save to file
fs.writeFileSync(target, output, 'utf8');

console.log(`Saved ${target} (${output.length} bytes)`);

/**
 * Organize icons list by prefix
 *
 * Result is an object, where key is prefix, value is array of icon names
 */
function organizeIconsList(icons) {
	const results = Object.create(null);

	icons.forEach((str) => {
		// Split icon to prefix and name
		const icon = stringToIcon(str);
		if (icon === null || icon.provider !== '') {
			// Invalid name or icon name has provider.
			// All icons in this example are from Iconify, so providers are not supported.
			throw new Error(`Invalid icon name: ${str}`);
		}

		const prefix = icon.prefix;
		const name = icon.name;

		// Add icon to results
		if (results[prefix] === void 0) {
			results[prefix] = [name];
			return;
		}
		if (results[prefix].indexOf(name) === -1) {
			results[prefix].push(name);
		}
	});

	return results;
}

/**
 * Convert icon name from string to object.
 *
 * Object properties:
 * - provider (ignored in this example)
 * - prefix
 * - name
 *
 * This function was copied from @iconify/core/src/icon/name.ts
 * See https://github.com/iconify/iconify/blob/master/packages/core/src/icon/name.ts
 */
function stringToIcon(value) {
	let provider = '';
	const colonSeparated = value.split(':');

	// Check for provider with correct '@' at start
	if (value.slice(0, 1) === '@') {
		// First part is provider
		if (colonSeparated.length < 2 || colonSeparated.length > 3) {
			// "@provider:prefix:name" or "@provider:prefix-name"
			return null;
		}
		provider = colonSeparated.shift().slice(1);
	}

	// Check split by colon: "prefix:name", "provider:prefix:name"
	if (colonSeparated.length > 3 || !colonSeparated.length) {
		return null;
	}
	if (colonSeparated.length > 1) {
		// "prefix:name"
		const name = colonSeparated.pop();
		const prefix = colonSeparated.pop();
		return {
			// Allow provider without '@': "provider:prefix:name"
			provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
			prefix,
			name,
		};
	}

	// Attempt to split by dash: "prefix-name"
	const dashSeparated = colonSeparated[0].split('-');
	if (dashSeparated.length > 1) {
		return {
			provider: provider,
			prefix: dashSeparated.shift(),
			name: dashSeparated.join('-'),
		};
	}

	return null;
}

/**
 * Get import statement for component
 */
function getImport(component) {
	const imports = {
		'react': "import { addCollection } from '@iconify/react';",
		'react-with-api':
			"import { addCollection } from '@iconify/react-with-api';",
		'vue': "import { addCollection } from '@iconify/vue';",
		'vue2':
			"import IconifyIcon from '@iconify/vue';\n\nconst addCollection = IconifyIcon.addCollection;",
	};

	if (imports[component] !== void 0) {
		return imports[component];
	}

	throw new Error(
		`Invalid value for "component" variable. Possible values: '${Object.keys(
			imports
		).join("', '")}'`
	);
}