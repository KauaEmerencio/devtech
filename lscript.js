// Scroll animado + WhatsApp + Animações profissionais
document.documentElement.lang = 'pt-BR';
document.addEventListener('DOMContentLoaded', () => {
    iniciarAnimacaoScrollLanding();
    iniciarGerenciadorFormulario();
    efeitoMenuScroll();
    iniciarMenuMobile();
    iniciarMascarasInput();
    iniciarContadoresVisuais();
    iniciarDestacarPlanos();
    iniciarBackgroundParallax();
    iniciarDemonstracaoInterativa();
    iniciarRolagemSuave();
    iniciarTempoNoSite();
});
 //1. ANIMAÇÃO DE LANDING PAGE COM SCROLL
function iniciarAnimacaoScrollLanding() {
    const elementosRevelar = document.querySelectorAll('.revelar');
    const config = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };   
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ativo');
                    
                    if (entry.target.classList.contains('atraso-1')) {
                        entry.target.style.transitionDelay = '0.2s';
                    }
                    if (entry.target.classList.contains('atraso-2')) {
                        entry.target.style.transitionDelay = '0.4s';
                    }
                }
            });
        }, config);
        
        elementosRevelar.forEach(elemento => {
            observer.observe(elemento);
        });
    } else {
        const revelarFallback = () => {
            const alturaJanela = window.innerHeight;
            elementosRevelar.forEach((elemento) => {
                const topoElemento = elemento.getBoundingClientRect().top;
                if (topoElemento < alturaJanela - 100) {
                    elemento.classList.add('ativo');
                }
            });
        };     
        window.addEventListener('scroll', revelarFallback);
        revelarFallback();
    }  
    // Animação cascata para hero
    const heroElements = document.querySelectorAll('.hero .revelar');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// 2. PARALLAX BACKGROUNG
function iniciarBackgroundParallax() {
    const bgDecorativo = document.querySelector('.bg-decorativo');
    
    if (bgDecorativo) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const speed = 0.3;

            bgDecorativo.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
}
// 3. FORMULÁRIO WHATSAPP 
function iniciarGerenciadorFormulario() {
    const formulario = document.getElementById('formulario-orcamento');
    
    if(formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            
            const campoOculto = document.getElementById('campo-oculto');
            if (campoOculto && campoOculto.value) {
                console.log('Possível SPAM detectado');
                return;
            }
            const nome = document.getElementById('nome').value.trim();
            const plano = document.getElementById('negocio').value;
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            const telefoneDestino = '5579998107310';
            if (nome.length < 5) {
                alert('Por favor, informe seu nome completo.');
                return;
            }
            if (whatsapp.length < 11) {
                alert('Por favor, insira um número de WhatsApp válido com DDD.');
                return;
            }
            const textoMensagem = 
                `🚀 *NOVA SOLICITAÇÃO - KL DEV TECH*\n\n` +
                `👤 *Nome:* ${nome}\n` +
                `🏢 *Tipo de Negócio:* ${plano}\n` +
                `📱 *WhatsApp:* ${whatsapp}\n\n` +
                `📝 *Detalhes do Projeto:*\n${mensagem || 'Não informado'}\n\n` +
                `⏱️ *Enviado em:* ${new Date().toLocaleString('pt-BR')}`;
            const urlWhatsapp = `https://wa.me/${telefoneDestino}?text=${encodeURIComponent(textoMensagem)}`;
            const botao = formulario.querySelector('button');
            const textoOriginal = botao.innerHTML; 
            botao.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...';
            botao.style.opacity = '0.8';
            botao.disabled = true;
            setTimeout(() => {
                        window.open(urlWhatsapp, '_blank');
                setTimeout(() => {
                    formulario.reset();
                    botao.innerHTML = textoOriginal;
                    botao.style.opacity = '1';
                    botao.disabled = false;
                    
                    mostrarFeedbackSucesso();
                }, 2000);     
            }, 500);
        });
    }
}

//4. MENU MOBILE 
function iniciarMenuMobile() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// 5. MÁSCARAS DE INPUT 
function iniciarMascarasInput() {
    const phoneInput = document.getElementById('whatsapp');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)/, '($1');
            }
            e.target.value = value;
        });
    }
}
/* === 6. CONTADORES VISUAIS === */
function iniciarContadoresVisuais() {
    const elementosContador = document.querySelectorAll('.stat-number');
    
    const observerContador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elemento = entry.target;
                const valorFinal = parseInt(elemento.textContent) || 50;
                const duracao = 2000;
                const incremento = Math.ceil(valorFinal / 50);
                let valorAtual = 0; 
                const timer = setInterval(() => {
                    valorAtual += incremento;
                    if (valorAtual >= valorFinal) {
                        valorAtual = valorFinal;
                        clearInterval(timer);
                    }
                    elemento.textContent = valorAtual;
                }, duracao / (valorFinal / incremento));
                
                observerContador.unobserve(elemento);
            }
        });
    }, { threshold: 0.5 });
    
    elementosContador.forEach(el => observerContador.observe(el));
}

