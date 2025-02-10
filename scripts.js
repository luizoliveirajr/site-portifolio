// scripts.js

// Obtém todos os links de navegação
const links = document.querySelectorAll('nav a');

// Função para atualizar a classe "active" baseada na rolagem
function updateActiveSection() {
    let scrollPos = window.scrollY + 200; // Adiciona um buffer de 200px para começar a destacar a seção antes de chegar ao topo

    links.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));

        if (
            section.offsetTop <= scrollPos &&
            section.offsetTop + section.offsetHeight > scrollPos
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Variável para verificar se a rolagem foi ativada manualmente
let isManualScroll = false;

// Implementa a detecção de rolagem com "throttle" para melhorar o desempenho
let timeout;
window.addEventListener('scroll', function () {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
        if (!isManualScroll) { // Verifica se a rolagem não foi manual
            updateActiveSection();
        }
    }, 10); // 10ms de delay antes de executar a função novamente
});

// Adiciona um ouvinte de clique para alternar a classe "active" manualmente
links.forEach(link => {
    link.addEventListener('click', (e) => {
        // Previne o comportamento padrão de rolagem do link
        e.preventDefault();

        // Marca que a rolagem foi feita manualmente
        isManualScroll = true;

        // Remove a classe "active" de todos os links
        links.forEach(link => link.classList.remove('active'));

        // Adiciona a classe "active" ao link clicado
        link.classList.add('active');

        // Desloca a página para a seção correspondente com offset para o cabeçalho
        const section = document.querySelector(link.getAttribute('href'));
        window.scrollTo({
            top: section.offsetTop - 80, // Ajuste o valor do offset conforme necessário (80px para o cabeçalho)
            behavior: 'smooth'
        });

        // Após a rolagem terminar, permite que a rolagem futura seja detectada
        setTimeout(() => {
            isManualScroll = false;
        }, 800); // Define o tempo de "espera" para permitir que a rolagem termine
    });
});