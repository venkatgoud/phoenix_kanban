var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

function join(dest) { return path.resolve(__dirname, dest); }

function web(dest) { return join('web/static/' + dest); }

module.exports = {
	// name of the top level file or set of files that we want to include in our build	 
  entry: {     
    'app'    : [ web('js/app.js'), web('styles/app.css')]
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].js',
    path: join('priv/static')
  },
  module: {
  	loaders: [
  		{ test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {           
          presets: ['react', 'es2015', 'stage-2', 'stage-0']
        }
      },         
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader",{publicPath: "../"})
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: "file?name=css/[name].[ext]" 
      },
      { test: /\.(woff|woff2)$/, 
        loader: "url?prefix=font/&limit=5000&name=css/[name].[ext]" 
      },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: "url?limit=10000&mimetype=application/octet-stream&name=css/[name].[ext]" 
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: "url?limit=10000&mimetype=image/svg+xml&name=css/[name].[ext]" 
      } 
  	]
	},
  devtool: "source-map",	 
  plugins: [     
    new ExtractTextPlugin('css/[name].css')
  ]
};

// if running webpack in production mode, minify files with uglifyjs
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  );
}