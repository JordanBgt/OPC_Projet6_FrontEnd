import { Component, Input, OnInit } from '@angular/core';
import { IComment } from '../shared/model/comment.model';
import { CommentService } from '../services/comment.service';
import { HttpResponse } from '@angular/common/http';
import { HTTP_STATUS_NOCONTENT, ITEMS_PER_PAGE } from '../../../app.constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { CommentSave } from '../shared/model/comment-save.model';
import { TokenStorageService } from '../security/token-storage.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
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
  user: any;

  constructor(private commentService: CommentService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private tokenStorageService: TokenStorageService) {
    this.comments = [];
    this.size = ITEMS_PER_PAGE;
    this.page = 0;
  }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.loadAll();
  }

  loadAll() {
    this.commentService.getAllComments({page: this.page, spotId: this.spotId}).pipe(
      tap((res: any) => this.paginateComments(res)),
      catchError(error => throwError(error))
    ).subscribe();
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
      if (status === HTTP_STATUS_NOCONTENT) {
        this.snackBar.open('Commentaire supprimé !', 'Ok', {duration: 5000});
        this.page = 0;
        this.comments = [];
        this.loadAll();
      }
      });
  }

  onUpdate(comment) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {content: comment.content};

    const dialogRef = this.dialog.open(CommentDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => comment.content = data.content,
      (error => console.error(error)),
      () => this.commentService.updateComment(comment, this.user.id));
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const comment = new CommentSave();
    comment.userId = this.user.id;
    comment.spotId = this.spotId;
    comment.date = new Date();
    let commentUpdated: IComment;
    const dialogRef = this.dialog.open(CommentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => comment.content = data.content,
      (error => console.error(error)),
      () => {
        this.commentService.createComment(comment).pipe(
          tap((res: IComment) => {
            commentUpdated = res;
            this.comments.unshift(commentUpdated);
          }),
          catchError(error => throwError(error))
        ).subscribe();
    });
  }
}
