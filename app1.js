const http = require('http');
var fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
var template = {
    HTML: function (title, list, body, control) {
        return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: lightgray;
        }        
        #background {
            background-color: white;
            height: auto;
            width: 90%;
            max-width: 450px;
            box-shadow: 0px 40px 30px -20px rgba(0, 0, 0, 0.3);
        } 

        .titlebar {
            background-color: #F9F9F9;
            font-weight: 400;
            border: none; border-bottom: 1px solid #CCCCCC;
            padding: 18px;
        }        
        .content {
            padding: 20px;
            max-height: max-content;
        }

        .btncover {
            display: flex;
            padding: 20px 10px 10px 10px;
        }        
        .btn {
            font-size: 15px;
            text-decoration: none;
            text-align: center;
            background-color: white;
            color: black;
            border: 1px solid lightgray;
            padding: 5px 10px;
            margin: 5px;
            display: inline-block;
            cursor: pointer;
            border-radius: 3px;
        }
      </style>
      </head>
      <body>
        <h2><a href="/" style="color:black; text-decoration: none; text-align: center;">Node.js 게시판 구현</a></h2>
        <div id="background">
          <div class="titlebar">글 목록</button></div>
          <div class="content">
              ${list}
          </div>
          <div class="titlebar">글 내용</button></div>
          <div class="content">
              ${body}
              ${control}
          </div>
        </div>
      </body>
      </html>
      `;
    }, list: function (filelist) {
        var list = '<ul>';
        var i = 0;
        while (i < filelist.length) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
        }
        list = list + '</ul>';
        return list;
    }
}

var app = http.createServer((req, res) => {
    var _url = req.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/') {
        // 메인 페이지 표시
        if(queryData.id === undefined) {        // 쿼리데이터가 없다면 글 목록 출력
            fs.readdir('./data', (error, filelist) => {
                var title = 'Welcome';
                var decoration = '너무 졸려ㅠ';
                var list = template.list(filelist);
                var html = template.HTML(title, list, `<h2> ${decoration} </h2>`, 
                    `<div class='btncover'>
                        <a class='btn' href='/create'>글 작성</a>
                    </div>`);
                    
                res.writeHead(200);
                res.end(html);
            });
        } else {
            fs.readdir('./data', function(error, filelist) {
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
                  var title = queryData.id;
                  var list = template.list(filelist);
                  var html = template.HTML(title, list,
                    `<h2>${title}</h2>${description}`,
                    ` <div class="btncover">
                      <a class="btn" href="/create">글 작성</a>
                      <a class="btn" href="/update?id=${title}">글 수정</a>
                      <form action="/delete_pro" method="post" style="display: inline; padding 9px;">
                        <input type="hidden" name="id" value="${title}">
                        <input type="submit" value="글 삭제" class="btn">
                      </form>
                      </div>`
                  );
                  res.writeHead(200);
                  res.end(html);
                });
              });
        }
    } else if (pathname === '/create') {
        // 글쓰기 창 표시
        fs.readdir('./data', (error, filelist) => {
            var title = 'WEB - create';
            var list = template.list(filelist);
            var html = template.HTML(title, list, 
                `<form action="/create_pro" method="post" style="padding:10px; display:flex; flex-direction:column;">
                    <p> 제목 </p>
                    <input type="text" name="title" placeholder="title" class="textinput">
                    <p> 내용 </p>
                    <textarea name="description" placeholder="description" class="textinput" rows="5"></textarea><br>
                    <input type="submit" class="btn" value="글 작성">
                </form>`,'');
                
            res.writeHead(200);
            res.end(html);
        });
    } else if (pathname === '/create_pro') {
        // 글쓰기의 내용을 파일로 저장 후 다시 메인페이지로 이동
        var body = '';
        req.on('data', (data) => {
            body = body + data;
        });
        req.on('end', () => {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;

            fs.writeFile(`./data/${title}`, description, 'utf8', function(err) {
                res.writeHead(302, {Location:`/`});
                res.end();              // 자동으로 루트로 이동
            });
        });
    } else if (pathname === '/update') {
        // 해당 내용을 폼으로 로딩
        fs.readdir('./data', (err, filelist) => {
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
                var title = queryData.id;
                var list = template.list(filelist);
                var html = template.HTML(title, list,
                    `
                    <form action='/update_pro' method='post' style='padding:10px; display:flex; flex-direction:column;'>
                        <input type='hidden' name='id' value=${title}>
                        <p> 제목 </p>
                        <input type='text' name='title' placeholder='title' value='${title}' class='textinput'>
                        <p> 내용 </p>
                        <textarea name='description' placeholder='description' class='textinput' rows='5'>${description}</textarea><br>
                        <input type='submit' value='수정하기' class='btn'>
                    </form>
                    `, 
                    `<div class='btncover'>
                        <a class='btn' href='/create'> 글 작성 </a>
                        <a class='btn' href='/update?id=${title}'> 글 수정 </a>
                    </div>`);
                res.writeHead(200);
                res.end(html);
            })
        });
    } else if (pathname === '/update_pro') {
        // 해당 글의 내용을 수정한 후 다시 메인페이지로 이동
        var body = '';
        req.on('data', (data) => {
            body = body + data;
        });
        req.on('end', () => {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, (error) => {
                fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
                    res.writeHead(302, {Location: `/`});
                    res.end();
                })
            });
        });
    } else if (pathname === '/delete_pro') {
        // 해당 글의 내용을 삭제한 후 다시 메인페이지로 이동
        var body = '';
        req.on('data', (data) => {
            body = body + data;
        });
        req.on('end', () => {
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`, (error) => {
                res.writeHead(302, {Location: `/`});
                res.end();
            })
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

app.listen(3000);