====================================================================
GRANIPOX CONSTRUÇÃO CIVIL — MANUAL DO SITE
====================================================================

1. O QUE É
--------------------------------------------------------------------
Site institucional de página única (one page) feito em HTML5, CSS3 e
JavaScript puro (ES6+), sem WordPress e sem frameworks. Todas as
animações, o carrossel, o lightbox, o accordion e a calculadora de
orçamento foram escritos à mão, sem bibliotecas externas — isso
mantém o carregamento extremamente rápido (nota alta no Lighthouse).


2. ESTRUTURA DE ARQUIVOS
--------------------------------------------------------------------
public/site/
├── index.html          → estrutura e conteúdo (HTML semântico + SEO)
├── css/
│   └── style.css       → todo o design (variáveis, componentes, responsivo)
├── js/
│   └── script.js       → toda a lógica e o conteúdo dinâmico
├── assets/             → imagens (hero, granito, mármore, bancada, etc.)
└── LEIA-ME.txt         → este arquivo

Neste projeto Lovable, a rota "/" redireciona automaticamente para
/site/index.html. Para hospedar em qualquer outro servidor, basta
copiar a pasta "site" inteira — ela funciona sozinha, até aberta
direto do disco.


3. CONFIGURAÇÃO RÁPIDA (o que você precisa editar)
--------------------------------------------------------------------
Abra o arquivo js/script.js. No topo existe o bloco CONFIG:

  const CONFIG = {
    empresa:  "Granipox Construção Civil",
    whatsapp: "5511999999999",   <-- TROQUE PELO SEU NÚMERO
    telefone: "(11) 3333-3333",
    email:    "contato@granipox.com.br",
    endereco: "Av. das Pedras, 1200 ...",
    horario:  "Seg a Sex 08h - 18h · Sáb 08h - 12h",
    ...
  }

• whatsapp: apenas dígitos, no formato 55 + DDD + número.
  Exemplo: (11) 98888-7777  →  "5511988887777".
• Ao alterar esses campos, o número muda automaticamente no botão
  flutuante, na seção de contato, no rodapé e em todas as mensagens.


4. PREÇOS DA CALCULADORA
--------------------------------------------------------------------
Ainda no CONFIG, em js/script.js:

  materiais:   preço BASE por m² de cada material (em reais)
  espessuras:  multiplicador (2cm = 1, 3cm = 1.28, 4cm = 1.5)
  acabamentos: multiplicador (polido = 1, levigado = 1.12, ...)
  m2PorDia:    produtividade usada para calcular o prazo
  prazoMinimoDias: prazo mínimo exibido

Fórmula usada:
  valor = preçoBase × fatorEspessura × fatorAcabamento × (área × quantidade)
  prazo = máx(prazoMinimoDias, arredondar(áreaTotal / m2PorDia))

Para adicionar um novo material, acrescente uma linha na lista:
  { id: "travertino", nome: "Travertino", preco: 860 },
O campo do formulário é preenchido automaticamente.


5B. PAINEL DO ADMINISTRADOR DA VITRINE
--------------------------------------------------------------------
O administrador pode editar a vitrine de produtos direto no site,
sem mexer no código.

Como acessar:
  • clique em "Área do administrador" no rodapé, ou
  • pressione Ctrl + Shift + A, ou
  • abra o site com /#admin no final da URL

Senha: definida no CONFIG de js/script.js em:
  adminSenha: "granipox2024"   <-- TROQUE ESSA SENHA

No painel é possível:
  • alterar nome, categoria, descrição e texto alternativo (alt/SEO)
  • trocar a foto de qualquer produto (envio direto do computador)
  • adicionar novos produtos
  • excluir produtos
  • restaurar a vitrine original

Importante: as alterações são salvas no navegador de quem editou
(localStorage), servindo como personalização rápida. Para que a
vitrine nova apareça para TODOS os visitantes de forma permanente,
edite a lista PRODUTOS_PADRAO em js/script.js (item 5 deste manual)
ou salve as fotos definitivas na pasta assets/.


4B. DESCONTO AUTOMÁTICO POR TAMANHO DA OBRA (oculto)
--------------------------------------------------------------------
A calculadora aplica automaticamente um desconto por volume que NÃO
é exibido ao cliente: quanto maior a área total, menor o preço/m².

Configurado no CONFIG de js/script.js:

  descontosPorArea: [
    { ate: 10,       fator: 1 },     // até 10 m²  - sem desconto
    { ate: 25,       fator: 0.95 },  // 10 a 25 m²  - 5% menor
    { ate: 50,       fator: 0.90 },  // 25 a 50 m²  - 10% menor
    { ate: 100,      fator: 0.85 },  // 50 a 100 m² - 15% menor
    { ate: 250,      fator: 0.80 },  // 100 a 250 m² - 20% menor
    { ate: Infinity, fator: 0.74 },  // acima de 250 m² - 26% menor
  ]

Fórmula final:
  valor = preçoBase × fatorEspessura × fatorAcabamento
          × (área × quantidade) × fatorDescontoPorVolume

