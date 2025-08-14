
// Inicializa animações
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Navbar scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 0);
});

// Menu mobile toggle (só funciona em mobile)
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Fecha menu ao clicar em um link (mobile)
    const mobileLinks = document.querySelectorAll('#mobileMenu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Filtros de portfólio
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona active class ao botão clicado
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Modal do portfólio
const portfolioImages = [
    {
        src: 'Casamento.png',
        title: 'Convite Romântico | Casamento Marina & João',
        description: 'Design elegante com flores e tons pastéis, animação de pétalas caindo'
    },
    {
        src: 'spider man Aniversario foto.png',
        title: 'Festa Heróica | Aniversário do Pedro',
        description: 'Tema super-heróis com animação de efeitos especiais e música temática'
    },
    {
        src: 'Wandinhaconvite.png',
        title: 'festa | wandinha',
        description: 'Tema gotico'
    },
    {
        src: 'ChaBebe.png',
        title: 'Chá de Bebê | Bebê',
        description: 'Tema chá de bebê com animação suave e elementos lúdicos'
    },
    {
        src: 'Flamengo.png',
        title: 'Flamengo | Fernando',
        description: 'Tema flamengo com animação de torcida e elementos do futebol'
    },
    {
        src: 'https://via.placeholder.com/600x400?text=Convite+Aniversário+2',
        title: 'Arraiá da Julia | Festa Junina',
        description: 'Tema festa junina com animação de fogos e quadrilha'
    }
];

let currentImageIndex = 0;

function openModal(indexOrSrc) {
    const modal = document.getElementById('portfolioModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const imageCounter = document.getElementById('imageCounter');

    if (typeof indexOrSrc === 'number') {
        currentImageIndex = indexOrSrc;
        modalImage.src = portfolioImages[currentImageIndex].src;
        modalTitle.textContent = portfolioImages[currentImageIndex].title;
    } else {
        // Encontra o índice da imagem pelo src
        const foundIndex = portfolioImages.findIndex(img => img.src === indexOrSrc);
        if (foundIndex >= 0) {
            currentImageIndex = foundIndex;
            modalImage.src = portfolioImages[currentImageIndex].src;
            modalTitle.textContent = portfolioImages[currentImageIndex].title;
        }
    }

    // Atualiza contador
    imageCounter.textContent = `${currentImageIndex + 1} de ${portfolioImages.length}`;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Adiciona listeners para teclado
    document.addEventListener('keydown', handleKeyDown);
}

function closeModal() {
    document.getElementById('portfolioModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleKeyDown);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
    openModal(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
    openModal(currentImageIndex);
}

function handleKeyDown(e) {
    if (e.key === 'Escape') {
        closeModal();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    }
}

// Modal de vídeo
function openVideoModal(videoUrl) {
    const modal = document.getElementById('videoModal');
    const videoSource = document.getElementById('videoSource');
    const demoVideo = document.getElementById('demoVideo');

    videoSource.src = videoUrl;
    demoVideo.load();

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Configura link do WhatsApp baseado no vídeo selecionado
    const whatsappLink = document.getElementById('whatsappLink');
    // Aqui você pode personalizar a mensagem baseada no vídeo
    whatsappLink.href = `https://wa.me/5599992267318?text=Oi%20gostei%20da%20demonstração%20do%20convite,%20gostaria%20de%20fazer%20um%20parecido%20✨`;
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const demoVideo = document.getElementById('demoVideo');

    demoVideo.pause();
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Player de música
const audio = document.getElementById('backgroundMusic');
const musicIcon = document.getElementById('musicIcon');
const heroMusicIcon = document.getElementById('heroMusicIcon');
const heroMusicText = document.getElementById('heroMusicText');

function toggleMusic() {
    if (audio.paused) {
        audio.play().catch(e => console.log('Autoplay bloqueado:', e));
        musicIcon.classList.remove('fa-volume-mute');
        musicIcon.classList.add('fa-volume-up');
        heroMusicIcon.classList.remove('fa-volume-mute');
        heroMusicIcon.classList.add('fa-volume-up');
        heroMusicText.textContent = 'Desligar música';
    } else {
        audio.pause();
        musicIcon.classList.remove('fa-volume-up');
        musicIcon.classList.add('fa-volume-mute');
        heroMusicIcon.classList.remove('fa-volume-up');
        heroMusicIcon.classList.add('fa-volume-mute');
        heroMusicText.textContent = 'Ligar música';
    }
}

// Tenta tocar música automaticamente (pode ser bloqueado pelo navegador)
document.addEventListener('click', function () {
    if (audio.paused) {
        audio.play().catch(e => console.log('Autoplay bloqueado:', e));
    }
}, { once: true });

// Formulário de contato
function submitForm() {
    // Simulação de envio - em produção, integrar com Formspree, Google Forms ou API
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Validação simples
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });

    if (isValid) {
        // Simula envio (substituir por código real de envio)
        setTimeout(() => {
            form.reset();
            successMessage.classList.remove('hidden');

            // Esconde a mensagem após 5 segundos
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }, 1000);
    }
}

// Alternativa: Enviar para WhatsApp
function sendToWhatsApp() {
    const name = document.querySelector('#contactForm input[type="text"]').value;
    const email = document.querySelector('#contactForm input[type="email"]').value;
    const message = document.querySelector('#contactForm textarea').value;

    const whatsappText = `Olá! Meu nome é ${name} (${email}). ${message}`;
    const encodedText = encodeURIComponent(whatsappText);
    window.open(`https://wa.me/5599992267318?text=${encodedText}`, '_blank');
}

// Atualiza o ano no rodapé
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Modal de YouTube
function openYouTubeModal(videoId) {
  const modal = document.getElementById('youtubeModal');
  const iframe = document.getElementById('youtubeIframe');
  const whatsappLink = document.getElementById('youtubeWhatsappLink');
  
  // Configura o iframe com o vídeo do YouTube
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1`;
  
  // Configura link do WhatsApp
  whatsappLink.href = `https://wa.me/5599992267318?text=Oi%20gostei%20do%20convite%20corporativo%20que%20vi%20no%20vídeo,%20gostaria%20de%20fazer%20um%20parecido%20✨`;
  
  // Exibe o modal
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Adiciona listener para teclado
  document.addEventListener('keydown', handleYouTubeModalKeyDown);
}

function closeYouTubeModal() {
  const modal = document.getElementById('youtubeModal');
  const iframe = document.getElementById('youtubeIframe');
  
  // Para o vídeo
  iframe.src = '';
  
  // Fecha o modal
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  
  // Remove listener do teclado
  document.removeEventListener('keydown', handleYouTubeModalKeyDown);
}

function handleYouTubeModalKeyDown(e) {
  if (e.key === 'Escape') {
    closeYouTubeModal();
  }
}

// Fecha ao clicar fora do conteúdo
document.getElementById('youtubeModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeYouTubeModal();
  }
});