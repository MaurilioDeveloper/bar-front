import { Validator, NG_VALIDATORS, AbstractControl, FormControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

export class CpfCnpjValidator implements Validator {

    static cpfLength = 11;
    static cnpjLength = 14;

    /**
     * Calcula o dígito verificador do CPF ou CNPJ.
     */
    static buildDigit(arr: number[]): number {

        const isCpf = arr.length < CpfCnpjValidator.cpfLength;
        const digit = arr
            .map((val, idx) => val * ((!isCpf ? idx % 8 : idx) + 2))
            .reduce((total, current) => total + current) % CpfCnpjValidator.cpfLength;

        if (digit < 2 && isCpf) {
            return 0;
        }

        return CpfCnpjValidator.cpfLength - digit;
    }

    /**
     * Valida um CPF ou CNPJ de acordo com seu dígito verificador.
     */
    static validate(c: AbstractControl): ValidationErrors | null {
        return null;
        // return this.valida_cnpj(c);
    }

    static valida_cnpj(formControl: FormControl): ValidationErrors | null {
        let valor = formControl.value;
        if (valor && valor.length == 14) {
            // Garante que o valor é uma string
            valor = valor.toString();

            // Remove caracteres inválidos do valor
            valor = valor.replace(/[^0-9]/g, '');


            // O valor original
            var cnpj_original = valor;

            // Captura os primeiros 12 números do CNPJ
            var primeiros_numeros_cnpj = valor.substr(0, 12);

            // Faz o primeiro cálculo
            var primeiro_calculo = CpfCnpjValidator.calc_digitos_posicoes(primeiros_numeros_cnpj, 5);

            // O segundo cálculo é a mesma coisa do primeiro, porém, começa na posição 6
            var segundo_calculo = CpfCnpjValidator.calc_digitos_posicoes(primeiro_calculo, 6);

            // Concatena o segundo dígito ao CNPJ
            var cnpj = segundo_calculo;

            // Verifica se o CNPJ gerado é idêntico ao enviado
            if (cnpj === cnpj_original) {
                if (cnpj == "00000000000000") {
                    // CNPJ inválido
                    return { equalDigits: true };
                }
                return null;
            }

            // Retorna falso por padrão
            return { equalDigits: true };
        }
    }

    static valida_cpf(formControl: FormControl): ValidationErrors | null {
        let valor = formControl.value;

        if (valor) {
            // Remove caracteres inválidos do valor
            valor = valor.replace(/[^0-9]/g, '');


            // Captura os 9 primeiros dígitos do CPF
            // Ex.: 02546288423 = 025462884
            var digitos = valor.substr(0, 9);

            // Faz o cálculo dos 9 primeiros dígitos do CPF para obter o primeiro dígito
            var novo_cpf = CpfCnpjValidator.calc_digitos_posicoes(digitos);

            // Faz o cálculo dos 10 dígitos do CPF para obter o último dígito
            var novo_cpf = CpfCnpjValidator.calc_digitos_posicoes(novo_cpf, 11);

            // Verifica se o novo CPF gerado é idêntico ao CPF enviado
            if (novo_cpf === valor) {
                if (novo_cpf == "00000000000") {
                    // CPF inválido
                    return { equalDigits: true };
                }
                // CPF válido
                return null;
            } else {
                // CPF inválido
                return { equalDigits: true };
            }
        }
    }

    public static calc_digitos_posicoes(digitos, posicoes = 10, soma_digitos = 0) {
        digitos = digitos.toString();
        // Faz a soma dos dígitos com a posição
        // Ex. para 10 posições:
        //   0    2    5    4    6    2    8    8   4
        // x10   x9   x8   x7   x6   x5   x4   x3  x2
        //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
        for (var i = 0; i < digitos.length; i++) {
            // Preenche a soma com o dígito vezes a posição
            soma_digitos = soma_digitos + (digitos[i] * posicoes);

            // Subtrai 1 da posição
            posicoes--;

            // Parte específica para CNPJ
            // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
            if (posicoes < 2) {
                // Retorno a posição para 9
                posicoes = 9;
            }
        }

        // Captura o resto da divisão entre soma_digitos dividido por 11
        // Ex.: 196 % 11 = 9
        soma_digitos = soma_digitos % 11;

        // Verifica se soma_digitos é menor que 2
        if (soma_digitos < 2) {
            // soma_digitos agora será zero
            soma_digitos = 0;
        } else {
            // Se for maior que 2, o resultado é 11 menos soma_digitos
            // Ex.: 11 - 9 = 2
            // Nosso dígito procurado é 2
            soma_digitos = 11 - soma_digitos;
        }
        // Concatena mais um dígito aos primeiro nove dígitos
        // Ex.: 025462884 + 2 = 0254628842
        var cpf = digitos + soma_digitos;
        // Retorna
        return cpf;
    }

    /**
     * Implementa a interface de um validator.
     */
    validate(c: AbstractControl): ValidationErrors | null {
        return CpfCnpjValidator.validate(c);
    }
}