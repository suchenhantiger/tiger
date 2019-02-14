var webpack = require("webpack"),
    path = require("path"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    plugins = [
        //文件分块打包
        new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ "vendor", /* filename= */ "./js/vendor.js"),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(getENV("NODE_ENV"))
            }
        }),
        new webpack.DllReferencePlugin({
           context: __dirname,
           manifest: require('./manifest.json'),
       }),
        new webpack.ProvidePlugin({
            $:"jquery",
            React:"react",
            ReactDOM:"react-dom",
            Component:"react/lib/ReactComponent",
            Bridge:path.resolve(__dirname,"src/jsx/utils/Bridge"),
            systemApi:path.resolve(__dirname,"src/jsx/utils/systemApi"),
            NetWork:path.resolve(__dirname,"src/jsx/utils/NetWork"),
            Client:path.resolve(__dirname,"src/jsx/utils/Client"),
            Base64:path.resolve(__dirname,"src/jsx/utils/Base64"),
            Cache:path.resolve(__dirname,"src/jsx/utils/Cache"),
            Event:path.resolve(__dirname,"src/jsx/utils/Event"),
            md5:path.resolve(__dirname,"src/jsx/utils/md5"),
            PureComponent:path.resolve(__dirname,"src/jsx/components/base/PureComponent"),
            PageComponent:path.resolve(__dirname,"src/jsx/components/base/PageComponent"),
            Content:path.resolve(__dirname,"src/jsx/components/base/Content"),
            CursorList:path.resolve(__dirname,"src/jsx/components/common/iscroll/CursorList"),
            CursorTable:path.resolve(__dirname,"src/jsx/components/common/iscroll/CursorTable"),
            Paper:path.resolve(__dirname,"src/jsx/components/common/paper/Paper"),
            hashHistory:"react-router/lib/hashHistory",
            Color:path.resolve(__dirname,"src/css/color.css"),
            Font:path.resolve(__dirname,"src/css/font.css")
        }),
        new CopyWebpackPlugin([{
            from: './src/css',
            to: 'css'
        },{
            from: './src/images',
            to: 'images'
        },{
            from: './src/font',
            to: 'font'
        },{
            from: './src/index.html'
        },{
            from: './common',
            to: 'js'
        }])
    ];

//获取环境变量
function getENV(param){
    return (process.env[param] || "").trim();
}

//判断是否是生产环境
function isProduction() {
    return getENV("NODE_ENV") == 'production';
}

//数据初始化
function init() {
    //判断打包类型是测试还是生产
    if (isProduction()) {
        console.log("生产环境打包...");
    }
    else{
        console.log("调试环境打包...");
    }
}

//初始化数据
init();

module.exports = {
    entry: {
        main: './src/jsx/main.jsx',
        vendor: [
            './src/jsx/utils/systemApi',
            './src/jsx/utils/Bridge',
            './src/jsx/utils/Client',
            './src/jsx/utils/Base64',
            './src/jsx/utils/NetWork',
            './src/jsx/utils/md5',
            './src/jsx/utils/Event',
            './src/jsx/utils/Cache',
            './src/jsx/components/base/PureComponent',
            './src/jsx/components/base/PageComponent',
            './src/jsx/components/common/iscroll/IScrollView',
            './src/jsx/components/common/iscroll/BaseScroll',
            './src/jsx/components/common/appheader/AppHeader',
            './src/jsx/components/common/paper/Paper'
        ]
    },
    output: {
        path: isProduction()?'./asset':'./build',
        chunkFilename:'js/bundle.[name].js',
        filename: './js/[name].js',
    },
    plugins: plugins,
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.tsx', '.web.ts', '.web.jsx','.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: [
                  ['transform-object-assign'],
                  ["import", { libraryName: "antd-mobile", style: "css" }]
                ],
            }
        },{
            test: /\.css$/,
            exclude: /node_modules/,//为了支持antd
            loader: 'style!css-loader?-url&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        },{//为了支持antd
            test: /\.css$/,
            exclude: /src/,
            loader: 'style!css-loader'
            
        },{
            test: /\.less$/,
            loader: 'style!css-loader?-url&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader'
        },{
            test: /\.json$/,
            loader: 'json'
        }]
    }

};
