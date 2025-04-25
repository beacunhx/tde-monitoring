const { faker } = require("@faker-js/faker");
const XLSX = require("xlsx");
const fs = require("fs");

// Lista fixa de IDs dos sensores
const idsSensores = [
  "sensor-001",
  "sensor-002",
  "sensor-003",
  "sensor-004",
  "sensor-005",
];

// Faixas de valores para os estados da máquina
const ESTADOS_MAQUINA = {
  bom: [0, 2.3],
  aceitavel: [2.4, 4.5],
  alerta: [4.5, 7.1],
  perigoso: [7.2, null],
};

// Lê os argumentos da linha de comando (exemplo: node script.js sensor-001=alerta sensor-003=perigoso)
const args = process.argv.slice(2); // Ignora "node" e o nome do script

// Dicionário para armazenar o estado de cada sensor
const estadosSensores = {};

// Define o estado padrão como "bom" para todos os sensores
idsSensores.forEach((sensor) => {
  estadosSensores[sensor] = "bom";
});

// Processa os argumentos passados pelo usuário
args.forEach((arg) => {
  const [sensor, estado] = arg.split("=");

  if (idsSensores.includes(sensor) && ESTADOS_MAQUINA.hasOwnProperty(estado)) {
    estadosSensores[sensor] = estado;
  } else {
    console.error(`Erro: Sensor ou estado inválido -> ${arg}`);
    process.exit(1);
  }
});

// Dicionário para controlar o valor atual de vibração de cada sensor
const valoresVibracao = {};
idsSensores.forEach((sensor) => {
  valoresVibracao[sensor] = ESTADOS_MAQUINA[estadosSensores[sensor]][0]; // Começa com o valor mínimo do estado
});

// Função para gerar dados simulados do sensor
function gerarDadoSensor() {
  const dados = [];

  idsSensores.forEach((sensor_id) => {
    const estado = estadosSensores[sensor_id];
    const [min, max] = ESTADOS_MAQUINA[estado];
    let vibracao = valoresVibracao[sensor_id];

    // Aumenta gradualmente o valor de vibração
    if (max !== null) {
      vibracao = Math.min(vibracao + 0.05, max); // Incrementa 0.05 a cada ciclo, mas não ultrapassa o valor máximo
    } else {
      vibracao = Math.min(vibracao + 0.05, 15); // Para o estado "perigoso", assume um máximo arbitrário de 15
    }

    // Atualiza o valor de vibração para o próximo ciclo
    valoresVibracao[sensor_id] = vibracao;

    dados.push({
      sensor_id: sensor_id,
      timestamp: new Date().toISOString(),
      vibracao: vibracao.toFixed(2), // Limita a 2 casas decimais
      estado: estado,
    });
  });

  return dados;
}

// Função para ler o arquivo Excel existente (se houver) ou criar um novo arquivo
function lerOuCriarArquivoExcel(nomeArquivo) {
  if (fs.existsSync(nomeArquivo)) {
    const wb = XLSX.readFile(nomeArquivo); // Lê o arquivo Excel existente
    return wb;
  } else {
    // Se não existir, cria um novo arquivo com um cabeçalho vazio
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ["sensor_id", "timestamp", "vibracao", "estado"],
    ]); // Cabeçalho
    XLSX.utils.book_append_sheet(wb, ws, "Dados Sensores");
    return wb;
  }
}

// Função para gerar e salvar os dados no Excel
function gerarESalvarDados() {
  try {
    const dados = gerarDadoSensor();
    const nomeArquivo = `dados_sensores_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`; // Nome do arquivo com data

    // Ler ou criar o arquivo Excel
    const wb = lerOuCriarArquivoExcel(nomeArquivo);

    // Converte os dados para o formato de planilha e adiciona à planilha existente
    const ws = XLSX.utils.json_to_sheet(dados, {
      header: ["sensor_id", "timestamp", "vibracao", "estado"],
      skipHeader: true,
    });
    XLSX.utils.sheet_add_json(wb.Sheets["Dados Sensores"], dados, {
      origin: -1,
    });

    // Salva o arquivo Excel com os dados novos
    XLSX.writeFile(wb, nomeArquivo);

    // Exibe os dados no console
    dados.forEach((dado) => {
      console.log(JSON.stringify(dado, null, 2));
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Encerra o programa em caso de erro
  }
}

// Função para controlar o ciclo de geração de dados
function cicloDeGeracao() {
  gerarESalvarDados();
  setTimeout(cicloDeGeracao, 300000); // Espera 5 minutos (300.000 ms) antes de gerar novos dados
}

// Inicia o ciclo de geração de dados
cicloDeGeracao();
