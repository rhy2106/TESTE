function mod(nome,op) {
    try {
        var a, n;
        a = parseInt(document.getElementById(nome+"_a").innerHTML);
        n = parseInt(document.getElementById(nome+"_n").innerHTML);
        if(op == 1) a = a + 1;
        else if(op == -1) a = a - 1;
        else if(op == 2) n = n + 1;
        else if(op == -2) n = n - 1;
        axios.post('http://localhost:3000/mod', {
            nome: nome,a: a,n: n
        });
        axios.get('http://localhost:3000');
        document.getElementById(nome+"_a").innerHTML = a;
        document.getElementById(nome+"_n").innerHTML = n;
        if(a >= n){
            document.getElementById(nome+"_n").style.border = "solid 2px #338833";
            document.getElementById(nome+"_a").style.border = "solid 2px #338833";
            document.getElementById(nome).style.border = "solid 2px #338833";
            document.getElementById(nome+"_seta1").style.border ="solid 2px #338833";
            document.getElementById(nome+"_seta2").style.border ="solid 2px #338833";
            document.getElementById(nome+"_seta3").style.border ="solid 2px #338833";
            document.getElementById(nome+"_seta4").style.border ="solid 2px #338833";
        } else {
            document.getElementById(nome+"_n").style.border = "solid 2px #aa0000";
            document.getElementById(nome+"_a").style.border = "solid 2px #aa0000";
            document.getElementById(nome).style.border = "solid 2px #aa0000";
            document.getElementById(nome+"_seta1").style.border ="solid 2px #aa0000";
            document.getElementById(nome+"_seta2").style.border ="solid 2px #aa0000";
            document.getElementById(nome+"_seta3").style.border ="solid 2px #aa0000";
            document.getElementById(nome+"_seta4").style.border ="solid 2px #aa0000";
        }
    } catch (erro) {
        console.error("Erro ao enviar dados:", erro);
    }
}