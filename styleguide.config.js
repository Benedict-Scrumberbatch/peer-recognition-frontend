module.exports = {
	components: 'src/components/**/[A-Z]*.tsx', 
	ignore: ['**/src/components/Feed/Feed.tsx','**/*.test.{js,jsx,ts,tsx}','**src/components/Private/PrivateNavbar.tsx'
	,'src/components/Private/PrivateRoute.tsx','**/src/components/Signup/Signup.tsx', "**/src/components/Signup/TagSelect.tsx"],
	compilerConfig: {
		target: "es5",
		lib: [
		  "dom",
		  "dom.iterable",
		  "esnext"
		],
		allowJs: true,
		skipLibCheck: true,
		esModuleInterop: true,
		allowSyntheticDefaultImports: true,
		strict: false,
		strictPropertyInitialization: false,
		forceConsistentCasingInFileNames: true,
		noFallthroughCasesInSwitch: true,
		module: "esnext",
		moduleResolution: "node",
		resolveJsonModule: true,
		isolatedModules: true,
		noEmit: true,
		jsx: "react-jsx",
		experimentalDecorators: true,
		emitDecoratorMetadata: true,
	  },
	  webpackConfig: {
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
	},
}
