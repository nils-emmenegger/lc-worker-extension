const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
    entry: {
      popup: path.join(srcDir, 'popup.tsx'),
      options: path.join(srcDir, 'options.tsx'),
      content_script_main: path.join(srcDir, 'content_script_main.tsx'),
      content_script_isolated: path.join(srcDir, 'content_script_isolated.tsx'),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks: "all",
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: ".",
                    globOptions: {
                        ignore: ["**/icon.svg"],
                    },
                    to: "../",
                    context: "public",
                }
            ],
            options: {},
        }),
    ],
};
