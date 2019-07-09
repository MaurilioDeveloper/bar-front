import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
@Directive({
    selector: '[cpfCnpjmask]'
})
export class CpfCnpjMaskDirective {
     // cpf ou cnpj
     @Input()
     tipoDocumento: string;
 
     // binding para refletir no modelo
     @Output()
     @Input() ngModel;
     @Output() ngModelChange = new EventEmitter();
 
     @HostListener('window:drop', ['$event']) public onDrop(e) {
         e.preventDefault();
         e.stopPropagation();
     }
     @HostListener('window:dragover', ['$event']) public onDragOver(e) {
         e.preventDefault();
         e.stopPropagation();
     }
 
     @HostListener('window:dragleave', ['$event']) public onDragLeave(e) {
         e.preventDefault();
         e.stopPropagation();
     }
 
     @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
         e.preventDefault();
     }
 
     @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
         e.preventDefault();
     }
 
     @HostListener('keyup', ['$event'])
     onKeyUp(event) {
         const target = event.target;
         const start = event.currentTarget.selectionStart;
         const end = event.currentTarget.selectionEnd;
     }
 
     @HostListener('keydown', ['$event'])
     onKeydown(event) {
         const target = event.target;
         const start = event.currentTarget.selectionStart;
         const end = event.currentTarget.selectionEnd;
         // verifica se há intervalo, pois se há teremos um replace
         const hasInterval = start !== end;
 
         if (event.key === 'Delete' || event.key === 'Backspace') {
             target.value.substring(start, end);
             return;
         }
 
         if (event.ctrlKey || event.key.indexOf('Arrow') >= 0 || (event.key === 'Home') || (event.key === 'Tab') || (event.key === 'End')) {
             return;
         }
         // Não é nenhuma tecla especificada acima e também não é numero, portanto não interessa, corta o comportamento padrão e volta.
         if (isNaN(event.key)
             || (target.value.length > 17 && this.tipoDocumento === 'cnpj' && !hasInterval)
             || (target.value.length > 13 && this.tipoDocumento === 'cpf' && !hasInterval)) {
             event.preventDefault();
             return;
         }
 
         let cpfCnpj = target.value;
 
         if (hasInterval) {
             // trecho que será substituído e precisa ser removido
             const toRemove = cpfCnpj.slice(start, end);
             const firstPart = cpfCnpj.slice(0, start - 1);
             const lastPart = cpfCnpj.slice(end);
             cpfCnpj = firstPart + lastPart;
         }
         // insere o novo caractere
         cpfCnpj = cpfCnpj.slice(0, start) + event.key + cpfCnpj.slice(end);
         // Removendo caracteres não significativos(não numéricos)
         cpfCnpj = cpfCnpj.replace(/\D/g, '');
 
         let toMove = start + 1;
 
         // validação para CNPJ (Modelo: 34.143.675/0001-00)
         if (this.tipoDocumento === 'cnpj') {
 
             if (cpfCnpj.length > 1 && cpfCnpj.length < 5) {
                 toMove++;
                 cpfCnpj = cpfCnpj.replace(/^(\d{2})/, '$1\.');
 
             } else if (cpfCnpj.length >= 5 && cpfCnpj.length < 8) {
                 toMove++;
                 cpfCnpj = cpfCnpj.replace(/^(\d{2})(\d{3})/, '$1\.$2\.');
             } else if (cpfCnpj.length >= 8 && cpfCnpj.length < 12) {
                 toMove++;
                 cpfCnpj = cpfCnpj.replace(/^(\d{2})(\d{3})(\d{3})/, '$1\.$2\.$3\/');
             } else if (cpfCnpj.length >= 12) {
                 toMove++;
                 cpfCnpj = cpfCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})/, '$1\.$2\.$3\/$4-');
             }
         } else if (this.tipoDocumento === 'cpf') {
             if (cpfCnpj.length > 2 && cpfCnpj.length < 6) {
                 toMove++;
                 cpfCnpj = cpfCnpj.replace(/^(\d{3})/, '$1\.');
             } else if (cpfCnpj.length >= 6 && cpfCnpj.length < 9) {
                 toMove++;
                 cpfCnpj = cpfCnpj.replace(/^(\d{3})(\d{3})/, '$1\.$2\.');
             } else if (cpfCnpj.length >= 9) {
                 toMove++;
                 cpfCnpj = cpfCnpj.replace(/^(\d{3})(\d{3})(\d{3})/, '$1\.$2\.$3\-');
             }
         }
 
         // Jogando o valor no componente
         target.value = cpfCnpj;
         // Jogando o valor no modelo
         this.ngModel = target.value;
         this.ngModelChange.emit(target.value);
         // Tirando o comportamento padrão, pois já aplicamos tudo o que precisamos acima
         // event.preventDefault();
         // Movendo o cursor
         this.setCaretPosition(event.currentTarget, toMove);
     }
 
     private setCaretPosition(elem, caretPos) {
         if (elem !== null) {
             if (elem.createTextRange) {
                 const range = elem.createTextRange();
                 range.move('character', caretPos);
                 range.select();
             } else {
                 if (elem.setSelectionRange) {
                     elem.focus();
                     elem.setSelectionRange(caretPos, caretPos);
                 } else {
                     elem.focus();
                 }
             }
         }
     }
}

