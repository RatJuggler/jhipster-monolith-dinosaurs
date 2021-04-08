import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDinosaur } from '../dinosaur.model';

import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { DinosaurService } from '../service/dinosaur.service';
import { DinosaurDeleteDialogComponent } from '../delete/dinosaur-delete-dialog.component';
import { ParseLinks } from 'app/core/util/parse-links.service';

@Component({
  selector: 'jhi-dinosaur',
  templateUrl: './dinosaur.component.html',
})
export class DinosaurComponent implements OnInit {
  dinosaurs: IDinosaur[];
  isLoading = false;
  itemsPerPage: number;
  links: { [key: string]: number };
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(protected dinosaurService: DinosaurService, protected modalService: NgbModal, protected parseLinks: ParseLinks) {
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
    this.isLoading = true;

    this.dinosaurService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IDinosaur[]>) => {
          this.isLoading = false;
          this.paginateDinosaurs(res.body, res.headers);
        },
        () => {
          this.isLoading = false;
        }
      );
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
  }

  trackId(index: number, item: IDinosaur): number {
    return item.id!;
  }

  delete(dinosaur: IDinosaur): void {
    const modalRef = this.modalService.open(DinosaurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.dinosaur = dinosaur;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.reset();
      }
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateDinosaurs(data: IDinosaur[] | null, headers: HttpHeaders): void {
    this.links = this.parseLinks.parse(headers.get('link') ?? '');
    if (data) {
      for (const d of data) {
        this.dinosaurs.push(d);
      }
    }
  }
}
