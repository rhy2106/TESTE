const http = require('http');
const express = require('express');
const bodyParser = require("body-parser")
const fs = require('fs');
const path = require('path');

var app = express();

app.use(express.static('./src'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.set('views','./views')

var server = http.createServer(app);
server.listen(3000);

console.log("servidor rodando...");

app.get("/", function(entrada, saida){
	fs.readFile('data.csv', 'utf8', function(err, data){
		if(err){
			saida.status(404).render('erro', {resposta: "Erro ao ler Arquivo"});
			return;
		}
		var linhas = data.split('\n');
		var produtos = [];
		for(var i = 0; i < linhas.length; i++){
			var linha = linhas[i].split(',');
			if(linha[0] == '') continue;
			produtos.push({p: linha[0], a: parseInt(linha[1]), n: parseInt(linha[2])});
		}
		saida.render('home', {produtos});
	});
});

app.post("/mod", function(entrada, saida){
	fs.readFile('data.csv', 'utf8', function(err, data){
		if(err){
			saida.status(404).render('erro', {resposta: "Erro ao ler Arquivo"});
			return;
		}
		var linhas = data.split('\n');
		var texto = "";
		for(var i = 0; i < linhas.length; i++){
			var linha = linhas[i].split(',');
			if(linha[0] == '') continue;
			if(linha[0] == entrada.body.nome){
				linha[1] = entrada.body.a;
				linha[2] = entrada.body.n;
				linhas[i] = linha[0] + ',' + linha[1] + ',' + linha[2];
			}
			texto += linhas[i] + '\n';
		}
		fs.writeFile('data.csv', texto, function(err){
			if(err)
				saida.render('erro', {resposta: "Erro ao ler Arquivo"});
			else
				console.log("Arquivo foi escrito com sucesso");
		});
	});
});

app.post("/add", function(entrada, saida){
	fs.readFile('data.csv', 'utf8', function(err, data){
		if(err || entrada.body.p == ""){
			saida.status(404).render('erro', {resposta: "Erro ao ler Arquivo"});
			return;
		}
		if(isNaN(parseInt(entrada.body.a))) entrada.body.a = parseInt(0);
		if(isNaN(parseInt(entrada.body.n))) entrada.body.n = parseInt(0);
		var linhas = data.split('\n');
		var texto = "";
		var produtos = [];
		for(var i = 0; i < linhas.length; i++){
			var linha = linhas[i].split(',');
			if(linha[0] == '') continue;
			texto += linhas[i] + '\n';
			produtos.push({p: linha[0], a: parseInt(linha[1]), n: parseInt(linha[2])});
		}
		texto += entrada.body.p + ',' + entrada.body.a + ',' + entrada.body.n + '\n';
		produtos.push({p: entrada.body.p, a: parseInt(entrada.body.a), n: parseInt(entrada.body.n)});
		fs.writeFile('data.csv', texto, function(err){
			if(err)
				saida.render('erro', {resposta: "Erro ao ler Arquivo"});
			else
				console.log("produto adicionado com sucesso");	
		});
		for(var i = 0; i < produtos.length; i++){
			console.log(produtos[i]);
		}
		saida.redirect('/');
	});
});

app.post("/del", function(entrada,saida){
	fs.readFile('data.csv', 'utf8', function(err, data){
		if(err){
			saida.status(404).render('erro', {resposta: "Erro ao ler Arquivo"});
			return;
		}
		var linhas = data.split('\n');
		var texto = "";
		var produtos = [];
		for(var i = 0; i < linhas.length; i++){
			var linha = linhas[i].split(',');
			if(linha[0] == '') continue;
			if(linha[0] == entrada.body.p) continue;
			texto += linhas[i] + '\n';
			produtos.push({p: linha[0], a: parseInt(linha[1]), n: parseInt(linha[2])});
		}
		fs.writeFile('data.csv', texto, function(err){
			if(err)
				saida.render('erro', {resposta: "Erro ao ler Arquivo"});
			else
				saida.redirect('/');
		});
	});
});