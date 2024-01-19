const fs = require('fs');


function lerArquivoJSON(caminhoArquivo) {
    try {
        const conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
        return JSON.parse(conteudo);
    } catch (erro) {
        console.error(`Erro ao ler o arquivo ${caminhoArquivo}: ${erro.message}`);
        return null;
    }
}


function corrigirNomes(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].marca = data[i].marca.replace(/æ/g, 'a').replace(/ø/g, 'o');
        data[i].veiculo = data[i].veiculo.replace(/æ/g, 'a').replace(/ø/g, 'o');
    }
    return data;
}


function corrigirVendas(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].vendas = Number(data[i].vendas);
    }
    return data;
}

// Função para exportar um arquivo JSON com o banco corrigido
function exportarArquivoJSON(caminhoArquivo, data) {
    try {
        const conteudo = JSON.stringify(data, null, 2);
        fs.writeFileSync(caminhoArquivo, conteudo, 'utf8');
        console.log(`Arquivo ${caminhoArquivo} exportado com sucesso.`);
    } catch (erro) {
        console.error(`Erro ao exportar o arquivo ${caminhoArquivo}: ${erro.message}`);
    }
}

// Ler os arquivos originais
const caminhoArquivoOriginal1 = 'database_1.json';
const caminhoArquivoOriginal2 = 'database_2.json';

const dadosOriginais1 = lerArquivoJSON(caminhoArquivoOriginal1);
const dadosOriginais2 = lerArquivoJSON(caminhoArquivoOriginal2);

// Corrigir nomes de marca e veículo
const dadosCorrigidos1 = corrigirNomes([...dadosOriginais1]);
const dadosCorrigidos2 = corrigirNomes([...dadosOriginais2]);

// Corrigir vendas
corrigirVendas(dadosCorrigidos1);
corrigirVendas(dadosCorrigidos2);

// Exportar arquivos corrigidos
exportarArquivoJSON('database_corrigido_1.json', dadosCorrigidos1);
exportarArquivoJSON('database_corrigido_2.json', dadosCorrigidos2);
