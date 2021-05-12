var path = require('path')
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');


module.exports = {
	components: 'src/components/**/[A-Z]*.tsx', 
	ignore: ['**/tools/postinstall.js', '**/src/components/Feed/Feed.tsx','**/*.test.{js,jsx,ts,tsx}','**src/components/Private/PrivateNavbar.tsx'
	,'src/components/Private/PrivateRoute.tsx','**/src/components/Signup/Signup.tsx', "**/src/components/Signup/TagSelect.tsx"],
	  webpackConfig: {
		externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
		plugins: [
			new webpack.ProvidePlugin({
			  process: 'process/browser',
			}),
		  ],
		module: {
			rules: [
				{
					test: /\.(png|jpe?g|gif)$/i,
					use: [
					  {
						loader: 'file-loader',
					  },
					],
				  },
				{
                    test: /\.(jsx|js|tsx|ts)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve('./tsconfig.json'),
                            },
                        },
                    ],
                },
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
	},
}
