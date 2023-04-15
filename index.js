const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
    if (!toggleBtn.classList.contains('toggled')) {
        toggleBtn.classList.add('toggled');
        lightenText.classList.add('unselected');
        darkenText.classList.remove('unselected');
    } else {
        toggleBtn.classList.remove('toggled');
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    }
    resetValues();
});

const isValidHex = (hex) => {
    if (!hex) return false;

    hex = hex.replace('#', '');

    if (/^[A-Fa-f0-9]*$/.test(hex)) {
        return hex.length === 3 || hex.length === 6;    
    }
    return false;
};

hexInput.addEventListener('keyup', () => {
    let hex = hexInput.value;
    if (!isValidHex(hex)) return;
    
    if (!hex.includes('#')) hex = `#${hex}`;
    inputColor.style.backgroundColor = hex;

    resetValues();
});

const convertHexToRGB = (hex) => {
    if (!isValidHex(hex)) return;

    hex = hex.replace('#', '');

    if (hex.length === 3) {
        hex =  hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return {r,b,g};
};

const convertRGBToHex = (r, g, b) => {
    r = (`0${r.toString(16)}`).slice(-2);
    g = (`0${g.toString(16)}`).slice(-2);
    b = (`0${b.toString(16)}`).slice(-2);

    return `#${r}${g}${b}`
};

const alterColor = (hex, percentage) => {
    const {r, g, b} = convertHexToRGB(hex);

    const amount = Math.floor((percentage/100) * 255)

    const newR = checkRGBRange(r, amount);
    const newG = checkRGBRange(g, amount);
    const newB = checkRGBRange(b, amount);

    return convertRGBToHex(newR, newG, newB);
};

const checkRGBRange = (rgb, amount) => {
    return Math.min(255, Math.max(0, rgb + amount));
};

slider.addEventListener('input', () => {
    sliderText.textContent = `${slider.value}%`;

    if (!isValidHex(hexInput.value)) return;

    const valueAddition = 
        toggleBtn.classList.contains('toggled') ?
        -slider.value
        : slider.value;

    const alteredHex = alterColor(hexInput.value, valueAddition);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.textContent = `Altered Color ${alteredHex}`;
});

const resetValues = () => {
    slider.value = 0;
    sliderText.textContent = '0%';
    alteredColor.style.backgroundColor = hexInput.value;
    alteredColorText.textContent = `Altered Color ${hexInput.value}`;
};
