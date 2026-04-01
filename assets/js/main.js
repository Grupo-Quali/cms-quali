// Slider de produtos (simples) - usa a estrutura .slider com .slides
let _currentSlide = 0;
const _slides = document.querySelectorAll('.slide');
const _dots = document.querySelectorAll('.dot');
let _autoInterval = null;

function showSlide(index) {
  if (!_slides.length) return;
  _currentSlide = (index + _slides.length) % _slides.length;
  const offset = -_currentSlide * 100;
  document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
  _dots.forEach((d, i) => d.classList.toggle('active', i === _currentSlide));
}

function nextSlide() {
  showSlide(_currentSlide + 1);
}
function prevSlide() {
  showSlide(_currentSlide - 1);
}
function goToSlide(i) {
  showSlide(i);
}

function startAuto() {
  if (_autoInterval) clearInterval(_autoInterval);
  _autoInterval = setInterval(() => nextSlide(), 5000);
}
function stopAuto() {
  if (_autoInterval) clearInterval(_autoInterval);
}

document.addEventListener('DOMContentLoaded', () => {
  // Inicia o slider se houver slides
  if (_slides.length) {
    showSlide(0);
    startAuto();
  }
  // Pausar ao passar o mouse sobre o slider
  const sliderEl = document.querySelector('.slider');
  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', stopAuto);
    sliderEl.addEventListener('mouseleave', startAuto);
  }
  // CPF/Celular masking e validação para o simulador
  const cpfInput = document.getElementById('cpf');
  const celularInput = document.getElementById('celular');
  const btnContinuar = document.getElementById('btnContinuar');
  function formatCPF(value){
    let v = value.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0,11);
    if (v.length <= 3) return v;
    if (v.length <= 6) return v.replace(/(\d{3})(\d+)/, '$1.$2');
    if (v.length <= 9) return v.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  }
  function formatPhone(value){
    let v = value.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0,11);
    if (v.length < 3) return '(' + v;
    if (v.length < 7) return '(' + v.substring(0,2) + ') ' + v.substring(2);
    return '(' + v.substring(0,2) + ') ' + v.substring(2,7) + '-' + v.substring(7);
  }
  function isValidCPF(cpf){
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (/^\d{11}$/.test(cpf) && /^([0-9])\1{10}$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let d1 = 11 - (sum % 11); if (d1 >= 10) d1 = 0;
    if (d1 !== parseInt(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    let d2 = 11 - (sum % 11); if (d2 >= 10) d2 = 0;
    return d2 === parseInt(cpf.charAt(10));
  }
  function handleContinue(){
    const cpfVal = cpfInput.value;
    const celularVal = celularInput.value;
    if (!isValidCPF(cpfVal)) { alert('CPF inválido. Informe um CPF válido no formato 000.000.000-00.'); return; }
    const digits = celularVal.replace(/\D/g, '');
    if (digits.length < 11) { alert('Celular inválido. Informe no formato (XX) XXXXX-XXXX.'); return; }
    window.location.href = 'https://clt-quali.joinbank.com.br/?key=bWrxGMGIHn-poYoiorFaTV_vhohUq1ax3xe8ut2RMqEI318CVEGfrGmX5rnw2dnE7ENVgSXRDCZIxWL6YkRB4Q';
  }
  if (cpfInput && celularInput && btnContinuar){
    cpfInput.addEventListener('input', function(){ cpfInput.value = formatCPF(cpfInput.value); });
    celularInput.addEventListener('input', function(){ celularInput.value = formatPhone(celularInput.value); });
    btnContinuar.addEventListener('click', handleContinue);
  }
});
