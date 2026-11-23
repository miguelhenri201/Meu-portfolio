const botaoTopo = document.getElementById('topo');
const abrir = document.getElementById('abrir');
const navegacao = document.getElementById('navegacao');
const links = document.querySelectorAll('.navegacao a');
const secoes = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  botaoTopo.classList.toggle('visivel', y > 400);
  marcarAtual(y);
});

function marcarAtual(y) {
  let atual = '';
  secoes.forEach(secao => {
    if (y >= secao.offsetTop - 180) atual = secao.id;
  });
  links.forEach(link => {
    link.classList.toggle('atual', link.getAttribute('href') === '#' + atual);
  });
}

abrir.addEventListener('click', () => {
  const aberta = navegacao.classList.toggle('aberta');
  abrir.setAttribute('aria-expanded', aberta);
});

links.forEach(link => {
  link.addEventListener('click', () => {
    navegacao.classList.remove('aberta');
    abrir.setAttribute('aria-expanded', 'false');
  });
});

const filtros = document.querySelectorAll('.filtro');
const itens = document.querySelectorAll('.item');
const vazio = document.getElementById('vazio');

filtros.forEach(botao => {
  botao.addEventListener('click', () => {
    filtros.forEach(outro => outro.classList.remove('ativo'));
    botao.classList.add('ativo');

    const escolhido = botao.dataset.filtro;
    let visiveis = 0;

    itens.forEach(item => {
      const mostrar = escolhido === 'todas' || item.dataset.tipo === escolhido;
      item.classList.toggle('oculto', !mostrar);
      if (mostrar) visiveis++;
    });

    vazio.hidden = visiveis > 0;
  });
});

const observador = new IntersectionObserver(entradas => {
  entradas.forEach(entrada => {
    if (!entrada.isIntersecting) return;
    entrada.target.classList.add('visto');
    observador.unobserve(entrada.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.bloco').forEach(bloco => {
  bloco.classList.add('revelar');
  observador.observe(bloco);
});

marcarAtual(window.scrollY);
