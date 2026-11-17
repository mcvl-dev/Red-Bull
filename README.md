# Red Bull Symphonic Brasil

Site estático em HTML, CSS e JavaScript.

## Arquivos

- `index.html`: conteúdo e fotografias incorporadas.
- `style.css`: estilos, responsividade e animações.
- `script.js`: navegação, interações e formulário.
- `vercel.json`: configuração da publicação estática.

## Abrir localmente

Abra esta pasta no VS Code e abra `index.html` no navegador, ou use Live Server. Não precisa instalar dependências. As fontes do Google Fonts e os links do YouTube precisam de internet.

## Publicar na Vercel

1. Na Vercel, selecione **Add New → Project**.
2. Importe este repositório do GitHub.
3. Use a branch `main`, raiz `./` e Framework Preset **Other**.
4. A configuração já define saída `.` e nenhum comando de instalação ou build.
5. Clique em **Deploy**.

## Formulário

O formulário ainda não envia cadastros. Configure `FORM_ENDPOINT` em `script.js` com um endpoint HTTPS compatível com POST JSON e CORS. Insira o link da política de privacidade em `index.html`. O serviço deve cuidar do recebimento, confirmação e cancelamento dos e-mails. Nunca coloque chaves privadas no código do navegador.

## Informações do evento

Data, local e regras de acesso da próxima edição permanecem a confirmar. Alguns espaços de imagem ainda são placeholders intencionais.
