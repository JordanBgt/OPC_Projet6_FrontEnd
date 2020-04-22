import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IComment } from '../shared/model/comment.model';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/request-utils';
import { CommentSave } from '../shared/model/comment-save.model';
import { Comment } from '../shared/model/comment.model';

type EntityResponseType = HttpResponse<IComment>;
type EntityArrayResponseType = HttpResponse<IComment[]>;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public ressourceUrl = 'http://localhost:8080/api/comments';

  constructor(protected http: HttpClient) { }

  getAllComments(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComment[]>(this.ressourceUrl, {params: options, observe: 'response'});
  }

  getOneComment(commentId: number): Observable<EntityResponseType> {
    return this.http.get(`${this.ressourceUrl}/${commentId}`, {observe: 'response'});
  }

  createComment(comment: CommentSave): Observable<EntityResponseType> {
    return this.http.post<IComment>(this.ressourceUrl, comment, {observe: 'response'});
  }

  updateComment(comment: Comment): Observable<EntityResponseType> {
    return this.http.put<IComment>(`${this.ressourceUrl}/${comment.id}`, comment, {observe: 'response'});
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.ressourceUrl}/${commentId}`, {observe: 'response'});
  }
}
