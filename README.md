# Dicas Práticas — site estático com SEO + Adcash

Site 100% estático (HTML, CSS e JS separados, sem build, sem framework), pronto para GitHub + Vercel, com conteúdo real, SEO técnico e slots preparados para anúncios da Adcash.

## Estrutura

```
/
├── index.html
├── sobre.html
├── contato.html
├── privacidade.html
├── termos.html
├── robots.txt
├── sitemap.xml
├── vercel.json
├── artigos/
│   ├── economia-domestica.html
│   ├── organizacao-casa.html
│   ├── produtividade-diaria.html
│   └── tecnologia-basica.html
├── css/
│   └── style.css
└── js/
    └── main.js
```

## 1. Antes de publicar — troque os placeholders

Busque e substitua em todos os arquivos `.html`:

| Placeholder | Trocar por |
|---|---|
| `seu-dominio.vercel.app` | o domínio real do seu projeto na Vercel (ou domínio próprio) |
| `SUBSTITUA_PELO_ZONE_ID_1`, `_2`, `_3`... | os IDs de zona/anúncio que a Adcash gerar para você |
| `contato@seu-dominio.com.br` | seu e-mail real de contato |

Dica: no VS Code, use "Localizar e Substituir em Arquivos" (Ctrl+Shift+H) para trocar `seu-dominio.vercel.app` de uma vez só, depois de saber a URL final da Vercel.

## 2. Configurando a Adcash

1. Crie uma conta em adcash.com e cadastre seu site (ele **precisa estar publicado** primeiro — por isso o passo 3 vem antes de configurar os anúncios de verdade).
2. No painel da Adcash, crie os formatos de anúncio que preferir (banner, native, pop, etc.) e copie o **script/tag** de cada um.
3. Abra `js/main.js` e, na função `loadAd()`, troque a linha:
   ```js
   script.src = `https://your-cdn.adcash-provided-domain.example/tag/${zoneId}.js`;
   ```
   pelo código de tag exato que a Adcash fornecer para cada zona (o formato varia por tipo de anúncio — siga a documentação deles).
4. Nos arquivos `.html`, os blocos `<div class="ad-slot" data-ad-slot="...">` já estão posicionados nos melhores pontos (topo, meio de artigo, lateral). Basta colocar o `zone id` correto em cada `data-ad-slot`.

**Importante:** o carregamento dos anúncios é "lazy" (só carrega quando o bloco entra na tela) — isso ajuda a página a carregar mais rápido, o que também é um fator de SEO.

## 3. Publicando no GitHub

```bash
git init
git add .
git commit -m "Site inicial: Dicas Práticas"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

## 4. Deploy na Vercel

**Opção A — pelo site:**
1. Acesse vercel.com → **Add New Project**.
2. Importe o repositório do GitHub que você acabou de criar.
3. Como é um site estático puro, não é preciso configurar build command nem output directory — deixe em branco/"Other".
4. Clique em **Deploy**.

**Opção B — pela CLI:**
```bash
npm i -g vercel
vercel login
vercel --prod
```

Depois do primeiro deploy, pegue a URL gerada (ex: `dicas-praticas.vercel.app`) e volte no passo 1 para substituir `seu-dominio.vercel.app` pela URL real, depois faça `git commit` + `git push` de novo (a Vercel redeploya automaticamente a cada push).

## 5. Checklist de SEO já incluído

- Tags `title` e `meta description` únicas por página
- `link rel="canonical"` em todas as páginas
- Open Graph e Twitter Card
- Dados estruturados (JSON-LD) tipo `WebSite` e `Article`
- `robots.txt` e `sitemap.xml`
- HTML semântico (`header`, `main`, `article`, `footer`)
- Site responsivo, rápido (sem frameworks pesados), com lazy-load de anúncios
- Páginas de Sobre, Contato, Privacidade e Termos (exigidas pela maioria das redes de anúncio para aprovação)

## 6. Depois de publicar

1. Cadastre o site no **Google Search Console** e envie a `sitemap.xml`.
2. Cadastre no **Bing Webmaster Tools** também (gera tráfego adicional com pouco esforço).
3. Escreva novos artigos seguindo o mesmo padrão de arquivo (copie um `.html` da pasta `artigos/`, troque o conteúdo, título, meta tags e JSON-LD, e adicione o link em `index.html` e em `sitemap.xml`).

## Um aviso importante sobre "ganhar por clique/visualização"

Redes como a Adcash pagam por tráfego **real**. Gerar cliques ou visualizações artificiais (bots, troca de cliques, incentivo a clicar sem interesse genuíno) viola os termos de qualquer rede de anúncios e normalmente resulta em **banimento da conta e retenção dos valores ganhos** — não é um atalho, é o jeito mais rápido de perder tudo. O caminho que realmente funciona é: conteúdo útil → tráfego orgânico do Google → anúncios vistos por gente de verdade. Este projeto foi montado com esse objetivo.
