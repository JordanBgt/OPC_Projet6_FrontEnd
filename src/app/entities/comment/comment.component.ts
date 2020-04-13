import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '../../shared/model/comment.model';
import { CommentService } from './comment.service';
import { HttpResponse } from '@angular/common/http';
import { ITEMS_PER_PAGE } from '../../../../app.constants';

type EntityArrayResponseType = HttpResponse<IComment[]>;
type EntityResponseType = HttpResponse<IComment>;

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() spotId: number;
  comments: IComment[];
  size: number;
  page: number;
  totalPages: number;

  constructor(private commentService: CommentService) {
    this.comments = [];
    this.size = ITEMS_PER_PAGE;
    this.page = 0;
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.commentService.getAllComments({spotId: this.spotId}).subscribe((res: EntityArrayResponseType) => this.paginateComments(res.body));
  }

  paginateComments(data: any) {
    this.totalPages = data.totalPages;
    for (const comment of data.content) {
      this.comments.push(comment);
    }
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }
}
