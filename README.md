# 🚀 Desafio Técnico: O Catálogo Inteligente DevAcademy

## 📋 O Problema

A DevAcademy, uma escola focada em tecnologias modernas, precisa de uma página de catálogo de cursos.
Como o público-alvo são desenvolvedores, a página deve ser um exemplo de performance, acessibilidade e boas práticas de código.

## 🎯 Objetivo

Construir um sistema de listagem e filtragem de cursos que consuma dados externos e se adapte perfeitamente a qualquer dispositivo, desde um smartphone antigo até um monitor.

---

## 🛠 Requisitos Obrigatórios

### 1. Estratégia Mobile First (CSS)

- O design deve ser pensado de "dentro para fora": comece estilizando para uma tela de **320px**.
- Use **Media Queries** apenas para adicionar complexidade em telas maiores, nunca para consertar o layout quebrado.

### 2. Responsividade Avançada

- **Layout Fluido:** Proibido o uso de larguras fixas (ex: `width: 400px`). Utilize `grid-template-columns: repeat(auto-fit, minmax(...))` para que os cards se organizem sozinhos.
- **Funções Lógicas:** Implemente `clamp()` para fontes e paddings, permitindo que a interface "respire" de forma dinâmica conforme o redimensionamento da janela.

### 3. Progressividade com TypeScript

- **Consumo de Dados:** Os cursos devem ser carregados de um arquivo `cursos.json` via **Fetch API**.
- **Tipagem Rigorosa:** Utilize `interfaces` no TypeScript para definir o contrato dos dados dos cursos (Título, Tag, Duração, Nível).
- **Filtro em Tempo Real:** Implemente uma lógica de busca que filtre os resultados por nome ou categoria conforme o usuário digita, garantindo feedback imediato.
- **Menu Hambúrguer Acessível:** Crie um menu que seja funcional via teclado e informe estados (aberto/fechado) para tecnologias assistivas via `aria-expanded`.

### 4. Semântica e SEO

- Utilize tags HTML5 semânticas (`<article>` para cursos, `<nav>` para o menu e `<section>` para o catálogo).

### 5. Paleta de Cores 🎨

| Cor             | Hex       |
| :-------------- | :-------- |
| **Cyan**        | `#00f2ff` |
| **Dark Navy**   | `#0f172a` |
| **Gray Blue**   | `#1e293b` |
| **Ghost White** | `#f8fafc` |

---

### 6. Prototipos

Utilizar como base as imagens disponibilizadas na pasta `prototipos`

---

**Autor**: Rick Alves  
**Repositorio GitHub**: [FIAP-Desafio-DevAcademy](https://github.com/RickAlves07/FIAP-Desafio-DevAcademy.git)
