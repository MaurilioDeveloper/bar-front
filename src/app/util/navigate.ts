import { Router } from '@angular/router';

export class Navigate {
    static redirect(rota: string, route: Router) {
        return route.navigate([rota]);
    }
}
