let filters = {
    brightness: {
        Value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast: {
        Value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation: {
        Value:100,
        min:0,
        max:200,
        unit:"%"
    },
    huerotation: {
        Value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur: {
        Value:0,
        min:0,
        max:20,
        unit:"px"
    },
    greyscale: {
        Value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia: {
        Value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity: {
        Value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert: {
        Value:0,
        min:0,
        max:100,
        unit:"%"
    }
}
const canvas = document.querySelector("#canvas");
const imginput = document.querySelector("#name")
const canvasCtx = canvas.getContext("2d")
const placeholder = document.querySelector(".center")
let image = null
let file = null
const reset = document.querySelector(".reset")
const download = document.querySelector(".download")
const presetcontainer = document.querySelector(".presetcont")
const filtercontainer = document.querySelector(".filters")

function createelement(name,min,max,value,unit){
    const div = document.createElement("div")
    div.classList.add('filter')
    const input = document.createElement("input")
    input.type = "range"
    input.value = value
    input.min = min;
    input.max = max;
    input.id = name
    const h6 = document.createElement("h6")
    h6.innerText = name;
    div.appendChild(h6)
    div.appendChild(input)
    input.addEventListener("input",() => {
        filters[name].Value = input.value;
        applyfilters();
    })  
    return div
}

function createfilters(){
    Object.keys(filters).forEach(filter => {
    const ele = createelement(filter,filters[filter].min,filters[filter].max,filters[filter].Value,filters[filter].unit)
    filtercontainer.appendChild(ele);
});
}

createfilters();

imginput.addEventListener("change" ,(e) => {
    file = e.target.files[0];
    placeholder.style.display = 'none';
    canvas.style.display = 'block'
    image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = (e) => {
        canvas.width = image.width;
        canvas.height = image.height;
        canvasCtx.drawImage(image,0,0);
    }
})

function applyfilters(){
    canvasCtx.clearRect(0,0,image.width,image.height)
    canvasCtx.filter = `
    brightness(${filters.brightness.Value}${filters.brightness.unit})
    contrast(${filters.contrast.Value}${filters.contrast.unit})
    saturate(${filters.saturation.Value}${filters.saturation.unit})
    hue-rotate(${filters.huerotation.Value}${filters.huerotation.unit})
    blur(${filters.blur.Value}${filters.blur.unit})
    grayscale(${filters.greyscale.Value}${filters.greyscale.unit})
    sepia(${filters.sepia.Value}${filters.sepia.unit})
    opacity(${filters.opacity.Value}${filters.opacity.unit})
    invert(${filters.invert.Value}${filters.invert.unit})
    `.trim()
    canvasCtx.drawImage(image , 0,0)
}

reset.addEventListener("click",(e) => {
    filters = {
    brightness: {
        Value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast: {
        Value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation: {
        Value:100,
        min:0,
        max:200,
        unit:"%"
    },
    huerotation: {
        Value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur: {
        Value:0,
        min:0,
        max:20,
        unit:"px"
    },
    greyscale: {
        Value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia: {
        Value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity: {
        Value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert: {
        Value:0,
        min:0,
        max:100,
        unit:"%"
    }
}
applyfilters()
filtercontainer.innerHTML = ""
createfilters()
})

download.addEventListener("click", (e) => {
    if(canvas.style.display === 'block'){
    const link = document.createElement('a');
    link.download = "edited_img.png";
    link.href = canvas.toDataURL();
    link.click()
    }
})
let presets = {
    vintage: {
        brightness: 90, contrast: 85, saturation: 70, huerotation: 10,
        blur: 1, greyscale: 10, sepia: 60, opacity: 100, invert: 0
    },
    retro: {
        brightness: 110, contrast: 120, saturation: 130, huerotation: 290,
        blur: 0, greyscale: 0, sepia: 40, opacity: 100, invert: 0
    },
    oldschool: {
        brightness: 95, contrast: 80, saturation: 50, huerotation: 0,
        blur: 0, greyscale: 30, sepia: 70, opacity: 100, invert: 0
    },
    filmfade: {
        brightness: 105, contrast: 85, saturation: 90, huerotation: 0,
        blur: 0, greyscale: 15, sepia: 20, opacity: 95, invert: 0
    },
    washed: {
        brightness: 115, contrast: 80, saturation: 70, huerotation: 0,
        blur: 0, greyscale: 5, sepia: 20, opacity: 90, invert: 0
    },
    highcontrast: {
        brightness: 100, contrast: 150, saturation: 110, huerotation: 0,
        blur: 0, greyscale: 0, sepia: 0, opacity: 100, invert: 0
    },
    bwclassic: {
        brightness: 95, contrast: 120, saturation: 0, huerotation: 0,
        blur: 0, greyscale: 100, sepia: 0, opacity: 100, invert: 0
    },

    // 🚀 NEW PRESETS BELOW
    cyberpunk: {
        brightness: 120, contrast: 140, saturation: 180, huerotation: 280,
        blur: 0, greyscale: 0, sepia: 10, opacity: 100, invert: 0
    },
    cinematic: {
        brightness: 90, contrast: 130, saturation: 80, huerotation: 15,
        blur: 0, greyscale: 5, sepia: 25, opacity: 100, invert: 0
    },
    moody_dark: {
        brightness: 80, contrast: 140, saturation: 70, huerotation: 320,
        blur: 0, greyscale: 25, sepia: 15, opacity: 95, invert: 0
    },
    neon_glow: {
        brightness: 130, contrast: 150, saturation: 200, huerotation: 250,
        blur: 1, greyscale: 0, sepia: 0, opacity: 100, invert: 0
    },
};

Object.keys(presets).forEach(presetname => {
    const presetbtn = document.createElement("button");
    presetbtn.classList.add("btn")
    presetbtn.innerHTML = presetname;
    presetcontainer.appendChild(presetbtn);

    presetbtn.addEventListener("click", () => {
        const presetfilter = presets[presetname]
        console.log(presetfilter);
        
        Object.keys(presetfilter).forEach(filtername => {
            filters[filtername].Value = presetfilter[filtername]
        })
        applyfilters();
        filtercontainer.innerHTML = ""
        createfilters()
    })
})
