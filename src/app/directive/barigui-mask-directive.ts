import {
    Directive,
    HostListener,
    Input,
    ElementRef
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR, ControlValueAccessor
} from '@angular/forms';

@Directive({
    selector: '[bariguiMask]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: BariguiMaskDirective,
        multi: true
    }]
})
export class BariguiMaskDirective implements ControlValueAccessor {

    onTouched: any;
    onChange: any;

    @Input() bariguiMask: string;

    constructor(private el: ElementRef) { }

    writeValue(value: any): void {
        this.el.nativeElement.value = this.aplicarMascara(value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    private commonKeys($event: any) {
        const valor = $event.target.value.replace(/\D/g, '');

        // retorna caso pressionado backspace
        if ($event.keyCode === 8) {
            this.onChange(valor);
            return;
        }

        const pad = this.bariguiMask.replace(/\D/g, '').replace(/9/g, '_');
        if (valor.length <= pad.length) {
            this.onChange(valor);
        }

        $event.target.value = this.aplicarMascara(valor);
    }

    @HostListener('keyup', ['$event'])
    onKeyup($event: any) {
        this.commonKeys($event);
    }

    @HostListener('keypress', ['$event'])
    onKeyPress($event: any) {
        this.commonKeys($event);
    }

    @HostListener('blur', ['$event'])
    onBlur($event: any) {
    }

    /**
     * Aplica a máscara a determinado valor.
     *
     * @param string valor
     * @return string
     */
    aplicarMascara(valor: string): string {
        if (!valor) {
            return '';
        }
        valor = valor + ''.replace(/\D/g, '');
        const pad = this.bariguiMask.replace(/\D/g, '').replace(/9/g, '_');
        const valorMask = valor + pad.substring(0, pad.length - valor.length);
        let valorMaskPos = 0;

        valor = '';
        for (let i = 0; i < this.bariguiMask.length; i++) {
            if (isNaN(parseInt(this.bariguiMask.charAt(i)))) {
                valor += this.bariguiMask.charAt(i);
            } else {
                valor += valorMask[valorMaskPos++];
            }
        }

        if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
        }

        return valor;
    }
}
