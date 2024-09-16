
# NLW Rocketseat - JavaScript

O arquivo `index.js` implementa um sistema de gerenciamento de metas em linha de comando. Aqui está uma explicação concisa das principais funcionalidades:

1. Importações e Inicialização:
   - Utiliza o módulo `@inquirer/prompts` para interação com o usuário.
   - Usa `fs.promises` para operações de arquivo assíncronas.
   - Inicializa variáveis para armazenar metas e mensagens.

2. Funções de Gerenciamento de Arquivo:
   - `carregarMetas()`: Lê metas de um arquivo JSON.
   - `salvarMetas()`: Salva metas em um arquivo JSON.

3. Funções de Gerenciamento de Metas:
   - `cadastrarMeta()`: Adiciona uma nova meta.
   - `listarMetas()`: Exibe e permite marcar/desmarcar metas.
   - `metasRealizadas()`: Mostra metas concluídas.
   - `metasAbertas()`: Exibe metas não concluídas.
   - `deletarMeta()`: Remove metas selecionadas.

4. Interface do Usuário:
   - `mostrarMensagem()`: Limpa a tela e exibe mensagens.
   - `start()`: Loop principal que apresenta um menu interativo.

5. Fluxo Principal:
   - Carrega metas existentes.
   - Entra em um loop que exibe o menu e processa a escolha do usuário.
   - Permite cadastrar, listar, visualizar e deletar metas.
   - Salva as alterações após cada operação.

O código cria uma aplicação interativa para gerenciar metas, permitindo ao usuário realizar várias operações de forma intuitiva através do terminal.


## Autores

- [@Ramon.god](https://www.github.com/Ramonlegend)

