const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const siteUrl = 'https://corentindiard.fr';

const paths = [
    { path: '/', changefreq: 'daily', priority: 1.0 }
];

module.exports = {
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            scriptLoading: 'defer',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyCSS: true,
                minifyJS: true
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets/images', to: 'images', noErrorOnMissing: true },
                { from: 'src/assets/fonts', to: 'fonts', noErrorOnMissing: true },
                { from: 'src/assets/documents', to: 'documents', noErrorOnMissing: true }
            ]
        }),
        new SitemapPlugin({ base: siteUrl, paths })
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    }
                }
            }),
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    performance: {
        maxEntrypointSize: 614400,
        maxAssetSize: 614400,
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: true,
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.svg$/i,
                oneOf: [
                    {
                        issuer: /\.css$/i,
                        type: 'asset/resource',
                    },
                    {
                        issuer: /\.(js)$/i,
                        type: 'asset/source',
                    }
                ]
            },
            {
                test: /\.pdf$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'documents/[name][ext]'
                }
            }
        ]
    },
};