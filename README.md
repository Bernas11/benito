# Bento — startpage personalizável

Uma página inicial estática inspirada numa grelha Bento, com relógio, atalhos, layouts, temas e um widget meteorológico opcional. Este repositório inclui uma adaptação personalizada do projeto e mantém o crédito indicado na metadata original.

## Executar localmente

Não é necessária instalação de dependências. Na raiz do repositório:

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000` e personaliza `config.js` (nome, cumprimentos, layout, tema, localização e atalhos). Para testar via Docker:

```bash
docker compose up --build
```

Depois abre `http://localhost:8080`.

## Meteorologia e chaves API

A meteorologia fica sem chave e mostra um estado de “não configurada” por omissão. A chave usada pelo browser é sempre pública para quem visita o site; **não a trates como segredo nem publiques uma chave pessoal**. Para uso local, define uma chave de teste com limites de quota e restrições de origem no fornecedor. Para uma publicação pública, prefere um proxy no servidor e proteção de abuso. Se uma chave real já tiver sido publicada, revoga-a/roda-a no fornecedor.

## Verificações e limitações

A aplicação é estática e não tem suite de testes automatizada. Verifica manualmente os três layouts, navegação por teclado, tema e meteorologia configurada e não configurada. Recursos de terceiros (ícones/CDN e API meteorológica) dependem da rede e dos respetivos fornecedores.

## Créditos e licença

O `package.json` atribui o projeto a Miguel Ávila e contém metadata `ISC`, enquanto o ficheiro `License` contém o texto da GNU GPL versão 3. Esta divergência ainda precisa de confirmação com a fonte/titular antes de redistribuir ou alterar a licença; não assumas que uma das declarações substitui a outra. A licença do código não cobre automaticamente serviços, marcas ou conteúdos de terceiros.