Para mudar os percentuais, altere apenas os "fator" (0.9 = 10% de
desconto). Para criar novas faixas, acrescente linhas na lista
mantendo a ordem crescente de "ate".


5. TEXTOS E SEÇÕES
--------------------------------------------------------------------
Todo o conteúdo repetitivo está em listas no js/script.js, logo
abaixo do CONFIG — basta editar o texto entre aspas:

  DIFERENCIAIS  → cards da seção "Por que escolher"
  PRODUTOS_PADRAO → vitrine de produtos (nome, imagem, descrição)
  SERVICOS      → cards de serviços
  PROCESSO      → etapas da timeline
  GALERIA       → imagens da galeria/lightbox
  DEPOIMENTOS   → carrossel de clientes
  FAQ           → perguntas e respostas

Títulos de seção, hero e rodapé estão diretamente no index.html.


6. TROCAR AS IMAGENS
--------------------------------------------------------------------
1) Salve suas fotos na pasta assets/ (use .jpg ou .webp).
2) Recomendado: largura máxima de 1600px e compressão em
   https://squoosh.app (deixe cada arquivo abaixo de 300 KB).
3) Atualize o caminho no js/script.js (listas PRODUTOS e GALERIA)
   ou no index.html (imagem do hero e da composição).
4) SEMPRE escreva um texto no campo "alt" descrevendo a imagem —
   isso é essencial para SEO e acessibilidade.

Todas as imagens já usam loading="lazy" (exceto o hero, que é a
imagem principal e carrega com prioridade).


7. GOOGLE MAPS
--------------------------------------------------------------------
No index.html, procure por <iframe title="Localização da Granipox...">
e troque o endereço na URL:
  https://www.google.com/maps?q=SEU+ENDERECO+AQUI&output=embed


8. SEO — O QUE JÁ ESTÁ PRONTO
--------------------------------------------------------------------
• Title otimizado e meta description
• Meta keywords, author, robots e canonical
• Open Graph e Twitter Card (compartilhamento em redes sociais)
• Schema.org (GeneralContractor) com endereço, telefone e avaliação
• HTML semântico: header, nav, main, section, article, footer
• Um único H1, hierarquia correta de H2/H3
• Alt em todas as imagens, lazy loading e preload do hero

Ao publicar em um domínio próprio, troque no index.html:
  <link rel="canonical" href="https://seudominio.com.br/" />
  <meta property="og:image" content="https://seudominio.com.br/assets/hero.jpg" />
(as URLs de imagem para redes sociais precisam ser absolutas)


9. ACESSIBILIDADE
--------------------------------------------------------------------
• Link "pular para o conteúdo" para leitores de tela
• Navegação completa por teclado (Tab, Enter, Esc, setas no lightbox)
• aria-label, aria-expanded, aria-controls e role nos componentes
• Contraste conforme WCAG AA
• Respeita "prefers-reduced-motion" (desliga animações se o usuário
  configurou isso no sistema)


10. PERFORMANCE
--------------------------------------------------------------------
• Zero bibliotecas externas de JS (nada de jQuery, GSAP, Swiper)
• Script com "defer", animações via IntersectionObserver e
  requestAnimationFrame (não travam o scroll)
• CSS único, organizado por seções, com variáveis de design
• Fontes carregadas com display=swap e preconnect

Para nota máxima no Lighthouse, comprima as imagens (item 6) e
sirva o site com HTTPS e compressão gzip/brotli ativada no servidor.


11. PALETA E TIPOGRAFIA
--------------------------------------------------------------------
Tudo definido no topo do css/style.css, no bloco ":root":

  --black    #0b0b0c   (preto)
  --graphite #17181b   (cinza escuro)
  --gray     #6b7076   (cinza médio - textos)
  --gray-light #f4f5f7 (cinza claro - fundos)
  --white    #ffffff   (branco)
  --red      #d92027   (destaque, botões)

Fontes: Poppins (títulos) e Inter (textos).
Mudar uma cor em ":root" atualiza o site inteiro.


12. PUBLICAÇÃO
--------------------------------------------------------------------
Opção A — Lovable: clique em "Publish" no canto superior direito.
Opção B — Hospedagem própria: envie a pasta "site" por FTP para a
raiz do seu domínio (Hostinger, Locaweb, Netlify, Vercel, GitHub
Pages etc.). Não é necessário PHP, banco de dados ou instalação.


13. CHECKLIST ANTES DE PUBLICAR
--------------------------------------------------------------------
[ ] Número do WhatsApp atualizado no CONFIG
[ ] Telefone, e-mail e endereço reais
[ ] CNPJ no rodapé (index.html)
[ ] Preços da calculadora revisados
[ ] Fotos reais das suas obras na galeria e nos produtos
[ ] Endereço correto no Google Maps
[ ] Links das redes sociais no rodapé (hoje estão como "#")
[ ] Depoimentos reais de clientes
[ ] Senha do painel do administrador trocada (adminSenha)
[ ] Faixas de desconto por volume revisadas
[ ] Canonical e og:image com o domínio final

====================================================================
Dúvidas? Todo o código está comentado seção por seção.
====================================================================
