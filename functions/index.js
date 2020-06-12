const functions = require('firebase-functions');
const express = require('express');
const requestPromise = require('request-promise-native'); // 追加


// serve
// http://localhost:5000/functions-c61ef/us-central1/helloWorld

// deploy
// https://us-central1-functions-c61ef.cloudfunctions.net/helloWorld

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })


const app = express();

// zipcode引数
const getDataFromApi = async zipcode => {
    const requestUrl = 'http://zipcloud.ibsnet.co.jp/api/search?zipcode=';
    const requestUrl2 = '&callback=jsonData'
    const result = await requestPromise(`${requestUrl}${zipcode}${requestUrl2}${".results[0]"}`);
    return result;
  }

// エンドポイント
app.get('/zipcode/:zipcode', async (req, res) => {
    // APIリクエストの関数を実行
    const response = await getDataFromApi(req.params.zipcode);
    res.send(response);
  });


// 出力！
const api = functions.https.onRequest(app);
module.exports = {api};