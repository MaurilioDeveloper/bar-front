export class MaskPhone {

    //Mascaras
    static maskPhone = '(99)999999999';
    static controlMask: boolean = false;

    /**
     * Aplica mascara para Telefone confirme quantidade
     * de digitos.
     * @param valor 
     */
    static applyMask(valor) {
        this.maskPhone = '';
        if (this.controlMask && (valor.length == 10 || valor.length == 11)) {
            this.maskPhone = '(99)99999-9999';
            return false;
        }
        if (valor.length == 9) {
            this.controlMask = true;
            this.maskPhone = '(99)9999-9999';
        } else {
            this.controlMask = false;
            this.maskPhone = '(99)999999999';
        }
    }
}