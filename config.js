const path = require('path')
module.exports = {
  // entry 文件入口，可以是一个string，也可以是列表，亦或是object
  entry: './app/entry',
  entry: ['./app/entry1', './app/entry2'],
  entry: {
    a: './app/entry',
    b: ['./app/entry1', './app/entry2']
  },

  //output  文件输出结果
  output: {
    //文件存放的路径，必须是string类型的绝对路径
    path: path.resolve(__dirname, 'dist'),

    //filename  输出文件的名称
    filename: 'bundle.js', //完整的名称
    filename: '[name].js', //配置了多核entry时，通过名称模板为不同的entry生成不同的文件名称
    filename: '[chunkhash].js', //根据文件内容的hash值，生产名称，用于浏览器长时间缓存文件

    //publicPath 发布到线上的所有资源的URL前缀， 为string类型
    publicPath: '/assets/', //指定目录下
    publicPath: '', //根目录下
    publicPath: 'https://cdn.example.com', // 放到cdn上

    //导出的库的名称，为string类型、  library 在开发类库的时候才用的到。
    //不填写时，默认的输出格式是匿名的立即执行的函数
    library: 'myLibrary',

    //导出库的类型，为枚举类型，默认var
    //支持一下类型umd、umd2、commonjs、amd、this、var、assign、window、global、jsonp
    // [关于这几个targer的具体使用场景](https://blog.csdn.net/frank_yll/article/details/78992778)
    libraryTarget: 'umd',



    // 是否包含有用的文件路径信息到生成的代码里，为boolean类型
    pathinfo: true,

    //附加chunk的文件名称
    chunkFilename: '[id].js',
    chunkFilename: '[chunkhash].js',


    //jsonp异步加载资源时的回调函数名称，需要和服务端搭配使用
    jsonpFunctin: 'myWebpackJsonp',

    //生成的source map文件名称
    sourceMapFilename: '[file].map',

    //浏览器开发者工具里显示的源码模块名称
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',

    //异步加载跨域资源时使用的方式
    crossOriginLoading: 'use-credentials',
    crossOriginLoading: 'anonymous',
    crossOriginLoading: false

  },

  // 模块相关配置
  module: {
    rules: [ //配置loader
      {
        test: /\.jsx?$/, //正则匹配需要命中的文件，后缀
        include: [ //只会命中这里的文件
          path.resolve(__dirname, 'app')
        ],
        exclude: [ //忽略列表
          path.resolve(__dirname, 'app/demo-file')
        ],
        use: [ //使用那些loader, 从后向前执行
          'style-loader',
          {
            loader: 'css-loader',
            options: {}
          }
        ]
      },
    ],
    noParse: [ // 不用解析和处理的模块
      /special-library\.js$/ //用正则匹配
    ]
  },

  //用来配置插件
  plugins: [],

  //寻找模块的规则
  resolve: {
    // 寻找模块的根目录，为array类型，默认以node_modules为根目录
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app')
    ],
    extensions: ['.js', '.json', '.jsx', '.css'], //模块的后缀名
    alias: { //模块别名配置，用于映射模块

      // 讲modeule映射为new-module，同样’module/path/file‘会被映射为'new-module/path/file'
      'module': 'new-module',

      // 使用结尾符合我$后， 讲’only-module‘映射成'
      'only-modules$': 'new-module'
    },
    symlinks: true, // 是否跟随文件的软连接去搜索模块的路劲
    descriptionFiles: ['package.json'], // 模块的描述文件
    mainFields: ['main'], //模块的描述文件里描述入口的文件的字段名
    enforceExtension: false //是否强制导入语句写明文件后缀
  },


  //输出文件的性能检查配置
  performance: {
    hints: 'warning', //有性能问题时输出警告
    hints: 'error', //有性能问题时输出错误
    hints: false, //关闭性能检查

    maxAssetSize: 200000, //最大文件的大小byte
    maxEntrypointSize: 400000, //最大入口文件的大小

    assetFilter: function (assetFilename) { //过滤需要检查的文件
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    }
  },



  devtool: 'source-map', //配置source-map类型
  context: __dirname, //webpack使用的根目录，string类型必须是绝对路径

  //配置输出代码的运行环境
  target: 'web', // 默认web运行环境
  target: 'webworker', // webworker
  target: 'node', //node.js,  使用 ’require‘语句加载chunk代码
  target: 'async-node', //node.js  ,异步加载chunk代码
  target: 'node-webkit',
  target: 'electron-main',
  target: 'electron-renderer',

  externals: { //使用来自javascript运行环境提供的全局变量
    jquery: 'JQuery'
  },

  stats: { //控制台输出日志控制
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },

  devServer: { //Devserver相关配置
    proxy: {
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), //配置Devserver Http服务器的文件根目录
    compress: true, //是否开启Gzip压缩
    historyApiFallback: true, //是否开发 HTML5 history api网页
    hot: true, //是否开启模块热替换功能
    https: false //是否开启https模式
  },

  profile: true, //是否捕捉webpack构建的性能信息，分析什么原因导致的构建性能不佳
  cache: false, //是否启用缓存来提升构建速度
  watch: true, //是否开始

  watchOptions: { //监听模式选项
    //不监听的文件或文件夹，支持正则匹配，默认为空
    ignored: /node_modules/,
    //监听到变化发生后，等300MS再执行动作，截流，防止文件更新太快导致重新编译频率太快
    aggregateTimeout: 300,
    //不听得询问系统指定的文件有没有发生变化，默认每秒询问1000次
    poll: 1000
  }
}