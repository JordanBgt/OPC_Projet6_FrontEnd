import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IComment } from '../shared/model/comment.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';
import { CommentSave } from '../shared/model/comment-save.model';
import { Comment } from '../shared/model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public ressourceUrl = 'http://localhost:8080/api/comments';

  constructor(protected http: HttpClient) { }

  getAllComments(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.ressourceUrl, {params: options});
  }

  createComment(comment: CommentSave): Observable<IComment> {
    return this.http.post<IComment>(this.ressourceUrl, comment);
  }

  updateComment(comment: Comment, userId: number): Observable<IComment> {
    const options = createRequestOption({userId});
    return this.http.put<IComment>(`${this.ressourceUrl}/${comment.id}`, comment, {params: options});
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.ressourceUrl}/${commentId}`, {observe: 'response'});
  }
}
