import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '../../shared/model/comment.model';
import { CommentService } from './comment.service';
import { HttpResponse } from '@angular/common/http';
import { ITEMS_PER_PAGE } from '../../../../app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private commentService: CommentService,
              private snackBar: MatSnackBar) {
    this.comments = [];
    this.size = ITEMS_PER_PAGE;
    this.page = 0;
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.commentService.getAllComments({page: this.page, spotId: this.spotId})
      .subscribe((res: EntityArrayResponseType) => this.paginateComments(res.body));
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

  onDelete(commentId) {
    let status: number;
    this.commentService.deleteComment(commentId).subscribe((res: any) => status = res.status,
      (error => console.error(error)),
      () => {
      if (status === 204) {
        this.snackBar.open('Commentaire supprimé !', 'Ok', {duration: 5000});
        this.page = 0;
        this.comments = [];
        this.loadAll();
      }
      });
  }
}
