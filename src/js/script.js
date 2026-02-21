"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const navLinks = [
    { nome: 'Cursos', url: '#Cursos' },
    { nome: 'Mentoria', url: '#Mentoria' },
    { nome: 'Comunidade', url: '#Comunidade' },
    { nome: 'Entrar', url: '#Entrar' },
];
class DevAcademyPage {
    constructor() {
        this.allCursos = [];
        this.cursosGrid = document.getElementById('cursosGrid');
        this.cursosMsg = document.getElementById('cursosMsg');
        this.filterInput = document.getElementById('filterInput');
        this.filterMsg = document.getElementById('filterMsg');
        this.footerLinks = document.getElementById('footerLinks');
        if (this.cursosGrid && this.filterInput && this.cursosMsg && this.footerLinks && this.filterMsg) {
            this.init();
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.cursosMsg) {
                    this.cursosMsg.innerHTML = `<p>Carregando...</p>`;
                }
                const response = yield fetch('./cursos.json');
                if (!response.ok) {
                    throw new Error('Erro ao carregar os dados.');
                }
                this.allCursos = yield response.json();
                this.criarCards(this.allCursos);
                this.iniciarFiltro();
                this.criarFooterNavLinks();
            }
            catch (error) {
                console.error('Erro:', error);
                if (this.cursosMsg) {
                    this.cursosMsg.innerHTML = `<p>Erro ao carregar a lista de cursos.</p>`;
                }
            }
        });
    }
    iniciarFiltro() {
        var _a;
        (_a = this.filterInput) === null || _a === void 0 ? void 0 : _a.addEventListener('input', () => {
            var _a;
            if (!this.filterMsg)
                return;
            this.filterMsg.innerHTML = "";
            const query = ((_a = this.filterInput) === null || _a === void 0 ? void 0 : _a.value.trim().toLowerCase()) || "";
            const cursosFiltered = this.allCursos.filter(p => p.nome.toLowerCase().includes(query) ||
                p.nivel.toLowerCase().includes(query) ||
                p.categoria.toLowerCase().includes(query) ||
                p.descricao.toLowerCase().includes(query));
            this.criarCards(cursosFiltered);
        });
    }
    criarCards(cursos) {
        if (!this.cursosGrid || !this.cursosMsg || !this.filterMsg)
            return;
        this.cursosMsg.innerHTML = "";
        this.cursosGrid.innerHTML = "";
        if (cursos.length === 0 && this.cursosMsg) {
            this.cursosMsg.innerHTML = `<p>Nenhum curso encontrado.</p>`;
            return;
        }
        if (cursos.length > 0) {
            this.filterMsg.innerHTML = `${cursos.length} curso(s) encontrado(s).`;
        }
        this.cursosGrid.innerHTML = cursos.map(p => `
            <article class="curso-card">
                <div class="card-header">
                    <span class="label">${p.nivel}</span>
                    <h3 id="curso${p.id}" >${p.nome}</h3>
                </div>
                <div class="card-body">
                    <p><strong>${p.categoria}: </strong>${p.descricao}</p>
                </div>
                <button class="btn-saber-mais" aria-label="Saber mais sobre o curso ${p.nome}">Saber Mais</button>
            </article>
        `).join('');
    }
    criarFooterNavLinks() {
        if (this.footerLinks) {
            this.footerLinks.innerHTML =
                `
                <h3>Explorar</h3>
                <ul> 
                ${navLinks.map(link => `
                    <li><a href="${link.url}" aria-label="Navegar para ${link.nome}">${link.nome}</a></li>
                `).join('')}
                </ul>
                `;
        }
    }
}
class MenuNavigation {
    constructor() {
        this.btn = document.getElementById('btnMenu');
        this.menu = document.getElementById('menuLinks');
        if (this.btn && this.menu) {
            this.bindEvents();
            this.criarMenuNavLinks();
        }
    }
    bindEvents() {
        var _a, _b;
        (_a = this.btn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.toggleMenu());
        (_b = this.menu) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === 'A') {
                this.closeMenu();
            }
        });
        // Fecha menu com a tecla "Esc"
        document.addEventListener('keydown', (e) => {
            var _a;
            if (e.key === 'Escape' && ((_a = this.menu) === null || _a === void 0 ? void 0 : _a.classList.contains('active'))) {
                this.closeMenu();
            }
        });
    }
    criarMenuNavLinks() {
        if (this.menu) {
            this.menu.innerHTML =
                `<ul> 
                ${navLinks.map(link => `
                    <li><a href="${link.url}" aria-label="Navegar para ${link.nome}">${link.nome}</a></li>
                `).join('')}
                </ul>`;
        }
    }
    toggleMenu() {
        var _a, _b, _c;
        if (!this.menu || !this.btn)
            return;
        // Alterna a classe 'active' no menu: se tiver, remove; se não tiver, adiciona
        // A variável 'isOpen' recebe true se a classe foi adicionada, ou false se removida
        const isOpen = this.menu.classList.toggle('active');
        // Alterna a classe 'open' no botão (usada para animar o ícone do hambúrguer para o X)
        this.btn.classList.toggle('open');
        // Atualiza o atributo ARIA para que cegos ou pessoas com baixa visão saibam 
        // via leitor de tela se o conteúdo do menu está expandido (true) ou recolhido (false)
        this.btn.setAttribute('aria-expanded', isOpen.toString());
        // Gerencia o foco no menu para acessibilidade
        if (isOpen) {
            (_b = (_a = this.menu) === null || _a === void 0 ? void 0 : _a.querySelector('a')) === null || _b === void 0 ? void 0 : _b.focus(); // Foca no primeiro link do menu
        }
        else {
            (_c = this.btn) === null || _c === void 0 ? void 0 : _c.focus(); // Retorna o foco ao botão
        }
    }
    closeMenu() {
        var _a, _b;
        (_a = this.menu) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
        (_b = this.btn) === null || _b === void 0 ? void 0 : _b.classList.remove('open');
    }
}
window.addEventListener('DOMContentLoaded', () => {
    new MenuNavigation();
    new DevAcademyPage();
});
