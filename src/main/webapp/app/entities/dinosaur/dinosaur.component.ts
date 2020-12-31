import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDinosaur } from 'app/shared/model/dinosaur.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DinosaurService } from './dinosaur.service';
import { DinosaurDeleteDialogComponent } from './dinosaur-delete-dialog.component';

@Component({
  selector: 'jhi-dinosaur',
  templateUrl: './dinosaur.component.html',
})
export class DinosaurComponent implements OnInit, OnDestroy {
  dinosaurs: IDinosaur[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected dinosaurService: DinosaurService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.dinosaurs = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.dinosaurService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IDinosaur[]>) => this.paginateDinosaurs(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.dinosaurs = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDinosaurs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDinosaur): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDinosaurs(): void {
    this.eventSubscriber = this.eventManager.subscribe('dinosaurListModification', () => this.reset());
  }

  delete(dinosaur: IDinosaur): void {
    const modalRef = this.modalService.open(DinosaurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.dinosaur = dinosaur;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateDinosaurs(data: IDinosaur[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.dinosaurs.push(data[i]);
      }
    }
  }
}
