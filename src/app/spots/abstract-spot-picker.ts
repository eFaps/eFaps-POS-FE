import { Spot, DocStatus } from '../model';
import { Router } from '@angular/router';
import { PosService, DocumentService } from '../services';

export abstract class AbstractSpotPicker {

  constructor(protected router: Router,
    protected posService: PosService,
    protected documentService: DocumentService
  ) {

  }

  selectSpot(_spot: Spot) {
    if (_spot.order) {
      this.posService.setOrder(_spot.order);
      this.router.navigate(['/pos']);
    } else {
      const order = {
        id: null,
        oid: null,
        number: null,
        currency: this.posService.currency,
        items: [],
        status: DocStatus.OPEN,
        netTotal: 0,
        crossTotal: 0,
        taxes: [],
        spot: _spot,
        discount: null
      };
      this.documentService.createOrder(order).subscribe(_order => {
        this.posService.setOrder(_order);
        this.router.navigate(['/pos']);
      });
    }
  }
}
