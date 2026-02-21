const navLinks = [
    { nome: 'Cursos', url: '#Cursos' },
    { nome: 'Mentoria', url: '#Mentoria' },
    { nome: 'Comunidade', url: '#Comunidade' },
    { nome: 'Entrar', url: '#Entrar' },
]

interface Cursos {
    id: number;
    nome: string;
    nivel: string;
    categoria: string;
    descricao: string;
}

class DevAcademyPage {
    private allCursos: Cursos[] = [];
    private cursosMsg: HTMLElement | null;
    private cursosGrid: HTMLElement | null;
    private filterInput: HTMLInputElement | null;
    private filterMsg: HTMLElement | null;
    private footerLinks: HTMLElement | null;

    constructor() {
        this.cursosGrid = document.getElementById('cursosGrid');
        this.cursosMsg = document.getElementById('cursosMsg');
        this.filterInput = document.getElementById('filterInput') as HTMLInputElement;
        this.filterMsg = document.getElementById('filterMsg');
        this.footerLinks = document.getElementById('footerLinks');

        if (this.cursosGrid && this.filterInput && this.cursosMsg && this.footerLinks && this.filterMsg) {
            this.init();
        }
    }

    private async init(): Promise<void> {
        try {
            if (this.cursosMsg) {
                this.cursosMsg.innerHTML = `<p>Carregando...</p>`;
            }

            const response = await fetch('./cursos.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados.');
            }

            this.allCursos = await response.json();
            this.criarCards(this.allCursos);
            this.iniciarFiltro();
            this.criarFooterNavLinks();
        } catch (error) {
            console.error('Erro:', error);
            if (this.cursosMsg) {
                this.cursosMsg.innerHTML = `<p>Erro ao carregar a lista de cursos.</p>`;
            }
        }
    }

    private iniciarFiltro(): void {
        this.filterInput?.addEventListener('input', () => {
            if (!this.filterMsg) return;
            this.filterMsg.innerHTML = "";

            const query = this.filterInput?.value.trim().toLowerCase() || "";
            const cursosFiltered = this.allCursos.filter(p =>
                p.nome.toLowerCase().includes(query) ||
                p.nivel.toLowerCase().includes(query) ||
                p.categoria.toLowerCase().includes(query) ||
                p.descricao.toLowerCase().includes(query)
            );

            this.criarCards(cursosFiltered);
        });
    }

    private criarCards(cursos: Cursos[]): void {
        if (!this.cursosGrid || !this.cursosMsg || !this.filterMsg) return;

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

    private criarFooterNavLinks(): void {

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
    private btn: HTMLButtonElement | null;
    private menu: HTMLElement | null;

    constructor() {
        this.btn = document.getElementById('btnMenu') as HTMLButtonElement;
        this.menu = document.getElementById('menuLinks');

        if (this.btn && this.menu) {
            this.bindEvents();
            this.criarMenuNavLinks();
        }
    }

    private bindEvents(): void {
        this.btn?.addEventListener('click', () => this.toggleMenu());

        this.menu?.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A') {
                this.closeMenu();
            }
        });

        // Fecha menu com a tecla "Esc"
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape' && this.menu?.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    private criarMenuNavLinks(): void {
        if (this.menu) {
            this.menu.innerHTML =
                `<ul> 
                ${navLinks.map(link => `
                    <li><a href="${link.url}" aria-label="Navegar para ${link.nome}">${link.nome}</a></li>
                `).join('')}
                </ul>`;
        }
    }

    private toggleMenu(): void {
        if (!this.menu || !this.btn) return;
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
            this.menu?.querySelector('a')?.focus(); // Foca no primeiro link do menu
        } else {
            this.btn?.focus(); // Retorna o foco ao botão
        }
    }

    private closeMenu(): void {
        this.menu?.classList.remove('active');
        this.btn?.classList.remove('open');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new MenuNavigation();
    new DevAcademyPage();
});
