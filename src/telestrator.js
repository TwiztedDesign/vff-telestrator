const SignaturePad = require('./signature_pad');
const tinycolor = require('./tinycolor');

export default class Telestrator extends HTMLElement {
    constructor() {
        super();
        this.canvas = document.createElement("canvas");
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';

        this.velocityMagnitude = 0.5;
    }

    connectedCallback() {

        this.appendChild(this.canvas);
        this.signaturePad = new SignaturePad(this.canvas);
        this.signaturePad.penColor = this.color;
        this.signaturePad.minWidth = this.size - (this.size * this.velocityMagnitude);
        this.signaturePad.maxWidth = this.size + (this.size * this.velocityMagnitude);



        let self = this;
        window.addEventListener("resize", function(){self.resizeCanvas();});
        this.resizeCanvas();
        this.on();

        this.canvas.addEventListener('mousemove', function(e){e.stopPropagation();}, false);
        // this.canvas.addEventListener('mouseup', function(e){e.stopPropagation();}, false);
        this.canvas.addEventListener('mousedown', function(e){e.stopPropagation();}, false);


        // document.body.addEventListener('mousedown', function(){console.log('mousedown');});
        // document.body.addEventListener('mouseup', function(){console.log('mouseup');});
        // document.body.addEventListener('mousemove', function(){console.log('mousemove');});
    }

    disconnectedCallback() {
        clearInterval(this.canvasDrawTimeout);
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback() {

    }

    resizeCanvas() {
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        this.canvas.width = this.canvas.offsetWidth * ratio;
        this.canvas.height = this.canvas.offsetHeight * ratio;
        var ctx = this.canvas.getContext("2d");
        ctx.scale(ratio, ratio);
        this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    }

    _splitAlpha(color){
        let tc = tinycolor(color);
        let alpha = tc.getAlpha();
        if(alpha !== 1){
            this.canvas.style.opacity = alpha;
            tc._a = 1;
        }
        return tc.toString();
    }

    get color() {
        let c = this.getAttribute("color") || 'black';
        return this._splitAlpha(c);
    }

    set color(value) {
        this.setAttribute('color', value);
        this.signaturePad.penColor = this._splitAlpha(value);

    }
    get size() {
        return parseFloat(this.getAttribute("size")) || 1.5;
    }

    set size(value) {
        this.setAttribute('size', value);
        this.signaturePad.minWidth = value - (value * this.velocityMagnitude);
        this.signaturePad.maxWidth = value + (value * this.velocityMagnitude);
    }

    on(){
        // this.signaturePad.on();
        this.style['pointer-events'] = 'auto';

    }

    off(){
        // this.signaturePad.off();
        this.style['pointer-events'] = 'none';
    }
    clear(){
        this.signaturePad.clear();
    }
    undo(){
        var data = this.signaturePad.toData();
        if (data) {
            data.pop(); // remove the last dot or line
            this.signaturePad.fromData(data);
        }
    }

    expose(){
        return {
            Color   : 'color',
            Size    : 'size'
        };
    }



}