// 7. DESTACAR PLANOS
function iniciarDestacarPlanos() {
    const cardsPlano = document.querySelectorAll('.plan-card, .solution-card');
    cardsPlano.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.15)';
            }
        });
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = '';
                card.style.boxShadow = '';
            }
        });
    });
}

// 8. EFEITO MENU SCROLL 
function efeitoMenuScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = `
                0 6px 30px rgba(0, 0, 0, 0.35),
                inset 0 -1px 0 rgba(255, 255, 255, 0.05)
            `;
            header.style.background = "rgba(13, 20, 34, 0.98)";
            header.style.backdropFilter = "blur(6px)";
        } else {
            header.style.boxShadow = "none";
            header.style.background = "rgba(13, 20, 34, 1)";
            header.style.backdropFilter = "none";
        }
    });
}

/* === 9. DEMONSTRAÇÃO INTERATIVA === */
function iniciarDemonstracaoInterativa() {
    const demoBtn = document.querySelector('.demo-whatsapp-btn');
    
    if (demoBtn) {
        demoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            demoBtn.style.transform = 'scale(0.95)';
            demoBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulando...';
            
            setTimeout(() => {
                demoBtn.innerHTML = '<i class="fas fa-check"></i> Simulado!';
                demoBtn.style.background = '#10b981';
                mostrarNotificacao('Pedido simulado! Em um site real, abriria o WhatsApp. Geraria uma Integração Exemplo: Nome, numero, hora e data do pedido.(tudo pode ser alterado de acordo com a necessidade.)');
                setTimeout(() => {
                    demoBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Pedir via WhatsApp';
                    demoBtn.style.background = '';
                    demoBtn.style.transform = '';
                }, 2000);
            }, 1000);
        });
    }
}

/* === 10. ROLAGEM SUAVE === */
function iniciarRolagemSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(ancora => {
        ancora.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const elementoAlvo = document.querySelector(href);
            if (elementoAlvo) {
                const alturaHeader = document.querySelector('.header').offsetHeight;
                const posicaoAlvo = elementoAlvo.offsetTop - alturaHeader - 20;
                
                window.scrollTo({
                    top: posicaoAlvo,
                    behavior: 'smooth'
                });
            }
        });
    });
}
// 11. TEMPO NO SITE
function iniciarTempoNoSite() {
    let tempoNoSite = 0;  
    const contador = setInterval(() => {
        tempoNoSite++;
        
        if (tempoNoSite === 30) {
            console.log('Usuário interessado - 30 segundos no site');
        }
        
        if (tempoNoSite === 120) {
            console.log('Usuário altamente interessado - 2 minutos no site');
        }
    }, 1000);
    
    window.addEventListener('beforeunload', () => {
        clearInterval(contador);
        console.log(`Usuário passou ${tempoNoSite} segundos no site`);
    });
}

/* === 12. FEEDBACK DE SUCESSO === */
function mostrarFeedbackSucesso() {
    const feedback = document.createElement('div');
    feedback.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #10b981;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            z-index: 9999;
            font-weight: 600;
            animation: slideUp 0.3s ease;
        ">
            <i class="fas fa-check-circle"></i> Mensagem enviada com sucesso!
        </div>
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 3000);
}

/* === 13. NOTIFICAÇÕES === */
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao-flutuante';
    notificacao.textContent = mensagem;
    notificacao.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: #1e293b;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

/* === 14. ANIMAÇÕES CSS DINÂMICAS === */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* === 15. FUNÇÕES GLOBAIS === */
window.KLDevTech = {
    formatarTelefone: function(telefone) {
        const numeros = ('' + telefone).replace(/\D/g, '');
        
        if (numeros.length === 11) {
            return numeros.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (numeros.length === 10) {
            return numeros.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
        }
        
        return telefone;
    },
    
    abrirWhatsApp: function(mensagem) {
        const mensagemCodificada = encodeURIComponent(mensagem);
        window.open(`https://wa.me/5579998107310?text=${mensagemCodificada}`, '_blank');
    }
};
//interação botões portfolio
document.querySelectorAll('.btn-project').forEach(btn => {
    btn.addEventListener('click', () => {
        const link = btn.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
    });
});

