const { select, input, checkbox } = require('@inquirer/prompts');
const fs = require('fs').promises;
let metas;
let mensagem = 'Bem vindo ao sistema de metas!';

const carregarMetas = async () => {
  try {
    const metasJson = await fs.readFile('metas.json', 'utf-8');
    metas = JSON.parse(metasJson);
  } catch (error) {
    console.log('Erro ao carregar metas:', error);
  }
};

const salvarMetas = async () => {
  await fs.writeFile('metas.json', JSON.stringify(metas, null, 2));
};

const cadastrarMeta = async () => {
  const meta = await input({ message: 'Digite a meta:' });

  if (meta.length == 0) {
    mensagem = 'A meta não pode ser vazia.';
    return;
  }

  metas.push({ value: meta, checked: false });

  mensagem = 'Meta cadastrada com sucesso!';
};

const listarMetas = async () => {
  if (metas.length == 0) {
    mensagem = 'Nenhuma meta cadastrada!';
    return;
  }
  const respostas = await checkbox({
    message:
      'Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa',
    choices: [...metas],
    instructions: false,
  });

  metas.forEach((m) => {
    m.checked = false;
  });

  if (respostas.length == 0) {
    mensagem = 'Nenhuma meta selecionada!';
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });

    meta.checked = true;
  });

  mensagem = 'Meta(s) marcadas como concluída(s)';
};

const metasRealizadas = async () => {
  if (metas.length == 0) {
    mensagem = 'Nenhuma meta cadastrada!';
    return;
  }
  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });

  if (realizadas.length == 0) {
    mensagem = 'Nenhuma meta realizada!';
    return;
  }

  await select({
    message: 'Metas realizadas:',
    choices: [...realizadas],
  });
};

const metasAbertas = async () => {
  if (metas.length == 0) {
    mensagem = 'Nenhuma meta cadastrada!';
    return;
  }
  const abertas = metas.filter((meta) => {
    return meta.checked != true;
  });

  if (abertas.length == 0) {
    mensagem = 'Nenhuma meta aberta!';
    return;
  }

  await select({
    message: 'Metas abertas:',
    choices: [...abertas],
  });
};

const deletarMeta = async () => {
  if (metas.length == 0) {
    mensagem = 'Nenhuma meta cadastrada!';
    return;
  }
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false };
  });

  const itensDeletar = await checkbox({
    message: 'escolha as metas que deseja deletar.',
    choices: [...metasDesmarcadas],
    instructions: false,
  });

  if (itensDeletar.length == 0) {
    mensagem = 'Nenhum item a deletar!';
    return;
  }

  itensDeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item;
    });
  });

  mensagem = 'Metas deletadas com sucesso!';
};

const mostrarMensagem = () => {
  console.clear();
  if (mensagem != '') {
    console.log(mensagem);
    console.log('');
    mensagem = '';
  }
};

const start = async () => {
  await carregarMetas();

  while (true) {
    mostrarMensagem();
    await salvarMetas();
    const opcao = await select({
      message: 'Menu >',
      choices: [
        {
          name: 'Cadastrar meta',
          value: 'cadastrar',
        },
        {
          name: 'Listar metas',
          value: 'listar',
        },
        {
          name: 'Metas realizadas',
          value: 'realizadas',
        },
        {
          name: 'Metas abertas',
          value: 'abertas',
        },
        {
          name: 'Sair',
          value: 'sair',
        },
      ],
    });

    switch (opcao) {
      case 'cadastrar':
        await cadastrarMeta();
        break;
      case 'listar':
        await listarMetas();
        break;
      case 'realizadas':
        await metasRealizadas();
        break;
      case 'abertas':
        await metasAbertas();
        break;
      case 'deletar':
        await deletarMeta();
        break;
      case 'sair':
        console.log('Até a próxima!');
        return;
    }
  }
};

start();
