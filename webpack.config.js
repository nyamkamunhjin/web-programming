module.exports = {
  entry: {
    photoShare: './photoShare.jsx',
    topBar: './components/topBar/TopBar.jsx',
    userDetail: './components/userDetail/userDetail.jsx',
    userList: './components/userList/userList.jsx',
    userPhotos: './components/userPhotos/userPhotos.jsx',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/compiled`,
    publicPath: '/',
    filename: '[name].bundle.js',
  },
};
