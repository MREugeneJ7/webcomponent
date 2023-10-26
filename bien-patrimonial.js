template = document.getElementById('card-bien').content.cloneNode(true)

class BienPatrimonial extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' })
        this.shadow.appendChild(template)
        console.log('On build')
    }

    get index() {
        return this.getAttribute('index');
    }

    get displayReviews(){
        return this.getAttribute('display-reviews');
    }

    static get observedAttributes() {
        return ['display-reviews'];
    }

    connectedCallback() {
        var xmlHttp = new XMLHttpRequest();
        const url = `http://demo4024417.mockable.io/patrimonio/`
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        let responseObj = JSON.parse(xmlHttp.responseText);
        let $name = this.shadow.querySelector('#nombre');
        $name.innerHTML = responseObj.bienes[this.index].nombre;
        let $antecedentes = this.shadow.querySelector('#antecedentes');
        $antecedentes.innerHTML = 'Antecedentes: ' + responseObj.bienes[this.index].antecedentes;
        let $tipo = this.shadow.querySelector('#tipo');
        $tipo.innerHTML = 'Es una construcción con arquitectura '
            + responseObj.bienes[this.index].tipo.arquitectura + ' contruida en un periodo ' +
            responseObj.bienes[this.index].tipo.epoca;
        let $img = this.shadow.querySelector('#imagen');
        $img.src = responseObj.bienes[this.index].img
        let $coords = this.shadow.querySelector('#coordenadas');
        $coords.innerHTML = 'Esta situado en las coordenadas: ' +
            responseObj.bienes[this.index].localizacion.lat + ' - ' +
            responseObj.bienes[this.index].localizacion.long

        let $button = this.shadow.querySelector('#reviews-button');
        $button.addEventListener("click", () => {
            this.setAttribute("display-reviews", this.getAttribute("display-reviews") == 'true' ? false : true);
        }
        )

        console.log('On Connected')
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name == 'display-reviews' && newValue == 'true'){
            let $valoraciones = document.createElement('p')
            $valoraciones.id = 'valoraciones'
            $valoraciones.innerHTML = 'Such Beauty. Much Wow'
            this.shadow.appendChild($valoraciones)
        }else{
            this.shadow.removeChild(this.shadow.lastChild)
        }
    }

}

window.customElements.define('bien-patrimonial', BienPatrimonial);
